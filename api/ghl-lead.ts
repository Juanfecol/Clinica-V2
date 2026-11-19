import { createHash } from 'crypto';

const GHL_LOCATION_ID = 'gfTxFynWnzP12lVZbIc4';
const GHL_PIPELINE_ID = 'w6AOtRMa1yb7USrRQGBh';
const GHL_STAGE_NEW_LEAD_ID = '799faf32-5f74-48fc-9b3b-d8ac480c5700';
const META_PIXEL_ID = '1754959305395666';
const DEFAULT_EVENT_SOURCE_URL = 'https://clinicadentariasantamariadosolivais.pt/';

interface AttributionInput {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  fbp?: string;
  fbc?: string;
  referrer?: string;
  landing_page?: string;
  event_source_url?: string;
}

interface GhlLeadBody {
  nome?: string;
  telefone?: string;
  tratamento?: string;
  dia?: string;
  hora?: string;
  attribution?: AttributionInput;
}

interface VercelLikeRequest {
  method?: string;
  body?: GhlLeadBody | string;
  headers?: Record<string, string | string[] | undefined>;
}

interface VercelLikeResponse {
  status: (code: number) => VercelLikeResponse;
  json: (payload: Record<string, unknown>) => void;
  setHeader?: (name: string, value: string) => void;
}

export function normalizePortuguesePhone(rawPhone?: string): string {
  const cleaned = (rawPhone || '').replace(/[^\d+]/g, '');
  if (!cleaned) return '';

  if (cleaned.startsWith('+')) {
    return cleaned;
  }
  if (cleaned.startsWith('00')) {
    return `+${cleaned.slice(2)}`;
  }
  if (cleaned.startsWith('351') && cleaned.length >= 12) {
    return `+${cleaned}`;
  }
  // Números nacionales portugueses de 9 dígitos (ej. 912345678, 211350066)
  if (cleaned.length === 9) {
    return `+351${cleaned}`;
  }
  return `+351${cleaned}`;
}

function sanitizeEventSourceUrl(rawUrl?: string): string {
  if (!rawUrl) return DEFAULT_EVENT_SOURCE_URL;
  try {
    const parsed = new URL(rawUrl);
    return `${parsed.origin}${parsed.pathname || '/'}`;
  } catch {
    return DEFAULT_EVENT_SOURCE_URL;
  }
}

function sha256Lower(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

function buildTreatmentTag(tratamento?: string): string {
  const normalized = (tratamento || 'avaliacao-dentaria')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `tratamento:${normalized || 'avaliacao-dentaria'}`;
}

function getMonetaryValueForTreatment(tratamento?: string): number {
  const normalized = (tratamento || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (
    normalized.includes('implant') ||
    normalized.includes('protes') ||
    normalized.includes('reabilita') ||
    normalized.includes('carga imediata')
  ) {
    return 745;
  }
  if (
    normalized.includes('ortodon') ||
    normalized.includes('invisalign') ||
    normalized.includes('alinhador')
  ) {
    return 350;
  }
  if (
    normalized.includes('estetic') ||
    normalized.includes('faceta') ||
    normalized.includes('branqueamento')
  ) {
    return 190;
  }
  return 20;
}

export default async function handler(req: VercelLikeRequest, res: VercelLikeResponse): Promise<void> {
  if (res.setHeader) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  if (req.method === 'OPTIONS') {
    res.status(200).json({ ok: true });
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method Not Allowed' });
    return;
  }

  let body: GhlLeadBody = {};
  try {
    body = typeof req.body === 'string' ? (JSON.parse(req.body) as GhlLeadBody) : req.body || {};
  } catch {
    body = {};
  }

  const nome = (body.nome || 'Paciente Website').trim();
  const normalizedPhone = normalizePortuguesePhone(body.telefone);
  const tratamento = (body.tratamento || 'Consulta de Avaliação Dentária').trim();
  const dia = (body.dia || 'Qualquer dia').trim();
  const hora = (body.hora || 'Qualquer horário').trim();
  const attribution = body.attribution || {};
  const cleanEventSourceUrl = sanitizeEventSourceUrl(
    attribution.event_source_url || attribution.landing_page
  );
  const monetaryValue = getMonetaryValueForTreatment(tratamento);

  // Envío directo opcional a Meta Conversions API (si META_CAPI_ACCESS_TOKEN está configurado)
  // incluyendo siempre event_source_url obligatorio.
  const metaCapiToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (metaCapiToken && normalizedPhone) {
    const digitsOnlyPhone = normalizedPhone.replace(/\D/g, '');
    const clientUserAgent =
      (typeof req.headers?.['user-agent'] === 'string' ? req.headers['user-agent'] : '') || undefined;

    await fetch(`https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(metaCapiToken)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [
          {
            event_name: 'Lead',
            event_time: Math.floor(Date.now() / 1000),
            action_source: 'website',
            event_source_url: cleanEventSourceUrl,
            user_data: {
              ph: [sha256Lower(digitsOnlyPhone)],
              fbp: attribution.fbp || undefined,
              fbc: attribution.fbc || undefined,
              client_user_agent: clientUserAgent,
            },
            custom_data: {
              currency: 'EUR',
              value: monetaryValue,
            },
          },
        ],
      }),
    }).catch(() => {});
  }

  const apiKey = process.env.GHL_API_KEY;
  if (!apiKey || !normalizedPhone) {
    res.status(200).json({
      ok: true,
      event_source_url: cleanEventSourceUrl,
      skipped: !apiKey ? 'missing_ghl_api_key' : 'missing_phone',
    });
    return;
  }

  const nameParts = nome.split(/\s+/);
  const firstName = nameParts[0] || 'Paciente';
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

  const tags = [
    'origem:website-react',
    'novo-lead-web',
    'aguarda-resposta-lead',
    buildTreatmentTag(tratamento),
  ];

  if (attribution.utm_source) {
    tags.push(`utm_source:${attribution.utm_source.toLowerCase()}`);
  }
  if (attribution.utm_campaign) {
    tags.push(`utm_campaign:${attribution.utm_campaign.toLowerCase()}`);
  }

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    Version: '2021-07-28',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  try {
    // 1. Upsert del contacto en GoHighLevel (siempre con attributionSource.url = event_source_url)
    const upsertResponse = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        locationId: GHL_LOCATION_ID,
        firstName,
        lastName,
        name: nome,
        phone: normalizedPhone,
        source: attribution.utm_source
          ? `Website (${attribution.utm_source}/${attribution.utm_medium || 'ads'})`
          : 'Website Oficial Clínica Santa Maria dos Olivais',
        tags,
        attributionSource: {
          utmSource: attribution.utm_source || undefined,
          utmMedium: attribution.utm_medium || undefined,
          utmCampaign: attribution.utm_campaign || undefined,
          utmContent: attribution.utm_content || undefined,
          utmTerm: attribution.utm_term || undefined,
          fbclid: attribution.fbclid || undefined,
          gclid: attribution.gclid || undefined,
          fbp: attribution.fbp || undefined,
          fbc: attribution.fbc || undefined,
          referrer: attribution.referrer || undefined,
          url: cleanEventSourceUrl,
        },
      }),
    });

    const upsertData = (await upsertResponse.json().catch(() => ({}))) as {
      contact?: { id?: string };
    };
    const contactId = upsertData?.contact?.id;

    // 2. Creación de la oportunidad en Marketing Pipeline -> Stage New Lead
    if (contactId) {
      await fetch('https://services.leadconnectorhq.com/opportunities/upsert', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          pipelineId: GHL_PIPELINE_ID,
          locationId: GHL_LOCATION_ID,
          contactId,
          name: `${nome} — ${tratamento} (${dia} · ${hora})`,
          pipelineStageId: GHL_STAGE_NEW_LEAD_ID,
          status: 'open',
          monetaryValue,
        }),
      }).catch(() => {});
    }

    res.status(200).json({
      ok: true,
      contactId: contactId || null,
      event_source_url: cleanEventSourceUrl,
    });
  } catch {
    res.status(200).json({
      ok: false,
      error: 'ghl_sync_failed_silently',
    });
  }
}
