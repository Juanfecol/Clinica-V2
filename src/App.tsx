import React, { useEffect, useState, useRef } from 'react';
import { AnimatedCounter } from './components/AnimatedCounter';
import { LiquidButton, LiquidCard, LiquidPill } from './components/LiquidGlass';
import PriceListModal from './components/PriceListModal';
import ChatbotModal from './components/ChatbotModal';
import { openLeadConnectorWidget } from './utils/leadConnector';
import ModularReveal from './components/ModularReveal';
import { TreatmentRibbonItem } from './components/TreatmentRibbonItem';
import { GOOGLE_REVIEWS } from './data/reviewsData';
import {
  formatWhatsAppMessage,
  clampValue,
  getNextReviewIndex,
  getPrevReviewIndex,
} from './utils/booking';

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
    subtitle: 'Reabilitação fixa e cirurgia guiada 3D',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/implantologia_clinia_santa_maria_dos_olivais.JPG',
    caption: 'Reposição de dentes em falta, planeada em imagem 3D.',
    description: 'Recupere a estabilidade de mastigação e a confiança de sorrir com implantes biocompatíveis de titânio, planeados com recurso a tomografia 3D e cirurgia minimamente invasiva.',
    benefits: ['Carga imediata em 24h', 'Planeamento cirúrgico 3D', 'Preservação do osso maxilar'],
    duration: '1 a 3 consultas · Reabilitação definitiva',
  },
  {
    id: 'Ortodontia invisível',
    number: '02',
    title: 'Ortodontia & Alinhadores',
    subtitle: 'Invisalign, aparelhos fixos e contenções',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Invisible_orthodontics_custom_cl%E2%80%A6_5d7d5c94_4K.jpg',
    caption: 'Alinhadores transparentes desenhados à medida do seu sorriso.',
    description: 'Corrija dentes desalinhados e problemas de oclusão com alinhadores transparentes removíveis ou aparelhos fixos de alta precisão. Tratamento discreto e higiénico.',
    benefits: ['100% discreto e removível', 'Opções fixas e alinhadores', 'Simulação digital prévia'],
    duration: '6 a 18 meses · Consultas periódicas',
  },
  {
    id: 'Estética dentária',
    number: '03',
    title: 'Estética dentária',
    subtitle: 'Facetas cerâmicas e harmonização do sorriso',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/estetica_dentaria_clinica_santa_maria_dos_olivais.jpg',
    caption: 'Facetas e restaurações que respeitam as proporções do rosto.',
    description: 'Recupere a harmonia estética com facetas ultrafinas e restaurações estéticas desenhadas de acordo com o padrão anatómico natural e traços do seu rosto.',
    benefits: ['Facetas em cerâmica ultrafina', 'Digital Smile Design', 'Conservação do esmalte natural'],
    duration: '2 a 3 consultas · Transformação natural',
  },
  {
    id: 'Branqueamento',
    number: '04',
    title: 'Branqueamento dentário',
    subtitle: 'Luminosidade natural e proteção do esmalte',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Branqueamento_clinica_santa_maria_dos_olivais.jpg',
    caption: 'Luminosidade natural devolvida com protocolos clínicos seguros.',
    description: 'Clareamento seguro em consultório ou com goteiras de aplicação noturna para casa, sob supervisão clínica rigorosa, sem agredir o esmalte nem causar sensibilidade persistente.',
    benefits: ['Protocolo sem dor nem abrasão', 'Resultados visíveis de imediato', 'Acompanhamento clínico'],
    duration: '1 sessão em clínica + kit de reforço',
  },
  {
    id: 'Endodontia',
    number: '05',
    title: 'Endodontia (Desvitalização)',
    subtitle: 'Tratamento de canais radiculares e alívio de dor',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/endodontia_clinica_santa_maria_dos_olivais.jpg',
    caption: 'Tratamento de canais para salvar dentes naturais com precisão radiológica digital.',
    description: 'Desinfeção e obturação hermética do sistema de canais radiculares. Alivia dores agudas, elimina infeções e preserva o dente na sua arcada original com máximo conforto.',
    benefits: ['Alívio imediato da dor e infeção', 'Preservação da raiz natural', 'Diagnóstico com radiografia digital'],
    duration: '1 a 2 consultas especializadas',
  },
  {
    id: 'Próteses',
    number: '06',
    title: 'Próteses dentárias',
    subtitle: 'Coroas em zircónia, próteses flexíveis e acrílicas',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/prosteticos_clinica_santa_maria_dos_olivais.jpg',
    caption: 'Reabilitação funcional e mastigatória com próteses leves e coroas estéticas.',
    description: 'Substituição precisa de peças dentárias com próteses removíveis de resina acrílica, esqueléticas com estrutura leve ou próteses flexíveis sem ganchos metálicos visíveis, além de coroas em zircónia.',
    benefits: ['Materiais biocompatíveis e resistentes', 'Recuperação do conforto mastigatório', 'Ajuste anatómico rigoroso'],
    duration: '2 a 4 consultas laboratoriais',
  },
  {
    id: 'Cirurgia Oral',
    number: '07',
    title: 'Cirurgia oral & sisos',
    subtitle: 'Extrações cirúrgicas, dentes do siso e enxertos',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Cirurgia_oral_sisos_clinica_santa_maria_dos_olivais.jpg',
    caption: 'Cirurgia de terceiros molares e regeneração óssea minimamente invasiva.',
    description: 'Procedimentos cirúrgicos realizados pelo Dr. Júlio, com técnica atraumática para extração de dentes do siso inclusos ou erupcionados, remodelação alveolar e enxertos de osso para implantes.',
    benefits: ['Técnica minimamente invasiva', 'Recuperação pós-operatória suave', 'Planeamento com raio-x digital'],
    duration: '1 consulta cirúrgica + revisão pós-operatória',
  },
  {
    id: 'Medicina dentária geral',
    number: '08',
    title: 'Medicina dentária geral',
    subtitle: 'Prevenção, higiene oral, restaurações e bruxismo',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Medicina%20_denta%CC%81ria_geral_clinica_santa_maria_dos_olivais.jpg',
    caption: 'Rotina, higiene oral e prevenção. A base de tudo o resto.',
    description: 'Manutenção da saúde de dentes e gengivas através de destartarização com ultrassons, curetagem periodontal, restaurações estéticas diretas e placas de relaxamento para bruxismo.',
    benefits: ['Higiene oral profunda indolor', 'Deteção precoce de lesões', 'Preservação dentária'],
    duration: '1 consulta de rotina semestral',
  },
  {
    id: 'Odontopediatria',
    number: '09',
    title: 'Odontopediatria',
    subtitle: 'Consultas lúdicas e sem medo para crianças',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Odontopediatria_clinica_santa_maria_dos_olivais.jpg',
    caption: 'Consultas ao ritmo das crianças, para crescerem sem receio.',
    description: 'Acompanhamento do desenvolvimento dentário e esquelético infantil num ambiente calmo e acolhedor com a Dra. Ori, focado na prevenção e na criação de uma relação positiva com o dentista.',
    benefits: ['Abordagem psicológica positiva', 'Aplicação de flúor e selantes', 'Acompanhamento do crescimento'],
    duration: 'Consultas periódicas a partir do 1.º ano',
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
    role: 'Direção Clínica · Implantologia & Reabilitação Oral Avançada',
    omd: 'OMD n.º [Cédula]',
    specialty: 'Especialista em implantologia de titânio, carga imediata e reabilitação oral',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/dra_ana_mata_2026.JPG',
    imagePosition: '50% 12%',
  },
  {
    id: 'team-2',
    name: 'Dra. Mariana Aberto',
    role: 'Ortodontia & Alinhadores Invisíveis (Invisalign / Spark)',
    omd: 'OMD n.º [Cédula]',
    specialty: 'Especialista em correção oclusal e estética do sorriso infantil e adulto',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-132.jpeg',
    imagePosition: '64% 0%',
  },
  {
    id: 'team-3',
    name: 'Dra. Alexandra Lucas',
    role: 'Periodontologia & Saúde Gengival',
    omd: 'OMD n.º [Cédula]',
    specialty: 'Especialista em diagnóstico periodontal, detenção de perda óssea e gengivas',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-67.jpeg',
    imagePosition: '50% 0%',
  },
  {
    id: 'team-4',
    name: 'Dra. Orizanda Claret',
    role: 'Odontopediatria & Prevenção Infantil',
    omd: 'OMD n.º [Cédula]',
    specialty: 'Especialista em atendimento dentário pediátrico e adaptação sem medo para crianças',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-51.jpeg',
    imagePosition: '50% 0%',
  },
  {
    id: 'team-5',
    name: 'Dr. Tomás Machado',
    role: 'Dentisteria Estética, Endodontia & Cirurgia Oral',
    omd: 'OMD n.º [Cédula]',
    specialty: 'Especialista em tratamento de canais radiculares, restaurações e próteses',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-227.jpeg',
    imagePosition: '50% 6%',
  },
  {
    id: 'team-6',
    name: 'Dr. Júlio',
    role: 'Cirurgia Oral Avançada & Extração de Dentes do Siso',
    omd: 'OMD n.º [Cédula]',
    specialty: 'Especialista em procedimentos cirúrgicos e terceiros molares inclusos',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/dr_julio_clinica_smo.jpg',
    imagePosition: '50% 0%',
    scale: 1.06,
    transformOrigin: '50% 15%',
  },
  {
    id: 'team-7',
    name: 'Dr. Francisco',
    role: 'Clínica Geral, Endodontia & Próteses Dentárias',
    omd: 'OMD n.º [Cédula]',
    specialty: 'Especialista em desvitalizações, coroas estéticas e próteses',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/dra_francisco.jpeg',
    imagePosition: '50% 0%',
    scale: 1.08,
    transformOrigin: '50% 15%',
  },
  {
    id: 'team-carla',
    name: 'Carla Claro',
    role: 'Receção & Coordenação de Apoio ao Cliente',
    omd: '',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-94.jpeg',
    imagePosition: '50% 0%',
  },
];

const ADDITIONAL_TEAM_MEMBERS = [
  {
    id: 'team-ladine',
    name: 'Dra. Ladine',
    role: 'Clínica Geral & Reabilitação Oral',
    omd: 'OMD n.º [Cédula]',
    description: 'Higiene oral, próteses removíveis, branqueamento e placas de bruxismo.',
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
    title: 'Receção e Balcão de Acolhimento',
    subtitle: 'Atendimento inicial, marcações e certificados clínicos',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_1.jpeg',
  },
  {
    num: '02',
    title: 'Gabinete de Consulta e Fotografia Clínica',
    subtitle: 'Secretária de planeamento, sofá de aconselhamento e luz fotográfica',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_2.jpeg',
  },
  {
    num: '03',
    title: 'Gabinete Dentário e Radiografia Intraoral',
    subtitle: 'Cadeira ergonómica, foco cirúrgico e braço de raio-X de parede',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_3.jpeg',
  },
  {
    num: '04',
    title: 'Consultório de Odontopediatria',
    subtitle: 'Cadeira infantil acolhedora, espaço sem medo e materiais dedicados',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_4.jpeg',
  },
  {
    num: '05',
    title: 'Sala de Espera com Jardim Vertical',
    subtitle: 'Espaço relaxante com plantas naturais e assentos confortáveis',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_5.png',
  },
  {
    num: '06',
    title: 'Central de Esterilização e Biossegurança',
    subtitle: 'Autoclave hospitalar Europa B EVO, cuba ultrassónica e controlo biológico',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_6.jpeg',
  },
  {
    num: '07',
    title: 'Gabinete Dentário e Diagnóstico Radiológico',
    subtitle: 'Cadeira clínica azul-turquesa, negatoscópio e monitor de apoio',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_7.jpeg',
  },
  {
    num: '08',
    title: 'Gabinete Clínico e Apoio ao Paciente',
    subtitle: 'Unidade dentária multifunções, ecrã panorâmico e cadeira de acompanhante',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_8.jpeg',
  },
  {
    num: '09',
    title: 'Gabinete de Ortodontia e Prevenção',
    subtitle: 'Bancada clínica completa, aparelho radiológico e alinhadores',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_9.jpeg',
  },
];

const REVIEWS = GOOGLE_REVIEWS;

const FAQS = [
  {
    question: 'Têm acordos com seguros?',
    answer: 'Trabalhamos com [lista de seguros e acordos]. Confirmamos consigo o que o seu plano cobre antes da consulta.',
  },
  {
    question: 'Atendem urgências?',
    answer: 'Sim, reservamos períodos diários para urgências. Entre em contacto por telefone ou WhatsApp para lhe darmos resposta no próprio dia.',
  },
  {
    question: 'Posso pagar de forma faseada?',
    answer: 'Sim. Apresentamos planos de pagamento faseado ajustados ao ritmo do seu tratamento, sem burocracia.',
  },
  {
    question: 'Como é a primeira consulta?',
    answer: 'Começamos por conversar e ouvir o que o traz cá. Realizamos fotografia e radiografia digital e entregamos um plano de tratamento claro.',
  },
  {
    question: 'A partir de que idade trago o meu filho?',
    answer: 'Recomendamos a primeira visita a partir do nascimento dos primeiros dentes ou por volta do primeiro ano de idade.',
  },
  {
    question: 'Há estacionamento perto?',
    answer: 'Sim, existe estacionamento público à porta e parque coberto a menos de 2 minutos a pé da clínica.',
  },
];

const MANIFESTO_TEXT = 'Por trás de cada sorriso existe uma história. Cuidamos de si com tempo, carinho e a tranquilidade de voltar a sorrir sem medos.';
const MANIFESTO_WORDS = MANIFESTO_TEXT.split(/\s+/);

export default function App() {
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

  // Manifesto word scrub direct DOM refs
  const manifestoWordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Consulta progress direct DOM ref & discrete dot states
  const consultaLineRef = useRef<HTMLDivElement>(null);
  const [step2Active, setStep2Active] = useState<boolean>(false);
  const step2ActiveRef = useRef<boolean>(false);
  const [step3Active, setStep3Active] = useState<boolean>(false);
  const step3ActiveRef = useRef<boolean>(false);

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

  // Treatment hover state (desktop) & Reel carousel state (mobile)
  const [activeTreatment, setActiveTreatment] = useState<TreatmentData>(TREATMENTS[0]);
  const [treatmentImageOpacity, setTreatmentImageOpacity] = useState<number>(1);
  const [treatmentImageScale, setTreatmentImageScale] = useState<number>(1);
  const treatmentCarouselRef = useRef<HTMLDivElement>(null);
  const [mobileTreatmentIdx, setMobileTreatmentIdx] = useState<number>(0);

  const handleMobileTreatmentScroll = () => {
    const container = treatmentCarouselRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    const ratio = clampValue(scrollLeft / maxScroll, 0, 1);
    const idx = Math.round(ratio * (TREATMENTS.length - 1));
    setMobileTreatmentIdx((prev) => (prev !== idx ? idx : prev));
  };

  const scrollMobileTreatment = (direction: -1 | 1) => {
    const container = treatmentCarouselRef.current;
    if (!container) return;
    const nextIdx = clampValue(mobileTreatmentIdx + direction, 0, TREATMENTS.length - 1);
    const targetCard = container.querySelector(
      `[data-treatment-card-idx="${nextIdx}"]`
    ) as HTMLElement | null;
    if (targetCard) {
      const targetLeft =
        targetCard.offsetLeft - (container.clientWidth - targetCard.offsetWidth) / 2;
      container.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
      setMobileTreatmentIdx(nextIdx);
    }
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

  // Automatic continuous rotation of Google Reviews
  useEffect(() => {
    if (isReviewPaused || GOOGLE_REVIEWS.length <= 1) return;

    const interval = setInterval(() => {
      setReviewAnimate(false);
      setTimeout(() => {
        setReviewIdx((prev) => (prev + 1) % GOOGLE_REVIEWS.length);
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

  // Booking form state
  const [bookingNome, setBookingNome] = useState('');
  const [bookingTelefone, setBookingTelefone] = useState('');
  const [bookingTratamento, setBookingTratamento] = useState(TREATMENTS[0].title);
  const [bookingDia, setBookingDia] = useState('Qualquer dia');
  const [bookingHora, setBookingHora] = useState('Qualquer hora');

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

  const handleOpenChatbot = (treatmentTitle?: string, userMessage?: string) => {
    const title = treatmentTitle || 'Consulta Geral';
    const message = userMessage || `Quero marcar consulta para ${title}`;
    setChatbotInitialTreatment(title);
    setChatbotInitialMessage(message);
    // Direct launch of embedded LeadConnector widget
    openLeadConnectorWidget(title);
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
      const isDesktop = window.innerWidth >= 768;

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
          const litWords = mProg * MANIFESTO_WORDS.length;
          const spans = manifestoWordRefs.current;

          for (let idx = 0; idx < MANIFESTO_WORDS.length; idx++) {
            const span = spans[idx];
            if (span) {
              const wordProg = clampValue(litWords - idx, 0, 1);
              span.style.opacity = (0.22 + wordProg * 0.78).toFixed(3);
            }
          }
        }
      }

      // D. PRIMEIRA CONSULTA PROGRESS LINE & STEP DOTS
      if (consultaEl) {
        const cRect = consultaEl.getBoundingClientRect();
        if (cRect.bottom > -120 && cRect.top < vh + 120) {
          const cProg = clampValue((vh * 0.75 - cRect.top) / (cRect.height * 0.75), 0, 1);
          if (consultaLineRef.current) {
            consultaLineRef.current.style.width = `${12 + cProg * 88}%`;
          }
          const nextStep2 = cProg > 0.36;
          const nextStep3 = cProg > 0.72;
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

  const hoverTimeoutRef = useRef<number | null>(null);

  // Treatment selection hover handler: instantly updates info and smooths image crossfade
  const handleTreatmentHover = (t: TreatmentData) => {
    if (activeTreatment.id === t.id) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setActiveTreatment(t);
    setTreatmentImageOpacity(0.35);
    setTreatmentImageScale(1.04);
    hoverTimeoutRef.current = window.setTimeout(() => {
      setTreatmentImageOpacity(1);
      setTreatmentImageScale(1);
    }, 70);
  };

  // Treatment click handler: scrolls down to booking form and preselects treatment
  const handleTreatmentClick = (t: TreatmentData) => {
    setBookingTratamento(t.title);
    const marcacaoSection = document.getElementById('marcacao');
    if (marcacaoSection) {
      marcacaoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  // Booking form submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = formatWhatsAppMessage({
      nome: bookingNome,
      telefone: bookingTelefone,
      tratamento: bookingTratamento,
      dia: bookingDia,
      hora: bookingHora,
    });
    window.open(`https://wa.me/351912907024?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Dynamic header style with Apple iOS 27 Liquid Glass
  let headerClass = 'fixed inset-x-0 top-0 z-50 transition-all duration-500 py-3 sm:py-5 text-paper bg-transparent';

  if (headerTheme === 'dark') {
    headerClass =
      'fixed inset-x-0 top-0 z-50 transition-all duration-500 py-2.5 sm:py-3.5 text-paper bg-[#14161A]/60 backdrop-blur-[24px] saturate-[185%] border-b border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.35)]';
  } else if (headerTheme === 'light') {
    headerClass =
      'fixed inset-x-0 top-0 z-50 transition-all duration-500 py-2.5 sm:py-3.5 text-ink bg-white/65 backdrop-blur-[24px] saturate-[185%] border-b border-white/60 shadow-[0_12px_32px_rgba(45,50,119,0.06)]';
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
        <div className="container-page flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 group transition-opacity hover:opacity-90">
            <img
              src="https://clinica-santa-maria-dos-olivais.b-cdn.net/logo_clinica_santa_maria_dos_olivais-removebg-preview.png"
              alt="Clínica Santa Maria dos Olivais"
              className="h-[58px] sm:h-[94px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              loading="eager"
            />
          </a>

          <nav className="hidden md:flex items-center gap-9 text-[13px] tracking-wide">
            <a href="#tratamentos" className="link-underline py-0.5">
              Tratamentos
            </a>
            <a href="#primeira-consulta" className="link-underline py-0.5">
              Primeira consulta
            </a>
            <a href="#equipa" className="link-underline py-0.5">
              Equipa
            </a>
            <a href="#clinica" className="link-underline py-0.5">
              A clínica
            </a>
            <a href="#perguntas" className="link-underline py-0.5">
              Perguntas
            </a>
          </nav>

          <LiquidButton
            id="header-cta"
            type="button"
            onClick={() => handleOpenChatbot()}
            variant="primary"
            className="!text-[12px] sm:!text-[12.5px] !px-5 sm:!px-6 !py-2 sm:!py-2.5 !font-semibold shadow-md cursor-pointer"
          >
            Marcar
          </LiquidButton>
        </div>
      </header>

      {/* =====================================================
           1. HERO SCROLLYTELLING CON FOTO PRINCIPAL — DRA. ANA MATA
           ===================================================== */}
      <section id="top" className="relative h-[420vh] bg-[#D2D1CD]">
        <div id="hero-sticky" className="sticky top-0 relative h-viewport-l overflow-hidden bg-[#D2D1CD]">
          {/* Fotografía de alta resolución de la Dra. Ana Mata:
              - Fondo de pared clínica (#D2D1CD) extendido a todo el espacio sin división de color.
              - Desplazada a la derecha justo al límite de la pantalla (translateX(26%) scaleX(-1)),
                mirando de forma natural hacia los textos de la clínica.
              - Preserva al 100% la cabeza sin recortes con alineación superior limpia. */}
          <div className="absolute inset-0 h-full w-full overflow-hidden bg-[#D2D1CD] pointer-events-none select-none">
            <img
              src="https://clinica-santa-maria-dos-olivais.b-cdn.net/doctora_ana_mata_head.JPG"
              alt="Dra. Ana Mata — Diretora Clínica Santa Maria dos Olivais"
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

          {/* Filtro degradado suave e luminoso con el lila/lavanda institucional de la clínica:
              - Nace en la esquina superior izquierda con un lila luminoso y aireado (#9c8cc4), eliminando la oscuridad excesiva.
              - Mantiene el degradado lila característico con difusión suave hacia la parte media. */}
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
                className="absolute inset-x-5 bottom-[24%] sm:inset-x-8 sm:bottom-[20%] lg:inset-x-12 lg:bottom-[17%] will-change-transform"
              >
                <p className="eyebrow text-paper/95 mb-3 sm:mb-3.5 tracking-[0.16em] sm:tracking-[0.2em] text-[10.5px] sm:text-xs font-semibold drop-shadow-[0_1px_4px_rgba(45,50,119,0.35)]">
                  CLÍNICA SANTA MARIA DOS OLIVAIS · LISBOA
                </p>
                <p className="display hero-type text-[clamp(2rem,5.8vw,6rem)] leading-[1.08] max-w-[16ch] drop-shadow-[0_2px_14px_rgba(45,50,119,0.35)]">
                  O seu sorriso em mãos <em>médicas de total confiança.</em>
                </p>
              </div>

              {/* PASO 02 / 03 */}
              <div
                ref={beat2Ref}
                id="hero-beat-2"
                style={{ opacity: 0, pointerEvents: 'none' }}
                className="absolute inset-x-5 bottom-[24%] sm:inset-x-8 sm:bottom-[20%] lg:inset-x-12 lg:bottom-[17%] will-change-transform"
              >
                <p className="eyebrow text-paper/95 mb-3 sm:mb-3.5 tracking-[0.16em] sm:tracking-[0.2em] text-[10.5px] sm:text-xs font-semibold drop-shadow-[0_1px_4px_rgba(45,50,119,0.35)]">
                  10 ANOS DE EXCELÊNCIA MÉDICA
                </p>
                <p className="display hero-type text-[clamp(2rem,5.8vw,6rem)] leading-[1.08] max-w-[16ch] drop-shadow-[0_2px_14px_rgba(45,50,119,0.35)]">
                  Medicina dentária de precisão, <em>tecnologia avançada e escuta atenta.</em>
                </p>
              </div>

              {/* PASO 03 / 03 */}
              <div
                ref={beat3Ref}
                id="hero-beat-3"
                style={{ opacity: 0, pointerEvents: 'none' }}
                className="absolute inset-x-5 bottom-[22%] sm:inset-x-8 sm:bottom-[18%] lg:inset-x-12 lg:bottom-[15%] will-change-transform"
              >
                <p className="eyebrow text-paper/95 mb-3 sm:mb-3.5 tracking-[0.16em] sm:tracking-[0.2em] text-[10.5px] sm:text-xs font-semibold drop-shadow-[0_1px_4px_rgba(45,50,119,0.35)]">
                  CUIDADO HUMANO & TRANQUILIDADE
                </p>
                <p className="display hero-type text-[clamp(2rem,5.8vw,6rem)] leading-[1.08] max-w-[16ch] mb-6 sm:mb-7 drop-shadow-[0_2px_14px_rgba(45,50,119,0.35)]">
                  Tratamentos sem dor, onde cada detalhe é <em>pensado para a sua calma.</em>
                </p>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <LiquidButton
                    type="button"
                    onClick={() => handleOpenChatbot()}
                    variant="primary"
                    className="!px-6 sm:!px-7 !py-3 sm:!py-3.5 !text-[12.5px] sm:!text-[13px] !font-medium shadow-lg cursor-pointer"
                  >
                    <span>Marcar consulta</span>
                  </LiquidButton>
                  <LiquidButton
                    href="https://wa.me/351912907024"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="lime"
                    className="!px-6 sm:!px-7 !py-3 sm:!py-3.5 !text-[12.5px] sm:!text-[13px] !font-semibold shadow-md"
                  >
                    <span>WhatsApp</span>
                  </LiquidButton>
                </div>
              </div>

              {/* Nome e especialidade da Dra. Ana Mata — sem sobreposição em móvel */}
              <div
                className="absolute right-4 bottom-[4.75rem] sm:right-[24%] lg:right-[32%] sm:bottom-4 lg:bottom-5 z-20 pointer-events-none select-none flex flex-col items-end text-right sm:items-center sm:text-center px-1 sm:px-2"
                aria-label="Dra. Ana Mata, Médica Dentista Especialista em Implantologia"
              >
                <p className="font-serif text-[12.5px] sm:text-[15px] lg:text-[16px] text-ink font-semibold tracking-tight leading-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
                  Dra. Ana Mata
                </p>
                <p className="font-serif italic text-[9.5px] sm:text-[11.5px] lg:text-[12.5px] text-ink/80 font-normal tracking-normal mt-0.5 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
                  Diretora Clínica · Especialista em Implantologia
                </p>
              </div>

              {/* Pie del Hero — deja espacio a la derecha en móvil para el botón azul del bot */}
              <div className="absolute left-5 right-20 bottom-5 sm:inset-x-8 sm:bottom-7 lg:inset-x-12 flex items-center justify-between text-paper/85">
                <span
                  ref={heroScrollLabelRef}
                  id="hero-scroll-label"
                  className="inline-flex items-center gap-2.5 sm:gap-3.5 eyebrow !text-[10px] sm:!text-[11.5px] text-paper/85 select-none"
                >
                  <span>CONTINUAR A DESCER</span>
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
      <section className="py-24 sm:py-36 md:py-52 bg-paper">
        <div className="container-page">
          <div className="max-w-4xl mx-auto text-center">
            <p className="eyebrow text-muted mb-8 sm:mb-10">MANIFESTO</p>
            <p
              id="manifesto-scrub"
              className="font-serif text-[clamp(1.85rem,4.3vw,3.9rem)] leading-[1.18] tracking-tight font-normal text-center text-ink text-balance"
            >
              {MANIFESTO_WORDS.map((word, idx) => (
                <span
                  key={idx}
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
        className="relative w-full h-[72vh] sm:h-[78vh] md:h-[90vh] overflow-hidden bg-ink"
      >
        <video
          ref={bannerVideoRef}
          data-parallax-id="banner-3d"
          data-parallax="0.22"
          src={shouldLoadBannerVideo ? '/banner-video.mp4' : undefined}
          preload="none"
          autoPlay
          loop
          muted
          playsInline
          poster="https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_3.jpeg"
          className="absolute -top-[13%] left-0 w-full h-[126%] object-cover object-center md:will-change-transform pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-8 sm:bottom-10 md:bottom-14">
          <div className="container-page">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8 text-paper">
              <ModularReveal delay={1} enableMouseGlow className="border-t border-paper/25 pt-4 sm:pt-5 rounded-xl">
                <p className="font-serif text-3xl sm:text-4xl md:text-6xl font-light mb-1.5 sm:mb-2">
                  <AnimatedCounter target={10} prefix="+" duration={1200} />
                </p>
                <p className="eyebrow !text-[10px] sm:!text-[11.5px] !tracking-[0.14em] sm:!tracking-[0.22em] text-paper/75">
                  ANOS DE EXPERIÊNCIA
                </p>
              </ModularReveal>
              <ModularReveal delay={2} enableMouseGlow className="border-t border-paper/25 pt-4 sm:pt-5 rounded-xl">
                <p className="font-serif text-3xl sm:text-4xl md:text-6xl font-light mb-1.5 sm:mb-2">
                  <AnimatedCounter target={650} prefix="+" duration={1400} />
                </p>
                <p className="eyebrow !text-[10px] sm:!text-[11.5px] !tracking-[0.14em] sm:!tracking-[0.22em] text-paper/75">
                  IMPLANTES POR ANO
                </p>
              </ModularReveal>
              <ModularReveal delay={3} enableMouseGlow className="border-t border-paper/25 pt-4 sm:pt-5 rounded-xl">
                <p className="font-serif text-3xl sm:text-4xl md:text-6xl font-light mb-1.5 sm:mb-2">
                  <AnimatedCounter target={4.4} decimals={1} decimalSeparator="," duration={1400} />
                </p>
                <p className="eyebrow !text-[10px] sm:!text-[11.5px] !tracking-[0.14em] sm:!tracking-[0.22em] text-paper/75">
                  AVALIAÇÃO GOOGLE
                </p>
              </ModularReveal>
              <ModularReveal delay={4} enableMouseGlow className="border-t border-paper/25 pt-4 sm:pt-5 rounded-xl">
                <p className="font-serif text-3xl sm:text-4xl md:text-6xl font-light mb-1.5 sm:mb-2">
                  <AnimatedCounter target={8} duration={1200} />
                </p>
                <p className="eyebrow !text-[10px] sm:!text-[11.5px] !tracking-[0.14em] sm:!tracking-[0.22em] text-paper/75">
                  ESPECIALISTAS
                </p>
              </ModularReveal>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
           4. TRATAMENTOS (CARRUSEL REEL 9:16 MÓVIL + CINTA EN ESCALERA ESCRITORIO)
           ===================================================== */}
      <section id="tratamentos" className="py-20 sm:py-28 md:py-44 bg-paper">
        <div className="container-page">
          <ModularReveal>
            <p className="eyebrow text-muted mb-4">TRATAMENTOS</p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-16 md:mb-20">
              <h2 className="section-heading">
                Cuidados pensados <em>ao<br />detalhe.</em>
              </h2>
              <p className="text-[13px] sm:text-[13.5px] text-muted max-w-sm leading-relaxed">
                <span className="lg:hidden">
                  Deslize para os lados para explorar as especialidades clínicas, detalhes e tabela de preços.
                </span>
                <span className="hidden lg:inline">
                  Passe o cursor sobre os tratamentos para consultar as especificações clínicas e a tecnologia aplicada.
                </span>
              </p>
            </div>
          </ModularReveal>

          {/* VISTA MÓVIL / TABLET (< lg): Carrusel horizontal de tarjetas formato Reel 9:16 completo sin recortes */}
          <div className="lg:hidden">
            <div
              ref={treatmentCarouselRef}
              onScroll={handleMobileTreatmentScroll}
              className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory -mx-6 px-6 pb-3"
            >
              {TREATMENTS.map((t, index) => {
                const isCurrent = mobileTreatmentIdx === index;
                return (
                  <div
                    key={t.id}
                    data-treatment-card-idx={index}
                    className="w-[74vw] max-w-[290px] sm:w-[305px] shrink-0 snap-center"
                  >
                    <LiquidCard className="liquid-card-light p-3 rounded-[28px] h-full flex flex-col">
                      {/* Imagen en proporción exacta Reel 9:16 vertical sin recortes */}
                      <div className="aspect-[9/16] w-full overflow-hidden rounded-[20px] bg-stone relative shadow-sm">
                        <img
                          src={t.img}
                          alt={t.title}
                          loading={index < 2 ? 'eager' : 'lazy'}
                          decoding="async"
                          className="w-full h-full object-cover object-center block"
                        />
                      </div>

                      {/* Pie de la tarjeta con barra delgada animada, título, resumen y botones */}
                      <div className="pt-3.5 px-1 pb-0.5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2.5 mb-1.5">
                            <span
                              aria-hidden="true"
                              style={{
                                ['--line-delay' as string]: `${index * 0.22}s`,
                              } as React.CSSProperties}
                              className={`treatment-scroll-line ${isCurrent ? 'is-active' : ''}`}
                            />
                            <span className="text-xs font-serif tracking-wider text-ink font-semibold">
                              {t.number}
                            </span>
                            <span className="text-[10.5px] text-muted ml-auto font-mono">
                              {t.number} / 09
                            </span>
                          </div>
                          <h3 className="font-serif text-[1.28rem] leading-snug text-ink font-normal">
                            {t.title}
                          </h3>
                          <p className="text-xs text-muted leading-relaxed mt-1 line-clamp-2">
                            {t.caption}
                          </p>
                        </div>

                        <div className="mt-3.5 pt-3 border-t border-rule flex items-center justify-between gap-2">
                          <LiquidButton
                            type="button"
                            variant="secondary"
                            onClick={() => {
                              setPriceModalTreatmentId(t.id);
                              setIsPriceModalOpen(true);
                            }}
                            className="!px-3.5 !py-2 !text-xs !font-semibold !text-ink shrink-0 cursor-pointer"
                          >
                            <span>Preços</span>
                          </LiquidButton>
                          <LiquidButton
                            type="button"
                            variant="primary"
                            onClick={() => handleOpenChatbot(t.title)}
                            className="!px-4 !py-2 !text-xs !font-semibold shadow-sm flex-1 flex items-center justify-center cursor-pointer"
                          >
                            <span>Marcar consulta</span>
                          </LiquidButton>
                        </div>
                      </div>
                    </LiquidCard>
                  </div>
                );
              })}
              <div className="w-2 shrink-0" aria-hidden="true" />
            </div>

            {/* Indicador de progreso y controles laterales del carrusel móvil */}
            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 max-w-[210px]">
                <span className="font-serif text-xs text-ink font-semibold shrink-0">
                  {String(mobileTreatmentIdx + 1).padStart(2, '0')}{' '}
                  <span className="text-muted font-normal">
                    / {String(TREATMENTS.length).padStart(2, '0')}
                  </span>
                </span>
                <div className="flex-1 h-[2px] bg-ink/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-clinic-navy rounded-full transition-all duration-300 ease-out"
                    style={{
                      width: `${((mobileTreatmentIdx + 1) / TREATMENTS.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <LiquidButton
                  type="button"
                  variant="secondary"
                  onClick={() => scrollMobileTreatment(-1)}
                  disabled={mobileTreatmentIdx === 0}
                  aria-label="Tratamento anterior"
                  className={`!w-10 !h-10 !p-0 !rounded-full flex items-center justify-center text-ink ${
                    mobileTreatmentIdx === 0 ? 'opacity-35 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  ←
                </LiquidButton>
                <LiquidButton
                  type="button"
                  variant="secondary"
                  onClick={() => scrollMobileTreatment(1)}
                  disabled={mobileTreatmentIdx === TREATMENTS.length - 1}
                  aria-label="Seguinte tratamento"
                  className={`!w-10 !h-10 !p-0 !rounded-full flex items-center justify-center text-ink ${
                    mobileTreatmentIdx === TREATMENTS.length - 1
                      ? 'opacity-35 cursor-not-allowed'
                      : 'cursor-pointer'
                  }`}
                >
                  →
                </LiquidButton>
              </div>
            </div>
          </div>

          {/* VISTA ESCRITORIO (lg+): Cinta en escalera + Panel sticky */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7 border-t border-rule">
              {TREATMENTS.map((t, index) => {
                const isActive = activeTreatment.id === t.id;
                return (
                  <TreatmentRibbonItem
                    key={t.id}
                    treatment={t}
                    index={index}
                    isActive={isActive}
                    onHover={handleTreatmentHover}
                    onClick={setActiveTreatment}
                    onOpenPriceModal={(id) => {
                      setPriceModalTreatmentId(id);
                      setIsPriceModalOpen(true);
                    }}
                  />
                );
              })}
            </div>

            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <ModularReveal delay={2} enableMouseGlow>
                <LiquidCard className="liquid-card-light p-4 sm:p-5 rounded-3xl">
                  <div className="aspect-[4/4.5] w-full overflow-hidden rounded-2xl bg-stone mb-4 relative shadow-sm">
                    <img
                      id="treatment-img"
                      src={activeTreatment.img}
                      alt={activeTreatment.title}
                      style={{
                        opacity: treatmentImageOpacity,
                        transform: `scale(${treatmentImageScale})`,
                      }}
                      className="w-full h-full object-cover transition-all duration-500 ease-out"
                    />
                  </div>
                  <p id="treatment-caption" className="text-[14px] text-ink/80 leading-relaxed max-w-sm">
                    {activeTreatment.caption}
                  </p>
                  <div className="mt-4 pt-3.5 border-t border-rule flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setPriceModalTreatmentId(activeTreatment.id);
                        setIsPriceModalOpen(true);
                      }}
                      className="text-xs font-semibold text-clinic-navy hover:text-clinic-lavender underline transition-colors cursor-pointer text-left"
                    >
                      Ver tabela de preços de {activeTreatment.title} →
                    </button>
                    <LiquidButton
                      type="button"
                      variant="primary"
                      onClick={() => handleOpenChatbot(activeTreatment.title)}
                      className="!px-4 !py-2 !text-xs !font-semibold shadow-md shrink-0"
                    >
                      <span>Marcar consulta</span>
                    </LiquidButton>
                  </div>
                </LiquidCard>
              </ModularReveal>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
           5. A PRIMEIRA CONSULTA (CON LÍNEA DE PROGRESO ANIMADA)
           ===================================================== */}
      <section id="primeira-consulta" className="py-28 md:py-44 bg-stone">
        <div className="container-page">
          <ModularReveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-20">
            <div className="lg:col-span-7">
              <p className="eyebrow text-muted mb-4">A PRIMEIRA CONSULTA</p>
              <h2 className="section-heading">
                Começamos por <em>ouvir.</em>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <div className="aspect-[16/10] overflow-hidden relative bg-paper rounded-2xl shadow-sm">
                <img
                  data-parallax-id="consulta-img"
                  data-parallax="0.16"
                  src="https://clinica-santa-maria-dos-olivais.b-cdn.net/ouvimos_clinica_santa_maria_dos_olivais.jpeg"
                  alt="Primeira consulta - Começamos por ouvir"
                  loading="lazy"
                  decoding="async"
                  className="absolute -top-[12%] left-0 w-full h-[124%] object-cover md:will-change-transform"
                />
              </div>
            </div>
          </ModularReveal>

          <div className="relative pt-10">
            <div className="hidden md:block absolute top-0 left-0 w-full h-[1px] bg-ink/15" />
            <div
              ref={consultaLineRef}
              id="consulta-progress-line"
              style={{ width: '15%' }}
              className="hidden md:block absolute top-0 left-0 h-[1px] bg-ink"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <ModularReveal delay={1} enableMouseGlow>
                <LiquidCard className="liquid-card-light p-7 sm:p-8 rounded-3xl h-full">
                  <div className="flex items-center justify-between mb-4">
                    <LiquidPill className="text-xs font-serif text-ink">01</LiquidPill>
                    <span className="w-2.5 h-2.5 rounded-full bg-ink" />
                  </div>
                  <h3 className="font-serif text-2xl md:text-[1.8rem] leading-snug mb-3 text-ink">
                    Diagnóstico<br />com imagem<br />digital
                  </h3>
                  <p className="text-[13.5px] text-ink/75 leading-relaxed">
                    Fotografia e radiografia digital. Mostramos-lhe o que vemos.
                  </p>
                </LiquidCard>
              </ModularReveal>

              <ModularReveal delay={2} enableMouseGlow>
                <LiquidCard className="liquid-card-light p-7 sm:p-8 rounded-3xl h-full">
                  <div className="flex items-center justify-between mb-4">
                    <LiquidPill className="text-xs font-serif text-ink">02</LiquidPill>
                    <span
                      id="step-dot-2"
                      className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                        step2Active ? 'bg-ink' : 'bg-ink/30'
                      }`}
                    />
                  </div>
                  <h3 className="font-serif text-2xl md:text-[1.8rem] leading-snug mb-3 text-ink">
                    Plano e<br />orçamento<br />claros
                  </h3>
                  <p className="text-[13.5px] text-ink/75 leading-relaxed">
                    Opções, tempos e custos por escrito, sem pressão.
                  </p>
                </LiquidCard>
              </ModularReveal>

              <ModularReveal delay={3} enableMouseGlow>
                <LiquidCard className="liquid-card-light p-7 sm:p-8 rounded-3xl h-full">
                  <div className="flex items-center justify-between mb-4">
                    <LiquidPill className="text-xs font-serif text-ink">03</LiquidPill>
                    <span
                      id="step-dot-3"
                      className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                        step3Active ? 'bg-ink' : 'bg-ink/30'
                      }`}
                    />
                  </div>
                  <h3 className="font-serif text-2xl md:text-[1.8rem] leading-snug mb-3 text-ink">
                    Tratamento sem<br />pressas
                  </h3>
                  <p className="text-[13.5px] text-ink/75 leading-relaxed">
                    O tempo que cada fase pede, sempre com a mesma equipa.
                  </p>
                </LiquidCard>
              </ModularReveal>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
           6. A EQUIPA (CARROSSEL DOUTORES — COR EM PRIMEIRO PLANO MÓVEL & HOVER DESKTOP)
           ===================================================== */}
      <section id="equipa" ref={equipaSectionRef} className="py-28 md:py-44 bg-paper overflow-hidden">
        <div className="container-page">
          <ModularReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 md:mb-16">
              <div>
                <p className="eyebrow text-muted mb-4">A EQUIPA</p>
                <h2 className="section-heading max-w-xl">
                  As mesmas <em>mãos</em>, do início ao fim.
                </h2>
              </div>

              {/* Controlo do Carrossel de Doutores com LiquidButton */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-serif text-muted tracking-wider hidden sm:inline-block">
                  08 MEMBROS DA EQUIPA
                </span>
                <div className="flex items-center gap-2">
                  <LiquidButton
                    type="button"
                    variant="secondary"
                    onClick={scrollTeamLeft}
                    disabled={!canScrollTeamLeft}
                    aria-label="Anterior especialista"
                    className={`!w-11 !h-11 !p-0 !rounded-full flex items-center justify-center transition-all duration-300 ${
                      canScrollTeamLeft ? 'cursor-pointer' : 'opacity-35 cursor-not-allowed'
                    }`}
                  >
                    <span className="text-base">←</span>
                  </LiquidButton>
                  <LiquidButton
                    type="button"
                    variant="secondary"
                    onClick={scrollTeamRight}
                    disabled={!canScrollTeamRight}
                    aria-label="Seguinte especialista"
                    className={`!w-11 !h-11 !p-0 !rounded-full flex items-center justify-center transition-all duration-300 ${
                      canScrollTeamRight ? 'cursor-pointer' : 'opacity-35 cursor-not-allowed'
                    }`}
                  >
                    <span className="text-base">→</span>
                  </LiquidButton>
                </div>
              </div>
            </div>
          </ModularReveal>

          {/* Carrossel horizontal: em móvel ganha cor ao passar para primeiro plano; em desktop no hover */}
          <ModularReveal delay={1}>
            <div
              ref={teamScrollRef}
              onScroll={checkTeamScroll}
              className="flex gap-5 sm:gap-6 md:gap-7 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4 -mx-6 px-6 sm:mx-0 sm:px-0"
            >
              {TEAM_MEMBERS.map((member, index) => {
                const isForegroundMobile = isEquipaInView && activeTeamIdx === index;
                return (
                  <div
                    key={member.id}
                    data-team-card-idx={index}
                    onClick={() => {
                      if (window.innerWidth < 1024 && activeTeamIdx !== index) {
                        scrollToTeamCard(index);
                      }
                    }}
                    className="group shrink-0 w-[78vw] max-w-[310px] sm:max-w-none sm:w-[320px] md:w-[310px] lg:w-[320px] snap-center lg:snap-start"
                  >
                    {/* Contenedor da fotografia: passa de P&B a Cor quando entra em primeiro plano em móvel ou ao passar o rato em desktop */}
                    <div
                      className={`aspect-[3/3.9] overflow-hidden bg-stone mb-3 relative rounded-2xl cursor-pointer transition-shadow duration-500 ${
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

                    {/* Tipografia refinada: letra mais pequena e somente o título */}
                    <div className="flex flex-col pt-1">
                      <h3
                        className={`font-serif text-lg font-medium transition-colors duration-500 leading-snug ${
                          isForegroundMobile
                            ? 'text-ink'
                            : 'text-ink/75 lg:text-ink lg:group-hover:text-ink/80'
                        }`}
                      >
                        {member.name}
                      </h3>
                      {member.role && (
                        <p className="text-xs text-muted font-normal mt-0.5 leading-snug">
                          {member.role}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
              {/* Espaçador final em móvel/tablet para permitir centrar o último membro em primeiro plano */}
              <div className="w-[8vw] shrink-0 lg:hidden" aria-hidden="true" />
            </div>

            {/* Indicador e barra de progresso sutil do carrossel */}
            <div className="mt-7 sm:mt-8 flex items-center gap-3.5">
              <span className="lg:hidden font-serif text-xs text-ink font-semibold tabular-nums shrink-0">
                {String(activeTeamIdx + 1).padStart(2, '0')}{' '}
                <span className="text-muted font-normal">
                  / {String(TEAM_MEMBERS.length).padStart(2, '0')}
                </span>
              </span>
              <div className="w-full max-w-[200px] h-[2px] bg-ink/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-ink transition-all duration-300 rounded-full"
                  style={{ width: `${Math.max(12.5, (teamScrollProgress * 87.5) + 12.5)}%` }}
                />
              </div>
            </div>
          </ModularReveal>

          {/* Membro adicional do corpo clínico (sem fotografia atribuída) */}
          <ModularReveal delay={2}>
            <div className="mt-12 pt-6 border-t border-rule/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-stone flex items-center justify-center font-serif text-xs text-ink/50 border border-ink/10">
                  DL
                </span>
                <div>
                  <p className="text-ink font-serif text-sm">Dra. Ladine</p>
                  <p className="text-[11.5px] text-muted">Clínica Geral & Reabilitação Oral</p>
                </div>
              </div>
              <p className="text-[11px] text-muted/70 tracking-wide">
                Higiene oral, próteses removíveis, branqueamento e placas de bruxismo
              </p>
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
            className="sticky top-0 h-viewport-s md:h-screen w-full overflow-hidden flex flex-col justify-center py-6 md:py-10"
          >
            <div className="container-page mb-5 sm:mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 shrink-0">
              <div>
                <div className="flex items-center gap-3 mb-2 sm:mb-2.5">
                  <p className="eyebrow text-muted">A CLÍNICA</p>
                  <span className="text-[11px] text-muted/70 tracking-widest font-mono">· 09 ESPAÇOS</span>
                </div>
                <h2 className="section-heading text-3xl sm:text-4xl md:text-[clamp(2.4rem,4.5vw,4.2rem)]">
                  Um espaço feito para <em>abrandar.</em>
                </h2>
              </div>

              {/* Indicador de progreso del recorrido horizontal (01 / 09 -> 09 / 09) */}
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

            <div className="w-full overflow-hidden">
              <div
                ref={clinicaTrackRef}
                id="clinica-horizontal-track"
                style={{ transform: 'translate3d(0px, 0, 0)' }}
                className="flex items-start sm:items-end gap-4 sm:gap-6 md:gap-8 px-6 sm:px-[clamp(1.25rem,4vw,3.5rem)] w-max will-change-transform"
              >
                {CLINICA_SPACES.map((space, idx) => (
                  <div
                    key={space.num}
                    className="group w-[84vw] sm:w-[540px] md:w-[620px] lg:w-[680px] shrink-0 cursor-pointer"
                  >
                    {/* Cajón con proporción exacta 16:9 completa */}
                    <div className="clinica-photo-frame aspect-video w-full relative mb-2.5 sm:mb-3 bg-[#1e222a] overflow-hidden rounded-2xl shadow-sm">
                      <img
                        className="clinica-editorial-img w-full h-full object-cover object-center block group-hover:scale-[1.025] transition-transform duration-700 ease-out"
                        src={space.src}
                        alt={`${space.num} ${space.title}`}
                        loading={shouldPreloadClinica || idx < 2 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                      {/* Sutil viñeta elegante */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none" />
                    </div>
                    <div className="pt-1 sm:pt-1.5">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="text-[13px] text-ink font-medium tracking-tight">
                          <span className="font-serif text-sm mr-2 text-ink/80">{space.num}</span> {space.title}
                        </p>
                        <span className="text-[11px] text-muted hidden md:inline shrink-0">{space.subtitle}</span>
                      </div>
                      <p className="text-[11.5px] text-muted md:hidden mt-0.5 leading-snug">{space.subtitle}</p>
                    </div>
                  </div>
                ))}
                {/* Espaciador final para que la tarjeta 09 quede completamente visible antes de continuar bajando */}
                <div className="w-8 sm:w-20 md:w-32 shrink-0" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
           8. BANNER MACRO SONRISA CON PARALLAX ("NOS DETALHES")
           ===================================================== */}
      <section className="relative w-full h-[75vh] md:h-[86vh] overflow-hidden bg-ink">
        <img
          data-parallax-id="banner-smile"
          data-parallax="0.24"
          src="https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_dentaria_santa_maria_dos_olivais_sorrisos.jpg"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src = 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_1.jpeg';
          }}
          alt="Sorrisos na Clínica Dentária Santa Maria dos Olivais"
          loading="lazy"
          decoding="async"
          className="absolute -top-[13%] left-0 w-full h-[126%] object-cover object-center md:will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-black/25" />
        <div className="absolute inset-0 flex items-end pb-16 md:pb-24 text-white">
          <div className="container-page">
            <ModularReveal>
              <h2 className="section-heading text-white max-w-xl drop-shadow-md">
                O cuidado<br />
                também se vê<br />
                <em className="text-white italic">nos detalhes.</em>
              </h2>
            </ModularReveal>
          </div>
        </div>
      </section>

      {/* =====================================================
           9. AVALIAÇÕES (CARRUSEL GOOGLE 01 / 04 A 04 / 04)
           ===================================================== */}
      <section className="py-28 md:py-44 bg-paper">
        <div className="container-page">
          <ModularReveal>
            <p className="eyebrow text-muted mb-4">AVALIAÇÕES</p>
            <h2 className="section-heading mb-16 md:mb-24">
              O que dizem <em>depois</em> da<br />consulta.
            </h2>
          </ModularReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <ModularReveal delay={1} className="lg:col-span-4">
              <div>
                <p className="font-serif text-7xl md:text-8xl font-light tracking-tight mb-3">4,4</p>
                <div className="flex items-center gap-1 text-ink text-xs mb-3">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span className="text-ink/35">★</span>
                </div>
                <p className="text-xs text-muted leading-relaxed max-w-[220px] mb-5">
                  Avaliação média no Google, com base em 145 avaliações.
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Estrada+de+Moscavide+N+32C,+1800-279,+Lisboa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-xs text-ink py-0.5"
                >
                  Ver todas no Google
                </a>
              </div>
            </ModularReveal>

            <ModularReveal delay={2} enableMouseGlow className="lg:col-span-8 flex flex-col justify-between min-h-[300px]">
              <div>
                <LiquidCard
                  className="liquid-card-light p-8 sm:p-10 rounded-3xl mb-4 transition-shadow hover:shadow-[0_16px_40px_rgba(45,50,119,0.08)]"
                  onMouseEnter={() => setIsReviewPaused(true)}
                  onMouseLeave={() => setIsReviewPaused(false)}
                >
                  <div
                    id="review-box"
                    style={{
                      opacity: reviewAnimate ? 1 : 0,
                      transform: reviewAnimate ? 'translateY(0)' : 'translateY(8px)',
                    }}
                    className="transition-all duration-300 min-h-[170px] flex flex-col justify-between"
                  >
                    {/* Número de estrelas automático e etiqueta de avaliação */}
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <div
                        className="flex items-center gap-1 text-[#eab308] text-base sm:text-lg"
                        aria-label={`${GOOGLE_REVIEWS[reviewIdx].rating} de 5 estrelas`}
                      >
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={
                              star <= GOOGLE_REVIEWS[reviewIdx].rating
                               ? 'text-[#eab308]'
                                : 'text-ink/20'
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-900 border border-amber-500/20">
                        {GOOGLE_REVIEWS[reviewIdx].ratingLabel || `${GOOGLE_REVIEWS[reviewIdx].rating}/5`}
                      </span>
                      <span className="text-[11px] text-muted flex items-center gap-1.5 ml-auto">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Avaliação Google verificada
                      </span>
                    </div>

                    {/* Texto da avaliação */}
                    <blockquote id="review-text" className="font-serif text-xl sm:text-2xl md:text-3xl leading-snug text-ink mb-6 italic">
                      “{GOOGLE_REVIEWS[reviewIdx].review}”
                    </blockquote>

                    {/* Autor e identificação */}
                    <div className="pt-4 border-t border-rule/60 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-clinic-navy text-white font-serif font-semibold text-xs flex items-center justify-center shrink-0 shadow-sm">
                          {GOOGLE_REVIEWS[reviewIdx].name.charAt(0)}
                        </div>
                        <div>
                          <span id="review-author" className="font-medium text-xs sm:text-sm text-ink block leading-tight">
                            {GOOGLE_REVIEWS[reviewIdx].name}
                          </span>
                          <span className="text-[11px] text-muted leading-tight block mt-0.5">
                            Google Reviews · Paciente verificado
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] tracking-wider uppercase font-semibold text-muted/75 hidden sm:inline-block">
                        {isReviewPaused ? 'Pausa (leitura)' : 'Rotação ativa'}
                      </span>
                    </div>
                  </div>
                </LiquidCard>

                <div className="border-t border-rule pt-6 mt-6 flex items-center justify-between">
                  <div className="font-serif text-sm text-muted">
                    <span id="review-counter" className="text-ink font-semibold">
                      {String(reviewIdx + 1).padStart(2, '0')}
                    </span>{' '}
                    / {String(GOOGLE_REVIEWS.length).padStart(2, '0')}
                  </div>
                  <div className="flex items-center gap-3">
                    <LiquidButton
                      id="review-prev"
                      variant="secondary"
                      onClick={handlePrevReview}
                      aria-label="Anterior"
                      className="!w-11 !h-11 !p-0 !rounded-full flex items-center justify-center text-ink cursor-pointer"
                    >
                      ←
                    </LiquidButton>
                    <LiquidButton
                      id="review-next"
                      variant="secondary"
                      onClick={handleNextReview}
                      aria-label="Seguinte"
                      className="!w-11 !h-11 !p-0 !rounded-full flex items-center justify-center text-ink cursor-pointer"
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
           10. MARCAÇÃO (TEMA INK #14161A + WHATSAPP + MAPA)
           ===================================================== */}
      <section id="marcacao" className="py-28 md:py-44 bg-ink text-paper">
        <div className="container-page">
          <ModularReveal>
            <p className="eyebrow text-mutedInk mb-4">MARCAÇÃO</p>
            <h2 className="section-heading text-paper mb-16 md:mb-24">
              Reserve o seu <em className="text-paper/80">tempo</em><br />connosco.
            </h2>
          </ModularReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <ModularReveal delay={1} enableMouseGlow className="lg:col-span-7">
              <LiquidCard className="liquid-card-dark p-8 sm:p-11 rounded-3xl">
                <form id="booking-form" onSubmit={handleBookingSubmit} className="space-y-9">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="input-nome" className="eyebrow text-mutedInk block mb-3">
                        NOME
                      </label>
                      <input
                        type="text"
                        id="input-nome"
                        value={bookingNome}
                        onChange={(e) => setBookingNome(e.target.value)}
                        placeholder="O seu nome"
                        required
                        className="w-full bg-white/5 border-b border-white/20 pb-3 text-base sm:text-sm text-paper placeholder:text-mutedInk/50 focus:outline-none focus:border-paper transition min-h-[44px]"
                      />
                    </div>
                    <div>
                      <label htmlFor="input-telefone" className="eyebrow text-mutedInk block mb-3">
                        TELEFONE
                      </label>
                      <input
                        type="tel"
                        id="input-telefone"
                        value={bookingTelefone}
                        onChange={(e) => setBookingTelefone(e.target.value)}
                        placeholder="9xx xxx xxx"
                        required
                        className="w-full bg-white/5 border-b border-white/20 pb-3 text-base sm:text-sm text-paper placeholder:text-mutedInk/50 focus:outline-none focus:border-paper transition min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="input-tratamento" className="eyebrow text-mutedInk block mb-3">
                      TRATAMENTO
                    </label>
                    <select
                      id="input-tratamento"
                      value={bookingTratamento}
                      onChange={(e) => setBookingTratamento(e.target.value)}
                      className="select-dark w-full bg-transparent border-b border-white/20 pb-3 text-base sm:text-sm text-paper focus:outline-none focus:border-paper transition cursor-pointer min-h-[44px]"
                    >
                      {TREATMENTS.map((t) => (
                        <option key={t.id} value={t.title} className="bg-ink text-paper">
                          {t.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="input-dia" className="eyebrow text-mutedInk block mb-3">
                        PREFERÊNCIA DE DIA
                      </label>
                      <select
                        id="input-dia"
                        value={bookingDia}
                        onChange={(e) => setBookingDia(e.target.value)}
                        className="select-dark w-full bg-transparent border-b border-white/20 pb-3 text-base sm:text-sm text-paper focus:outline-none focus:border-paper transition cursor-pointer min-h-[44px]"
                      >
                        <option value="Qualquer dia" className="bg-ink text-paper">
                          Qualquer dia
                        </option>
                        <option value="Segunda a Sexta" className="bg-ink text-paper">
                          Segunda a Sexta
                        </option>
                        <option value="Sábado de manhã" className="bg-ink text-paper">
                          Sábado de manhã
                        </option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="input-hora" className="eyebrow text-mutedInk block mb-3">
                        PREFERÊNCIA DE HORA
                      </label>
                      <select
                        id="input-hora"
                        value={bookingHora}
                        onChange={(e) => setBookingHora(e.target.value)}
                        className="select-dark w-full bg-transparent border-b border-white/20 pb-3 text-base sm:text-sm text-paper focus:outline-none focus:border-paper transition cursor-pointer min-h-[44px]"
                      >
                        <option value="Qualquer hora" className="bg-ink text-paper">
                          Qualquer hora
                        </option>
                        <option value="Manhã" className="bg-ink text-paper">
                          Manhã
                        </option>
                        <option value="Tarde" className="bg-ink text-paper">
                          Tarde
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-6">
                    <LiquidButton
                      type="submit"
                      variant="lime"
                      className="!px-8 !py-4 !text-sm !font-semibold shrink-0 shadow-lg"
                    >
                      <span>Enviar pedido por WhatsApp</span>
                    </LiquidButton>
                    <p className="text-xs text-mutedInk leading-relaxed max-w-xs">
                      A marcação só fica confirmada depois do nosso contacto.
                    </p>
                  </div>

                  <p className="text-[11px] text-mutedInk/70">
                    Abre o WhatsApp com a mensagem escrita. Nada fica guardado neste site.{' '}
                    <a href="#" className="link-underline py-0.5 text-paper">
                      Privacidade
                    </a>
                  </p>
                </form>
              </LiquidCard>
            </ModularReveal>

            <ModularReveal delay={2} enableMouseGlow className="lg:col-span-5 space-y-8">
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <LiquidButton
                    href="tel:+351300601645"
                    variant="secondary"
                    className="!py-3.5 !px-5 text-center !text-xs !text-paper !border !border-white/15 flex items-center justify-center"
                  >
                    Telefone (300 601 645)
                  </LiquidButton>
                  <LiquidButton
                    href="https://wa.me/351912907024"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="lime"
                    className="!py-3.5 !px-5 text-center !text-xs !font-semibold flex items-center justify-center shadow-md"
                  >
                    WhatsApp
                  </LiquidButton>
                </div>

                <div className="grid grid-cols-2 gap-6 py-6 border-y border-ruleDark text-xs">
                  <div>
                    <p className="eyebrow text-mutedInk mb-2">HORÁRIO</p>
                    <p className="text-paper/90 leading-relaxed">
                      Seg a Sex: 10h00 às 19h00<br />
                      Sábados: 10h00 às 13h00
                    </p>
                  </div>
                  <div>
                    <p className="eyebrow text-mutedInk mb-2">MORADA</p>
                    <p className="text-paper/90 leading-relaxed">
                      Estrada de Moscavide N 32C<br />
                      1800-279, Lisboa
                    </p>
                  </div>
                </div>

                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black rounded-3xl border border-white/10 shadow-lg">
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
                      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                        <div>
                          <p className="font-serif text-2xl text-paper leading-tight mb-3">
                            Estrada de Moscavide N 32C<br />Lisboa
                          </p>
                          <LiquidButton
                            type="button"
                            id="show-map-btn"
                            variant="primary"
                            onClick={() => setShowMap(true)}
                            className="!px-4 !py-2 !text-xs !font-medium"
                          >
                            Mostrar mapa
                          </LiquidButton>
                        </div>
                        <a
                          href="https://www.google.com/maps/search/?api=1&query=Estrada+de+Moscavide+N+32C,+1800-279,+Lisboa"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-paper/85 underline underline-offset-4 hover:text-white"
                        >
                          Abrir no Google Maps
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div id="map-embed" className="absolute inset-0">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.952242496215!2d-9.142685!3d38.722252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19338210000001%3A0x0!2sLisboa!5e0!3m2!1spt-PT!2spt!4v1700000000000"
                        title="Google Maps Lisboa"
                        className="w-full h-full border-0 grayscale contrast-125"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>
            </ModularReveal>
          </div>
        </div>
      </section>

      {/* =====================================================
           11. PERGUNTAS FREQUENTES
           ===================================================== */}
      <section id="perguntas" className="py-28 md:py-44 bg-paper">
        <div className="container-page">
          <ModularReveal>
            <p className="eyebrow text-muted mb-4">PERGUNTAS FREQUENTES</p>
            <h2 className="section-heading mb-14 md:mb-20">
              Antes de <em>marcar.</em>
            </h2>
          </ModularReveal>

          <ModularReveal delay={1} className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-start-5 lg:col-span-8 border-t border-rule">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className={`faq-row ${isOpen ? 'open' : ''} border-b border-rule py-6 cursor-pointer`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-serif text-2xl md:text-[1.65rem] text-ink font-normal">
                        {faq.question}
                      </h3>
                      <span className="faq-btn w-8 h-8 rounded-full border border-rule flex items-center justify-center text-sm transition-all duration-300 shrink-0">
                        +
                      </span>
                    </div>
                    <div className="faq-content">
                      <div className="overflow-hidden">
                        <p className="text-[13.5px] text-muted leading-relaxed pt-4 max-w-xl">
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
      <footer className="pt-16 sm:pt-20 pb-20 md:pb-12 bg-stone/60 border-t border-rule">
        <div className="container-page">
          <ModularReveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-20">
              <div className="md:col-span-5">
                <h2 className="section-heading mb-8">
                  Até <em>breve.</em>
                </h2>
                <LiquidButton
                  type="button"
                  onClick={() => handleOpenChatbot()}
                  variant="primary"
                  className="!px-7 !py-3.5 !text-xs !font-medium inline-flex items-center shadow-lg cursor-pointer"
                >
                  <span>Marcar consulta</span>
                </LiquidButton>
              </div>

              <div className="md:col-span-3 text-xs space-y-3">
                <p className="eyebrow text-muted mb-3">VISITE-NOS</p>
                <p className="text-ink font-medium">Estrada de Moscavide N 32C</p>
                <p className="text-ink">1800-279, Lisboa</p>
                <div className="pt-3 text-muted space-y-1">
                  <p className="font-semibold text-ink/75">Horário de funcionamento:</p>
                  <p>Segunda a Sexta: 10h00 às 19h00</p>
                  <p>Sábados: 10h00 às 13h00</p>
                </div>
              </div>

              <div className="md:col-span-4 text-xs space-y-6">
                <div className="space-y-3">
                  <p className="eyebrow text-muted mb-3">CONTACTOS</p>
                  <div>
                    <p className="text-muted text-[11px] uppercase tracking-wider">Apoio ao Cliente</p>
                    <a href="tel:+351300601645" className="text-clinic-navy hover:underline font-semibold text-[13px] block">
                      300 601 645
                    </a>
                    <p className="text-[11px] text-muted italic">(marcação de consultas - urgências e dúvidas)</p>
                  </div>
                  <div className="pt-1">
                    <p className="text-muted text-[11px] uppercase tracking-wider">Receção</p>
                    <a href="tel:+351211350066" className="text-clinic-navy hover:underline font-semibold text-[13px] block">
                      211 350 066
                    </a>
                  </div>
                  <div className="pt-1">
                    <p className="text-muted text-[11px] uppercase tracking-wider">WhatsApp</p>
                    <a
                      href="https://wa.me/351912907024"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-clinic-navy hover:underline font-semibold text-[13px] inline-flex items-center gap-1.5"
                    >
                      <span>+351 912 907 024</span>
                    </a>
                  </div>
                  <div className="pt-1">
                    <p className="text-muted text-[11px] uppercase tracking-wider">E-mail</p>
                    <a href="mailto:clinicasmod@gmail.com" className="text-clinic-navy hover:underline block">
                      clinicasmod@gmail.com
                    </a>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-rule/60">
                  <p className="eyebrow text-muted mb-2">NAVEGAÇÃO</p>
                  <ul className="grid grid-cols-2 gap-1.5 text-ink">
                    <li>
                      <a href="#tratamentos" className="link-underline py-0.5">
                        Tratamentos
                      </a>
                    </li>
                    <li>
                      <a href="#primeira-consulta" className="link-underline py-0.5">
                        Primeira consulta
                      </a>
                    </li>
                    <li>
                      <a href="#equipa" className="link-underline py-0.5">
                        Equipa
                      </a>
                    </li>
                    <li>
                      <a href="#clinica" className="link-underline py-0.5">
                        A clínica
                      </a>
                    </li>
                    <li>
                      <a href="#perguntas" className="link-underline py-0.5">
                        Perguntas
                      </a>
                    </li>
                    <li>
                      <a href="#marcacao" className="link-underline py-0.5">
                        Marcação
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </ModularReveal>

          <div className="border-t border-rule pt-6 text-[11px] text-muted space-y-3">
            <p>
              Clínica Santa Maria dos Olivais · Estrada de Moscavide N 32C, Lisboa · Diretora clínica: Dra. Ana Mata
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-4">
                <a
                  href="https://www.livroreclamacoes.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline py-0.5 hover:text-ink transition"
                >
                  Livro de Reclamações Eletrónico
                </a>
                <a href="#" className="link-underline py-0.5 hover:text-ink transition">
                  Política de privacidade
                </a>
              </div>
              <p>© 2026 Clínica Santa Maria dos Olivais. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Pop-up elegante com tabela de preços da categoria selecionada */}
      <PriceListModal
        isOpen={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
        treatmentId={priceModalTreatmentId}
        onBookTreatment={(treatmentTitle, userMessage) => {
          handleOpenChatbot(treatmentTitle, userMessage);
        }}
      />

      {/* Assistente Virtual Interativo da Clínica */}
      <ChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        initialTreatment={chatbotInitialTreatment}
        initialMessage={chatbotInitialMessage}
        onSelectTreatmentToBook={(treatment) => {
          setBookingTratamento(treatment);
          const marcacao = document.getElementById('marcacao');
          if (marcacao) {
            marcacao.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
    </div>
  );
}
