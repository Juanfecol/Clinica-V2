export interface AttributionData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  fbclid: string;
  gclid: string;
  gbraid: string;
  wbraid: string;
  fbp: string;
  fbc: string;
  referrer: string;
  landing_page: string;
  event_source_url: string;
  captured_at: string;
}

const STORAGE_KEY = 'smo_first_party_attribution';
const DEFAULT_EVENT_SOURCE_URL = 'https://clinicadentariasantamariadosolivais.pt/';

function getCleanEventSourceUrl(): string {
  if (typeof window === 'undefined') return DEFAULT_EVENT_SOURCE_URL;
  try {
    return `${window.location.origin}${window.location.pathname || '/'}`;
  } catch {
    return DEFAULT_EVENT_SOURCE_URL;
  }
}

function readCookie(name: string): string {
  if (typeof document === 'undefined' || !document.cookie) return '';
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : '';
}

/**
 * Captura de forma segura y legal en sessionStorage (First-Party) los parámetros de atribución
 * publicitaria (UTM, fbclid, gclid, gbraid, wbraid, _fbp, _fbc, event_source_url y referrer).
 */
export function initAttributionTracker(): AttributionData {
  const empty: AttributionData = {
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
    fbclid: '',
    gclid: '',
    gbraid: '',
    wbraid: '',
    fbp: '',
    fbc: '',
    referrer: '',
    landing_page: DEFAULT_EVENT_SOURCE_URL,
    event_source_url: DEFAULT_EVENT_SOURCE_URL,
    captured_at: new Date().toISOString(),
  };

  if (typeof window === 'undefined') {
    return empty;
  }

  try {
    const existingRaw = window.sessionStorage.getItem(STORAGE_KEY);
    const existing: Partial<AttributionData> = existingRaw ? JSON.parse(existingRaw) : {};

    const params = new URLSearchParams(window.location.search);
    const fbclidParam = params.get('fbclid') || existing.fbclid || '';
    const fbpCookie = readCookie('_fbp') || existing.fbp || '';
    let fbcCookie = readCookie('_fbc') || existing.fbc || '';

    if (!fbcCookie && fbclidParam) {
      fbcCookie = `fb.1.${Date.now()}.${fbclidParam}`;
    }

    const cleanSourceUrl = getCleanEventSourceUrl();

    const updated: AttributionData = {
      utm_source: params.get('utm_source') || existing.utm_source || '',
      utm_medium: params.get('utm_medium') || existing.utm_medium || '',
      utm_campaign: params.get('utm_campaign') || existing.utm_campaign || '',
      utm_content: params.get('utm_content') || existing.utm_content || '',
      utm_term: params.get('utm_term') || existing.utm_term || '',
      fbclid: fbclidParam,
      gclid: params.get('gclid') || existing.gclid || '',
      gbraid: params.get('gbraid') || existing.gbraid || '',
      wbraid: params.get('wbraid') || existing.wbraid || '',
      fbp: fbpCookie,
      fbc: fbcCookie,
      referrer: existing.referrer || document.referrer || 'direct',
      landing_page: existing.landing_page || cleanSourceUrl,
      event_source_url: cleanSourceUrl,
      captured_at: existing.captured_at || new Date().toISOString(),
    };

    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return empty;
  }
}

/**
 * Obtiene los datos de atribución First-Party almacenados en la sesión actual.
 */
export function getStoredAttribution(): AttributionData {
  if (typeof window === 'undefined') {
    return initAttributionTracker();
  }

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AttributionData;
      const cleanSourceUrl = getCleanEventSourceUrl();
      return {
        ...parsed,
        fbp: parsed.fbp || readCookie('_fbp') || '',
        fbc: parsed.fbc || readCookie('_fbc') || '',
        landing_page: parsed.landing_page || cleanSourceUrl,
        event_source_url: parsed.event_source_url || cleanSourceUrl,
      };
    }
  } catch {
    // Fallback
  }

  return initAttributionTracker();
}
