import { useEffect } from 'react';
import { X } from 'lucide-react';
import { SupportedLocale } from '../i18n/types';
import { LiquidButton } from './LiquidGlass';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale?: SupportedLocale;
}

interface PrivacyCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  closeAria: string;
  closeBtn: string;
  sections: { heading: string; body: string }[];
}

const PRIVACY_COPY: Record<SupportedLocale, PrivacyCopy> = {
  pt: {
    eyebrow: 'SIGILO MÉDICO & RESPEITO PELA SUA CONFIANÇA',
    title: 'Política de Privacidade',
    subtitle: 'Cuidamos dos seus dados pessoais com o mesmo rigor ético com que cuidamos da sua saúde — RGPD (UE 2016/679).',
    closeAria: 'Fechar política de privacidade',
    closeBtn: 'Compreendi',
    sections: [
      {
        heading: '01. Quem cuida dos seus dados',
        body: 'Clínica Santa Maria dos Olivais, situada na Estrada de Moscavide N 32C, 1800-279 Lisboa, sob direção clínica da Dra. Ana Mata (contacto direto: clinicasmod@gmail.com · +351 300 601 645).',
      },
      {
        heading: '02. Navegação limpa e contacto direto sem intermediários',
        body: 'Este website não instala cookies publicitários invasivos nem guarda numa base de dados externa o que escreve no formulário. Ao pedir marcação, abrimos diretamente o seu WhatsApp com a mensagem preparada para que fale por sua livre iniciativa com a nossa receção.',
      },
      {
        heading: '03. Sigilo médico-dentário e processo clínico',
        body: 'Toda a informação clínica, radiográfica e fotográfica recolhida presencialmente na clínica destina-se exclusivamente ao seu diagnóstico, plano terapêutico e faturação médica, encontrando-se protegida pelo dever de sigilo profissional da Ordem dos Médicos Dentistas (OMD) e pelas normas da Entidade Reguladora da Saúde (ERS).',
      },
      {
        heading: '04. Os seus direitos, sempre acessíveis',
        body: 'Como titular dos dados, pode solicitar a qualquer momento o acesso, atualização, portabilidade ou eliminação dos seus dados de contacto com toda a simplicidade através de clinicasmod@gmail.com ou pessoalmente na nossa receção.',
      },
    ],
  },
  es: {
    eyebrow: 'SECRETO MÉDICO Y RESPETO POR TU CONFIANZA',
    title: 'Política de Privacidad',
    subtitle: 'Cuidamos tus datos personales con el mismo rigor ético con el que cuidamos tu salud — RGPD (UE 2016/679).',
    closeAria: 'Cerrar política de privacidad',
    closeBtn: 'Entendido',
    sections: [
      {
        heading: '01. Quién protege tu información',
        body: 'Clínica Santa Maria dos Olivais, ubicada en Estrada de Moscavide N 32C, 1800-279 Lisboa, bajo la dirección médica de la Dra. Ana Mata (contacto directo: clinicasmod@gmail.com · +351 300 601 645).',
      },
      {
        heading: '02. Navegación limpia y trato humano directo',
        body: 'Esta página no utiliza rastreadores publicitarios ni almacena en servidores externos lo que escribes en el formulario. Al solicitar tu cita, se abre directamente tu WhatsApp para que hables libremente y sin intermediarios con nuestro equipo de recepción.',
      },
      {
        heading: '03. Confidencialidad médica e historia clínica',
        body: 'Los registros radiológicos, fotográficos y de salud recabados en consulta se destinan exclusivamente a tu diagnóstico odontológico, planificación terapéutica y facturación médica, protegidos bajo estricto secreto profesional conforme a la Ordem dos Médicos Dentistas (OMD) y la Entidade Reguladora da Saúde (ERS).',
      },
      {
        heading: '04. Tus derechos en todo momento',
        body: 'Puedes solicitar en cualquier instante el acceso, rectificación o supresión de tus datos de contacto de forma sencilla escribiendo a clinicasmod@gmail.com o directamente en nuestra recepción.',
      },
    ],
  },
  en: {
    eyebrow: 'MEDICAL SECRECY & RESPECT FOR YOUR TRUST',
    title: 'Privacy Policy',
    subtitle: 'We safeguard your personal information with the same ethical care we bring to your clinical health — GDPR (EU 2016/679).',
    closeAria: 'Close privacy policy',
    closeBtn: 'Understood',
    sections: [
      {
        heading: '01. Data Controller & Clinical Direction',
        body: 'Clínica Santa Maria dos Olivais, located at Estrada de Moscavide N 32C, 1800-279 Lisbon, under the clinical direction of Dr. Ana Mata (direct contact: clinicasmod@gmail.com · +351 300 601 645).',
      },
      {
        heading: '02. Tracker-Free Browsing & Direct Human Contact',
        body: 'This website uses zero advertising cookies and never stores your booking form entries in an external web database. Submitting a request simply prepares a message on your own WhatsApp so you can speak directly with our reception team.',
      },
      {
        heading: '03. Clinical Records & Healthcare Confidentiality',
        body: 'Diagnostic imaging, clinical photographs and health records gathered in person are used strictly for your dental diagnosis, treatment planning and medical invoicing under the professional secrecy standards of the Portuguese Dental Association (OMD) and Health Regulatory Authority (ERS).',
      },
      {
        heading: '04. Your Rights, Simply Exercised',
        body: 'You may request access, correction, portability or deletion of your contact information at any time by writing to clinicasmod@gmail.com or speaking with our reception desk.',
      },
    ],
  },
  fr: {
    eyebrow: 'SECRET MÉDICAL & RESPECT DE VOTRE CONFIANCE',
    title: 'Politique de Confidentialité',
    subtitle: 'Nous protégeons vos données personnelles avec la même exigence éthique que votre santé — RGPD (UE 2016/679).',
    closeAria: 'Fermer la politique de confidentialité',
    closeBtn: 'Compris',
    sections: [
      {
        heading: '01. Responsable du traitement médical',
        body: 'Clínica Santa Maria dos Olivais, située Estrada de Moscavide N 32C, 1800-279 Lisbonne, sous la direction clinique de la Dre Ana Mata (clinicasmod@gmail.com · +351 300 601 645).',
      },
      {
        heading: '02. Navigation saine et contact humain direct',
        body: 'Ce site n’utilise aucun traceur publicitaire et ne stocke aucune donnée du formulaire sur un serveur externe. Votre demande prépare simplement votre message dans WhatsApp afin d’échanger directement avec notre accueil.',
      },
      {
        heading: '03. Dossier clinique et secret professionnel',
        body: 'Les examens radiologiques et données médicales recueillis au cabinet servent exclusivement à votre diagnostic bucco-dentaire, à votre plan de soins et à la facturation médicale, sous le sceau du secret professionnel (OMD / ERS).',
      },
      {
        heading: '04. Vos droits à tout moment',
        body: 'Vous pouvez demander l’accès, la rectification ou la suppression de vos coordonnées à tout instant par e-mail à clinicasmod@gmail.com ou auprès de notre réception.',
      },
    ],
  },
  de: {
    eyebrow: 'ÄRZTLICHE SCHWEIGEPFLICHT & VERTRAUENSSCHUTZ',
    title: 'Datenschutzerklärung',
    subtitle: 'Wir schützen Ihre persönlichen Daten mit derselben Sorgfalt, mit der wir Ihre Zahngesundheit betreuen — DSGVO (EU 2016/679).',
    closeAria: 'Datenschutzerklärung schließen',
    closeBtn: 'Verstanden',
    sections: [
      {
        heading: '01. Verantwortliche ärztliche Leitung',
        body: 'Clínica Santa Maria dos Olivais, Estrada de Moscavide N 32C, 1800-279 Lissabon, unter der ärztlichen Leitung von Dr. Ana Mata (clinicasmod@gmail.com · +351 300 601 645).',
      },
      {
        heading: '02. Werbefreie Nutzung & direkter Kontakt',
        body: 'Diese Website setzt keine Werbe-Tracker ein und speichert Ihre Formulareingaben auf keinem externen Server. Beim Absenden wird lediglich Ihre Nachricht in WhatsApp für den direkten Kontakt mit unserem Empfang vorbereitet.',
      },
      {
        heading: '03. Patientenakte & ärztliche Schweigepflicht',
        body: 'Alle in der Klinik erhobenen Röntgen- und Gesundheitsdaten dienen ausschließlich Ihrer zahnmedizinischen Diagnostik, Behandlungsplanung und Abrechnung gemäß den Berufsregeln der OMD und ERS.',
      },
      {
        heading: '04. Ihre Rechte als Patient',
        body: 'Auskunft, Berichtigung oder Löschung Ihrer Kontaktdaten können Sie jederzeit unkompliziert per E-Mail an clinicasmod@gmail.com oder persönlich am Empfang veranlassen.',
      },
    ],
  },
  it: {
    eyebrow: 'SEGRETO MEDICO & RISPETTO DELLA TUA FIDUCIA',
    title: 'Informativa sulla Privacy',
    subtitle: 'Tuteliamo i tuoi dati personali con la stessa etica medica con cui ci prendiamo cura del tuo sorriso — GDPR (UE 2016/679).',
    closeAria: 'Chiudi informativa sulla privacy',
    closeBtn: 'Ho capito',
    sections: [
      {
        heading: '01. Titolare del trattamento clinico',
        body: 'Clínica Santa Maria dos Olivais, Estrada de Moscavide N 32C, 1800-279 Lisbona, sotto la direzione clinica della Dott.ssa Ana Mata (clinicasmod@gmail.com · +351 300 601 645).',
      },
      {
        heading: '02. Navigazione pulita e contatto umano diretto',
        body: 'Questo sito non impiega traccianti pubblicitari né archivia su server esterni i dati scritti nel modulo. La richiesta prepara semplicemente il messaggio sul tuo WhatsApp per parlare direttamente con la nostra segreteria.',
      },
      {
        heading: '03. Cartella clinica e segreto professionale',
        body: 'I dati radiografici e sanitari raccolti di persona in clinica sono destinati esclusivamente alla diagnosi odontoiatrica, al piano terapeutico e alla fatturazione sanitaria, protetti dal segreto professionale (OMD / ERS).',
      },
      {
        heading: '04. I tuoi diritti sempre garantiti',
        body: 'Puoi richiedere in qualsiasi momento l’accesso, la modifica o la cancellazione dei tuoi recapiti scrivendo a clinicasmod@gmail.com o rivolgendoti alla reception.',
      },
    ],
  },
};

export default function PrivacyPolicyModal({
  isOpen,
  onClose,
  locale = 'pt',
}: PrivacyPolicyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copy = PRIVACY_COPY[locale] || PRIVACY_COPY.pt;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-[115] flex items-center justify-center p-4 sm:p-6 bg-[#14161a]/65 backdrop-blur-md animate-fade-in-up"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl max-h-[86svh] flex flex-col bg-paper text-ink rounded-3xl shadow-[0_6px_14px_rgba(24,28,74,0.12),0_24px_56px_-12px_rgba(24,28,74,0.28)] border border-rule overflow-hidden">
        <div className="p-5 sm:p-7 pb-4 sm:pb-5 border-b border-rule flex items-start justify-between gap-4 shrink-0">
          <div className="text-left">
            <p className="eyebrow text-muted mb-1">{copy.eyebrow}</p>
            <h2 id="privacy-modal-title" className="font-serif text-2xl sm:text-3xl text-ink font-normal leading-tight">
              {copy.title}
            </h2>
            <p className="text-xs sm:text-[13px] text-muted mt-1 leading-relaxed">
              {copy.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.closeAria}
            className="w-11 h-11 rounded-full bg-stone hover:bg-clinic-navy text-ink hover:text-white transition-colors duration-150 flex items-center justify-center shrink-0 cursor-pointer border border-rule"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-5 text-left">
          {copy.sections.map((sec) => (
            <div key={sec.heading} className="space-y-1.5">
              <h3 className="font-serif text-base sm:text-lg text-ink font-medium leading-snug">
                {sec.heading}
              </h3>
              <p className="text-[13.5px] sm:text-sm text-muted leading-relaxed">
                {sec.body}
              </p>
            </div>
          ))}
        </div>

        <div className="p-4 sm:p-6 bg-stone/70 border-t border-rule flex items-center justify-end shrink-0">
          <LiquidButton
            type="button"
            variant="primary"
            onClick={onClose}
            className="!px-6 !py-2.5 !text-xs !font-semibold min-h-[44px]"
          >
            <span>{copy.closeBtn}</span>
          </LiquidButton>
        </div>
      </div>
    </div>
  );
}
