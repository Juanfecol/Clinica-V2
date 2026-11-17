export type SanitizedDentalCategory =
  | 'Consulta de Implantologia e Reabilitação'
  | 'Consulta de Ortodontia'
  | 'Consulta de Estética Dentária'
  | 'Consulta de Avaliação Dentária';

export interface LeadConversionPayload {
  nome?: string;
  telefone?: string;
  tratamento: string;
  valorEstimado?: number;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Sanitiza cualquier nombre de tratamiento a una de las 4 categorías comerciales permitidas
 * para cumplir estrictamente con la Política de Datos de Salud de Meta (Health Data Policy)
 * y las directrices de privacidad de la UE (RGPD), evitando enviar diagnósticos o patologías.
 */
export function sanitizeTreatmentForMeta(tratamento?: string): SanitizedDentalCategory {
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
    return 'Consulta de Implantologia e Reabilitação';
  }

  if (
    normalized.includes('ortodon') ||
    normalized.includes('invisalign') ||
    normalized.includes('alinhador') ||
    normalized.includes('aparelho') ||
    normalized.includes('spark')
  ) {
    return 'Consulta de Ortodontia';
  }

  if (
    normalized.includes('estetic') ||
    normalized.includes('faceta') ||
    normalized.includes('branqueamento') ||
    normalized.includes('blanqueamiento') ||
    normalized.includes('whitening')
  ) {
    return 'Consulta de Estética Dentária';
  }

  return 'Consulta de Avaliação Dentária';
}

/**
 * Calcula el valor estimado comercial según la categoría sanitizada si no se especifica uno explícito.
 */
export function getEstimatedLeadValue(tratamento?: string, explicitValue?: number): number {
  if (typeof explicitValue === 'number' && Number.isFinite(explicitValue) && explicitValue > 0) {
    return explicitValue;
  }

  const category = sanitizeTreatmentForMeta(tratamento);
  if (category === 'Consulta de Implantologia e Reabilitação') return 745;
  if (category === 'Consulta de Ortodontia') return 350;
  if (category === 'Consulta de Estética Dentária') return 190;
  return 20;
}

/**
 * Registra la conversión de Lead en:
 * 1) Meta Pixel (1754959305395666) con nombre sanitizado, valor en EUR y categoría 'Serviços de Medicina Dentária'
 * 2) Google Ads (AW-434250599) con las conversiones 'AW-434250599/koh5CPOs1uobEOfGiM8B' (formulario) y 'AW-434250599/grC7CL3rxeobEOfGiM8B' (WhatsApp)
 * 3) GA4 / GTM mediante el evento 'generate_lead' en dataLayer
 */
export function trackLeadConversion(data: LeadConversionPayload): void {
  if (typeof window === 'undefined') return;

  const safeCategory = sanitizeTreatmentForMeta(data.tratamento);
  const value = getEstimatedLeadValue(data.tratamento, data.valorEstimado);

  // a) Meta Pixel 1754959305395666 — Evento 'Lead' sanitizado
  try {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', {
        content_name: safeCategory,
        content_category: 'Serviços de Medicina Dentária',
        value,
        currency: 'EUR',
      });
    }
  } catch {
    // Silencioso para no bloquear la experiencia del usuario
  }

  // b) Google Ads AW-434250599 — Conversiones de Formulario y WhatsApp
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-434250599/koh5CPOs1uobEOfGiM8B',
        value,
        currency: 'EUR',
      });

      window.gtag('event', 'conversion', {
        send_to: 'AW-434250599/grC7CL3rxeobEOfGiM8B',
        value,
        currency: 'EUR',
      });
    }
  } catch {
    // Silencioso
  }

  // c) GA4 / GTM — Evento 'generate_lead' al dataLayer
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'generate_lead',
      lead_category: safeCategory,
      content_category: 'Serviços de Medicina Dentária',
      value,
      currency: 'EUR',
    });
  } catch {
    // Silencioso
  }
}

/**
 * Registra el clic directo hacia WhatsApp en Meta Pixel, Google Ads y GA4.
 */
export function trackWhatsAppClick(tratamento?: string): void {
  if (typeof window === 'undefined') return;

  const safeCategory = sanitizeTreatmentForMeta(tratamento);
  const value = getEstimatedLeadValue(tratamento);

  try {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Contact', {
        content_name: safeCategory,
        content_category: 'Serviços de Medicina Dentária',
        value,
        currency: 'EUR',
      });
    }
  } catch {
    // Silencioso
  }

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-434250599/grC7CL3rxeobEOfGiM8B',
        value,
        currency: 'EUR',
      });
    }
  } catch {
    // Silencioso
  }

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'whatsapp_click',
      lead_category: safeCategory,
      content_category: 'Serviços de Medicina Dentária',
      value,
      currency: 'EUR',
    });
  } catch {
    // Silencioso
  }
}

/**
 * Otorga el consentimiento de cookies publicitarias y analíticas conforme a Google Consent Mode v2 y RGPD.
 */
export function acceptCookies(): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem('cookie_consent_accepted', 'true');
  } catch {
    // Silencioso
  }

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted',
      });
    }
  } catch {
    // Silencioso
  }

  try {
    if (typeof window.fbq === 'function') {
      window.fbq('consent', 'grant');
    }
  } catch {
    // Silencioso
  }
}
