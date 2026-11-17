import { SupportedLocale } from './types';

export interface UxLocaleStrings {
  menuLabel: string;
  closeMenuAria: string;
  mobileMenuTitle: string;
  heroValueProp: string;
  heroTrustLine: string;
  phoneFormatHelper: string;
  errorNameRequired: string;
  errorPhoneInvalid: string;
  bookingReadyBanner: string;
  openWhatsAppDirect: string;
}

export const UX_TRANSLATIONS: Record<SupportedLocale, UxLocaleStrings> = {
  pt: {
    menuLabel: 'Menu',
    closeMenuAria: 'Fechar menu de navegação',
    mobileMenuTitle: 'Cuidar do seu sorriso em Lisboa',
    heroValueProp:
      'Implantes dentários 3D, alinhadores invisíveis Invisalign, estética dentária, urgências e odontopediatria explicados com clareza, empatia e sem dor.',
    heroTrustLine: '+10 anos de excelência em Lisboa (Olivais e Moscavide) · 4,4 ★ Google · Registo OMD / ERS',
    phoneFormatHelper: 'Ex.: 912 345 678 ou +351 912 345 678',
    errorNameRequired: 'Por favor, diga-nos como gosta de ser tratado(a).',
    errorPhoneInvalid: 'Indique um número de telemóvel ou telefone válido (mínimo 9 dígitos).',
    bookingReadyBanner: 'A sua mensagem está pronta para falar diretamente com a nossa equipa no WhatsApp.',
    openWhatsAppDirect: 'Falar connosco no WhatsApp',
  },
  es: {
    menuLabel: 'Menú',
    closeMenuAria: 'Cerrar menú de navegación',
    mobileMenuTitle: 'Cuidar de tu sonrisa en Lisboa',
    heroValueProp:
      'Implantes dentales 3D, ortodoncia invisible Invisalign, estética dental, urgencias y odontopediatría explicadas con claridad, empatía y sin dolor.',
    heroTrustLine: '+10 años de excelencia en Lisboa (Olivais y Moscavide) · 4,4 ★ Google · Registro OMD / ERS',
    phoneFormatHelper: 'Ej.: +351 912 345 678 o tu móvil con prefijo',
    errorNameRequired: 'Por favor, indícanos tu nombre para atenderte personalmente.',
    errorPhoneInvalid: 'Introduce un número de teléfono válido (mínimo 9 dígitos).',
    bookingReadyBanner: 'Tu mensaje está listo para hablar directamente con nuestro equipo por WhatsApp.',
    openWhatsAppDirect: 'Hablar con nosotros en WhatsApp',
  },
  en: {
    menuLabel: 'Menu',
    closeMenuAria: 'Close navigation menu',
    mobileMenuTitle: 'Caring for your smile in Lisbon',
    heroValueProp:
      '3D dental implants, Invisalign clear aligners, natural smile aesthetics, same-day emergencies and paediatric dentistry explained clearly and gently.',
    heroTrustLine: '10+ years of clinical excellence in Lisbon (Olivais & Moscavide) · 4.4 ★ Google · OMD / ERS Registered',
    phoneFormatHelper: 'e.g. +351 912 345 678 or mobile with country code',
    errorNameRequired: 'Please share your name so our team can welcome you personally.',
    errorPhoneInvalid: 'Please enter a valid phone number (at least 9 digits).',
    bookingReadyBanner: 'Your message is ready to connect directly with our patient care team on WhatsApp.',
    openWhatsAppDirect: 'Chat with our team on WhatsApp',
  },
  fr: {
    menuLabel: 'Menu',
    closeMenuAria: 'Fermer le menu de navigation',
    mobileMenuTitle: 'Prendre soin de votre sourire à Lisbonne',
    heroValueProp:
      'Implants dentaires 3D, aligneurs invisibles Invisalign, esthétique naturelle, urgences et pédodontie expliqués avec clarté, douceur et bienveillance.',
    heroTrustLine: '+10 ans d’excellence à Lisbonne (Olivais & Moscavide) · 4,4 ★ Google · Agréé OMD / ERS',
    phoneFormatHelper: 'Ex. : +351 912 345 678 ou mobile avec indicatif',
    errorNameRequired: 'Merci d’indiquer votre nom afin de vous accueillir personnellement.',
    errorPhoneInvalid: 'Veuillez saisir un numéro de téléphone valide (9 chiffres minimum).',
    bookingReadyBanner: 'Votre message est prêt pour échanger directement avec notre équipe sur WhatsApp.',
    openWhatsAppDirect: 'Échanger sur WhatsApp',
  },
  de: {
    menuLabel: 'Menü',
    closeMenuAria: 'Navigationsmenü schließen',
    mobileMenuTitle: 'Für Ihr Lächeln in Lissabon da',
    heroValueProp:
      '3D-Zahnimplantate, unsichtbare Invisalign-Aligner, natürliche Ästhetik, Notfallhilfe und Kinderzahnmedizin – klar erklärt, sanft und schmerzfrei.',
    heroTrustLine: '+10 Jahre Exzellenz in Lissabon (Olivais & Moscavide) · 4,4 ★ Google · OMD / ERS registriert',
    phoneFormatHelper: 'z. B. +351 912 345 678 oder Mobilnummer mit Vorwahl',
    errorNameRequired: 'Bitte teilen Sie uns Ihren Namen für die persönliche Betreuung mit.',
    errorPhoneInvalid: 'Bitte geben Sie eine gültige Telefonnummer ein (mind. 9 Ziffern).',
    bookingReadyBanner: 'Ihre Nachricht ist bereit für den direkten Kontakt mit unserem Praxisteam per WhatsApp.',
    openWhatsAppDirect: 'Direkt per WhatsApp schreiben',
  },
  it: {
    menuLabel: 'Menu',
    closeMenuAria: 'Chiudi menu di navigazione',
    mobileMenuTitle: 'Prendersi cura del tuo sorriso a Lisbona',
    heroValueProp:
      'Impianti dentali 3D, allineatori invisibili Invisalign, estetica naturale, urgenze e odontoiatria pediatrica spiegati con chiarezza, empatia e senza dolore.',
    heroTrustLine: '+10 anni di eccellenza a Lisbona (Olivais e Moscavide) · 4,4 ★ Google · Registrata OMD / ERS',
    phoneFormatHelper: 'Es.: +351 912 345 678 o cellulare con prefisso',
    errorNameRequired: 'Indicaci il tuo nome per poterti accogliere personalmente.',
    errorPhoneInvalid: 'Inserisci un numero di telefono valido (minimo 9 cifre).',
    bookingReadyBanner: 'Il tuo messaggio è pronto per parlare direttamente con il nostro team su WhatsApp.',
    openWhatsAppDirect: 'Parla con noi su WhatsApp',
  },
};
