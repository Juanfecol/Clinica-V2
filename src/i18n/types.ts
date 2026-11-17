import { useEffect, useState } from 'react';

export type SupportedLocale = 'pt' | 'es' | 'en' | 'fr' | 'de' | 'it';

const SUPPORTED_LOCALES: readonly SupportedLocale[] = ['pt', 'es', 'en', 'fr', 'de', 'it'];

export function resolveLocaleFromLanguages(languages: readonly string[]): SupportedLocale {
  for (const raw of languages) {
    if (!raw) continue;
    const normalized = raw.trim().toLowerCase();
    const primary = normalized.split(/[-_]/)[0];

    if ((SUPPORTED_LOCALES as readonly string[]).includes(primary)) {
      return primary as SupportedLocale;
    }
    if (primary === 'gl') {
      return 'es';
    }
    if (primary === 'ca' || primary === 'eu') {
      continue;
    }
  }

  // Secondary check for Catalan/Basque if no second language was listed
  if (languages.length > 0) {
    const firstPrimary = languages[0].trim().toLowerCase().split(/[-_]/)[0];
    if (firstPrimary === 'ca' || firstPrimary === 'eu') {
      return 'es';
    }
    // International visitors with other languages default to English
    if (firstPrimary && firstPrimary !== 'pt') {
      return 'en';
    }
  }

  return 'pt';
}

export function detectDeviceLocale(): SupportedLocale {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'pt';
  }

  try {
    const params = new URLSearchParams(window.location.search);
    const queryLang = params.get('lang')?.trim().toLowerCase().split(/[-_]/)[0];
    if (queryLang && (SUPPORTED_LOCALES as readonly string[]).includes(queryLang)) {
      return queryLang as SupportedLocale;
    }
  } catch {
    // Ignore URL parsing errors
  }

  const browserLanguages: string[] = [];
  if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
    browserLanguages.push(...navigator.languages);
  }
  if (navigator.language) {
    browserLanguages.push(navigator.language);
  }
  try {
    const intlLocale = Intl.DateTimeFormat().resolvedOptions().locale;
    if (intlLocale) {
      browserLanguages.push(intlLocale);
    }
  } catch {
    // Ignore Intl errors
  }

  if (browserLanguages.length === 0) {
    return 'pt';
  }

  return resolveLocaleFromLanguages(browserLanguages);
}

const HTML_LANG_MAP: Record<SupportedLocale, string> = {
  pt: 'pt-PT',
  es: 'es',
  en: 'en',
  fr: 'fr',
  de: 'de',
  it: 'it',
};

export function useDeviceLocale(metaTitle: string, metaDescription: string): SupportedLocale {
  const [locale, setLocale] = useState<SupportedLocale>(() => detectDeviceLocale());

  useEffect(() => {
    const handleLanguageChange = () => {
      setLocale(detectDeviceLocale());
    };

    window.addEventListener('languagechange', handleLanguageChange);
    return () => {
      window.removeEventListener('languagechange', handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG_MAP[locale];
    if (metaTitle) {
      document.title = metaTitle;
    }
    if (metaDescription) {
      const descEl = document.querySelector('meta[name="description"]');
      if (descEl) {
        descEl.setAttribute('content', metaDescription);
      }
    }
  }, [locale, metaTitle, metaDescription]);

  return locale;
}

export interface LocalizedTreatmentText {
  title: string;
  subtitle: string;
  caption: string;
  description: string;
  duration: string;
}

export interface LocalizedClinicSpaceText {
  title: string;
  subtitle: string;
}

export interface LocalizedFaqItem {
  question: string;
  answer: string;
}

export interface SiteTranslationBundle {
  meta: {
    title: string;
    description: string;
    decimalSeparator: ',' | '.';
  };
  nav: {
    tratamentos: string;
    primeiraConsulta: string;
    equipa: string;
    clinica: string;
    perguntas: string;
    marcar: string;
  };
  hero: {
    doctorAlt: string;
    doctorAria: string;
    doctorRole: string;
    beat1Eyebrow: string;
    beat1Lead: string;
    beat1Italic: string;
    beat2Eyebrow: string;
    beat2Lead: string;
    beat2Italic: string;
    beat3Eyebrow: string;
    beat3Lead: string;
    beat3Italic: string;
    ctaBook: string;
    scrollDown: string;
  };
  manifesto: {
    eyebrow: string;
    text: string;
  };
  stats: {
    years: string;
    implants: string;
    googleRating: string;
    specialists: string;
  };
  tratamentosSection: {
    eyebrow: string;
    specialtiesCount: string;
    headingLead: string;
    headingItalic: string;
    prevAria: string;
    nextAria: string;
    pricesBtn: string;
    bookBtn: string;
    items: Record<string, LocalizedTreatmentText>;
  };
  primeiraConsulta: {
    eyebrow: string;
    headingLead: string;
    headingItalic: string;
    imgAlt: string;
    step1TitleLines: [string, string, string];
    step1Desc: string;
    step2TitleLines: [string, string, string];
    step2Desc: string;
    step3TitleLines: [string, string];
    step3Desc: string;
  };
  equipa: {
    eyebrow: string;
    headingBefore: string;
    headingItalic: string;
    headingAfter: string;
    membersCount: string;
    prevAria: string;
    nextAria: string;
    roles: Record<string, string>;
    ladineRole: string;
    ladineDesc: string;
  };
  clinica: {
    eyebrow: string;
    spacesCount: string;
    headingLead: string;
    headingItalic: string;
    spaces: LocalizedClinicSpaceText[];
  };
  smileBanner: {
    alt: string;
    line1: string;
    line2: string;
    line3Italic: string;
  };
  avaliacoes: {
    eyebrow: string;
    headingBefore: string;
    headingItalic: string;
    headingAfter: string;
    ratingSummary: string;
    viewAllGoogle: string;
    starsAria: (rating: number) => string;
    verifiedReview: string;
    verifiedPatient: string;
    pausedLabel: string;
    activeRotationLabel: string;
    prevAria: string;
    nextAria: string;
    reviewQuotes: Record<number, string>;
  };
  marcacao: {
    eyebrow: string;
    headingBefore: string;
    headingItalic: string;
    headingAfter: string;
    doctorAlt: string;
    doctorBadge: string;
    doctorBio: string;
    realtimeBadge: string;
    cardTitleLead: string;
    cardTitleItalic: string;
    cardSubtitle: string;
    evalTitle: string;
    evalSubtitle: string;
    costLabel: string;
    includesLabel: string;
    includesItems: [string, string, string, string, string];
    evalQuestion: string;
    evalFootnote: string;
    highlight1Strong: string;
    highlight1Text: string;
    highlight2Strong: string;
    highlight2Text: string;
    highlight3Strong: string;
    highlight3Text: string;
    labelName: string;
    placeholderName: string;
    labelPhone: string;
    labelTreatment: string;
    labelDay: string;
    dayAny: string;
    dayWeekdays: string;
    daySaturday: string;
    labelTime: string;
    timeAny: string;
    timeMorning: string;
    timeAfternoon: string;
    submitWhatsApp: string;
    confirmNote: string;
    privacyNotePrefix: string;
    privacyLink: string;
    phoneBtn: string;
    scheduleEyebrow: string;
    scheduleWeekdays: string;
    scheduleSaturday: string;
    addressEyebrow: string;
    showMap: string;
    openGoogleMaps: string;
    whatsappMessage: (details: {
      nome: string;
      telefone: string;
      tratamento: string;
      dia: string;
      hora: string;
    }) => string;
    chatbotDefaultMsg: (treatment: string) => string;
  };
  faq: {
    eyebrow: string;
    headingLead: string;
    headingItalic: string;
    items: LocalizedFaqItem[];
  };
  footer: {
    headingLead: string;
    headingItalic: string;
    ctaBook: string;
    visitEyebrow: string;
    hoursTitle: string;
    hoursWeekdays: string;
    hoursSaturday: string;
    contactsEyebrow: string;
    customerSupport: string;
    customerSupportNote: string;
    reception: string;
    email: string;
    navigationEyebrow: string;
    navMarcacao: string;
    legalClinicLine: string;
    complaintsBook: string;
    privacyPolicy: string;
    copyright: string;
  };
}
