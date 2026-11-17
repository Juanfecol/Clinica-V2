import { useEffect, useState, useRef } from 'react';
import { AnimatedCounter } from './components/AnimatedCounter';
import { LiquidButton, LiquidCard } from './components/LiquidGlass';
import PriceListModal from './components/PriceListModal';
import ChatbotModal from './components/ChatbotModal';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import ModularReveal from './components/ModularReveal';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Mail,
  ArrowUpRight,
  ArrowUp,
  CheckCircle2,
  Calendar,
  ShieldCheck,
} from 'lucide-react';
import { GOOGLE_REVIEWS } from './data/reviewsData';
import {
  clampValue,
  getNextReviewIndex,
  getPrevReviewIndex,
} from './utils/booking';
import { initAttributionTracker, getStoredAttribution } from './utils/attribution';
import {
  trackLeadConversion,
  trackWhatsAppClick,
  acceptCookies,
  getEstimatedLeadValue,
} from './utils/metaGoogleTracking';
import { detectDeviceLocale, useDeviceLocale } from './i18n/types';
import { SITE_TRANSLATIONS } from './i18n/siteTranslations';

interface TreatmentData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  img: string;
  caption: string;
  description: string;
  benefits: string[];
  duration: string;
}

const TREATMENTS: TreatmentData[] = [
  {
    id: 'Implantologia',
    number: '01',
    title: 'Implantologia',
    subtitle: 'Implantes em titânio grau médico, carga imediata e cirurgia guiada',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/implantologia_clinia_santa_maria_dos_olivais.JPG',
    caption: 'Dentes fixos, função mastigatória e segurança natural ao sorrir.',
    description:
      'A ausência dentária afeta muito mais do que a estética: compromete a mastigação, a dicção e a autoconfiança. Realizamos reabilitação oral fixa com implantes biocompatíveis de osteointegração certificada, planeados em 3D para uma intervenção segura, minimamente invasiva e com recuperação serena.',
    benefits: [
      'Carga imediata fixa em 24h',
      'Cirurgia guiada 3D sem dor',
      'Preservação óssea e gengival',
    ],
    duration: '1 a 3 etapas clínicas · Pagamento faseado disponível',
  },
  {
    id: 'Ortodontia invisível',
    number: '02',
    title: 'Ortodontia invisível',
    subtitle: 'Alinhadores transparentes removíveis e aparelhos ortodônticos de precisão',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Invisible_orthodontics_custom_cl%E2%80%A6_5d7d5c94_4K.jpg',
    caption: 'Alinhadores transparentes e discretos, desenhados à medida da sua rotina.',
    description:
      'Um sorriso alinhado protege as gengivas, melhora a mastigação e equilibra a articulação temporomandibular. Através de estudo ortodôntico digital com alinhadores invisíveis (Invisalign / Spark) ou ortodontia fixa, corrigimos o posicionamento dentário com conforto e previsibilidade clínica.',
    benefits: [
      'Alinhadores discretos e removíveis',
      'Estudo cefalométrico e digital',
      'Equilíbrio articular e estético',
    ],
    duration: '6 a 18 meses · Estudo ortodôntico personalizado',
  },
  {
    id: 'Estética dentária',
    number: '03',
    title: 'Estética dentária',
    subtitle: 'Facetas em cerâmica pura, design digital do sorriso e dentisteria biomimética',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/estetica_dentaria_clinica_santa_maria_dos_olivais.jpg',
    caption: 'Facetas e reabilitação estética natural, em perfeita harmonia com o seu rosto.',
    description:
      'Acreditamos numa estética natural e fiel à sua expressão. Desenhamos facetas cerâmicas ultrafinas e restaurações estéticas estratificadas que corrigem cor, forma e pequenos desgastes preservando ao máximo a estrutura saudável do seu esmalte natural.',
    benefits: [
      'Cerâmica pura de brilho natural',
      'Mínimo desgaste dentário',
      'Estudo personalizado do rosto',
    ],
    duration: '2 a 3 consultas · Harmonia e naturalidade clínica',
  },
  {
    id: 'Branqueamento',
    number: '04',
    title: 'Branqueamento',
    subtitle: 'Clareamento dentário médico seguro em consultório ou ambulatório supervisionado',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Branqueamento_clinica_santa_maria_dos_olivais.jpg',
    caption: 'Luminosidade clínica segura, preservando a integridade e saúde do esmalte.',
    description:
      'Realizado exclusivamente sob supervisão médico-dentária, o nosso protocolo de branqueamento clínico utiliza géis certificados com agentes dessensibilizantes que removem pigmentações profundas, protegendo a integridade do esmalte e a saúde das gengivas.',
    benefits: [
      'Proteção integral do esmalte',
      'Luminosidade desde a 1.ª sessão',
      'Controlo clínico da sensibilidade',
    ],
    duration: '1 sessão em consultório ou kit médico personalizado',
  },
  {
    id: 'Endodontia',
    number: '05',
    title: 'Endodontia',
    subtitle: 'Alívio imediato da dor dentária aguda e conservação do dente natural',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/endodontia_clinica_santa_maria_dos_olivais.jpg',
    caption: 'Alívio imediato da dor e conservação biológica do seu dente natural.',
    description:
      'Quando surge dor de dentes intensa, sensibilidade aguda ou infeção pulpar, a nossa prioridade é devolver-lhe tranquilidade imediata sob anestesia eficaz. Com instrumentação endodôntica mecanizada e radiovisiografia digital, desinfetamos e selamos os canais para salvar o seu dente.',
    benefits: [
      'Alívio imediato e sem dor',
      'Conservação do dente natural',
      'Radiovisiografia digital precisa',
    ],
    duration: '1 a 2 consultas · Atendimento prioritário de dor',
  },
  {
    id: 'Próteses',
    number: '06',
    title: 'Próteses',
    subtitle: 'Próteses fixas, coroas cerâmicas sem metal, próteses flexíveis e reparações',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/prosteticos_clinica_santa_maria_dos_olivais.jpg',
    caption: 'Conforto, estabilidade e estética natural para falar, mastigar e sorrir.',
    description:
      'Reabilitamos dentes fragilizados ou ausentes com coroas em zircónia monolítica de alta resistência, próteses esqueléticas leves ou próteses removíveis flexíveis biocompatíveis sem ganchos metálicos visíveis, ajustadas rigorosamente à sua oclusão.',
    benefits: [
      'Conforto firme ao mastigar',
      'Opções sem ganchos metálicos',
      'Reparações e ajustes rápidos',
    ],
    duration: '2 a 4 consultas · Ajuste anatómico e funcional',
  },
  {
    id: 'Cirurgia Oral',
    number: '07',
    title: 'Cirurgia Oral',
    subtitle: 'Extração atraumática de sisos inclusos, quistos e regeneração óssea guiada',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Cirurgia_oral_sisos_clinica_santa_maria_dos_olivais.jpg',
    caption: 'Extração de sisos e cirurgia oral com planeamento rigoroso e mãos serenas.',
    description:
      'Sabemos que a extração de um dente do siso gera apreensão natural. Por isso, aplicamos protocolos cirúrgicos atraumáticos sob anestesia local profunda, planeamento radiológico prévio e acompanhamento pós-operatório próximo para uma cicatrização rápida e confortável.',
    benefits: [
      'Técnica cirúrgica delicada',
      'Pós-operatório acompanhado',
      'Planeamento radiológico seguro',
    ],
    duration: '1 intervenção + consulta de revisão incluída',
  },
  {
    id: 'Medicina dentária geral',
    number: '08',
    title: 'Medicina dentária geral',
    subtitle: 'Destartarização ultrassónica, tratamento de gengivas, cáries e goteiras de relaxamento',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Medicina%20_denta%CC%81ria_geral_clinica_santa_maria_dos_olivais.jpg',
    caption: 'Rotina, higiene oral e prevenção. A base de tudo o resto.',
    description:
      'A saúde de todo o sorriso nasce de gengivas sãs e de uma mordida equilibrada. Realizamos limpeza dentária profissional (destartarização ultrassónica e polimento), tratamento da gengivite e periodontite, restaurações invisíveis e goteiras oclusais rígidas para bruxismo.',
    benefits: [
      'Destartarização suave sem dor',
      'Saúde gengival e hálito fresco',
      'Alívio da tensão do bruxismo',
    ],
    duration: 'Check-up e profilaxia recomendados a cada 6 meses',
  },
  {
    id: 'Odontopediatria',
    number: '09',
    title: 'Odontopediatria',
    subtitle: 'Prevenção de cáries, selantes, flúor e consultas pediátricas humanizadas',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Odontopediatria_clinica_santa_maria_dos_olivais.jpg',
    caption: 'Cuidado próximo e preventivo para que as crianças cresçam a sorrir sem medo.',
    description:
      'Transformamos a visita ao dentista numa experiência positiva e educativa. Acompanhamos os dentes de leite e definitivos desde o primeiro ano de vida, prevenindo cáries com selantes de fissuras e orientando o desenvolvimento saudável dos maxilares sem qualquer trauma.',
    benefits: [
      'Adaptação lúdica e afetuosa',
      'Selantes de fissuras e flúor',
      'Crescimento saudável dos maxilares',
    ],
    duration: 'Acompanhamento preventivo desde o 1.º ano de vida',
  },
];

interface TeamMember {
  id: string;
  name: string;
  role: string;
  omd: string;
  specialty?: string;
  img: string;
  imagePosition?: string;
  scale?: number;
  transformOrigin?: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Dra. Ana Mata',
    role: 'Diretora Clínica · Implantologia & Reabilitação Oral Avançada (OMD)',
    omd: 'Médica Dentista · OMD',
    specialty: 'Dedicação próxima em implantes de titânio, carga imediata e reabilitação integral do sorriso',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/dra_ana_mata_2026.JPG',
    imagePosition: '50% 12%',
  },
  {
    id: 'team-2',
    name: 'Dra. Mariana Aberto',
    role: 'Ortodontia Corretiva & Alinhadores Invisíveis Invisalign / Spark (OMD)',
    omd: 'Médica Dentista · OMD',
    specialty: 'Correção funcional da oclusão e harmonia do sorriso em jovens e adultos',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-132.jpeg',
    imagePosition: '64% 0%',
  },
  {
    id: 'team-3',
    name: 'Dra. Alexandra Lucas',
    role: 'Periodontologia, Saúde Gengival & Manutenção Preventiva (OMD)',
    omd: 'Médica Dentista · OMD',
    specialty: 'Tratamento delicado da gengivite, periodontite e preservação do suporte ósseo natural',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-67.jpeg',
    imagePosition: '50% 0%',
  },
  {
    id: 'team-4',
    name: 'Dra. Orizanda Claret',
    role: 'Odontopediatria Humanizada & Prevenção Infantil (OMD)',
    omd: 'Médica Dentista · OMD',
    specialty: 'Consultas pacientes e lúdicas para que cada criança cresça confiante e sem medo',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-51.jpeg',
    imagePosition: '50% 0%',
  },
  {
    id: 'team-5',
    name: 'Dr. Tomás Machado',
    role: 'Dentisteria Biomimética, Endodontia & Reabilitação Oral (OMD)',
    omd: 'Médico Dentista · OMD',
    specialty: 'Conservação de dentes naturais, endodontia sem dor e estética conservadora',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-227.jpeg',
    imagePosition: '50% 6%',
  },
  {
    id: 'team-6',
    name: 'Dr. Júlio',
    role: 'Cirurgia Oral Avançada, Dentes do Siso Inclusos & Regeneração Óssea (OMD)',
    omd: 'Médico Dentista · OMD',
    specialty: 'Mãos tranquilas em terceiros molares inclusos, cirurgia oral e regeneração óssea',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/dr_julio_clinica_smo.jpg',
    imagePosition: '50% 0%',
    scale: 1.06,
    transformOrigin: '50% 15%',
  },
  {
    id: 'team-7',
    name: 'Dr. Francisco',
    role: 'Medicina Dentária Conservadora, Endodontia & Próteses (OMD)',
    omd: 'Médico Dentista · OMD',
    specialty: 'Alívio da dor, reabilitação protética confortável e coroas cerâmicas',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/dra_francisco.jpeg',
    imagePosition: '50% 0%',
    scale: 1.08,
    transformOrigin: '50% 15%',
  },
  {
    id: 'team-8',
    name: 'Dra. Ladine',
    role: 'Medicina Dentária Geral, Próteses & Reabilitação Funcional (OMD)',
    omd: 'Médica Dentista · OMD',
    specialty: 'Prevenção, higiene oral ultrassónica, próteses confortáveis, branqueamento e goteiras de bruxismo',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/dra_ladine_clinica_santa_maria_dos_olivais.jpeg',
    imagePosition: '50% 4%',
    scale: 1.06,
    transformOrigin: '50% 15%',
  },
  {
    id: 'team-carla',
    name: 'Carla Claro',
    role: 'Acolhimento ao Paciente, Gestão de Marcações & Apoio Familiar',
    omd: '',
    specialty: 'O primeiro sorriso que o recebe, coordena horários e apoia toda a sua família',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-94.jpeg',
    imagePosition: '50% 0%',
  },
];

interface ClinicaSpace {
  num: string;
  title: string;
  subtitle: string;
  src: string;
}

const CLINICA_SPACES: ClinicaSpace[] = [
  {
    num: '01',
    title: 'Receção',
    subtitle: '',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_1.jpeg',
  },
  {
    num: '02',
    title: 'Planeamento Clínico',
    subtitle: '',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_2.jpeg',
  },
  {
    num: '03',
    title: 'Diagnóstico Digital',
    subtitle: '',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_3.jpeg',
  },
  {
    num: '04',
    title: 'Odontopediatria',
    subtitle: '',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_4.jpeg',
  },
  {
    num: '05',
    title: 'Sala de Espera',
    subtitle: '',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_5.png',
  },
  {
    num: '06',
    title: 'Central de Esterilização',
    subtitle: '',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_6.jpeg',
  },
  {
    num: '07',
    title: 'Implantologia e Reabilitação',
    subtitle: '',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_7.jpeg',
  },
  {
    num: '08',
    title: 'Gabinete de Cirurgia Oral',
    subtitle: '',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_8.jpeg',
  },
  {
    num: '09',
    title: 'Ortodontia e Alinhadores',
    subtitle: '',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_9.jpeg',
  },
];

const REVIEWS = GOOGLE_REVIEWS;

export default function App() {
  const initialLocale = detectDeviceLocale();
  const locale = useDeviceLocale(
    SITE_TRANSLATIONS[initialLocale].meta.title,
    SITE_TRANSLATIONS[initialLocale].meta.description
  );
  const tr = SITE_TRANSLATIONS[locale];

  // Keep <title> and <meta name="description"> synchronized if device language changes live
  useEffect(() => {
    document.title = tr.meta.title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute('content', tr.meta.description);
    }
  }, [tr.meta.title, tr.meta.description]);

  // First-Party Attribution Tracker (UTM, fbclid, gclid, gbraid, wbraid, _fbp, _fbc, referrer)
  useEffect(() => {
    initAttributionTracker();
    // Expose acceptCookies globally so any external consent trigger can invoke it without altering UI
    (window as unknown as { acceptCookies?: () => void }).acceptCookies = acceptCookies;
  }, []);

  // Booking state for background GoHighLevel + Meta/Google Ads lead capture
  const [bookingName] = useState<string>('');
  const [bookingPhone] = useState<string>('');
  const [bookingTreatment, setBookingTreatment] = useState<string>('Implantologia');
  const [bookingDay] = useState<string>('');
  const [bookingTime] = useState<string>('');

  // Navigation header state (only updates on discrete theme boundary crossings)
  const [headerTheme, setHeaderTheme] = useState<'transparent' | 'dark' | 'light'>('transparent');
  const headerThemeRef = useRef<'transparent' | 'dark' | 'light'>('transparent');

  // Hero scrollytelling refs & discrete step indicator
  const [heroStep, setHeroStep] = useState<'01' | '02' | '03'>('01');
  const heroStepRef = useRef<'01' | '02' | '03'>('01');
  const heroScrollLabelRef = useRef<HTMLSpanElement>(null);
  const beat1Ref = useRef<HTMLDivElement>(null);
  const beat2Ref = useRef<HTMLDivElement>(null);
  const beat3Ref = useRef<HTMLDivElement>(null);

  // Manifesto word scrub direct DOM refs (synced with localized word count)
  const manifestoWords = tr.manifesto.text.split(/\s+/);
  const manifestoWordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const manifestoWordCountRef = useRef<number>(manifestoWords.length);
  manifestoWordCountRef.current = manifestoWords.length;

  // Consulta vertical spine direct DOM ref & discrete chapter states
  const consultaLineRef = useRef<HTMLDivElement>(null);
  const [step2Active, setStep2Active] = useState<boolean>(false);
  const step2ActiveRef = useRef<boolean>(false);
  const [step3Active, setStep3Active] = useState<boolean>(false);
  const step3ActiveRef = useRef<boolean>(false);
  const [focusedConsultaStep, setFocusedConsultaStep] = useState<number | null>(null);

  // Banner 3D video proximity loading & playback control
  const bannerSectionRef = useRef<HTMLElement>(null);
  const bannerVideoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadBannerVideo, setShouldLoadBannerVideo] = useState<boolean>(false);

  // Clinica horizontal track direct DOM refs & discrete counter (01..09)
  const clinicaSectionRef = useRef<HTMLElement>(null);
  const clinicaStickyRef = useRef<HTMLDivElement>(null);
  const clinicaTrackRef = useRef<HTMLDivElement>(null);
  const clinicaProgressBarRef = useRef<HTMLDivElement>(null);
  const [clinicaStepNum, setClinicaStepNum] = useState<number>(1);
  const clinicaStepRef = useRef<number>(1);
  const [shouldPreloadClinica, setShouldPreloadClinica] = useState<boolean>(false);

  // Tratamentos editorial list active index (0..8), floating drawer refs, mobile 9:16 Reel carousel & image preloading
  const tratamentosSectionRef = useRef<HTMLElement>(null);
  const treatmentsCarouselRef = useRef<HTMLDivElement>(null);
  const treatmentsScrollRafRef = useRef<number | null>(null);
  const treatmentsRightColRef = useRef<HTMLDivElement>(null);
  const treatmentsFloatingCardRef = useRef<HTMLDivElement>(null);
  const treatmentRowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeTreatmentIdxRef = useRef<number>(0);
  const lastTreatmentPointerYRef = useRef<number | null>(null);
  const [activeTreatmentIdx, setActiveTreatmentIdx] = useState<number>(0);
  const [canScrollTreatmentsLeft, setCanScrollTreatmentsLeft] = useState<boolean>(false);
  const [canScrollTreatmentsRight, setCanScrollTreatmentsRight] = useState<boolean>(true);
  const [treatmentsScrollProgress, setTreatmentsScrollProgress] = useState<number>(0);
  const [shouldPreloadTreatments, setShouldPreloadTreatments] = useState<boolean>(false);

  activeTreatmentIdxRef.current = activeTreatmentIdx;

  const syncTreatmentFloatingCard = (targetIdx?: number, pointerClientY?: number | null) => {
    const rightCol = treatmentsRightColRef.current;
    const cardEl = treatmentsFloatingCardRef.current;
    if (!rightCol || !cardEl) return;

    if (window.innerWidth < 1024) {
      cardEl.style.transform = 'translate3d(0, 0, 0)';
      return;
    }

    const colRect = rightCol.getBoundingClientRect();
    const colHeight = rightCol.offsetHeight;
    const cardHeight = cardEl.offsetHeight;
    const maxColY = Math.max(0, colHeight - cardHeight);

    const idx = typeof targetIdx === 'number' ? targetIdx : activeTreatmentIdxRef.current;
    const rowEl = treatmentRowRefs.current[idx];

    const topSafeOffset = 104;
    const bottomSafeOffset = 28;
    const centeredViewportTop = Math.max(
      topSafeOffset,
      (window.innerHeight - cardHeight) * 0.5
    );

    // Base position accompanies the viewport scroll across the full height of the section
    let idealY = centeredViewportTop - colRect.top;

    if (typeof pointerClientY === 'number') {
      const pointerTargetY = pointerClientY - colRect.top - cardHeight * 0.48;
      idealY = idealY * 0.65 + pointerTargetY * 0.35;
    } else if (rowEl) {
      const rowRect = rowEl.getBoundingClientRect();
      const rowTargetY = rowRect.top - colRect.top + rowRect.height * 0.5 - cardHeight * 0.48;
      idealY = idealY * 0.7 + rowTargetY * 0.3;
    }

    // Clamp to visible screen viewport so the Reel widget always accompanies the user in view
    const viewportMinY = -colRect.top + topSafeOffset;
    const viewportMaxY = window.innerHeight - colRect.top - cardHeight - bottomSafeOffset;

    if (viewportMaxY >= viewportMinY) {
      idealY = clampValue(idealY, viewportMinY, viewportMaxY);
    } else {
      idealY = viewportMinY;
    }

    const finalY = clampValue(idealY, 0, maxColY);
    cardEl.style.transform = `translate3d(0, ${finalY.toFixed(1)}px, 0)`;
  };

  const handleTreatmentPointerFollow = (clientY: number, explicitIdx?: number) => {
    lastTreatmentPointerYRef.current = clientY;
    let resolvedIdx = explicitIdx;

    if (typeof resolvedIdx !== 'number') {
      let closestIdx = activeTreatmentIdxRef.current;
      let minDist = Infinity;
      treatmentRowRefs.current.forEach((rowEl, idx) => {
        if (!rowEl) return;
        const rect = rowEl.getBoundingClientRect();
        if (clientY >= rect.top && clientY <= rect.bottom) {
          closestIdx = idx;
          minDist = 0;
        } else if (minDist > 0) {
          const center = rect.top + rect.height / 2;
          const dist = Math.abs(clientY - center);
          if (dist < minDist) {
            minDist = dist;
            closestIdx = idx;
          }
        }
      });
      resolvedIdx = closestIdx;
    }

    if (resolvedIdx !== activeTreatmentIdxRef.current) {
      activeTreatmentIdxRef.current = resolvedIdx;
      setActiveTreatmentIdx(resolvedIdx);
    }

    syncTreatmentFloatingCard(resolvedIdx, clientY);
  };

  useEffect(() => {
    const sectionEl = tratamentosSectionRef.current;
    if (!sectionEl) return;

    const preloadObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldPreloadTreatments(true);
          preloadObs.disconnect();
        }
      },
      { rootMargin: '900px 0px' }
    );

    preloadObs.observe(sectionEl);

    const rightCol = treatmentsRightColRef.current;
    let resizeObs: ResizeObserver | null = null;
    if (rightCol && typeof ResizeObserver !== 'undefined') {
      resizeObs = new ResizeObserver(() => {
        syncTreatmentFloatingCard(
          activeTreatmentIdxRef.current,
          lastTreatmentPointerYRef.current
        );
      });
      resizeObs.observe(rightCol);
    }

    const onWindowScrollOrResize = () => {
      if (window.innerWidth < 1024) return;
      const rightColEl = treatmentsRightColRef.current;
      if (!rightColEl) return;
      const rect = rightColEl.getBoundingClientRect();
      if (rect.bottom < -150 || rect.top > window.innerHeight + 150) return;

      // Clear stale pointer Y on scroll so the widget smoothly accompanies the page scroll
      lastTreatmentPointerYRef.current = null;

      const probeY = window.innerHeight * 0.45;
      let closestIdx = activeTreatmentIdxRef.current;
      let minDistance = Infinity;

      treatmentRowRefs.current.forEach((rowEl, idx) => {
        if (!rowEl) return;
        const r = rowEl.getBoundingClientRect();
        const rowCenter = r.top + r.height / 2;
        const dist = Math.abs(rowCenter - probeY);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      if (
        closestIdx !== activeTreatmentIdxRef.current &&
        rect.top < window.innerHeight * 0.7 &&
        rect.bottom > window.innerHeight * 0.25
      ) {
        activeTreatmentIdxRef.current = closestIdx;
        setActiveTreatmentIdx(closestIdx);
      }

      syncTreatmentFloatingCard(activeTreatmentIdxRef.current, null);
    };

    window.addEventListener('scroll', onWindowScrollOrResize, { passive: true });
    window.addEventListener('resize', onWindowScrollOrResize, { passive: true });
    syncTreatmentFloatingCard(0, null);

    return () => {
      preloadObs.disconnect();
      if (resizeObs) resizeObs.disconnect();
      window.removeEventListener('scroll', onWindowScrollOrResize);
      window.removeEventListener('resize', onWindowScrollOrResize);
      if (treatmentsScrollRafRef.current) {
        cancelAnimationFrame(treatmentsScrollRafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      syncTreatmentFloatingCard(
        activeTreatmentIdx,
        lastTreatmentPointerYRef.current
      );
    });
    return () => cancelAnimationFrame(id);
  }, [activeTreatmentIdx]);

  const updateTreatmentsCarouselState = () => {
    const container = treatmentsCarouselRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScroll = Math.max(0, scrollWidth - clientWidth);

    setCanScrollTreatmentsLeft(scrollLeft > 10);
    setCanScrollTreatmentsRight(scrollLeft < maxScroll - 10);
    if (maxScroll > 0) {
      setTreatmentsScrollProgress(Math.min(1, Math.max(0, scrollLeft / maxScroll)));
    }

    if (scrollLeft <= 14) {
      setActiveTreatmentIdx((prev) => (prev !== 0 ? 0 : prev));
      return;
    }
    if (maxScroll > 0 && scrollLeft >= maxScroll - 14) {
      const lastIdx = TREATMENTS.length - 1;
      setActiveTreatmentIdx((prev) => (prev !== lastIdx ? lastIdx : prev));
      return;
    }

    const viewportCenter = scrollLeft + clientWidth / 2;
    const cards = container.querySelectorAll<HTMLElement>('[data-treatment-card-idx]');
    let closestIdx = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - viewportCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    setActiveTreatmentIdx((prev) => (prev !== closestIdx ? closestIdx : prev));
  };

  const checkTreatmentsScroll = () => {
    if (treatmentsScrollRafRef.current !== null) return;
    treatmentsScrollRafRef.current = requestAnimationFrame(() => {
      updateTreatmentsCarouselState();
      treatmentsScrollRafRef.current = null;
    });
  };

  const scrollToTreatmentCard = (targetIdx: number) => {
    const container = treatmentsCarouselRef.current;
    if (!container) return;
    const clampedIdx = clampValue(targetIdx, 0, TREATMENTS.length - 1);
    const targetCard = container.querySelector<HTMLElement>(
      `[data-treatment-card-idx="${clampedIdx}"]`
    );
    if (targetCard) {
      const targetLeft =
        clampedIdx === 0
          ? 0
          : targetCard.offsetLeft - (container.clientWidth - targetCard.offsetWidth) / 2;
      container.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
      setActiveTreatmentIdx(clampedIdx);
    }
  };

  const scrollTreatmentsLeft = () => {
    scrollToTreatmentCard(activeTreatmentIdx - 1);
  };

  const scrollTreatmentsRight = () => {
    scrollToTreatmentCard(activeTreatmentIdx + 1);
  };

  // Horizontal touch drag sync for sticky #clinica on mobile
  useEffect(() => {
    const stickyEl = clinicaStickyRef.current;
    if (!stickyEl) return;

    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lockAxis: 'none' | 'x' | 'y' = 'none';

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      lastX = startX;
      lockAxis = 'none';
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;

      if (lockAxis === 'none') {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        lockAxis = Math.abs(dx) > Math.abs(dy) * 1.15 ? 'x' : 'y';
      }

      if (lockAxis === 'x') {
        const clinicaEl = document.getElementById('clinica');
        const trackEl = clinicaTrackRef.current;
        if (!clinicaEl || !trackEl) return;

        const clRect = clinicaEl.getBoundingClientRect();
        const stickyH = stickyEl.offsetHeight || window.innerHeight;
        const clScrollable = Math.max(1, clinicaEl.offsetHeight - stickyH);
        const clProg = clampValue(-clRect.top / clScrollable, 0, 1);

        const stepX = lastX - touch.clientX;
        lastX = touch.clientX;

        const isPinned = clRect.top <= 8 && clRect.bottom >= stickyH - 8;
        const canAdvance = (stepX > 0 && clProg < 0.998) || (stepX < 0 && clProg > 0.002);

        if (isPinned && canAdvance) {
          e.preventDefault();
          const maxTranslateX = Math.max(1, trackEl.scrollWidth - clinicaEl.clientWidth);
          const scrollDeltaY = stepX * (clScrollable / maxTranslateX);
          window.scrollBy(0, scrollDeltaY);
        }
      }
    };

    stickyEl.addEventListener('touchstart', onTouchStart, { passive: true });
    stickyEl.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      stickyEl.removeEventListener('touchstart', onTouchStart);
      stickyEl.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  // Review carousel state
  const [reviewIdx, setReviewIdx] = useState<number>(0);
  const [reviewAnimate, setReviewAnimate] = useState<boolean>(true);
  const [isReviewPaused, setIsReviewPaused] = useState<boolean>(false);

  const safeReviewIdx = REVIEWS.length > 0 ? reviewIdx % REVIEWS.length : 0;
  const currentReview = REVIEWS[safeReviewIdx] || REVIEWS[0];

  // Automatic continuous rotation of Google Reviews
  useEffect(() => {
    if (isReviewPaused || REVIEWS.length <= 1) return;

    const interval = setInterval(() => {
      setReviewAnimate(false);
      setTimeout(() => {
        setReviewIdx((prev) => (prev + 1) % REVIEWS.length);
        setReviewAnimate(true);
      }, 220);
    }, 5000);

    return () => clearInterval(interval);
  }, [isReviewPaused]);

  // Team carousel state & mobile foreground B&W-to-color tracking
  const equipaSectionRef = useRef<HTMLElement>(null);
  const teamScrollRef = useRef<HTMLDivElement>(null);
  const teamScrollRafRef = useRef<number | null>(null);
  const [canScrollTeamLeft, setCanScrollTeamLeft] = useState<boolean>(false);
  const [canScrollTeamRight, setCanScrollTeamRight] = useState<boolean>(true);
  const [teamScrollProgress, setTeamScrollProgress] = useState<number>(0);
  const [activeTeamIdx, setActiveTeamIdx] = useState<number>(0);
  const [isEquipaInView, setIsEquipaInView] = useState<boolean>(false);
  const [shouldPreloadEquipa, setShouldPreloadEquipa] = useState<boolean>(false);

  useEffect(() => {
    const sectionEl = equipaSectionRef.current;
    if (!sectionEl) return;

    let revealTimer: number | null = null;

    const preloadObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldPreloadEquipa(true);
          preloadObs.disconnect();
        }
      },
      { rootMargin: '800px 0px' }
    );

    const viewObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealTimer = window.setTimeout(() => {
            setIsEquipaInView(true);
          }, 120);
        } else {
          if (revealTimer) {
            clearTimeout(revealTimer);
            revealTimer = null;
          }
          setIsEquipaInView(false);
        }
      },
      { threshold: 0.25 }
    );

    preloadObs.observe(sectionEl);
    viewObs.observe(sectionEl);

    return () => {
      preloadObs.disconnect();
      viewObs.disconnect();
      if (revealTimer) clearTimeout(revealTimer);
      if (teamScrollRafRef.current) cancelAnimationFrame(teamScrollRafRef.current);
    };
  }, []);

  const updateTeamCarouselState = () => {
    const container = teamScrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScroll = Math.max(0, scrollWidth - clientWidth);

    setCanScrollTeamLeft(scrollLeft > 10);
    setCanScrollTeamRight(scrollLeft < maxScroll - 10);
    if (maxScroll > 0) {
      setTeamScrollProgress(Math.min(1, Math.max(0, scrollLeft / maxScroll)));
    }

    // Determine which doctor card is in the foreground (closest to viewport center)
    if (scrollLeft <= 14) {
      setActiveTeamIdx((prev) => (prev !== 0 ? 0 : prev));
      return;
    }
    if (maxScroll > 0 && scrollLeft >= maxScroll - 14) {
      const lastIdx = TEAM_MEMBERS.length - 1;
      setActiveTeamIdx((prev) => (prev !== lastIdx ? lastIdx : prev));
      return;
    }

    const viewportCenter = scrollLeft + clientWidth / 2;
    const cards = container.querySelectorAll<HTMLElement>('[data-team-card-idx]');
    let closestIdx = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - viewportCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    setActiveTeamIdx((prev) => (prev !== closestIdx ? closestIdx : prev));
  };

  const checkTeamScroll = () => {
    if (teamScrollRafRef.current !== null) return;
    teamScrollRafRef.current = requestAnimationFrame(() => {
      updateTeamCarouselState();
      teamScrollRafRef.current = null;
    });
  };

  const scrollToTeamCard = (targetIdx: number) => {
    const container = teamScrollRef.current;
    if (!container) return;
    const clampedIdx = clampValue(targetIdx, 0, TEAM_MEMBERS.length - 1);
    const targetCard = container.querySelector<HTMLElement>(
      `[data-team-card-idx="${clampedIdx}"]`
    );
    if (targetCard) {
      const targetLeft =
        clampedIdx === 0
          ? 0
          : targetCard.offsetLeft - (container.clientWidth - targetCard.offsetWidth) / 2;
      container.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
      setActiveTeamIdx(clampedIdx);
    }
  };

  const scrollTeamLeft = () => {
    const container = teamScrollRef.current;
    if (!container) return;
    if (window.innerWidth < 1024) {
      scrollToTeamCard(activeTeamIdx - 1);
    } else {
      container.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollTeamRight = () => {
    const container = teamScrollRef.current;
    if (!container) return;
    if (window.innerWidth < 1024) {
      scrollToTeamCard(activeTeamIdx + 1);
    } else {
      container.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  // Map toggle state
  const [showMap, setShowMap] = useState<boolean>(false);

  // FAQ open row index state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Price Modal popup state
  const [isPriceModalOpen, setIsPriceModalOpen] = useState<boolean>(false);
  const [priceModalTreatmentId, setPriceModalTreatmentId] = useState<string>('all');

  // Virtual Assistant Chatbot state
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [chatbotInitialTreatment, setChatbotInitialTreatment] = useState<string>('');
  const [chatbotInitialMessage, setChatbotInitialMessage] = useState<string>('');

  // Privacy Policy Modal state
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);

  const handleOpenChatbot = (treatmentTitle?: string, userMessage?: string) => {
    const fallbackConsult = tr.tratamentosSection.items['Medicina dentária geral']?.title || 'Consulta';
    const title = treatmentTitle || fallbackConsult;
    const message = userMessage || tr.marcacao.chatbotDefaultMsg(title);
    setChatbotInitialTreatment(title);
    setChatbotInitialMessage(message);
    setIsChatbotOpen(true);
  };

  // Proximity lazy-loading & viewport pause/resume for 3D Banner Video + #clinica gallery preload
  useEffect(() => {
    const bannerEl = bannerSectionRef.current;
    const clinicaEl = clinicaSectionRef.current;

    const preloadObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === bannerEl && entry.isIntersecting) {
            setShouldLoadBannerVideo(true);
            preloadObserver.unobserve(entry.target);
          } else if (entry.target === clinicaEl && entry.isIntersecting) {
            setShouldPreloadClinica(true);
            preloadObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '900px 0px' }
    );

    if (bannerEl) preloadObserver.observe(bannerEl);
    if (clinicaEl) preloadObserver.observe(clinicaEl);

    const playbackObserver = new IntersectionObserver(
      ([entry]) => {
        const video = bannerVideoRef.current;
        if (!video) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );

    if (bannerEl) playbackObserver.observe(bannerEl);

    return () => {
      preloadObserver.disconnect();
      playbackObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (shouldLoadBannerVideo && bannerVideoRef.current) {
      bannerVideoRef.current.play().catch(() => {});
    }
  }, [shouldLoadBannerVideo]);

  // Unified 60fps direct-DOM scroll loop (zero continuous React re-renders)
  useEffect(() => {
    let animationFrameId = 0;
    let isTicking = false;

    const heroEl = document.getElementById('top');
    const marcacaoEl = document.getElementById('marcacao');
    const manifestoEl = document.getElementById('manifesto-scrub');
    const consultaEl = document.getElementById('primeira-consulta');
    const clinicaEl = document.getElementById('clinica');

    const parallaxNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax-id]')).map(
      (el) => ({
        el,
        parent: (el.parentElement as HTMLElement) || el,
        speed: parseFloat(el.getAttribute('data-parallax') || '0.18'),
      })
    );

    const setBeatState = (
      el: HTMLDivElement | null,
      opacity: number,
      translateY: number,
      interactive: boolean
    ) => {
      if (!el) return;
      el.style.opacity = String(opacity);
      el.style.transform = `translate3d(0, ${translateY}px, 0)`;
      el.style.pointerEvents = interactive ? 'auto' : 'none';
    };

    const onScrollUpdate = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const isDesktop = vw >= 768;

      // A. HERO SCROLLYTELLING (DIRECT GPU MUTATION)
      if (heroEl) {
        const heroRect = heroEl.getBoundingClientRect();
        if (heroRect.bottom > -160) {
          const heroTotal = Math.max(1, heroEl.offsetHeight - vh);
          const heroP = clampValue(-heroRect.top / heroTotal, 0, 1);

          let nextHeroStep: '01' | '02' | '03' = '01';

          if (heroP < 0.33) {
            const localP = heroP / 0.33;
            nextHeroStep = '01';
            if (heroScrollLabelRef.current) {
              heroScrollLabelRef.current.style.opacity = String(clampValue(1 - localP * 1.8, 0, 1));
            }
            const beat1Opacity = clampValue(1 - Math.max(0, localP - 0.65) * 3, 0, 1);
            setBeatState(beat1Ref.current, beat1Opacity, -localP * 28, true);
            setBeatState(beat2Ref.current, 0, 26, false);
            setBeatState(beat3Ref.current, 0, 26, false);
          } else if (heroP < 0.68) {
            const localP = (heroP - 0.33) / 0.35;
            nextHeroStep = '02';
            if (heroScrollLabelRef.current) {
              heroScrollLabelRef.current.style.opacity = '0';
            }
            setBeatState(beat1Ref.current, 0, -28, false);
            const fadeIn = clampValue(localP * 3.2, 0, 1);
            const fadeOut = clampValue(1 - Math.max(0, localP - 0.68) * 3.2, 0, 1);
            const beat2Opacity = Math.min(fadeIn, fadeOut);
            setBeatState(
              beat2Ref.current,
              beat2Opacity,
              (1 - fadeIn) * 26 - (1 - fadeOut) * 26,
              true
            );
            setBeatState(beat3Ref.current, 0, 26, false);
          } else {
            const localP = (heroP - 0.68) / 0.32;
            nextHeroStep = '03';
            if (heroScrollLabelRef.current) {
              heroScrollLabelRef.current.style.opacity = '0';
            }
            setBeatState(beat1Ref.current, 0, -28, false);
            setBeatState(beat2Ref.current, 0, -26, false);
            const fadeIn = clampValue(localP * 3, 0, 1);
            setBeatState(beat3Ref.current, fadeIn, (1 - fadeIn) * 26, true);
          }

          if (heroStepRef.current !== nextHeroStep) {
            heroStepRef.current = nextHeroStep;
            setHeroStep(nextHeroStep);
          }
        }

        // B. NAVBAR ADAPTIVE HEADER (ONLY ON THEME CHANGE)
        if (marcacaoEl) {
          const marcacaoRect = marcacaoEl.getBoundingClientRect();
          const inHero = heroRect.bottom > 72;
          const inMarcacao = marcacaoRect.top <= 72 && marcacaoRect.bottom >= 72;
          const nextTheme: 'transparent' | 'dark' | 'light' = inHero
            ? 'transparent'
            : inMarcacao
            ? 'dark'
            : 'light';

          if (headerThemeRef.current !== nextTheme) {
            headerThemeRef.current = nextTheme;
            setHeaderTheme(nextTheme);
          }
        }
      }

      // C. MANIFESTO WORD SCRUB (DIRECT SPAN OPACITY WHEN NEAR VIEWPORT)
      if (manifestoEl) {
        const mRect = manifestoEl.getBoundingClientRect();
        if (mRect.bottom > -160 && mRect.top < vh + 160) {
          const mStart = vh * 0.84;
          const mEnd = vh * 0.24;
          const mProg = clampValue((mStart - mRect.top) / (mStart - mEnd), 0, 1);
          const wordTotal = manifestoWordCountRef.current;
          const litWords = mProg * wordTotal;
          const spans = manifestoWordRefs.current;

          for (let idx = 0; idx < wordTotal; idx++) {
            const span = spans[idx];
            if (span) {
              const wordProg = clampValue(litWords - idx, 0, 1);
              span.style.opacity = (0.22 + wordProg * 0.78).toFixed(3);
            }
          }
        }
      }

      // D. PRIMEIRA CONSULTA VERTICAL PROGRESS SPINE (GPU COMPOSITOR TRANSFORM)
      if (consultaEl) {
        const cRect = consultaEl.getBoundingClientRect();
        if (cRect.bottom > -120 && cRect.top < vh + 120) {
          const cProg = clampValue(
            (vh * 0.72 - cRect.top) / Math.max(1, cRect.height * 0.76),
            0,
            1
          );
          if (consultaLineRef.current) {
            const scaleVal = 0.16 + cProg * 0.84;
            consultaLineRef.current.style.transform = `scaleY(${scaleVal.toFixed(3)})`;
          }
          const nextStep2 = cProg > 0.34;
          const nextStep3 = cProg > 0.68;
          if (step2ActiveRef.current !== nextStep2) {
            step2ActiveRef.current = nextStep2;
            setStep2Active(nextStep2);
          }
          if (step3ActiveRef.current !== nextStep3) {
            step3ActiveRef.current = nextStep3;
            setStep3Active(nextStep3);
          }
        }
      }

      // E. A CLÍNICA: STICKY HORIZONTAL SCROLL (DIRECT TRACK TRANSFORM)
      if (clinicaEl && clinicaTrackRef.current) {
        const clRect = clinicaEl.getBoundingClientRect();
        if (clRect.bottom > -240 && clRect.top < vh + 240) {
          const stickyH = clinicaStickyRef.current?.offsetHeight || vh;
          const clScrollable = Math.max(1, clinicaEl.offsetHeight - stickyH);
          const clProg = clampValue(-clRect.top / clScrollable, 0, 1);

          const maxTranslateX = Math.max(0, clinicaTrackRef.current.scrollWidth - clinicaEl.clientWidth);
          const currentX = -clProg * maxTranslateX;
          clinicaTrackRef.current.style.transform = `translate3d(${currentX}px, 0, 0)`;

          if (clinicaProgressBarRef.current) {
            clinicaProgressBarRef.current.style.width = `${Math.max(8, clProg * 100)}%`;
          }

          const nextStepNum = Math.min(
            CLINICA_SPACES.length,
            Math.floor(clProg * CLINICA_SPACES.length) + 1
          );
          if (clinicaStepRef.current !== nextStepNum) {
            clinicaStepRef.current = nextStepNum;
            setClinicaStepNum(nextStepNum);
          }
        }
      }

      // F. VERTICAL PARALLAX (DESKTOP ONLY — AVOIDS MOBILE GPU REPAINTS)
      for (let i = 0; i < parallaxNodes.length; i++) {
        const { el, parent, speed } = parallaxNodes[i];
        if (!isDesktop) {
          if (el.style.transform && el.style.transform !== 'none') {
            el.style.transform = 'none';
          }
          continue;
        }
        const rect = parent.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < vh) {
          const relY = (vh * 0.5 - (rect.top + rect.height * 0.5)) * speed;
          el.style.transform = `translate3d(0, ${relY.toFixed(1)}px, 0)`;
        }
      }
    };

    const handleScroll = () => {
      if (!isTicking) {
        isTicking = true;
        animationFrameId = requestAnimationFrame(() => {
          onScrollUpdate();
          isTicking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    onScrollUpdate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Review carousel handlers
  const handleNextReview = () => {
    setReviewAnimate(false);
    setTimeout(() => {
      setReviewIdx((prev) => getNextReviewIndex(prev, REVIEWS.length));
      setReviewAnimate(true);
    }, 180);
  };

  const handlePrevReview = () => {
    setReviewAnimate(false);
    setTimeout(() => {
      setReviewIdx((prev) => getPrevReviewIndex(prev, REVIEWS.length));
      setReviewAnimate(true);
    }, 180);
  };

  // Lead submission handler: silent GHL upsert + Meta/Google Ads conversion + immediate WhatsApp window.open
  const handleBookingSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    const localizedTreatmentTitle =
      tr.tratamentosSection.items[bookingTreatment]?.title ||
      bookingTreatment ||
      tr.tratamentosSection.items['Medicina dentária geral']?.title ||
      'Consulta de Avaliação Dentária';

    const selectedDay = bookingDay || tr.marcacao.dayAny;
    const selectedTime = bookingTime || tr.marcacao.timeAny;
    const cleanName = bookingName.trim() || 'Paciente';
    const cleanPhone = bookingPhone.trim();
    const valorEstimado = getEstimatedLeadValue(bookingTreatment);
    const attribution = getStoredAttribution();

    // a) Envío silencioso en segundo plano a GoHighLevel (/api/ghl-lead) con atribución First-Party
    try {
      fetch('/api/ghl-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          nome: cleanName,
          telefone: cleanPhone,
          tratamento: localizedTreatmentTitle,
          dia: selectedDay,
          hora: selectedTime,
          attribution,
        }),
      }).catch(() => {});
    } catch {
      // Silencioso para no bloquear la navegación del usuario
    }

    // b) Registro de conversión en Meta Pixel (sanitizado), Google Ads y GA4
    trackLeadConversion({
      nome: cleanName,
      telefone: cleanPhone,
      tratamento: bookingTreatment || localizedTreatmentTitle,
      valorEstimado,
    });

    // c) Apertura inmediata de WhatsApp con mensaje personalizado
    const waText = tr.marcacao.whatsappMessage({
      nome: cleanName,
      telefone: cleanPhone || '—',
      tratamento: localizedTreatmentTitle,
      dia: selectedDay,
      hora: selectedTime,
    });
    const whatsappUrl = `https://wa.me/351912907024?text=${encodeURIComponent(waText)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Dynamic header style with Apple iOS 27 Liquid Glass
  let headerClass = 'fixed inset-x-0 top-0 z-50 transition-all duration-500 py-2.5 sm:py-5 text-paper bg-transparent';

  if (headerTheme === 'dark') {
    headerClass =
      'fixed inset-x-0 top-0 z-50 transition-all duration-500 py-2 sm:py-3.5 text-paper bg-[#14161A]/60 backdrop-blur-[24px] saturate-[185%] border-b border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.35)]';
  } else if (headerTheme === 'light') {
    headerClass =
      'fixed inset-x-0 top-0 z-50 transition-all duration-500 py-2 sm:py-3.5 text-ink bg-white/65 backdrop-blur-[24px] saturate-[185%] border-b border-white/60 shadow-[0_12px_32px_rgba(45,50,119,0.06)]';
  }

  return (
    <div className="selection:bg-ink selection:text-paper font-sans relative">
      <div className="grain-overlay" />

      {/* Orbes de luz ambiental difuminados (escritorio — evita sobrecarga GPU en móvil) */}
      <div className="hidden md:block fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-[12%] left-[10%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full opacity-25 filter blur-[95px]"
          style={{
            background: 'radial-gradient(circle, rgba(156, 140, 196, 0.45) 0%, rgba(45, 50, 119, 0.25) 50%, transparent 75%)',
          }}
        />
        <div
          className="absolute top-[38%] -right-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full opacity-20 filter blur-[100px]"
          style={{
            background: 'radial-gradient(circle, rgba(212, 225, 87, 0.35) 0%, rgba(156, 140, 196, 0.2) 50%, transparent 75%)',
          }}
        />
        <div
          className="absolute top-[72%] left-[4%] w-[48vw] h-[48vw] max-w-[550px] max-h-[550px] rounded-full opacity-22 filter blur-[95px]"
          style={{
            background: 'radial-gradient(circle, rgba(45, 50, 119, 0.4) 0%, rgba(156, 140, 196, 0.25) 50%, transparent 75%)',
          }}
        />
      </div>

      {/* =====================================================
           NAVBAR FIJA ADAPTATIVA CON LIQUID GLASS
           ===================================================== */}
      <header id="site-header" className={headerClass}>
        <div className="container-page flex items-center justify-between gap-3">
          <a
            href="#top"
            className="inline-flex items-center gap-2 sm:gap-3.5 group transition-opacity hover:opacity-95 shrink-0 min-w-0"
          >
            <img
              src="https://clinica-santa-maria-dos-olivais.b-cdn.net/logo_clinica_santa_maria_dos_olivais-removebg-preview.png"
              alt="Clínica Santa Maria dos Olivais"
              className="h-[40px] sm:h-[64px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] shrink-0"
              loading="eager"
            />
            <div className="flex flex-col justify-center font-sans leading-[1.16] tracking-wide select-none whitespace-nowrap">
              <span className="text-[11px] sm:text-[13.5px] font-semibold">
                <span
                  className={
                    headerTheme === 'dark'
                      ? 'text-white'
                      : 'text-[#2d3277] drop-shadow-[0_1px_1px_rgba(255,255,255,0.75)]'
                  }
                >
                  Clínica{' '}
                </span>
                <span
                  className={
                    headerTheme === 'dark'
                      ? 'text-[#b7a6e4]'
                      : 'text-[#8470be] drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]'
                  }
                >
                  Santa Maria
                </span>
              </span>
              <span
                className={`text-[11px] sm:text-[13.5px] font-semibold transition-colors duration-300 ${
                  headerTheme === 'light'
                    ? 'text-[#7a8e0e]'
                    : headerTheme === 'dark'
                      ? 'text-[#d4e157]'
                      : 'text-[#d4e157] drop-shadow-[0_1px_2.5px_rgba(30,34,88,0.7)]'
                }`}
              >
                dos Olivais
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-9 text-[13px] tracking-wide whitespace-nowrap shrink-0">
            <a href="#primeira-consulta" className="link-underline py-0.5">
              {tr.nav.primeiraConsulta}
            </a>
            <a href="#tratamentos" className="link-underline py-0.5">
              {tr.nav.tratamentos}
            </a>
            <a href="#equipa" className="link-underline py-0.5">
              {tr.nav.equipa}
            </a>
            <a href="#clinica" className="link-underline py-0.5">
              {tr.nav.clinica}
            </a>
            <a href="#perguntas" className="link-underline py-0.5">
              {tr.nav.perguntas}
            </a>
          </nav>

          <LiquidButton
            id="header-cta"
            type="button"
            onClick={() => handleOpenChatbot()}
            variant="primary"
            className="!text-[11.5px] sm:!text-[12.5px] !px-4 sm:!px-6 !py-2 sm:!py-2.5 !font-semibold shadow-md cursor-pointer whitespace-nowrap shrink-0"
          >
            {tr.nav.marcar}
          </LiquidButton>
        </div>
      </header>

      {/* =====================================================
           1. HERO SCROLLYTELLING CON FOTO PRINCIPAL — DRA. ANA MATA
           ===================================================== */}
      <section id="top" className="relative h-[420vh] bg-[#D2D1CD]">
        <div id="hero-sticky" className="sticky top-0 relative h-viewport-l overflow-hidden bg-[#D2D1CD]">
          <div className="absolute inset-0 h-full w-full overflow-hidden bg-[#D2D1CD] pointer-events-none select-none">
            <img
              src="https://clinica-santa-maria-dos-olivais.b-cdn.net/doctora_ana_mata_head.JPG"
              alt={tr.hero.doctorAlt}
              className="absolute top-0 right-0 h-full w-auto max-w-none select-none pointer-events-none"
              style={{
                transform: 'translateX(26%) scaleX(-1)',
                transformOrigin: '50% 50%',
              }}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 95% 85% at 0% 0%, rgba(156, 140, 196, 0.62) 0%, rgba(156, 140, 196, 0.35) 36%, rgba(156, 140, 196, 0.12) 60%, transparent 75%), linear-gradient(135deg, rgba(156, 140, 196, 0.40) 0%, rgba(156, 140, 196, 0.15) 40%, transparent 68%)',
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#faf9f6]/30 pointer-events-none" />

          {/* Contenedor de los 3 pasos del Hero */}
          <div className="absolute inset-x-0 top-0 h-viewport-s">
            <div className="container-page relative h-full">
              {/* PASO 01 / 03 */}
              <div
                ref={beat1Ref}
                id="hero-beat-1"
                className="absolute inset-x-5 bottom-[24%] sm:inset-x-8 sm:bottom-[21%] lg:inset-x-12 lg:bottom-[18%] will-change-transform"
              >
                <p className="eyebrow text-paper/95 mb-2.5 sm:mb-3.5 tracking-[0.16em] sm:tracking-[0.2em] text-[10.5px] sm:text-xs font-semibold drop-shadow-[0_1px_4px_rgba(45,50,119,0.35)]">
                  {tr.hero.beat1Eyebrow}
                </p>
                <p className="display hero-type text-[clamp(2.25rem,6.2vw,5.75rem)] leading-[1.08] max-w-[16ch] drop-shadow-[0_2px_14px_rgba(45,50,119,0.35)]">
                  {tr.hero.beat1Lead} <em>{tr.hero.beat1Italic}</em>
                </p>
              </div>

              {/* PASO 02 / 03 */}
              <div
                ref={beat2Ref}
                id="hero-beat-2"
                style={{ opacity: 0, pointerEvents: 'none' }}
                className="absolute inset-x-5 bottom-[24%] sm:inset-x-8 sm:bottom-[21%] lg:inset-x-12 lg:bottom-[18%] will-change-transform"
              >
                <p className="eyebrow text-paper/95 mb-2.5 sm:mb-3.5 tracking-[0.16em] sm:tracking-[0.2em] text-[10.5px] sm:text-xs font-semibold drop-shadow-[0_1px_4px_rgba(45,50,119,0.35)]">
                  {tr.hero.beat2Eyebrow}
                </p>
                <p className="display hero-type text-[clamp(2.25rem,6.2vw,5.75rem)] leading-[1.08] max-w-[16ch] drop-shadow-[0_2px_14px_rgba(45,50,119,0.35)]">
                  {tr.hero.beat2Lead} <em>{tr.hero.beat2Italic}</em>
                </p>
              </div>

              {/* PASO 03 / 03 */}
              <div
                ref={beat3Ref}
                id="hero-beat-3"
                style={{ opacity: 0, pointerEvents: 'none' }}
                className="absolute inset-x-5 bottom-[22%] sm:inset-x-8 sm:bottom-[18%] lg:inset-x-12 lg:bottom-[15%] will-change-transform"
              >
                <p className="eyebrow text-paper/95 mb-2.5 sm:mb-3.5 tracking-[0.16em] sm:tracking-[0.2em] text-[10.5px] sm:text-xs font-semibold drop-shadow-[0_1px_4px_rgba(45,50,119,0.35)]">
                  {tr.hero.beat3Eyebrow}
                </p>
                <p className="display hero-type text-[clamp(2.25rem,6.2vw,5.75rem)] leading-[1.08] max-w-[16ch] mb-4 sm:mb-7 drop-shadow-[0_2px_14px_rgba(45,50,119,0.35)]">
                  {tr.hero.beat3Lead} <em>{tr.hero.beat3Italic}</em>
                </p>
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
                  <LiquidButton
                    type="button"
                    onClick={() => handleOpenChatbot()}
                    variant="primary"
                    className="!px-5 sm:!px-8 !py-2.5 sm:!py-3.5 !text-[12px] sm:!text-[13px] !font-medium shadow-lg cursor-pointer whitespace-nowrap"
                  >
                    <span>{tr.hero.ctaBook}</span>
                  </LiquidButton>
                  <LiquidButton
                    href="https://wa.me/351912907024"
                    onClick={() => trackWhatsAppClick('Consulta de Avaliação Dentária')}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="lime"
                    className="!px-5 sm:!px-8 !py-2.5 sm:!py-3.5 !text-[12px] sm:!text-[13px] !font-semibold shadow-md whitespace-nowrap"
                  >
                    <span>WhatsApp</span>
                  </LiquidButton>
                </div>
              </div>

              {/* Nome e especialidade da Dra. Ana Mata */}
              <div
                className="absolute right-4 bottom-[4.5rem] sm:right-[22%] lg:right-[32%] sm:bottom-6 lg:bottom-7 z-20 pointer-events-none select-none flex flex-col items-end text-right sm:items-center sm:text-center px-1 sm:px-2"
                aria-label={tr.hero.doctorAria}
              >
                <p className="font-serif text-[12px] sm:text-[15px] lg:text-[16px] text-ink font-semibold tracking-tight leading-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
                  Dra. Ana Mata
                </p>
                <p className="font-serif italic text-[9.5px] sm:text-[11.5px] lg:text-[12.5px] text-ink/80 font-normal tracking-normal mt-0.5 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
                  {tr.hero.doctorRole}
                </p>
              </div>

              {/* Pie del Hero */}
              <div className="absolute left-5 right-20 bottom-5 sm:left-8 sm:right-20 sm:bottom-7 lg:left-12 lg:right-12 flex items-center justify-between text-paper/85">
                <span
                  ref={heroScrollLabelRef}
                  id="hero-scroll-label"
                  className="inline-flex items-center gap-2.5 sm:gap-3.5 eyebrow !text-[10px] sm:!text-[11.5px] text-paper/85 select-none"
                >
                  <span>{tr.hero.scrollDown}</span>
                  <span
                    aria-hidden="true"
                    className="scroll-line scroll-line-light block shrink-0"
                    style={{ height: '1.75rem', width: '1.5px' }}
                  />
                </span>
                <div className="ml-auto font-serif text-sm sm:text-base tracking-widest">
                  <span id="hero-step-num" className="text-paper">
                    {heroStep}
                  </span>
                  <span className="text-paper/40 text-xs mx-1">/</span>
                  <span className="text-paper/40 text-xs">03</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
           2. MANIFESTO (SCROLL WORD SCRUB)
           ===================================================== */}
      <section className="py-20 sm:py-28 md:py-36 bg-paper">
        <div className="container-page">
          <div className="max-w-4xl mx-auto text-center">
            <p className="eyebrow text-muted mb-6 sm:mb-8">{tr.manifesto.eyebrow}</p>
            <p
              id="manifesto-scrub"
              className="font-serif text-[clamp(1.75rem,3.9vw,3.45rem)] leading-[1.2] tracking-tight font-normal text-center text-ink text-balance"
            >
              {manifestoWords.map((word, idx) => (
                <span
                  key={`${locale}-${idx}`}
                  ref={(el) => {
                    manifestoWordRefs.current[idx] = el;
                  }}
                  className="m-word inline-block"
                  style={{ opacity: 0.22 }}
                >
                  {word}&nbsp;
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
           3. BANNER CONSULTA 3D CON PARALLAX INTERNO + 4 CIFRAS
           ===================================================== */}
      <section
        ref={bannerSectionRef}
        className="relative w-full h-[64svh] sm:h-[78vh] md:h-[90vh] overflow-hidden bg-ink"
      >
        <video
          ref={bannerVideoRef}
          data-parallax-id="banner-3d"
          data-parallax="0.22"
          src="/banner-video.mp4"
          preload="auto"
          autoPlay
          loop
          muted
          playsInline
          className="absolute -top-[13%] left-0 w-full h-[126%] object-cover object-center md:will-change-transform pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-8 sm:bottom-10 md:bottom-14">
          <div className="container-page">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-paper">
              <ModularReveal delay={1} enableMouseGlow className="border-t border-paper/25 pt-3 sm:pt-5 rounded-xl">
                <p className="font-serif text-3xl sm:text-4xl md:text-6xl font-light mb-1 sm:mb-2">
                  <AnimatedCounter target={10} prefix="+" duration={1200} />
                </p>
                <p className="eyebrow !text-[10px] sm:!text-[11.5px] !tracking-[0.14em] sm:!tracking-[0.22em] text-paper/75">
                  {tr.stats.years}
                </p>
              </ModularReveal>
              <ModularReveal delay={2} enableMouseGlow className="border-t border-paper/25 pt-3 sm:pt-5 rounded-xl">
                <p className="font-serif text-3xl sm:text-4xl md:text-6xl font-light mb-1 sm:mb-2">
                  <AnimatedCounter target={650} prefix="+" duration={1400} />
                </p>
                <p className="eyebrow !text-[10px] sm:!text-[11.5px] !tracking-[0.14em] sm:!tracking-[0.22em] text-paper/75">
                  {tr.stats.implants}
                </p>
              </ModularReveal>
              <ModularReveal delay={3} enableMouseGlow className="border-t border-paper/25 pt-3 sm:pt-5 rounded-xl">
                <p className="font-serif text-3xl sm:text-4xl md:text-6xl font-light mb-1 sm:mb-2">
                  <AnimatedCounter
                    target={4.4}
                    decimals={1}
                    decimalSeparator={tr.meta.decimalSeparator}
                    duration={1400}
                  />
                </p>
                <p className="eyebrow !text-[10px] sm:!text-[11.5px] !tracking-[0.14em] sm:!tracking-[0.22em] text-paper/75">
                  {tr.stats.googleRating}
                </p>
              </ModularReveal>
              <ModularReveal delay={4} enableMouseGlow className="border-t border-paper/25 pt-3 sm:pt-5 rounded-xl">
                <p className="font-serif text-3xl sm:text-4xl md:text-6xl font-light mb-1 sm:mb-2">
                  <AnimatedCounter target={8} duration={1200} />
                </p>
                <p className="eyebrow !text-[10px] sm:!text-[11.5px] !tracking-[0.14em] sm:!tracking-[0.22em] text-paper/75">
                  {tr.stats.specialists}
                </p>
              </ModularReveal>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
           4. A PRIMEIRA CONSULTA — COLUMNA FIJA EDITORIAL + RECORRIDO VERTICAL 01–03
           ===================================================== */}
      <section id="primeira-consulta" className="py-16 sm:py-28 md:py-44 bg-stone">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Columna izquierda fija en escritorio: Encabezado + Fotografía clínica + Acción */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <ModularReveal>
                <div className="flex items-center gap-3 mb-2.5 sm:mb-4">
                  <p className="eyebrow text-muted">{tr.primeiraConsulta.eyebrow}</p>
                  <span aria-hidden="true" className="text-ink/30 text-xs">
                    ·
                  </span>
                  <span className="font-serif text-xs text-ink font-semibold tabular-nums tracking-wider">
                    {step3Active ? '03' : step2Active ? '02' : '01'}{' '}
                    <span className="text-muted font-normal">/ 03</span>
                  </span>
                </div>

                <h2 className="section-heading text-balance mb-5 sm:mb-7">
                  {tr.primeiraConsulta.headingLead} <em>{tr.primeiraConsulta.headingItalic}</em>
                </h2>

                <div className="aspect-[16/10] lg:aspect-[4/3.6] overflow-hidden relative bg-paper rounded-2xl sm:rounded-[26px] shadow-[0_18px_45px_rgba(45,50,119,0.09)] border border-ink/8">
                  <img
                    data-parallax-id="consulta-img"
                    data-parallax="0.14"
                    src="https://clinica-santa-maria-dos-olivais.b-cdn.net/ouvimos_clinica_santa_maria_dos_olivais.jpeg"
                    alt={tr.primeiraConsulta.imgAlt}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_2.jpeg';
                    }}
                    loading="lazy"
                    decoding="async"
                    className="absolute -top-[10%] left-0 w-full h-[120%] object-cover object-center md:will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="hidden lg:flex items-center pt-7">
                  <LiquidButton
                    type="button"
                    variant="primary"
                    onClick={() => handleOpenChatbot()}
                    className="!px-7 !py-3.5 !text-xs !font-semibold shadow-md whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>{tr.hero.ctaBook}</span>
                  </LiquidButton>
                </div>
              </ModularReveal>
            </div>

            {/* Columna derecha: Recorrido vertical arquitectónico en 3 etapas */}
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="relative pl-6 sm:pl-10">
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-2 bottom-2 w-[1px] bg-ink/15"
                />
                <div
                  ref={consultaLineRef}
                  id="consulta-progress-line"
                  aria-hidden="true"
                  style={{ transform: 'scaleY(0.18)', transformOrigin: 'top' }}
                  className="absolute left-0 top-2 bottom-2 w-[1.5px] bg-clinic-navy will-change-transform"
                />

                {[
                  {
                    num: '01',
                    title: tr.primeiraConsulta.step1TitleLines.join(' '),
                    desc: tr.primeiraConsulta.step1Desc,
                    isActive: true,
                  },
                  {
                    num: '02',
                    title: tr.primeiraConsulta.step2TitleLines.join(' '),
                    desc: tr.primeiraConsulta.step2Desc,
                    isActive: step2Active,
                  },
                  {
                    num: '03',
                    title: tr.primeiraConsulta.step3TitleLines.join(' '),
                    desc: tr.primeiraConsulta.step3Desc,
                    isActive: step3Active,
                  },
                ].map((step, idx) => {
                  const isHighlighted =
                    focusedConsultaStep !== null ? focusedConsultaStep === idx : step.isActive;

                  return (
                    <ModularReveal key={step.num} delay={(idx + 1) as 1 | 2 | 3}>
                      <article
                        onMouseEnter={() => setFocusedConsultaStep(idx)}
                        onMouseLeave={() => setFocusedConsultaStep(null)}
                        onClick={() => setFocusedConsultaStep(idx)}
                        className={`group cursor-default transition-opacity duration-200 ${
                          idx === 0
                            ? 'pb-6 sm:pb-11 pt-0.5'
                            : idx === 1
                            ? 'py-6 sm:py-11'
                            : 'pt-6 sm:pt-11 pb-1'
                        } ${idx < 2 ? 'border-b border-rule' : ''}`}
                      >
                        <div className="relative flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-6">
                          <span
                            aria-hidden="true"
                            className={` -left-6 sm:-left-10 top-3.5 sm:top-4 absolute w-3.5 sm:w-5 h-[1px] origin-left transition-transform duration-200 ${
                              isHighlighted
                                ? 'bg-clinic-navy scale-x-100'
                                : 'bg-ink/25 scale-x-75'
                            }`}
                          />

                          <span
                            className={`font-serif text-3xl sm:text-4xl md:text-[2.75rem] font-light leading-none tabular-nums shrink-0 select-none transition-opacity duration-200 ${
                              isHighlighted ? 'text-clinic-navy opacity-100' : 'text-ink opacity-35'
                            }`}
                          >
                            {step.num}
                          </span>

                          <div className="min-w-0 flex-1">
                            <h3
                              className={`font-serif text-xl sm:text-2xl md:text-[1.85rem] leading-[1.18] font-normal text-balance mb-2 sm:mb-3 transition-opacity duration-200 ${
                                isHighlighted ? 'text-ink opacity-100' : 'text-ink opacity-75'
                              }`}
                            >
                              {step.title}
                            </h3>
                            <p className="text-[13px] sm:text-[14.5px] text-ink/75 leading-relaxed max-w-md">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      </article>
                    </ModularReveal>
                  );
                })}
              </div>

              <div className="lg:hidden pt-6 mt-5 border-t border-rule flex items-center">
                <LiquidButton
                  type="button"
                  variant="primary"
                  onClick={() => handleOpenChatbot()}
                  className="!px-6 !py-3 !text-xs !font-semibold shadow-md whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>{tr.hero.ctaBook}</span>
                </LiquidButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
           5. TRATAMENTOS — CARRUSEL REEL 9:16 COMPACTO (MÓVIL) + LISTA EDITORIAL CON CAJÓN EN PRIMER PLANO (ESCRITORIO)
           ===================================================== */}
      <section id="tratamentos" ref={tratamentosSectionRef} className="py-16 sm:py-28 md:py-44 bg-paper overflow-x-clip">
        <div className="container-page">
          <ModularReveal className="mb-8 sm:mb-14 md:mb-20">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2 sm:mb-4">
                  <p className="eyebrow text-muted">{tr.tratamentosSection.eyebrow}</p>
                  <span className="text-[11px] text-muted/70 tracking-widest font-mono tabular-nums">
                    · 09 {tr.tratamentosSection.specialtiesCount}
                  </span>
                </div>
                <h2 className="section-heading max-w-2xl">
                  {tr.tratamentosSection.headingLead} <em>{tr.tratamentosSection.headingItalic}</em>
                </h2>
              </div>

              <div className="hidden lg:flex items-center gap-5 shrink-0 pb-1">
                <span className="font-serif text-sm text-ink font-semibold tabular-nums tracking-wider">
                  {String(activeTreatmentIdx + 1).padStart(2, '0')}{' '}
                  <span className="text-muted font-normal">
                    / {String(TREATMENTS.length).padStart(2, '0')}
                  </span>
                </span>
                <span aria-hidden="true" className="w-px h-4 bg-rule" />
                <LiquidButton
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setPriceModalTreatmentId('all');
                    setIsPriceModalOpen(true);
                  }}
                  className="!px-5 !py-2.5 !text-xs !font-semibold !text-ink whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>{tr.tratamentosSection.pricesBtn}</span>
                  <ArrowUpRight size={14} strokeWidth={1.8} />
                </LiquidButton>
              </div>
            </div>
          </ModularReveal>

          {/* Vista Móvil / Tablet (< lg): Carrusel horizontal de tarjetas Reel 9:16 inmersivas en Liquid Glass */}
          <div className="lg:hidden">
            <ModularReveal delay={1}>
              <div
                ref={treatmentsCarouselRef}
                onScroll={checkTreatmentsScroll}
                className="flex items-center gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 -mx-6 px-6 sm:mx-0 sm:px-0"
              >
                {TREATMENTS.map((t, index) => {
                  const localizedItem = tr.tratamentosSection.items[t.id] || t;
                  const isFocused = activeTreatmentIdx === index;
                  return (
                    <div
                      key={t.id}
                      data-treatment-card-idx={index}
                      onClick={() => {
                        if (activeTreatmentIdx !== index) {
                          scrollToTreatmentCard(index);
                        } else {
                          setPriceModalTreatmentId(t.id);
                          setIsPriceModalOpen(true);
                        }
                      }}
                      className={`shrink-0 w-[min(68vw,36svh)] max-w-[248px] sm:w-[272px] sm:max-w-none snap-center cursor-pointer transition-all duration-300 ease-out will-change-transform ${
                        isFocused
                          ? 'scale-100 -translate-y-1 z-20 opacity-100'
                          : 'scale-[0.94] translate-y-1 z-0 opacity-75'
                      }`}
                    >
                      <div className="aspect-[9/16] w-full overflow-hidden rounded-[24px] bg-stone relative shadow-[0_20px_44px_-12px_rgba(30,34,88,0.18)]">
                        <img
                          src={t.img}
                          alt={localizedItem.title}
                          loading={shouldPreloadTreatments || index < 3 ? 'eager' : 'lazy'}
                          decoding="async"
                          className="w-full h-full object-cover object-center block"
                        />

                        {/* Velo cristalino ligero para resaltar el panel Liquid Glass */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1530]/35 via-transparent to-transparent pointer-events-none" />

                        {/* Tarjeta de texto compacta en Liquid Glass (sin números superiores, sin texto superior y sin botones) */}
                        <div className="absolute bottom-2.5 inset-x-2.5 z-20 pointer-events-none">
                          <div className="liquid-glass-panel rounded-[16px] px-3.5 py-2.5 flex flex-col justify-end text-white">
                            <h3 className="font-serif text-base sm:text-lg leading-snug text-white font-normal drop-shadow-xs truncate">
                              {localizedItem.title}
                            </h3>
                            <p className="text-[10.5px] sm:text-[11px] text-white/90 leading-snug line-clamp-1 mt-0.5">
                              {localizedItem.caption}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="w-[16vw] shrink-0 sm:hidden" aria-hidden="true" />
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 max-w-[220px]">
                  <span className="font-serif text-xs text-ink font-semibold tabular-nums shrink-0">
                    {String(activeTreatmentIdx + 1).padStart(2, '0')}{' '}
                    <span className="text-muted font-normal">
                      / {String(TREATMENTS.length).padStart(2, '0')}
                    </span>
                  </span>
                  <div className="flex-1 h-[2px] bg-ink/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-ink transition-all duration-300 rounded-full"
                      style={{ width: `${Math.max(11.1, treatmentsScrollProgress * 88.9 + 11.1)}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <LiquidButton
                    type="button"
                    variant="secondary"
                    onClick={scrollTreatmentsLeft}
                    disabled={!canScrollTreatmentsLeft}
                    aria-label={tr.equipa.prevAria}
                    className={`!w-9 !h-9 sm:!w-10 sm:!h-10 !p-0 !rounded-full flex items-center justify-center transition-all duration-300 ${
                      canScrollTreatmentsLeft ? 'cursor-pointer' : 'opacity-35 cursor-not-allowed'
                    }`}
                  >
                    <span className="text-sm">←</span>
                  </LiquidButton>
                  <LiquidButton
                    type="button"
                    variant="secondary"
                    onClick={scrollTreatmentsRight}
                    disabled={!canScrollTreatmentsRight}
                    aria-label={tr.equipa.nextAria}
                    className={`!w-9 !h-9 sm:!w-10 sm:!h-10 !p-0 !rounded-full flex items-center justify-center transition-all duration-300 ${
                      canScrollTreatmentsRight ? 'cursor-pointer' : 'opacity-35 cursor-not-allowed'
                    }`}
                  >
                    <span className="text-sm">→</span>
                  </LiquidButton>
                </div>
              </div>
            </ModularReveal>
          </div>

          {/* Vista Escritorio (lg+): Índice Editorial Interactivo 01 – 09 + Widget Reel 9:16 Liquid Glass */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-10 xl:gap-14 items-stretch relative">
            {/* Columna izquierda: Índice editorial interactivo 01 – 09 con altura constante */}
            <ModularReveal
              delay={1}
              className="lg:col-span-7 border-t border-rule"
            >
              <div
                onMouseMove={(e) => handleTreatmentPointerFollow(e.clientY)}
                onMouseLeave={() => {
                  lastTreatmentPointerYRef.current = null;
                  syncTreatmentFloatingCard(activeTreatmentIdxRef.current, null);
                }}
              >
                {TREATMENTS.map((t, index) => {
                  const isActive = activeTreatmentIdx === index;
                  const localizedItem = tr.tratamentosSection.items[t.id] || t;
                  const saberMaisLabel =
                    locale === 'es'
                      ? 'Saber más'
                      : locale === 'en'
                      ? 'Learn more'
                      : locale === 'fr'
                      ? 'En savoir plus'
                      : locale === 'de'
                      ? 'Mehr erfahren'
                      : locale === 'it'
                      ? 'Scopri di più'
                      : 'Saber mais';
                  return (
                    <div
                      key={t.id}
                      ref={(el) => {
                        treatmentRowRefs.current[index] = el;
                      }}
                      className={`treatment-item group border-b border-rule transition-colors duration-300 ${
                        isActive ? 'active bg-white/55' : 'hover:bg-white/40'
                      }`}
                      onMouseEnter={(e) => {
                        if (window.innerWidth >= 1024) {
                          handleTreatmentPointerFollow(e.clientY, index);
                        }
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTreatmentIdx(index);
                          setPriceModalTreatmentId(t.id);
                          setIsPriceModalOpen(true);
                        }}
                        className="w-full py-5 xl:py-6 px-4 -mx-4 flex items-center justify-between gap-6 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-clinic-navy/30 rounded-xl"
                      >
                        <div className="flex items-baseline gap-5 xl:gap-7 min-w-0 flex-1">
                          <span
                            className={`font-serif text-xs xl:text-[13px] tabular-nums w-6 shrink-0 transition-colors duration-300 ${
                              isActive ? 'text-clinic-navy font-semibold' : 'text-ink/45'
                            }`}
                          >
                            {t.number}
                          </span>

                          <div className="min-w-0 flex-1 pr-4 overflow-hidden">
                            <h3 className="treatment-title font-serif text-2xl xl:text-[2.35rem] leading-[1.14] font-normal truncate">
                              {localizedItem.title}
                            </h3>
                            <p
                              className={`text-[12.5px] xl:text-[13px] truncate mt-1 transition-all duration-300 ${
                                isActive
                                  ? 'text-ink/80 translate-x-[14px]'
                                  : 'text-muted/65 group-hover:text-ink/75 group-hover:translate-x-[14px]'
                              }`}
                            >
                              {localizedItem.caption}
                            </p>
                          </div>
                        </div>

                        <div className="treatment-cta hidden lg:flex items-center gap-3 shrink-0">
                          <span className="text-xs xl:text-[13px] text-clinic-navy font-medium whitespace-nowrap">
                            {saberMaisLabel}
                          </span>
                          <span
                            aria-hidden="true"
                            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                              isActive
                                ? 'bg-clinic-navy border-clinic-navy text-white shadow-xs'
                                : 'border-rule text-ink group-hover:bg-clinic-navy group-hover:border-clinic-navy group-hover:text-white'
                            }`}
                          >
                            <ArrowUpRight size={14} strokeWidth={1.9} />
                          </span>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </ModularReveal>

            {/* Columna derecha: Widget Reel 9:16 sin marco exterior que acompaña todo el desplazamiento de la sección */}
            <div
              ref={treatmentsRightColRef}
              className="hidden lg:block lg:col-span-5 relative z-30 self-stretch"
            >
              <div
                ref={treatmentsFloatingCardRef}
                style={{ transform: 'translate3d(0, 0, 0)' }}
                className="w-full max-w-[350px] xl:max-w-[376px] ml-auto transition-transform duration-150 ease-out will-change-transform"
              >
                {(() => {
                  const activeT = TREATMENTS[activeTreatmentIdx] || TREATMENTS[0];
                  const activeLoc = tr.tratamentosSection.items[activeT.id] || activeT;
                  return (
                    <div
                      onClick={() => {
                        setPriceModalTreatmentId(activeT.id);
                        setIsPriceModalOpen(true);
                      }}
                      className="aspect-[9/15] w-full overflow-hidden rounded-[28px] bg-stone relative shadow-[0_26px_60px_-14px_rgba(30,34,88,0.22)] group cursor-pointer ml-auto"
                    >
                      {TREATMENTS.map((item, idx) => {
                        const locItem = tr.tratamentosSection.items[item.id] || item;
                        const isShown = activeTreatmentIdx === idx;
                        return (
                          <img
                            key={item.id}
                            src={item.img}
                            alt={locItem.title}
                            loading={shouldPreloadTreatments || idx < 3 ? 'eager' : 'lazy'}
                            decoding="async"
                            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
                              isShown
                                ? 'opacity-100 scale-100 z-10'
                                : 'opacity-0 scale-[1.04] z-0 pointer-events-none'
                            }`}
                          />
                        );
                      })}

                      {/* Velo cristalino sutil para realzar la refracción del Liquid Glass */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1530]/35 via-transparent to-transparent z-20 pointer-events-none" />

                      {/* Tarjeta flotante inferior compacta en Liquid Glass (sin números, sin textos superiores y sin botones) */}
                      <div className="absolute bottom-3 inset-x-3 z-30 pointer-events-none">
                        <div className="liquid-glass-panel rounded-[18px] px-4 py-3 flex flex-col justify-end text-white">
                          <h3 className="font-serif text-lg xl:text-xl leading-snug text-white font-normal drop-shadow-xs truncate">
                            {activeLoc.title}
                          </h3>
                          <p className="text-[11px] xl:text-xs text-white/90 leading-snug line-clamp-1 mt-0.5">
                            {activeLoc.caption}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
           6. A EQUIPA (CARROSSEL DOUTORES — COR EM PRIMEIRO PLANO MÓVEL & HOVER DESKTOP)
           ===================================================== */}
      <section id="equipa" ref={equipaSectionRef} className="py-16 sm:py-28 md:py-44 bg-paper overflow-hidden">
        <div className="container-page">
          <ModularReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-12 md:mb-16">
              <div>
                <p className="eyebrow text-muted mb-2 sm:mb-4">{tr.equipa.eyebrow}</p>
                <h2 className="section-heading max-w-xl">
                  {tr.equipa.headingBefore}
                  <em>{tr.equipa.headingItalic}</em>
                  {tr.equipa.headingAfter}
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs font-serif text-muted tracking-wider hidden sm:inline-block">
                  {tr.equipa.membersCount}
                </span>
                <div className="flex items-center gap-2">
                  <LiquidButton
                    type="button"
                    variant="secondary"
                    onClick={scrollTeamLeft}
                    disabled={!canScrollTeamLeft}
                    aria-label={tr.equipa.prevAria}
                    className={`!w-9 !h-9 sm:!w-11 sm:!h-11 !p-0 !rounded-full flex items-center justify-center transition-all duration-300 ${
                      canScrollTeamLeft ? 'cursor-pointer' : 'opacity-35 cursor-not-allowed'
                    }`}
                  >
                    <span className="text-sm sm:text-base">←</span>
                  </LiquidButton>
                  <LiquidButton
                    type="button"
                    variant="secondary"
                    onClick={scrollTeamRight}
                    disabled={!canScrollTeamRight}
                    aria-label={tr.equipa.nextAria}
                    className={`!w-9 !h-9 sm:!w-11 sm:!h-11 !p-0 !rounded-full flex items-center justify-center transition-all duration-300 ${
                      canScrollTeamRight ? 'cursor-pointer' : 'opacity-35 cursor-not-allowed'
                    }`}
                  >
                    <span className="text-sm sm:text-base">→</span>
                  </LiquidButton>
                </div>
              </div>
            </div>
          </ModularReveal>

          <ModularReveal delay={1}>
            <div
              ref={teamScrollRef}
              onScroll={checkTeamScroll}
              className="flex gap-4 sm:gap-6 md:gap-7 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-2 sm:pb-4 -mx-6 px-6 sm:mx-0 sm:px-0"
            >
              {TEAM_MEMBERS.map((member, index) => {
                const isForegroundMobile = isEquipaInView && activeTeamIdx === index;
                const localizedRole =
                  member.id === 'team-8'
                    ? tr.equipa.roles['team-8'] || tr.equipa.ladineRole || member.role
                    : tr.equipa.roles[member.id] || member.role;
                return (
                  <div
                    key={member.id}
                    data-team-card-idx={index}
                    onClick={() => {
                      if (window.innerWidth < 1024 && activeTeamIdx !== index) {
                        scrollToTeamCard(index);
                      }
                    }}
                    className="group shrink-0 w-[min(60vw,34svh)] max-w-[228px] sm:max-w-none sm:w-[300px] md:w-[310px] lg:w-[320px] snap-center lg:snap-start"
                  >
                    <div
                      className={`aspect-[3/3.9] overflow-hidden bg-stone mb-2 sm:mb-3 relative rounded-2xl cursor-pointer transition-shadow duration-500 ${
                        isForegroundMobile ? 'shadow-md lg:shadow-sm' : 'shadow-sm'
                      }`}
                    >
                      <div
                        className={`w-full h-full transition-transform duration-700 ease-out will-change-transform ${
                          isForegroundMobile
                            ? 'scale-[1.03] lg:scale-100 lg:group-hover:scale-105'
                            : 'scale-100 lg:group-hover:scale-105'
                        }`}
                      >
                        <img
                          src={member.img}
                          alt={member.name}
                          loading={shouldPreloadEquipa || index < 2 ? 'eager' : 'lazy'}
                          decoding="async"
                          style={{
                            objectPosition: member.imagePosition || '50% 0%',
                            transform: member.scale ? `scale(${member.scale})` : undefined,
                            transformOrigin: member.transformOrigin || '50% 15%',
                          }}
                          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                            isForegroundMobile
                              ? 'grayscale-0 contrast-100 opacity-100 lg:grayscale lg:contrast-105 lg:opacity-90 lg:group-hover:grayscale-0 lg:group-hover:contrast-100 lg:group-hover:opacity-100'
                              : 'grayscale contrast-105 opacity-85 lg:opacity-90 lg:group-hover:grayscale-0 lg:group-hover:contrast-100 lg:group-hover:opacity-100'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col pt-0.5 sm:pt-1">
                      <h3
                        className={`font-serif text-base sm:text-lg font-medium transition-colors duration-500 leading-snug ${
                          isForegroundMobile
                            ? 'text-ink'
                            : 'text-ink/75 lg:text-ink lg:group-hover:text-ink/80'
                        }`}
                      >
                        {member.name}
                      </h3>
                      {localizedRole && (
                        <p className="text-[11.5px] sm:text-xs text-muted font-normal mt-0.5 leading-snug line-clamp-2 sm:line-clamp-none">
                          {localizedRole}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
              <div className="w-[14vw] shrink-0 lg:hidden" aria-hidden="true" />
            </div>

            <div className="mt-4 sm:mt-8 flex items-center gap-3.5">
              <span className="lg:hidden font-serif text-xs text-ink font-semibold tabular-nums shrink-0">
                {String(activeTeamIdx + 1).padStart(2, '0')}{' '}
                <span className="text-muted font-normal">
                  / {String(TEAM_MEMBERS.length).padStart(2, '0')}
                </span>
              </span>
              <div className="w-full max-w-[200px] h-[2px] bg-ink/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-ink transition-all duration-300 rounded-full"
                  style={{ width: `${Math.max(11.1, teamScrollProgress * 88.9 + 11.1)}%` }}
                />
              </div>
            </div>
          </ModularReveal>
        </div>
      </section>

      {/* =====================================================
           7. A CLÍNICA — STICKY HORIZONTAL SCROLL (MÓVIL Y ESCRITORIO)
           ===================================================== */}
      <section id="clinica" ref={clinicaSectionRef} className="relative bg-stone">
        <div className="h-[440vh] md:h-[500vh] relative">
          <div
            ref={clinicaStickyRef}
            className="sticky top-0 h-viewport-s md:h-screen w-full overflow-hidden flex flex-col justify-center pt-20 sm:pt-24 pb-4 md:pb-8"
          >
            <div className="container-page mb-3 sm:mb-5 md:mb-7 flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 sm:gap-6 shrink-0">
              <div>
                <div className="flex items-center gap-3 mb-1.5 sm:mb-2">
                  <p className="eyebrow text-muted">{tr.clinica.eyebrow}</p>
                  <span className="text-[11px] text-muted/70 tracking-widest font-mono">
                    {tr.clinica.spacesCount}
                  </span>
                </div>
                <h2 className="section-heading text-[1.7rem] sm:text-4xl md:text-[clamp(2.25rem,4.2vw,4rem)]">
                  {tr.clinica.headingLead} <em>{tr.clinica.headingItalic}</em>
                </h2>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto max-w-[220px]">
                <span className="font-serif text-xs text-ink font-semibold shrink-0">
                  {String(clinicaStepNum).padStart(2, '0')}{' '}
                  <span className="text-muted font-normal">
                    / {String(CLINICA_SPACES.length).padStart(2, '0')}
                  </span>
                </span>
                <div className="flex-1 sm:w-28 h-[2px] bg-ink/15 rounded-full overflow-hidden">
                  <div
                    ref={clinicaProgressBarRef}
                    className="h-full bg-clinic-navy rounded-full"
                    style={{ width: '8%' }}
                  />
                </div>
              </div>
            </div>

            <div className="w-full overflow-hidden py-1">
              <div
                ref={clinicaTrackRef}
                id="clinica-horizontal-track"
                style={{ transform: 'translate3d(0px, 0, 0)' }}
                className="flex items-start gap-3.5 sm:gap-6 md:gap-8 px-6 sm:px-[clamp(1.25rem,4vw,3.5rem)] w-max will-change-transform"
              >
                {CLINICA_SPACES.map((space, idx) => {
                  const localizedSpace = tr.clinica.spaces[idx] || space;
                  return (
                    <div
                      key={space.num}
                      className="group w-[78vw] max-w-[330px] sm:max-w-none sm:w-[520px] md:w-[600px] lg:w-[660px] shrink-0 cursor-pointer"
                    >
                      <div className="clinica-photo-frame aspect-video max-h-[46svh] sm:max-h-[54vh] lg:max-h-none w-full relative mb-2 sm:mb-3 bg-[#1e222a] overflow-hidden rounded-2xl shadow-sm">
                        <img
                          className="clinica-editorial-img w-full h-full object-cover object-center block group-hover:scale-[1.025] transition-transform duration-700 ease-out"
                          src={space.src}
                          alt={`${space.num} ${localizedSpace.title}`}
                          loading={shouldPreloadClinica || idx < 2 ? 'eager' : 'lazy'}
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none" />
                      </div>
                      <div className="pt-0.5 pb-1">
                        <p className="text-[13px] sm:text-sm text-ink font-medium tracking-tight leading-snug">
                          <span className="font-serif text-sm mr-2 text-ink/75 tabular-nums">{space.num}</span>
                          <span>{localizedSpace.title}</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div className="w-8 sm:w-20 md:w-32 shrink-0" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
           8. BANNER MACRO SONRISA CON PARALLAX
           ===================================================== */}
      <section className="relative w-full h-[60svh] sm:h-[75vh] md:h-[86vh] overflow-hidden bg-ink">
        <img
          data-parallax-id="banner-smile"
          data-parallax="0.24"
          src="https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_dentaria_santa_maria_dos_olivais_sorrisos.jpg"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src = 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_1.jpeg';
          }}
          alt={tr.smileBanner.alt}
          loading="lazy"
          decoding="async"
          className="absolute -top-[13%] left-0 w-full h-[126%] object-cover object-center md:will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-black/25" />
        <div className="absolute inset-0 flex items-end pb-12 sm:pb-16 md:pb-24 text-white">
          <div className="container-page">
            <ModularReveal>
              <h2 className="section-heading text-white max-w-xl drop-shadow-md">
                {tr.smileBanner.line1}
                <br />
                {tr.smileBanner.line2}
                <br />
                <em className="text-white italic">{tr.smileBanner.line3Italic}</em>
              </h2>
            </ModularReveal>
          </div>
        </div>
      </section>

      {/* =====================================================
           9. AVALIAÇÕES (CARRUSEL GOOGLE)
           ===================================================== */}
      <section className="py-16 sm:py-28 md:py-44 bg-paper">
        <div className="container-page">
          <ModularReveal>
            <p className="eyebrow text-muted mb-2 sm:mb-4">{tr.avaliacoes.eyebrow}</p>
            <h2 className="section-heading mb-8 sm:mb-12 md:mb-16">
              {tr.avaliacoes.headingBefore}
              <em>{tr.avaliacoes.headingItalic}</em>
              {tr.avaliacoes.headingAfter}
            </h2>
          </ModularReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 items-start">
            <ModularReveal delay={1} className="lg:col-span-4">
              <div>
                <p className="font-serif text-5xl sm:text-7xl md:text-8xl font-light tracking-tight mb-1.5 sm:mb-3 tabular-nums">
                  4{tr.meta.decimalSeparator}4
                </p>
                <div className="flex items-center gap-1 text-[#eab308] text-xs mb-2 sm:mb-3">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span className="text-ink/35">★</span>
                </div>
                <p className="text-xs text-muted leading-relaxed max-w-[240px] mb-3 sm:mb-5">
                  {tr.avaliacoes.ratingSummary}
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Estrada+de+Moscavide+N+32C,+1800-279,+Lisboa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-xs text-ink py-0.5"
                >
                  {tr.avaliacoes.viewAllGoogle}
                </a>
              </div>
            </ModularReveal>

            <ModularReveal delay={2} enableMouseGlow className="lg:col-span-8 flex flex-col justify-between sm:min-h-[300px]">
              <div>
                <LiquidCard
                  className="liquid-card-light p-5 sm:p-10 rounded-2xl sm:rounded-3xl mb-3 sm:mb-4 transition-shadow hover:shadow-[0_16px_40px_rgba(45,50,119,0.08)]"
                  onMouseEnter={() => setIsReviewPaused(true)}
                  onMouseLeave={() => setIsReviewPaused(false)}
                >
                  <div
                    id="review-box"
                    style={{
                      opacity: reviewAnimate ? 1 : 0,
                      transform: reviewAnimate ? 'translateY(0)' : 'translateY(8px)',
                    }}
                    className="transition-all duration-300 min-h-[135px] sm:min-h-[170px] flex flex-col justify-between"
                  >
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-3 sm:mb-5">
                      <div
                        className="flex items-center gap-1 text-[#eab308] text-sm sm:text-lg"
                        aria-label={tr.avaliacoes.starsAria(currentReview.rating)}
                      >
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={
                              star <= currentReview.rating
                                ? 'text-[#eab308]'
                                : 'text-ink/20'
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-ink/85 tabular-nums">
                        {currentReview.ratingLabel || `${currentReview.rating}/5`}
                      </span>
                      <span aria-hidden="true" className="text-ink/30 text-xs">
                        ·
                      </span>
                      <span className="text-xs text-muted">
                        {tr.avaliacoes.verifiedReview}
                      </span>
                    </div>

                    <blockquote
                      id="review-text"
                      className="font-serif text-[1.1rem] sm:text-2xl md:text-3xl leading-snug text-ink mb-4 sm:mb-6 italic"
                    >
                      “
                      {tr.avaliacoes.reviewQuotes[currentReview.id] ||
                        currentReview.review}
                      ”
                    </blockquote>

                    <div className="pt-3 sm:pt-4 border-t border-rule/60 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-clinic-navy text-white font-serif font-semibold text-xs flex items-center justify-center shrink-0 shadow-sm">
                          {currentReview.name.charAt(0)}
                        </div>
                        <div>
                          <span
                            id="review-author"
                            className="font-medium text-xs sm:text-sm text-ink block leading-tight"
                          >
                            {currentReview.name}
                          </span>
                          <span className="text-[11px] text-muted leading-tight block mt-0.5">
                            {tr.avaliacoes.verifiedPatient}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] tracking-wider uppercase font-semibold text-muted/75 hidden sm:inline-block">
                        {isReviewPaused
                          ? tr.avaliacoes.pausedLabel
                          : tr.avaliacoes.activeRotationLabel}
                      </span>
                    </div>
                  </div>
                </LiquidCard>

                <div className="border-t border-rule pt-3.5 mt-3.5 sm:pt-6 sm:mt-6 flex items-center justify-between">
                  <div className="font-serif text-sm text-muted tabular-nums">
                    <span id="review-counter" className="text-ink font-semibold">
                      {String(safeReviewIdx + 1).padStart(2, '0')}
                    </span>{' '}
                    / {String(REVIEWS.length).padStart(2, '0')}
                  </div>
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <LiquidButton
                      id="review-prev"
                      variant="secondary"
                      onClick={handlePrevReview}
                      aria-label={tr.avaliacoes.prevAria}
                      className="!w-10 !h-10 sm:!w-11 sm:!h-11 !p-0 !rounded-full flex items-center justify-center text-ink cursor-pointer"
                    >
                      ←
                    </LiquidButton>
                    <LiquidButton
                      id="review-next"
                      variant="secondary"
                      onClick={handleNextReview}
                      aria-label={tr.avaliacoes.nextAria}
                      className="!w-10 !h-10 sm:!w-11 sm:!h-11 !p-0 !rounded-full flex items-center justify-center text-ink cursor-pointer"
                    >
                      →
                    </LiquidButton>
                  </div>
                </div>
              </div>
            </ModularReveal>
          </div>
        </div>
      </section>

      {/* =====================================================
           10. MARCAÇÃO (AGENDAMENTO MÉDICO ONLINE GOHIGHLEVEL + MAPA)
           ===================================================== */}
      <section
        id="marcacao"
        className="relative py-16 sm:py-28 md:py-36 bg-ink text-paper overflow-hidden"
      >
        {/* Resplandor ambiental sutil */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-[8%] w-[420px] h-[420px] rounded-full opacity-20 blur-[110px]"
          style={{
            background:
              'radial-gradient(circle, rgba(212, 225, 87, 0.45) 0%, rgba(45, 50, 119, 0.3) 60%, transparent 80%)',
          }}
        />

        <div className="container-page relative z-10">
          <ModularReveal>
            <div className="max-w-6xl mx-auto rounded-3xl bg-paper text-ink border border-white/15 shadow-[0_28px_80px_rgba(0,0,0,0.45)] overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Coluna Esquerda: Retrato Dra. Ana Mata - Marcações Online */}
                <div className="lg:col-span-5 relative min-h-[420px] sm:min-h-[520px] lg:min-h-full bg-clinic-navy overflow-hidden">
                  <img
                    src="https://clinica-santa-maria-dos-olivais.b-cdn.net/dra_ana_mata_2026.JPG"
                    alt={tr.marcacao.doctorAlt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14161A]/95 via-[#14161A]/35 to-transparent" />

                  <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 lg:p-9 text-paper">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#d4e157]/20 border border-[#d4e157]/40 text-[#d4e157] text-[10.5px] font-semibold uppercase tracking-[0.12em] mb-3">
                      {tr.marcacao.doctorBadge}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
                      Dra. Ana Mata
                    </h3>
                    <p className="text-xs sm:text-sm text-paper/85 mt-2 leading-relaxed max-w-sm">
                      {tr.marcacao.doctorBio}
                    </p>
                  </div>
                </div>

                {/* Coluna Direita: Marcações Online em Tempo Real + Sobre a nossa avaliação */}
                <div className="lg:col-span-7 p-6 sm:p-9 lg:p-11 flex flex-col justify-between space-y-6">
                  {/* Topo: SMO Logo + Selo Marcações Online em Tempo Real */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2.5">
                        <img
                          src="https://clinica-santa-maria-dos-olivais.b-cdn.net/logo_clinica_santa_maria_dos_olivais-removebg-preview.png"
                          alt="SMO Logo"
                          loading="lazy"
                          decoding="async"
                          className="h-10 sm:h-12 w-auto object-contain -ml-1 shrink-0"
                        />
                        <div className="flex flex-col justify-center font-sans leading-[1.18] tracking-wide select-none">
                          <span className="text-[11.5px] sm:text-[13px] font-semibold">
                            <span className="text-[#2d3277]">Clínica </span>
                            <span className="text-[#8470be]">Santa Maria</span>
                          </span>
                          <span className="text-[11.5px] sm:text-[13px] font-semibold text-[#7a8e0e]">
                            dos Olivais
                          </span>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-clinic-navy/8 border border-clinic-navy/15">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-clinic-navy">
                          {tr.marcacao.realtimeBadge}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] text-ink font-normal leading-tight">
                        {tr.marcacao.cardTitleLead}<em className="text-clinic-navy">{tr.marcacao.cardTitleItalic}</em>
                      </h2>
                      <p className="text-xs sm:text-[14px] text-muted mt-2 leading-relaxed">
                        {tr.marcacao.cardSubtitle}
                      </p>
                    </div>
                  </div>

                  {/* Caixa Central: Sobre a nossa avaliação */}
                  <div className="rounded-2xl bg-white border border-rule p-5 sm:p-6 shadow-[0_8px_28px_rgba(30,34,88,0.05)] space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-rule/80">
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl text-clinic-navy font-normal">
                          {tr.marcacao.evalTitle}
                        </h3>
                        <p className="text-xs sm:text-[13px] text-ink/85 mt-0.5">
                          {tr.marcacao.evalSubtitle}
                        </p>
                      </div>

                      <div className="inline-flex items-baseline gap-1.5 bg-clinic-navy text-white px-4 py-2 rounded-2xl self-start sm:self-center shrink-0">
                        <span className="text-[11px] uppercase tracking-wider text-white/75 font-medium">
                          {tr.marcacao.costLabel}
                        </span>
                        <span className="font-serif text-2xl font-semibold text-[#d4e157]">
                          20€
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted mb-2.5">
                        {tr.marcacao.includesLabel}
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-xs sm:text-[13px] text-ink">
                        {tr.marcacao.includesItems.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-clinic-navy shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-rule/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <p className="text-xs sm:text-[13px] font-semibold text-clinic-navy">
                        {tr.marcacao.evalQuestion}
                      </p>
                      <p className="text-[11px] text-muted italic">
                        {tr.marcacao.evalFootnote}
                      </p>
                    </div>
                  </div>

                  {/* 3 Destaques de Confiança */}
                  <div className="space-y-2.5 text-xs sm:text-[13px] text-ink/90">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-clinic-navy shrink-0 mt-0.5" />
                      <p>
                        <strong className="text-ink">{tr.marcacao.highlight1Strong}</strong> {tr.marcacao.highlight1Text}
                      </p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Calendar className="w-4 h-4 text-clinic-navy shrink-0 mt-0.5" />
                      <p>
                        <strong className="text-ink">{tr.marcacao.highlight2Strong}</strong> {tr.marcacao.highlight2Text}
                      </p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-clinic-navy shrink-0 mt-0.5" />
                      <p>
                        <strong className="text-ink">{tr.marcacao.highlight3Strong}</strong> {tr.marcacao.highlight3Text}
                      </p>
                    </div>
                  </div>

                  {/* Botões de Ação (Liquid Glass) */}
                  <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                    <LiquidButton
                      type="button"
                      onClick={() => handleBookingSubmit()}
                      variant="lime"
                      className="flex-1 !py-4 !px-6 text-center !text-xs sm:!text-[13.5px] !font-semibold flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <MessageCircle size={16} strokeWidth={2.2} />
                      <span>{tr.marcacao.submitWhatsApp}</span>
                    </LiquidButton>

                    <LiquidButton
                      href="tel:+351300601645"
                      variant="primary"
                      className="!py-4 !px-6 text-center !text-xs sm:!text-[13.5px] !font-semibold flex items-center justify-center gap-2 tabular-nums shrink-0"
                    >
                      <Phone size={15} strokeWidth={2} />
                      <span>{tr.marcacao.phoneBtn}</span>
                    </LiquidButton>
                  </div>
                </div>
              </div>
            </div>
          </ModularReveal>

          {/* Bloco Complementar: Horário, Morada e Mapa */}
          <ModularReveal delay={1} className="max-w-6xl mx-auto mt-10 sm:mt-12 pt-8 border-t border-ruleDark">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="grid grid-cols-2 gap-4 sm:gap-6 py-4 border-y border-ruleDark text-xs">
                  <div>
                    <p className="eyebrow text-mutedInk mb-1.5">{tr.marcacao.scheduleEyebrow}</p>
                    <p className="text-paper/90 leading-relaxed">
                      {tr.marcacao.scheduleWeekdays}
                      <br />
                      {tr.marcacao.scheduleSaturday}
                    </p>
                  </div>
                  <div>
                    <p className="eyebrow text-mutedInk mb-1.5">{tr.marcacao.addressEyebrow}</p>
                    <p className="text-paper/90 leading-relaxed">
                      Estrada de Moscavide N 32C
                      <br />
                      1800-279, Lisboa
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-mutedInk/70">
                  {tr.marcacao.privacyNotePrefix}{' '}
                  <button
                    type="button"
                    onClick={() => setIsPrivacyModalOpen(true)}
                    className="link-underline py-0.5 text-paper cursor-pointer"
                  >
                    {tr.marcacao.privacyLink}
                  </button>
                </p>
              </div>

              <div className="lg:col-span-6">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black rounded-2xl sm:rounded-3xl border border-white/10 shadow-lg">
                  {!showMap ? (
                    <div id="map-card-preview" className="absolute inset-0">
                      <img
                        src="https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_dentaria_santa_maria_dos_olivais_moscavide.jpg"
                        alt="Clínica Santa Maria dos Olivais — Estrada de Moscavide N 32C Lisboa"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-5 sm:left-5 sm:right-5 flex items-end justify-between gap-2">
                        <div>
                          <p className="font-serif text-lg sm:text-2xl text-paper leading-tight mb-2 sm:mb-3">
                            Estrada de Moscavide N 32C
                            <br />
                            Lisboa
                          </p>
                          <LiquidButton
                            type="button"
                            id="show-map-btn"
                            variant="primary"
                            onClick={() => setShowMap(true)}
                            className="!px-3.5 sm:!px-4 !py-1.5 sm:!py-2 !text-xs !font-medium"
                          >
                            {tr.marcacao.showMap}
                          </LiquidButton>
                        </div>
                        <a
                          href="https://www.google.com/maps/search/?api=1&query=Estrada+de+Moscavide+N+32C,+1800-279,+Lisboa"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-paper/85 underline underline-offset-4 hover:text-white shrink-0"
                        >
                          {tr.marcacao.openGoogleMaps}
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div id="map-embed" className="absolute inset-0">
                      <iframe
                        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.952242496215!2d-9.142685!3d38.722252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19338210000001%3A0x0!2sLisboa!5e0!3m2!1s${locale}!2spt!4v1700000000000`}
                        title="Google Maps Lisboa"
                        className="w-full h-full border-0 grayscale contrast-125"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ModularReveal>
        </div>
      </section>

      {/* =====================================================
           11. PERGUNTAS FREQUENTES
           ===================================================== */}
      <section id="perguntas" className="py-16 sm:py-28 md:py-44 bg-paper">
        <div className="container-page">
          <ModularReveal>
            <p className="eyebrow text-muted mb-2.5 sm:mb-4">{tr.faq.eyebrow}</p>
            <h2 className="section-heading mb-8 sm:mb-14 md:mb-20">
              {tr.faq.headingLead} <em>{tr.faq.headingItalic}</em>
            </h2>
          </ModularReveal>

          <ModularReveal delay={1} className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-start-5 lg:col-span-8 border-t border-rule">
              {tr.faq.items.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className={`faq-row ${isOpen ? 'open' : ''} border-b border-rule py-4 sm:py-6 cursor-pointer`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-serif text-lg sm:text-2xl md:text-[1.65rem] text-ink font-normal leading-snug">
                        {faq.question}
                      </h3>
                      <span className="faq-btn w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-rule flex items-center justify-center text-sm transition-all duration-300 shrink-0">
                        +
                      </span>
                    </div>
                    <div className="faq-content">
                      <div className="overflow-hidden">
                        <p className="text-[13px] sm:text-[13.5px] text-muted leading-relaxed pt-3 sm:pt-4 max-w-xl">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ModularReveal>
        </div>
      </section>

      {/* =====================================================
           12. FOOTER + BARRA LEGAL PORTUGAL
           ===================================================== */}
      <footer className="relative pt-16 sm:pt-24 pb-10 sm:pb-14 bg-stone/75 border-t border-rule overflow-hidden">
        {/* Sutil luz ambiental superior para dar profundidade editorial */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-clinic-navy/20 to-transparent"
        />

        <div className="container-page relative z-10">
          <ModularReveal>
            {/* NIVEL 1: Cabecera Editorial de Cierre (Marca + Titular + Acciones Principales) */}
            <div className="pb-12 sm:pb-16 border-b border-rule grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-end">
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                <a
                  href="#top"
                  className="inline-flex items-center gap-3 sm:gap-3.5 transition-opacity hover:opacity-85"
                >
                  <img
                    src="https://clinica-santa-maria-dos-olivais.b-cdn.net/logo_clinica_santa_maria_dos_olivais-removebg-preview.png"
                    alt="Clínica Santa Maria dos Olivais"
                    loading="lazy"
                    decoding="async"
                    className="h-14 sm:h-20 w-auto object-contain -ml-1.5 shrink-0"
                  />
                  <div className="flex flex-col justify-center font-sans leading-[1.18] tracking-wide select-none">
                    <span className="text-[13px] sm:text-[15px] font-semibold">
                      <span className="text-[#2d3277]">Clínica </span>
                      <span className="text-[#8470be]">Santa Maria</span>
                    </span>
                    <span className="text-[13px] sm:text-[15px] font-semibold text-[#7a8e0e]">
                      dos Olivais
                    </span>
                  </div>
                </a>

                <h2 className="section-heading text-ink max-w-xl">
                  {tr.footer.headingLead}{' '}
                  <em className="text-clinic-navy">{tr.footer.headingItalic}</em>
                </h2>
              </div>

              <div className="lg:col-span-5 flex flex-wrap items-center lg:justify-end gap-3 sm:gap-3.5">
                <LiquidButton
                  type="button"
                  onClick={() => handleOpenChatbot()}
                  variant="primary"
                  className="!px-6 sm:!px-7 !py-3.5 !text-xs sm:!text-[13px] !font-semibold inline-flex items-center justify-center shadow-lg cursor-pointer min-h-[46px]"
                >
                  <span>{tr.footer.ctaBook}</span>
                </LiquidButton>

                <LiquidButton
                  href="https://wa.me/351912907024"
                  onClick={() => trackWhatsAppClick('Consulta de Avaliação Dentária')}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="lime"
                  className="!px-6 sm:!px-7 !py-3.5 !text-xs sm:!text-[13px] !font-semibold inline-flex items-center justify-center shadow-md min-h-[46px]"
                >
                  <span>WhatsApp</span>
                </LiquidButton>
              </div>
            </div>

            {/* NIVEL 2: Directorio Estructurado en 4 Columnas Armónicas */}
            <div className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-y-10 sm:gap-x-8 lg:gap-x-10 text-xs">
              {/* Columna 1: Dirección & Cómo llegar */}
              <div className="lg:col-span-3 flex flex-col justify-between space-y-5">
                <div className="space-y-3.5">
                  <p className="eyebrow text-muted flex items-center gap-2">
                    <MapPin size={13} strokeWidth={1.8} className="text-clinic-navy shrink-0" />
                    <span>{tr.footer.visitEyebrow}</span>
                  </p>
                  <div className="space-y-1 text-[13.5px] leading-relaxed">
                    <p className="font-serif text-lg text-ink font-normal leading-snug">
                      Estrada de Moscavide N 32C
                    </p>
                    <p className="text-muted">1800-279 · Lisboa, Portugal</p>
                  </div>
                </div>

                <div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Estrada+de+Moscavide+N+32C,+1800-279,+Lisboa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[12px] font-medium text-clinic-navy link-underline py-0.5"
                  >
                    <span>{tr.marcacao.openGoogleMaps.replace(/\s*↗$/, '')}</span>
                    <ArrowUpRight size={13} strokeWidth={1.8} />
                  </a>
                </div>
              </div>

              {/* Columna 2: Horario Clínico */}
              <div className="lg:col-span-3 space-y-3.5">
                <p className="eyebrow text-muted flex items-center gap-2">
                  <Clock size={13} strokeWidth={1.8} className="text-clinic-navy shrink-0" />
                  <span>{tr.footer.hoursTitle.replace(/:$/, '')}</span>
                </p>

                <div className="divide-y divide-rule/70 border-y border-rule/70 text-[12.5px]">
                  <div className="py-2.5 text-ink leading-relaxed">
                    {tr.footer.hoursWeekdays}
                  </div>
                  <div className="py-2.5 text-ink leading-relaxed">
                    {tr.footer.hoursSaturday}
                  </div>
                </div>
              </div>

              {/* Columna 3: Canales de Contacto Directo */}
              <div className="sm:col-span-2 lg:col-span-4 space-y-4">
                <p className="eyebrow text-muted flex items-center gap-2">
                  <Phone size={13} strokeWidth={1.8} className="text-clinic-navy shrink-0" />
                  <span>{tr.footer.contactsEyebrow}</span>
                </p>

                <div className="p-4 sm:p-5 rounded-2xl bg-paper/80 border border-rule/80 space-y-4 shadow-[0_2px_12px_rgba(30,34,88,0.03)]">
                  {/* Línea principal destacada */}
                  <div className="pb-3.5 border-b border-rule/70">
                    <p className="text-[10.5px] uppercase tracking-[0.08em] font-semibold text-muted mb-1">
                      {tr.footer.customerSupport}
                    </p>
                    <a
                      href="tel:+351300601645"
                      className="font-serif text-xl sm:text-[22px] text-clinic-navy hover:text-ink transition-colors tabular-nums leading-tight inline-block"
                    >
                      300 601 645
                    </a>
                    <p className="text-[11px] text-muted mt-0.5 leading-snug">
                      {tr.footer.customerSupportNote}
                    </p>
                  </div>

                  {/* Recepción + WhatsApp en paralelo */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <p className="text-[10.5px] uppercase tracking-[0.08em] font-semibold text-muted mb-0.5">
                        {tr.footer.reception}
                      </p>
                      <a
                        href="tel:+351211350066"
                        className="text-[13px] font-semibold text-ink hover:text-clinic-navy transition-colors tabular-nums"
                      >
                        211 350 066
                      </a>
                    </div>

                    <div>
                      <p className="text-[10.5px] uppercase tracking-[0.08em] font-semibold text-muted mb-0.5 flex items-center gap-1">
                        <MessageCircle size={11} strokeWidth={2} className="text-clinic-navy" />
                        <span>WhatsApp</span>
                      </p>
                      <a
                        href="https://wa.me/351912907024"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] font-semibold text-ink hover:text-clinic-navy transition-colors tabular-nums"
                      >
                        +351 912 907 024
                      </a>
                    </div>
                  </div>

                  {/* Correo electrónico */}
                  <div className="pt-3 border-t border-rule/70 flex items-center justify-between gap-2">
                    <span className="text-[10.5px] uppercase tracking-[0.08em] font-semibold text-muted flex items-center gap-1.5 shrink-0">
                      <Mail size={11} strokeWidth={2} className="text-clinic-navy" />
                      <span>{tr.footer.email}</span>
                    </span>
                    <a
                      href="mailto:clinicasmod@gmail.com"
                      className="text-[12.5px] font-medium text-clinic-navy link-underline truncate"
                    >
                      clinicasmod@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Columna 4: Índice de Navegación */}
              <div className="lg:col-span-2 space-y-3.5">
                <p className="eyebrow text-muted">{tr.footer.navigationEyebrow}</p>
                <ul className="grid grid-cols-2 sm:grid-cols-1 gap-y-2.5 gap-x-4 text-[13px] text-ink">
                  <li>
                    <a href="#primeira-consulta" className="link-underline py-0.5 inline-block">
                      {tr.nav.primeiraConsulta}
                    </a>
                  </li>
                  <li>
                    <a href="#tratamentos" className="link-underline py-0.5 inline-block">
                      {tr.nav.tratamentos}
                    </a>
                  </li>
                  <li>
                    <a href="#equipa" className="link-underline py-0.5 inline-block">
                      {tr.nav.equipa}
                    </a>
                  </li>
                  <li>
                    <a href="#clinica" className="link-underline py-0.5 inline-block">
                      {tr.nav.clinica}
                    </a>
                  </li>
                  <li>
                    <a href="#perguntas" className="link-underline py-0.5 inline-block">
                      {tr.nav.perguntas}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#marcacao"
                      className="link-underline py-0.5 inline-block font-medium text-clinic-navy"
                    >
                      {tr.footer.navMarcacao}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </ModularReveal>

          {/* NIVEL 3: Barra Legal & Regulatoria Portugal (OMD / ERS) */}
          <div className="border-t border-rule pt-6 sm:pt-8 text-[11.5px] text-muted space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <p className="leading-relaxed text-ink/80">{tr.footer.legalClinicLine}</p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 shrink-0">
                <a
                  href="https://www.livroreclamacoes.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 link-underline py-0.5 hover:text-ink transition"
                >
                  <span>{tr.footer.complaintsBook}</span>
                  <ArrowUpRight size={12} strokeWidth={1.8} />
                </a>
                <span aria-hidden="true" className="hidden sm:inline text-rule">
                  ·
                </span>
                <button
                  type="button"
                  onClick={() => setIsPrivacyModalOpen(true)}
                  className="link-underline py-0.5 hover:text-ink transition cursor-pointer text-left"
                >
                  {tr.footer.privacyPolicy}
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-rule/50 flex items-center justify-between gap-4 pr-14 sm:pr-16">
              <p className="text-[11px] text-muted/90">{tr.footer.copyright}</p>

              <a
                href="#top"
                aria-label={
                  locale === 'es'
                    ? 'Volver arriba'
                    : locale === 'en'
                      ? 'Back to top'
                      : locale === 'fr'
                        ? 'Retour en haut'
                        : locale === 'de'
                          ? 'Nach oben'
                          : locale === 'it'
                            ? 'Torna su'
                            : 'Voltar ao topo'
                }
                className="w-9 h-9 rounded-full border border-rule bg-paper/80 hover:bg-clinic-navy text-ink hover:text-white transition-colors duration-200 flex items-center justify-center shrink-0 shadow-xs"
              >
                <ArrowUp size={14} strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Pop-up elegante com tabela de preços da categoria selecionada */}
      <PriceListModal
        isOpen={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
        treatmentId={priceModalTreatmentId}
        locale={locale}
        onBookTreatment={(treatmentTitle, userMessage) => {
          handleOpenChatbot(treatmentTitle, userMessage);
        }}
      />

      {/* Assistente Virtual Interativo da Clínica */}
      <ChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        locale={locale}
        initialTreatment={chatbotInitialTreatment}
        initialMessage={chatbotInitialMessage}
        onSelectTreatmentToBook={(selectedTreatment) => {
          if (selectedTreatment) {
            const matched = TREATMENTS.find(
              (t) =>
                t.id.toLowerCase() === selectedTreatment.toLowerCase() ||
                tr.tratamentosSection.items[t.id]?.title.toLowerCase() ===
                  selectedTreatment.toLowerCase()
            );
            setBookingTreatment(matched ? matched.id : selectedTreatment);
          }
          const marcacao = document.getElementById('marcacao');
          if (marcacao) {
            marcacao.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* Política de Privacidade & Sigilo Médico-Dentário */}
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        locale={locale}
      />
    </div>
  );
}
