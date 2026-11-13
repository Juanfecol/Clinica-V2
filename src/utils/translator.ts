export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'pt', name: 'Português', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'en', name: 'Inglês', nativeName: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Espanhol', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Francês', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Alemão', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'nl', name: 'Holandês', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'uk', name: 'Ucraniano', nativeName: 'Українська', flag: '🇺🇦' },
];

/**
 * Detects the device / browser language
 */
export const detectDeviceLanguage = (): string => {
  if (typeof window === 'undefined') return 'pt';
  const raw =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    (navigator as any).userLanguage ||
    'pt';
  const short = raw.split('-')[0].toLowerCase();
  const exists = SUPPORTED_LANGUAGES.some((l) => l.code === short);
  return exists ? short : 'en';
};

/**
 * Gets currently active language from cookies, localStorage, or device
 */
export const getCurrentLanguage = (): { code: string; isAuto: boolean } => {
  if (typeof window === 'undefined') return { code: 'pt', isAuto: false };

  // 1. Check user explicit choice in localStorage
  const savedChoice = localStorage.getItem('user_language_choice');
  if (savedChoice && SUPPORTED_LANGUAGES.some((l) => l.code === savedChoice)) {
    return { code: savedChoice, isAuto: false };
  }

  // 2. Check googtrans cookie
  const match = document.cookie.match(/googtrans=\/pt\/([a-z]{2,5})/i);
  if (match && match[1]) {
    const code = match[1].toLowerCase();
    if (SUPPORTED_LANGUAGES.some((l) => l.code === code)) {
      return { code, isAuto: true };
    }
  }

  // 3. Fallback to device language
  const device = detectDeviceLanguage();
  return { code: device, isAuto: device !== 'pt' };
};

/**
 * Sets the active language via Google Translate and saves preference
 */
export const changeLanguage = (langCode: string, isManual = true) => {
  if (typeof window === 'undefined') return;

  if (isManual) {
    localStorage.setItem('user_language_choice', langCode);
  }

  const cookieVal = `/pt/${langCode}`;
  const hostname = window.location.hostname;
  
  // Set cookie for root path and domain
  document.cookie = `googtrans=${cookieVal}; path=/;`;
  document.cookie = `googtrans=${cookieVal}; path=/; domain=${hostname};`;
  
  if (hostname.includes('.')) {
    const parts = hostname.split('.');
    if (parts.length >= 2) {
      const topDomain = '.' + parts.slice(-2).join('.');
      document.cookie = `googtrans=${cookieVal}; path=/; domain=${topDomain};`;
    }
  }

  // If Google Translate combo dropdown is already present in the DOM, trigger it directly
  const selectEl = document.querySelector<HTMLSelectElement>('.goog-te-combo');
  if (selectEl) {
    selectEl.value = langCode;
    selectEl.dispatchEvent(new Event('change'));
  } else {
    // If not yet initialized or changed from reset, reload smoothly
    window.location.reload();
  }
};
