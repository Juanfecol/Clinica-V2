import { TREATMENT_PRICING, TreatmentPricing } from '../data/specialtiesData';
import { arvoreDecisao, DecisionNode } from '../data/knowledgeBase';
import { SupportedLocale } from './types';
import { SITE_TRANSLATIONS } from './siteTranslations';

export interface PriceModalUiText {
  eyebrow: string;
  closeAria: string;
  transparentNote: string;
  bookBtn: string;
  bookIntentMsg: (title: string) => string;
  whatsappPriceMsg: (title: string) => string;
}

export const PRICE_MODAL_UI: Record<SupportedLocale, PriceModalUiText> = {
  pt: {
    eyebrow: 'Tabela Oficial & Transparente · Clínica Santa Maria dos Olivais',
    closeAria: 'Fechar tabela de preços',
    transparentNote: 'Valores clínicos oficiais apresentados antes de qualquer decisão — sem surpresas nem letras pequenas.',
    bookBtn: 'Marcar avaliação',
    bookIntentMsg: (title) => `Gostaria de agendar uma avaliação humana para ${title}`,
    whatsappPriceMsg: (title) =>
      `Olá! Gostaria de receber orientação sobre ${title} e os respetivos valores clínicos na Clínica Santa Maria dos Olivais.`,
  },
  es: {
    eyebrow: 'Tarifas Oficiales y Transparentes · Clínica Santa Maria dos Olivais',
    closeAria: 'Cerrar tabla de tarifas',
    transparentNote: 'Honorarios clínicos oficiales explicados antes de cualquier decisión — sin sorpresas ni letra pequeña.',
    bookBtn: 'Agendar valoración',
    bookIntentMsg: (title) => `Me gustaría agendar una valoración cercana para ${title}`,
    whatsappPriceMsg: (title) =>
      `¡Hola! Me gustaría recibir orientación sobre ${title} y sus tarifas clínicas en la Clínica Santa Maria dos Olivais.`,
  },
  en: {
    eyebrow: 'Official & Transparent Fee Guide · Santa Maria dos Olivais Clinic',
    closeAria: 'Close fee guide',
    transparentNote: 'Official clinical fees shared clearly before you decide — zero hidden charges or fine print.',
    bookBtn: 'Book assessment',
    bookIntentMsg: (title) => `I would love to schedule a gentle consultation for ${title}`,
    whatsappPriceMsg: (title) =>
      `Hello! I would like warm guidance and fee details regarding ${title} at Santa Maria dos Olivais Dental Clinic.`,
  },
  fr: {
    eyebrow: 'Honoraires Officiels & Transparents · Clinique Santa Maria dos Olivais',
    closeAria: 'Fermer la grille tarifaire',
    transparentNote: 'Honoraires cliniques officiels présentés avant toute décision — sans frais cachés ni mauvaises surprises.',
    bookBtn: 'Prendre rendez-vous',
    bookIntentMsg: (title) => `Je souhaite planifier un bilan bienveillant pour ${title}`,
    whatsappPriceMsg: (title) =>
      `Bonjour ! J’aimerais recevoir des conseils personnalisés et des précisions sur les tarifs de ${title} à la Clinique Santa Maria dos Olivais.`,
  },
  de: {
    eyebrow: 'Offizielle & Transparente Honorare · Zahnklinik Santa Maria dos Olivais',
    closeAria: 'Honorartabelle schließen',
    transparentNote: 'Offizielle klinische Honorare klar vor jeder Entscheidung — ohne versteckte Kosten oder Kleingedrucktes.',
    bookBtn: 'Beratung buchen',
    bookIntentMsg: (title) => `Ich möchte gerne eine einfühlsame Beratung für ${title} vereinbaren`,
    whatsappPriceMsg: (title) =>
      `Guten Tag! Ich wünsche mir eine persönliche Orientierung und Informationen zu den Honoraren für ${title} in der Zahnklinik Santa Maria dos Olivais.`,
  },
  it: {
    eyebrow: 'Tariffario Ufficiale & Trasparente · Clinica Santa Maria dos Olivais',
    closeAria: 'Chiudi listino prezzi',
    transparentNote: 'Onorari clinici ufficiali condivisi con chiarezza prima di ogni scelta — nessuna sorpresa né costi nascosti.',
    bookBtn: 'Prenota valutazione',
    bookIntentMsg: (title) => `Vorrei prenotare una valutazione accogliente per ${title}`,
    whatsappPriceMsg: (title) =>
      `Buongiorno! Desidero ricevere informazioni e orientamento su ${title} presso la Clinica Santa Maria dos Olivais.`,
  },
};

const PRICING_ES: Record<string, TreatmentPricing> = {
  Implantologia: {
    id: 'Implantologia',
    title: 'Implantología y Rehabilitación Oral',
    subtitle: 'Implantes en titanio grado médico, cirugía guiada 3D y arcada fija All-on-4/6',
    note: 'Pensado para tu tranquilidad financiera: posibilidad de abono en 2 fases clínicas (50 % en la fase quirúrgica y 50 % al colocar la corona definitiva). Entregamos factura médica codificada para reembolso en ADSE, Médis, Multicare, AdvanceCare y aseguradoras internacionales.',
    items: [
      {
        name: 'Implante Unitario en Titanio + Corona Metal-Cerámica',
        detail: 'Incluye cirugía guiada atraumática de osteointegración y corona definitiva a medida',
        price: '745 €',
      },
      {
        name: 'Rehabilitación con 2 Implantes Dentales',
        detail: 'Reposición fija biocompatible para ausencias adyacentes con coronas incluidas',
        price: '1.400 €',
      },
      {
        name: 'Rehabilitación con 3 Implantes Dentales',
        detail: 'Soporte osteointegrado estable para devolver la masticación segura en sectores posteriores',
        price: '1.800 €',
      },
      {
        name: 'Rehabilitación con 4 Implantes Dentales',
        detail: 'Base biomecánica amplia para rehabilitaciones parciales extensas o completas',
        price: '2.300 €',
      },
      {
        name: 'Protocolo Fijo de Arcada Completa (All-on-4 / All-on-6)',
        detail: 'Rehabilitación integral sobre 4 a 6 implantes + prótesis fija definitiva atornillada',
        price: '4.800 € – 5.000 €',
      },
      {
        name: 'Prótesis Provisional Fija (Carga Inmediata 24 h)',
        detail: 'Dientes fijos provisionales colocados el mismo día o 24 h tras la intervención para no perder nunca tu sonrisa',
        price: '1.200 €',
      },
      {
        name: 'Prótesis Provisional Removible Confort',
        detail: 'Solución estética y cómoda durante el periodo biológico de osteointegración',
        price: '350 €',
      },
      {
        name: 'Corona en Cerámica Pura o Zirconio Monolítico sobre Implante',
        detail: 'Alta estética biomimética y translucidez idéntica al esmalte natural sobre pilar protésico',
        price: '650 €',
      },
      {
        name: 'Regeneración Ósea Guiada (Injerto Óseo)',
        detail: 'Reconstrucción volumétrica con biomateriales certificados cuando el hueso maxilar lo requiere',
        price: '200 € – 500 €',
      },
      {
        name: 'Mantenimiento Periodontal de Prótesis Fija sobre Implantes',
        detail: 'Desinfección periimplantaria ultrasónica, control oclusal y pulido clínico (por arcada)',
        price: '100 €',
      },
      {
        name: 'Calibración de Torque / Sellado Protésico en Composite',
        detail: 'Revisión biomecánica rutinaria y sellado hermético de chimenea protésica',
        price: '10 €',
      },
    ],
  },
  'Ortodontia invisível': {
    id: 'Ortodontia invisível',
    title: 'Ortodoncia y Alineadores Transparentes',
    subtitle: 'Alineadores invisibles a medida, ortodoncia fija de baja fricción y contención oclusal',
    note: 'Alineamos tu sonrisa respetando tu ritmo de vida y tu comodidad al hablar. Emitimos facturas médicas detalladas por cada etapa para reembolso en tu seguro dental.',
    items: [
      {
        name: 'Estudio Diagnóstico Ortodóncico Completo',
        detail: 'Análisis cefalométrico, registros intraorales digitales y planificación individualizada',
        price: '60 €',
      },
      {
        name: 'Aparatología Ortodóncica Fija de Precisión',
        detail: 'Sistema multibrackets de control tridimensional suave (por arcada)',
        price: '450 €',
      },
      {
        name: 'Consulta Mensual de Control y Activación (Ortodoncia Fija)',
        detail: 'Seguimiento clínico cercano y ajuste progresivo sin prisas',
        price: '65 €',
      },
      {
        name: 'Alineadores Ortodóncicos Transparentes (Invisalign / Spark)',
        detail: 'Férulas secuenciales invisibles y removibles diseñadas digitalmente (presupuesto tras estudio)',
        price: 'A consultar',
      },
      {
        name: 'Consulta de Evolución de Alineadores Transparentes',
        detail: 'Supervisión oclusal y entrega guiada de nuevas etapas de alineadores',
        price: '75 €',
      },
      {
        name: 'Contención Ortodóncica Fija Lingual',
        detail: 'Fino arco adherido en la cara interna dental para preservar tu nueva sonrisa (por arcada)',
        price: '150 €',
      },
      {
        name: 'Contención Transparente Removible Nocturna',
        detail: 'Férula termoconformada discreta para estabilidad oclusal duradera (por arcada)',
        price: '180 €',
      },
      {
        name: 'Disyuntor Ortodóncico Palatino',
        detail: 'Ortopedia maxilar interceptiva para armonizar el crecimiento del paladar',
        price: '480 €',
      },
      {
        name: 'Mantenedor Clínico de Espacio',
        detail: 'Guía fisiológica para proteger la correcta erupción de dientes definitivos',
        price: '130 €',
      },
      {
        name: 'Retirada Segura de Aparatología Externa y Pulido de Esmalte',
        detail: 'Despegado cuidadoso de brackets colocados en otro centro y remineralización superficial',
        price: '100 €',
      },
    ],
  },
  'Estética dentária': {
    id: 'Estética dentária',
    title: 'Estética Dental y Armonía de la Sonrisa',
    subtitle: 'Carillas cerámicas ultrafinas, coronas biomiméticas y diseño facial natural',
    note: 'No fabricamos sonrisas artificiales en serie: estudiamos tu expresión, tus labios y tu luz natural para que vuelvas a sonreír reconociéndote al espejo.',
    items: [
      {
        name: 'Carillas Cerámicas Ultrafinas – 4 Dientes Anteriores',
        detail: 'Armonización luminosa y mínimamente invasiva del frente estético central',
        price: '1.800 €',
      },
      {
        name: 'Carillas Cerámicas – 1 Arcada Completa (10 Dientes)',
        detail: 'Diseño integral de la sonrisa superior hasta segundos premolares con naturalidad absoluta',
        price: '4.550 €',
      },
      {
        name: 'Carillas Cerámicas – Rehabilitación Bimolar Estética (20 Dientes)',
        detail: 'Rejuvenecimiento armónico y funcional de arcada superior e inferior',
        price: '6.500 €',
      },
      {
        name: 'Restauración Estética Estratificada en Resina Compuesta',
        detail: 'Escultura dental adhesiva conservadora con resinas nanohíbridas de brillo natural',
        price: '75 €',
      },
      {
        name: 'Corona Totalmente Cerámica o en Zirconio Monolítico',
        detail: 'Rehabilitación libre de metal con resistencia biomecánica y mimetismo gingival',
        price: '650 €',
      },
      {
        name: 'Incrustación Cerámica Adhesiva (Inlay / Onlay)',
        detail: 'Pieza de porcelana de alta precisión que protege y refuerza tu diente natural',
        price: '450 €',
      },
    ],
  },
  Branqueamento: {
    id: 'Branqueamento',
    title: 'Blanqueamiento Dental Clínico',
    subtitle: 'Protocolos médicos respetuosos con tu esmalte y supervisión personalizada',
    note: 'Iluminamos tu sonrisa cuidando la salud del esmalte y la encía con geles clínicos desensibilizantes regulados por normativa sanitaria europea.',
    items: [
      {
        name: 'Blanqueamiento Clínico en Consulta',
        detail: 'Sesión médica con barrera gingival fotopolimerizable y luminosidad visible desde el primer día',
        price: '200 €',
      },
      {
        name: 'Blanqueamiento Ambulatorio Supervisado (Kit a Medida)',
        detail: 'Férulas anatómicas individuales + estuche clínico + jeringas dosificadas bajo pauta médica',
        price: '150 €',
      },
      {
        name: 'Jeringa Clínica de Mantenimiento Luminoso',
        detail: 'Recarga individual supervisada para conservar el tono natural alcanzado',
        price: '25 €',
      },
    ],
  },
  Endodontia: {
    id: 'Endodontia',
    title: 'Endodoncia y Conservación Dental',
    subtitle: 'Endodoncia mecanizada indolora y alivio inmediato del dolor agudo',
    note: 'Cuando un diente duele, nuestra prioridad humana y médica es aliviar tu malestar con anestesia eficaz y salvar tu propia raíz natural siempre que sea viable.',
    items: [
      {
        name: 'Endodoncia Mecanizada – Incisivo / Canino / Premolar',
        detail: 'Desinfección quimiomecánica y obturación tridimensional en piezas unirradiculares o birradiculares',
        price: '180 €',
      },
      {
        name: 'Endodoncia Mecanizada – Molar Multirradicular',
        detail: 'Tratamiento radicular de alta precisión asistido por radiología digital de baja dosis',
        price: '240 €',
      },
      {
        name: 'Pulpectomía Terapéutica + Restauración Coronaria',
        detail: 'Eliminación completa del tejido pulpar inflamado y sellado restaurador protector',
        price: '120 €',
      },
      {
        name: 'Pulpotomía Biológica + Restauración',
        detail: 'Conservación selectiva de la vitalidad radicular con biomateriales reparadores',
        price: '80 €',
      },
      {
        name: 'Urgencia Endodóncica: Drenaje de Absceso Dental',
        detail: 'Descompresión clínica inmediata para aliviar presión, inflamación y dolor agudo',
        price: '25 €',
      },
    ],
  },
  Próteses: {
    id: 'Próteses',
    title: 'Prótesis Dentales y Rehabilitación Funcional',
    subtitle: 'Coronas de zirconio, prótesis flexibles sin ganchos metálicos y reparaciones rápidas',
    note: 'Volver a comer con placer, hablar con seguridad y reír sin temor a que nada se mueva cambia el día a día de una persona.',
    items: [
      {
        name: 'Corona en Cerámica Pura o Zirconio sobre Diente Natural',
        detail: 'Estética luminosa sin márgenes oscuros y ajuste gingival microscópico',
        price: '650 €',
      },
      {
        name: 'Corona Metal-Cerámica de Alta Resistencia',
        detail: 'Núcleo interno reforzado recubierto de porcelana estética duradera',
        price: '550 €',
      },
      {
        name: 'Corona Provisional Anatómica',
        detail: 'Estética y confort garantizados mientras el laboratorio confecciona tu pieza definitiva',
        price: '70 €',
      },
      {
        name: 'Recementado Clínico Adhesivo de Corona',
        detail: 'Limpieza protésica y fijación segura con cementos resinosos biocompatibles',
        price: '30 €',
      },
      {
        name: 'Prótesis Removible Acrílica a Medida',
        detail: 'Rehabilitación funcional ligera desde 1 pieza (180 €) hasta arcada de 14 dientes (330 €)',
        price: '180 € – 330 €',
      },
      {
        name: 'Prótesis Esquelética en Cromo-Cobalto',
        detail: 'Estructura fina de gran estabilidad masticatoria y mínimo volumen palatino (1 a 14 dientes)',
        price: '260 € – 400 €',
      },
      {
        name: 'Prótesis Flexible Estética (Sin Ganchos Metálicos Visibles)',
        detail: 'Polímero translúcido hipoalergénico que se mimetiza con la encía (1 a 14 dientes)',
        price: '310 € – 440 €',
      },
      {
        name: 'Reparación Laboratorial de Prótesis',
        detail: '60 € en resina acrílica · 100 € en estructura esquelética o flexible',
        price: '60 € – 100 €',
      },
      {
        name: 'Incorporación de Pieza Dental en Prótesis Existente',
        detail: 'Adaptación sobre tu prótesis actual: base 60 € – 100 € (+10 € por diente adicional)',
        price: 'Desde 60 €',
      },
      {
        name: 'Rebase Anatómico de Confort Protésico',
        detail: 'Readaptación íntima a la encía: 60 € en acrílica · 100 € en flexible',
        price: '60 € – 100 €',
      },
      {
        name: 'Alivio Oclusal y Pulido de Puntos de Roce',
        detail: 'Ajuste delicado en consulta para eliminar molestias gingivales',
        price: '5 €',
      },
    ],
  },
  'Cirurgia Oral': {
    id: 'Cirurgia Oral',
    title: 'Cirugía Oral Atraumática y Cordales',
    subtitle: 'Extracción cuidadosa de muelas del juicio, preservación alveolar y regeneración ósea',
    note: 'Intervenciones guiadas por el Dr. Júlio con manos serenas, anestesia local profunda y seguimiento cercano para una recuperación tranquila en casa.',
    items: [
      {
        name: 'Exodoncia Quirúrgica de Cordal Incluido / Impactado',
        detail: 'Extracción atraumática de muela del juicio retenida con planificación radiológica previa',
        price: '100 € – 200 €',
      },
      {
        name: 'Exodoncia de Muela del Juicio Erupcionada',
        detail: 'Extracción delicada de tercer molar visible respetando tejidos blandos vecinos',
        price: '75 € – 200 €',
      },
      {
        name: 'Exodoncia Atraumática de Molar',
        detail: 'Extracción conservadora de pieza posterior irrecuperable bajo anestesia indolora',
        price: '50 €',
      },
      {
        name: 'Exodoncia de Canino o Premolar',
        detail: 'Procedimiento suave cuidando el hueso alveolar circundante',
        price: '50 €',
      },
      {
        name: 'Exodoncia Anterior con Preservación Alveolar',
        detail: 'Extracción cuidadosa en sector estético protegiendo la arquitectura gingival',
        price: '30 €',
      },
      {
        name: 'Injerto Óseo de Regeneración',
        detail: 'Biomaterial osteoconductor certificado para preservar o ganar volumen óseo',
        price: '200 € – 500 €',
      },
      {
        name: 'Regularización Quirúrgica de Reborde Alveolar',
        detail: 'Remodelación ósea suave para mejorar el asiento protésico (por cuadrante)',
        price: '60 €',
      },
    ],
  },
  'Medicina dentária geral': {
    id: 'Medicina dentária geral',
    title: 'Odontología Preventiva, Periodoncia y Bruxismo',
    subtitle: 'Tartrectomía ultrasónica suave, salud gingival, caries y férulas miorrelajantes',
    note: 'Cuidar a tiempo evita tratamientos complejos mañana. Aquí revisamos tu salud oral sin prisas, explicándote cada detalle con cercanía.',
    items: [
      {
        name: 'Tartrectomía Ultrasónica + Pulido Coronario (Higiene Profunda)',
        detail: 'Eliminación suave de cálculo dental y placa bacteriana devolviendo frescura y salud gingival',
        price: '40 €',
      },
      {
        name: 'Profilaxis Clínica de Mantenimiento',
        detail: 'Higiene preventiva periódica y eliminación delicada de pigmentaciones externas',
        price: '30 €',
      },
      {
        name: 'Raspado y Alisado Radicular Periodontal',
        detail: 'Desinfección subgingival para frenar la inflamación y proteger el soporte óseo (por cuadrante)',
        price: '70 €',
      },
      {
        name: 'Férula Oclusal Miorrelajante a Medida (Bruxismo)',
        detail: 'Placa rígida individualizada para proteger el esmalte y aliviar sobrecarga mandibular nocturna',
        price: '180 €',
      },
      {
        name: 'Restauración Conservadora Simple en Composite',
        detail: 'Tratamiento adhesivo estético de caries incipiente respetando el tejido dental sano',
        price: '45 €',
      },
      {
        name: 'Reconstrucción Dental Compleja en Composite',
        detail: 'Restauración anatómica funcional y estética de dos o más superficies',
        price: '65 €',
      },
      {
        name: 'Obturación Terapéutica Provisional',
        detail: 'Sellado calmante temporal entre sesiones clínicas',
        price: '25 €',
      },
      {
        name: 'Radiografía Periapical Digital de Baja Radiación',
        detail: 'Imagen diagnóstica intraoral instantánea de alta nitidez',
        price: '10 €',
      },
      {
        name: 'Valoración Clínica y Prescripción Médica',
        detail: 'Diagnóstico presencial y pauta farmacológica personalizada',
        price: '20 €',
      },
      {
        name: 'Consulta de Control y Revisión Posoperatoria',
        detail: 'Acompañamiento cercano de tu evolución clínica',
        price: '5 €',
      },
    ],
  },
  Odontopediatria: {
    id: 'Odontopediatria',
    title: 'Odontopediatría Humanizada',
    subtitle: 'Prevención infantil cariñosa, selladores y acompañamiento sin miedos con la Dra. Ori',
    note: 'Un niño al que se escucha con cariño hoy será un adulto que sonríe tranquilo toda su vida. Adaptamos cada visita a su curiosidad y a su propio tiempo.',
    items: [
      {
        name: 'Primera Visita de Adaptación e Higiene Infantil',
        detail: 'Encuentro lúdico de confianza, revisión suave y aprendizaje divertido del cepillado',
        price: 'Atención lúdica',
      },
      {
        name: 'Selladores Preventivos de Fosas y Fisuras',
        detail: 'Escudo protector indoloro sobre molares frente a la caries infantil (por arcada)',
        price: '40 €',
      },
      {
        name: 'Restauración Pediátrica en Diente Temporal',
        detail: 'Cuidado delicado de caries en diente de leche con materiales biocompatibles',
        price: '45 €',
      },
      {
        name: 'Exodoncia Suave de Diente Temporal',
        detail: 'Retirada rápida y cariñosa de diente de leche móvil o retenido',
        price: '35 €',
      },
      {
        name: 'Pulpotomía Pediátrica + Restauración Protectora',
        detail: 'Conservación vital del diente temporal para guiar a la pieza definitiva',
        price: '80 €',
      },
      {
        name: 'Pulpectomía Infantil + Restauración',
        detail: 'Tratamiento radicular delicado para aliviar infección y cuidar el germen permanente',
        price: '120 €',
      },
      {
        name: 'Mantenedor de Espacio Pediátrico',
        detail: 'Preserva la armonía de la arcada durante el recambio dental infantil',
        price: '130 €',
      },
    ],
  },
};

const PRICING_EN: Record<string, TreatmentPricing> = {
  Implantologia: {
    id: 'Implantologia',
    title: 'Implantology & Oral Rehabilitation',
    subtitle: 'Medical-grade titanium implants, 3D-guided surgery & fixed All-on-4/6 arches',
    note: 'Designed around your peace of mind: two-stage clinical payment available (50% at implant placement and 50% when your definitive crown is fitted). Coded medical invoices issued for ADSE, Médis, Multicare, AdvanceCare and international insurers.',
    items: [
      {
        name: 'Single Titanium Implant + Porcelain-Fused Crown',
        detail: 'Includes gentle 3D-guided surgical placement and custom definitive crown',
        price: '745 €',
      },
      {
        name: '2 Dental Implants Rehabilitation',
        detail: 'Fixed biocompatible replacement for adjacent missing teeth, crowns included',
        price: '1,400 €',
      },
      {
        name: '3 Dental Implants Rehabilitation',
        detail: 'Stable osseointegrated foundation restoring confident chewing comfort',
        price: '1,800 €',
      },
      {
        name: '4 Dental Implants Rehabilitation',
        detail: 'Comprehensive biomechanical support for extended partial or full-arch care',
        price: '2,300 €',
      },
      {
        name: 'Full-Arch Fixed Protocol (All-on-4 / All-on-6)',
        detail: 'Complete arch restoration on 4–6 implants + definitive screw-retained bridge',
        price: '4,800 € – 5,000 €',
      },
      {
        name: 'Immediate-Load Fixed Provisional Bridge (Within 24h)',
        detail: 'Fixed provisional teeth placed on surgery day or within 24h so you never go without your smile',
        price: '1,200 €',
      },
      {
        name: 'Comfort Removable Provisional Prosthesis',
        detail: 'Natural-looking interim prosthesis worn comfortably during osseointegration',
        price: '350 €',
      },
      {
        name: 'All-Ceramic / Monolithic Zirconia Crown on Implant',
        detail: 'Lifelike translucency and biocompatible gum harmony over custom implant abutment',
        price: '650 €',
      },
      {
        name: 'Guided Bone Regeneration (Bone Graft)',
        detail: 'Certified biomaterial bone augmentation whenever additional jawbone support is needed',
        price: '200 € – 500 €',
      },
      {
        name: 'Peri-Implant Fixed Bridge Maintenance & Ultrasonic Care',
        detail: 'Specialist ultrasonic biofilm removal, occlusal check and clinical polish (per arch)',
        price: '100 €',
      },
      {
        name: 'Implant Crown Torque Calibration & Composite Seal',
        detail: 'Routine biomechanical tightening and screw-access sealing',
        price: '10 €',
      },
    ],
  },
  'Ortodontia invisível': {
    id: 'Ortodontia invisível',
    title: 'Orthodontics & Clear Aligners',
    subtitle: 'Custom clear aligners, precision fixed braces & long-term occlusal retention',
    note: 'We align your teeth gently around your daily routine and speech comfort. Itemised medical invoices are provided at every stage for insurance reimbursement.',
    items: [
      {
        name: 'Comprehensive Orthodontic Diagnostic Study',
        detail: 'Cephalometric analysis, digital intraoral records and personalised treatment roadmap',
        price: '60 €',
      },
      {
        name: 'High-Precision Fixed Orthodontic Braces',
        detail: 'Gentle 3D-controlled bracket system for predictable alignment (per arch)',
        price: '450 €',
      },
      {
        name: 'Monthly Orthodontic Activation & Care Visit',
        detail: 'Unhurried clinical review and progressive wire adjustment',
        price: '65 €',
      },
      {
        name: 'Custom Clear Orthodontic Aligners (Invisalign / Spark)',
        detail: 'Discreet, removable digital aligner therapy tailored to your smile (quoted after study)',
        price: 'Upon assessment',
      },
      {
        name: 'Clear Aligner Progress & Tracking Visit',
        detail: 'Occlusal monitoring and guided delivery of your next aligner stages',
        price: '75 €',
      },
      {
        name: 'Bonded Lingual Fixed Retainer',
        detail: 'Ultra-thin hidden wire preserving your new alignment long term (per arch)',
        price: '150 €',
      },
      {
        name: 'Custom Clear Nighttime Retainer',
        detail: 'Thermoformed transparent retainer for lasting occlusal stability (per arch)',
        price: '180 €',
      },
      {
        name: 'Orthopaedic Palatal Expander',
        detail: 'Gentle interceptive upper-arch expansion for harmonious jaw development',
        price: '480 €',
      },
      {
        name: 'Clinical Space Maintainer',
        detail: 'Safeguards natural room for erupting permanent teeth',
        price: '130 €',
      },
      {
        name: 'Safe External Brace Removal & Enamel Polish',
        detail: 'Careful debonding of braces placed elsewhere followed by gentle enamel care',
        price: '100 €',
      },
    ],
  },
  'Estética dentária': {
    id: 'Estética dentária',
    title: 'Aesthetic Dentistry & Smile Harmony',
    subtitle: 'Ultra-thin ceramic veneers, biomimetic crowns & natural facial balance',
    note: 'We never create mass-produced artificial smiles: we study your facial expression, lip dynamics and natural tooth shade so your smile still feels unmistakably yours.',
    items: [
      {
        name: 'Ultra-Thin Ceramic Veneers – 4 Anterior Teeth',
        detail: 'Minimally invasive luminosity and proportion harmony across the central smile zone',
        price: '1,800 €',
      },
      {
        name: 'Ceramic Veneers – Full Single Arch (10 Teeth)',
        detail: 'Bespoke upper smile rehabilitation extending naturally to the second premolars',
        price: '4,550 €',
      },
      {
        name: 'Ceramic Veneers – Dual-Arch Smile Harmony (20 Teeth)',
        detail: 'Comprehensive functional and aesthetic rejuvenation of upper and lower arches',
        price: '6,500 €',
      },
      {
        name: 'Biomimetic Layered Composite Restoration',
        detail: 'Conservative freehand sculpting with high-lustre nano-hybrid composite resin',
        price: '75 €',
      },
      {
        name: 'All-Ceramic or Monolithic Zirconia Crown',
        detail: 'Metal-free ceramic restoration combining strength with natural enamel translucency',
        price: '650 €',
      },
      {
        name: 'Bonded Ceramic Inlay / Onlay',
        detail: 'Precision lab-crafted porcelain restoration reinforcing natural tooth structure',
        price: '450 €',
      },
    ],
  },
  Branqueamento: {
    id: 'Branqueamento',
    title: 'Clinical Teeth Whitening',
    subtitle: 'Enamel-safe medical brightening in clinic or with custom home trays',
    note: 'We brighten your smile safely under strict dental supervision, using desensitising medical gels that respect both tooth enamel and delicate gums.',
    items: [
      {
        name: 'In-Office Medical Whitening Session',
        detail: 'Clinician-applied whitening with protective gingival barrier and immediate radiance',
        price: '200 €',
      },
      {
        name: 'Dentist-Supervised Home Whitening Kit',
        detail: 'Custom-fitted trays + protective case + calibrated medical whitening syringes',
        price: '150 €',
      },
      {
        name: 'Maintenance Whitening Gel Syringe',
        detail: 'Supervised individual top-up syringe to keep your smile naturally bright',
        price: '25 €',
      },
    ],
  },
  Endodontia: {
    id: 'Endodontia',
    title: 'Endodontics & Natural Tooth Preservation',
    subtitle: 'Painless rotary root canal therapy & gentle toothache relief',
    note: 'When toothache strikes, our human and clinical priority is immediate comfort under effective anaesthesia while saving your natural tooth root.',
    items: [
      {
        name: 'Rotary Root Canal – Incisor / Canine / Premolar',
        detail: 'Thorough chemo-mechanical disinfection and 3D sealing for front and premolar teeth',
        price: '180 €',
      },
      {
        name: 'Rotary Root Canal – Multi-Rooted Molar',
        detail: 'Precision molar endodontics guided by low-dose digital radiography',
        price: '240 €',
      },
      {
        name: 'Therapeutic Pulpectomy + Coronal Restoration',
        detail: 'Complete removal of inflamed pulp tissue with protective bonded seal',
        price: '120 €',
      },
      {
        name: 'Biocompatible Pulpotomy + Restoration',
        detail: 'Conservative vital pulp therapy using bioactive healing materials',
        price: '80 €',
      },
      {
        name: 'Acute Relief: Dental Abscess Drainage',
        detail: 'Immediate clinical decompression relieving acute swelling, pressure and pain',
        price: '25 €',
      },
    ],
  },
  Próteses: {
    id: 'Próteses',
    title: 'Dental Prosthetics & Functional Comfort',
    subtitle: 'Zirconia crowns, clasp-free flexible dentures & rapid lab repairs',
    note: 'Enjoying favourite meals, speaking clearly and laughing without worry restores everyday dignity and confidence.',
    items: [
      {
        name: 'All-Ceramic or Zirconia Crown on Natural Tooth',
        detail: 'Natural translucency with zero dark metal margins and precise gingival fit',
        price: '650 €',
      },
      {
        name: 'Porcelain-Fused-to-Metal Crown',
        detail: 'High-strength core layered with durable tooth-shaded porcelain',
        price: '550 €',
      },
      {
        name: 'Custom Provisional Crown',
        detail: 'Comfortable aesthetic protection while our laboratory crafts your final crown',
        price: '70 €',
      },
      {
        name: 'Clinical Adhesive Crown Re-Cementation',
        detail: 'Ultrasonic cleaning and secure biocompatible resin bonding',
        price: '30 €',
      },
      {
        name: 'Custom Removable Acrylic Prosthesis',
        detail: 'Lightweight functional restoration from 1 tooth (180 €) up to 14 teeth (330 €)',
        price: '180 € – 330 €',
      },
      {
        name: 'Cobalt-Chrome Precision Partial Denture',
        detail: 'Slender, stable framework offering thin palatal comfort (1 to 14 teeth)',
        price: '260 € – 400 €',
      },
      {
        name: 'Clasp-Free Flexible Denture (Deflex)',
        detail: 'Hypoallergenic gum-shaded resin with zero visible metal clasps (1 to 14 teeth)',
        price: '310 € – 440 €',
      },
      {
        name: 'Laboratory Denture Repair',
        detail: '60 € acrylic resin · 100 € cobalt-chrome or flexible prosthesis',
        price: '60 € – 100 €',
      },
      {
        name: 'Tooth Addition to Existing Prosthesis',
        detail: 'Seamless addition onto your current denture: base 60 € – 100 € (+10 € per extra tooth)',
        price: 'From 60 €',
      },
      {
        name: 'Anatomical Comfort Denture Reline',
        detail: 'Refits your prosthesis gently to your gums: 60 € acrylic · 100 € flexible',
        price: '60 € – 100 €',
      },
      {
        name: 'Occlusal & Sore-Spot Comfort Adjustment',
        detail: 'Gentle chairside relief and high-shine polish',
        price: '5 €',
      },
    ],
  },
  'Cirurgia Oral': {
    id: 'Cirurgia Oral',
    title: 'Atraumatic Oral Surgery & Wisdom Teeth',
    subtitle: 'Gentle wisdom tooth removal, socket preservation & bone regeneration',
    note: 'Performed by Dr. Júlio with calm reassurance, profound local anaesthesia and attentive post-operative care for a smooth recovery.',
    items: [
      {
        name: 'Surgical Extraction of Impacted Wisdom Tooth',
        detail: 'Minimally invasive removal of bone-retained third molar guided by digital X-ray',
        price: '100 € – 200 €',
      },
      {
        name: 'Extraction of Erupted Wisdom Tooth',
        detail: 'Gentle removal of visible third molar preserving surrounding soft tissues',
        price: '75 € – 200 €',
      },
      {
        name: 'Atraumatic Molar Extraction',
        detail: 'Careful extraction of non-restorable posterior tooth under painless anaesthesia',
        price: '50 €',
      },
      {
        name: 'Canine or Premolar Extraction',
        detail: 'Tissue-respecting removal safeguarding adjacent alveolar bone',
        price: '50 €',
      },
      {
        name: 'Anterior Extraction with Socket Preservation',
        detail: 'Delicate aesthetic-zone removal protecting natural gum contour',
        price: '30 €',
      },
      {
        name: 'Regenerative Bone Graft',
        detail: 'Certified osteoconductive biomaterial preserving or rebuilding jawbone volume',
        price: '200 € – 500 €',
      },
      {
        name: 'Alveolar Ridge Contouring',
        detail: 'Smooth bone remodelling for comfortable prosthetic support (per quadrant)',
        price: '60 €',
      },
    ],
  },
  'Medicina dentária geral': {
    id: 'Medicina dentária geral',
    title: 'Preventive Dentistry, Gum Care & Bruxism',
    subtitle: 'Gentle ultrasonic scaling, periodontal care, fillings & occlusal night guards',
    note: 'Preventive care today spares complex treatments tomorrow. Every check-up is unhurried, clear and centred around your comfort.',
    items: [
      {
        name: 'Ultrasonic Scaling & Airflow Polish (Deep Hygiene)',
        detail: 'Gentle removal of calculus and biofilm restoring fresh breath and healthy gums',
        price: '40 €',
      },
      {
        name: 'Preventive Clinical Prophylaxis',
        detail: 'Routine oral hygiene maintenance and delicate surface stain polishing',
        price: '30 €',
      },
      {
        name: 'Periodontal Scaling & Root Planing',
        detail: 'Targeted subgingival care halting gum inflammation and bone loss (per quadrant)',
        price: '70 €',
      },
      {
        name: 'Custom Myorelaxant Occlusal Splint (Bruxism Guard)',
        detail: 'Rigid custom night guard protecting enamel and easing jaw muscle tension',
        price: '180 €',
      },
      {
        name: 'Conservative Single-Surface Composite Restoration',
        detail: 'Tooth-coloured adhesive treatment preserving healthy natural enamel',
        price: '45 €',
      },
      {
        name: 'Complex Multi-Surface Composite Reconstruction',
        detail: 'Anatomical restoration restoring strength and natural cusp geometry',
        price: '65 €',
      },
      {
        name: 'Soothing Interim Dressing / Filling',
        detail: 'Protective temporary seal between clinical stages',
        price: '25 €',
      },
      {
        name: 'Low-Dose Digital Periapical Radiograph',
        detail: 'High-clarity instant intraoral diagnostic image',
        price: '10 €',
      },
      {
        name: 'Clinical Evaluation & Medical Prescription',
        detail: 'In-person diagnostic assessment and tailored medication plan',
        price: '20 €',
      },
      {
        name: 'Post-Treatment Review & Follow-Up',
        detail: 'Attentive clinical check on your healing and comfort',
        price: '5 €',
      },
    ],
  },
  Odontopediatria: {
    id: 'Odontopediatria',
    title: 'Humanised Paediatric Dentistry',
    subtitle: 'Warm, fear-free child prevention, sealants & gentle care with Dr. Ori',
    note: 'A child who feels heard and respected today grows into an adult who smiles without fear for life. Every visit moves at your child’s natural pace.',
    items: [
      {
        name: 'First Playful Adaptation & Hygiene Visit',
        detail: 'Gentle confidence-building check-up and fun toothbrushing coaching',
        price: 'Child-friendly care',
      },
      {
        name: 'Preventive Pit & Fissure Sealants',
        detail: 'Painless protective shield over molar grooves against childhood cavities (per arch)',
        price: '40 €',
      },
      {
        name: 'Primary Tooth Biocompatible Restoration',
        detail: 'Gentle cavity care in baby teeth using safe tooth-coloured resins',
        price: '45 €',
      },
      {
        name: 'Gentle Baby Tooth Extraction',
        detail: 'Quick, comforting removal of a mobile or retained primary tooth',
        price: '35 €',
      },
      {
        name: 'Paediatric Pulpotomy + Protective Restoration',
        detail: 'Preserves primary tooth vitality so permanent teeth erupt in alignment',
        price: '80 €',
      },
      {
        name: 'Paediatric Pulpectomy + Restoration',
        detail: 'Delicate root treatment relieving infection and protecting the developing adult tooth',
        price: '120 €',
      },
      {
        name: 'Paediatric Space Maintainer',
        detail: 'Safeguards natural arch harmony during childhood tooth transition',
        price: '130 €',
      },
    ],
  },
};

const LOCALIZED_PRICING_NOTES: Record<'fr' | 'de' | 'it', Record<string, string>> = {
  fr: {
    Implantologia:
      'Pour votre sérénité financière : règlement possible en 2 étapes cliniques (50 % à la pose chirurgicale et 50 % lors de la couronne définitive). Factures médicales codifiées délivrées pour le remboursement auprès de votre mutuelle ou assurance.',
    'Ortodontia invisível':
      'Nous alignons votre sourire avec douceur et discrétion. Factures médicales détaillées remises à chaque étape pour vos remboursements d’assurance santé.',
    'Estética dentária':
      'Chaque sourire est unique : nous étudions l’harmonie de votre visage et votre teinte naturelle pour un résultat lumineux, authentique et jamais artificiel.',
    Branqueamento:
      'Éclaircissement médical encadré protégeant l’émail et les gencives grâce à des gels désensibilisants certifiés.',
    Endodontia:
      'Soulager immédiatement votre douleur sous anesthésie efficace et préserver votre dent naturelle est toujours notre priorité.',
    Próteses:
      'Retrouver le plaisir de manger, parler et rire en toute confiance transforme véritablement le quotidien.',
    'Cirurgia Oral':
      'Interventions réalisées par le Dr Júlio avec une technique atraumatique douce et un suivi post-opératoire attentif.',
    'Medicina dentária geral':
      'Prévenir aujourd’hui évite des soins complexes demain : chaque bilan se déroule sans hâte et avec des explications claires.',
    Odontopediatria:
      'Un enfant écouté avec douceur grandit sans jamais craindre le dentiste. La Dre Ori respecte le rythme de chaque petit patient.',
  },
  de: {
    Implantologia:
      'Für Ihre finanzielle Planungssicherheit: Zahlung in 2 Behandlungsphasen möglich (50 % bei Implantation und 50 % bei Eingliederung der definitiven Krone). Detaillierte Arztrechnungen zur Erstattung bei Ihrer Krankenversicherung.',
    'Ortodontia invisível':
      'Sanfte Zahnkorrektur im Einklang mit Ihrem Alltag. Sie erhalten codierte zahnärztliche Rechnungen für Ihre Versicherung.',
    'Estética dentária':
      'Kein künstliches Einheitslächeln: Wir planen nach Ihren natürlichen Gesichtszügen für ein harmonisches, authentisches Ergebnis.',
    Branqueamento:
      'Zahnärztlich überwachte Aufhellung mit schmelzschonenden, desensibilisierenden Gelen für ein natürlich strahlendes Lächeln.',
    Endodontia:
      'Bei Zahnschmerzen steht Ihre sofortige, schmerzfreie Entlastung und der Erhalt Ihres eigenen Zahnes an erster Stelle.',
    Próteses:
      'Wieder unbeschwert essen, sprechen und herzlich lachen zu können schenkt echte Lebensqualität im Alltag.',
    'Cirurgia Oral':
      'Durchgeführt von Dr. Júlio mit besonders schonender, atraumatischer Technik und fürsorglicher Nachsorge.',
    'Medicina dentária geral':
      'Sorgfältige Vorsorge bewahrt Ihre natürlichen Zähne langfristig — ruhig erklärt und ohne Zeitdruck.',
    Odontopediatria:
      'Ein Kind, dem man heute geduldig begegnet, geht ein Leben lang angstfrei zum Zahnarzt. Dr. Ori begleitet jedes Kind in seinem Tempo.',
  },
  it: {
    Implantologia:
      'Pensato per la tua serenità: possibilità di pagamento in 2 fasi cliniche (50% alla fase chirurgica e 50% alla consegna della corona definitiva). Emettiamo fatture mediche dettagliate per il rimborso assicurativo.',
    'Ortodontia invisível':
      'Allineiamo il tuo sorriso rispettando i tuoi ritmi quotidiani. Fatture mediche codificate disponibili ad ogni fase per la tua assicurazione.',
    'Estética dentária':
      'Nessun sorriso artificiale in serie: progettiamo proporzioni e trasparenze naturali in armonia con il tuo volto.',
    Branqueamento:
      'Protocolli medici sicuri che illuminano il sorriso proteggendo lo smalto e prevenendo la sensibilità.',
    Endodontia:
      'Quando un dente fa male, la nostra priorità umana e clinica è togliere subito il dolore e salvare la tua radice naturale.',
    Próteses:
      'Tornare a masticare con piacere, parlare con sicurezza e sorridere senza pensieri restituisce benessere ogni giorno.',
    'Cirurgia Oral':
      'Procedure eseguite dal Dott. Júlio con tecnica atraumatica delicata e assistenza post-operatoria premurosa.',
    'Medicina dentária geral':
      'La prevenzione fatta con calma oggi protegge il tuo sorriso domani, spiegandoti ogni dettaglio con chiarezza.',
    Odontopediatria:
      'Un bambino accolto con dolcezza oggi diventerà un adulto sereno dal dentista. La Dott.ssa Ori rispetta i tempi di ogni piccolo paziente.',
  },
};

export function getLocalizedPricing(
  treatmentId: string,
  locale: SupportedLocale
): TreatmentPricing {
  const dict =
    locale === 'es'
      ? PRICING_ES
      : locale === 'en' || locale === 'fr' || locale === 'de' || locale === 'it'
      ? PRICING_EN
      : TREATMENT_PRICING;

  const base =
    dict[treatmentId] ||
    Object.values(dict).find(
      (p) =>
        p.id.toLowerCase() === treatmentId.toLowerCase() ||
        treatmentId.toLowerCase().includes(p.id.toLowerCase())
    ) ||
    dict['Implantologia'] ||
    TREATMENT_PRICING['Implantologia'];

  if (locale === 'fr' || locale === 'de' || locale === 'it') {
    const localizedItem = SITE_TRANSLATIONS[locale].tratamentosSection.items[base.id];
    const localizedNote = LOCALIZED_PRICING_NOTES[locale][base.id];
    if (localizedItem) {
      return {
        ...base,
        title: localizedItem.title,
        subtitle: localizedItem.subtitle,
        note: localizedNote || base.note,
      };
    }
  }

  return base;
}

export interface ChatbotUiBundle {
  badge: string;
  title: string;
  closeAria: string;
  resetBtn: string;
  defaultConsultLabel: string;
  saturdaySuffix: string;
  directBookingText: (treatment: string) => string;
  directBookingShortHistory: (treatment: string) => string;
  directOptWeekdays: string;
  directOptSaturday: string;
  directOptWhatsApp: string;
  directOptMenu: string;
  whatsappDirectMsg: (treatment: string) => string;
  defaultUserBubble: (treatment: string) => string;
  nodes: Record<string, DecisionNode>;
}

const CHATBOT_ES_NODES: Record<string, DecisionNode> = {
  MENU_PRINCIPAL: {
    text: '¡Qué alegría recibirte! Aquí detrás de cada consulta hay personas cuidando de personas, sin prisas y con total claridad. ¿Cómo podemos ayudarte hoy?',
    options: [
      { label: 'Consultar tratamientos y tarifas oficiales', next: 'TRATAMENTOS' },
      { label: 'Reembolso de seguros y pago por etapas', next: 'SEGUROS_PAGAMENTOS' },
      { label: 'Agendar mi valoración sin compromiso', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Consulta general' },
      { label: 'Dirección, horarios y contacto humano', next: 'INFO_CLINICA' },
    ],
  },
  SEGUROS_PAGAMENTOS: {
    text: 'Cuidamos de tu salud y también de tu tranquilidad:\n\n• Seguros de salud: trabajamos con dedicación privada sin prisas para garantizar materiales certificados y el tiempo que mereces. Te entregamos siempre factura médica detallada con códigos clínicos OMD para tramitar tu reembolso en ADSE, Médis, Multicare, AdvanceCare o tu aseguradora.\n\n• Pago por etapas: abonas tu tratamiento paso a paso conforme avanza tu plan clínico (y en implantes, 50 % en cirugía y 50 % al colocar la corona).',
    options: [
      { label: 'Agendar mi valoración ahora', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Consulta general' },
      { label: 'Volver al inicio', next: 'MENU_PRINCIPAL' },
    ],
  },
  TRATAMENTOS: {
    text: 'Contamos con un equipo médico especializado para cada etapa de la vida. ¿Sobre qué área te gustaría orientación y precios claros?',
    options: [
      { label: 'Implantes dentales y dientes fijos', next: 'IMPLANTES_MENU' },
      { label: 'Estética dental y blanqueamiento', next: 'ESTETICA_MENU' },
      { label: 'Ortodoncia y alineadores invisibles', next: 'ORTODONTIA_MENU' },
      { label: 'Prótesis dentales y reparaciones', next: 'PROTESES_MENU' },
      { label: 'Prevención, dolor agudo y cirugía', next: 'GERAL_MENU' },
    ],
  },
  IMPLANTES_MENU: {
    text: 'La Implantología guiada en 3D bajo la dirección de la Dra. Ana Mata devuelve firmeza al masticar y confianza al sonreír. ¿Qué deseas consultar?',
    options: [
      { label: 'Implantes unitarios o varios dientes', next: 'IMPLANTES_UNITARIOS' },
      { label: 'Arcada completa fija (All-on-4 / All-on-6)', next: 'IMPLANTES_PROTOCOLOS' },
      { label: 'Volver a especialidades', next: 'TRATAMENTOS' },
    ],
  },
  IMPLANTES_UNITARIOS: {
    text: 'Valores oficiales completos (cirugía + corona definitiva incluida):\n• 1 implante + corona: 745,00 €\n• 2 implantes completos: 1.400,00 €\n• 4 implantes: 2.300,00 €\n• Regeneración ósea guiada (si se precisa): 200,00 € a 500,00 €\n\nFacilidad: 50 % al colocar el implante y 50 % en la corona final. ¿Agendamos tu estudio 3D?',
    options: [
      { label: 'Sí, quiero valorar mi caso', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Implantologia' },
      { label: 'Volver atrás', next: 'IMPLANTES_MENU' },
    ],
  },
  IMPLANTES_PROTOCOLOS: {
    text: 'Rehabilitación fija de arcada completa (4 a 6 implantes en titanio + prótesis fija definitiva atornillada): 4.800,00 € a 5.000,00 €.\n• Provisional removible confort: +350,00 €\n• Carga inmediata fija en 24 h: +1.200,00 €\n\n¿Te gustaría conversar con la Dra. Ana Mata sobre tu caso?',
    options: [
      { label: 'Sí, reservar valoración', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Implantologia' },
      { label: 'Volver atrás', next: 'IMPLANTES_MENU' },
    ],
  },
  ESTETICA_MENU: {
    text: 'Diseñamos sonrisas luminosas y naturales que respetan tus rasgos y tu esencia. Elige qué deseas explorar:',
    options: [
      { label: 'Carillas cerámicas ultrafinas', next: 'FACETAS' },
      { label: 'Blanqueamiento clínico seguro', next: 'BRANQUEAMENTO' },
      { label: 'Volver a especialidades', next: 'TRATAMENTOS' },
    ],
  },
  FACETAS: {
    text: 'Carillas cerámicas biomiméticas a medida:\n• 4 dientes anteriores: 1.800,00 €\n• 1 arcada estética (10 dientes): 4.550,00 €\n• 2 arcadas completas (20 dientes): 6.500,00 €\n\n¿Agendamos tu estudio estético personalizado?',
    options: [
      { label: 'Sí, agendar valoración estética', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Estética dentária' },
      { label: 'Volver atrás', next: 'ESTETICA_MENU' },
    ],
  },
  BRANQUEAMENTO: {
    text: 'Blanqueamiento médico respetuoso con tu esmalte:\n• Sesión clínica inmediata en consulta: 200,00 €\n• Kit ambulatorio supervisado a medida: 150,00 €\n• Jeringa de mantenimiento: 25,00 €\n\n¿Reservamos tu cita?',
    options: [
      { label: 'Sí, reservar blanqueamiento', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Branqueamento' },
      { label: 'Volver atrás', next: 'ESTETICA_MENU' },
    ],
  },
  ORTODONTIA_MENU: {
    text: 'Ortodoncia con la Dra. Mariana Aberto:\n• Estudio ortodóncico completo: 60,00 €\n• Ortodoncia fija de precisión: 450,00 € / arcada\n• Control mensual: 65,00 €\n• Contenciones finales: desde 150,00 €\n• Alineadores invisibles (Invisalign / Spark): presupuesto tras estudio\n\n¿Agendamos tu primera valoración?',
    options: [
      { label: 'Sí, agendar estudio ortodóncico', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Ortodontia invisível' },
      { label: 'Volver a especialidades', next: 'TRATAMENTOS' },
    ],
  },
  PROTESES_MENU: {
    text: 'Devolvemos comodidad para masticar, hablar y sonreír con naturalidad:',
    options: [
      { label: 'Coronas y prótesis nuevas', next: 'PROTESES_NOVAS' },
      { label: 'Reparaciones rápidas y ajustes', next: 'PROTESES_CONSERTOS' },
      { label: 'Volver a especialidades', next: 'TRATAMENTOS' },
    ],
  },
  PROTESES_NOVAS: {
    text: 'Prótesis a medida:\n• Acrílica ligera: 180,00 € a 330,00 €\n• Esquelética cromo-cobalto: 260,00 € a 400,00 €\n• Flexible estética sin ganchos metálicos: 310,00 € a 440,00 €\n• Corona cerámica pura / zirconio: 650,00 €\n\n¿Agendamos una revisión tranquila?',
    options: [
      { label: 'Sí, reservar consulta', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Próteses' },
      { label: 'Volver atrás', next: 'PROTESES_MENU' },
    ],
  },
  PROTESES_CONSERTOS: {
    text: 'Reparaciones y alivio de molestias:\n• Alivio oclusal y pulido: 5,00 €\n• Reparación en acrílico: 60,00 €\n• Reparación esquelética o flexible: 100,00 €\n• Rebase anatómico: 60,00 € – 100,00 €\n\n¿Te ayudamos con tu prótesis?',
    options: [
      { label: 'Sí, pedir cita ahora', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Próteses' },
      { label: 'Volver atrás', next: 'PROTESES_MENU' },
    ],
  },
  GERAL_MENU: {
    text: 'Prevención delicada, alivio del dolor sin esperas y cirugía atraumática:',
    options: [
      { label: 'Higiene ultrasónica, caries y bruxismo', next: 'RESTAURACOES' },
      { label: 'Endodoncia (dolor) y muelas del juicio', next: 'CIRURGIA' },
      { label: 'Volver a especialidades', next: 'TRATAMENTOS' },
    ],
  },
  RESTAURACOES: {
    text: 'Salud oral cotidiana:\n• Tartrectomía ultrasónica + pulido: 40,00 €\n• Restauración estética simple: 45,00 €\n• Reconstrucción compleja: 65,00 €\n• Férula miorrelajante de bruxismo: 180,00 €\n\n¿Reservamos tu revisión?',
    options: [
      { label: 'Sí, agendar cita', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Medicina dentária geral' },
      { label: 'Volver atrás', next: 'GERAL_MENU' },
    ],
  },
  CIRURGIA: {
    text: 'Alivio del dolor y cirugía oral suave:\n• Endodoncia anterior / premolar: 180,00 €\n• Endodoncia molar: 240,00 €\n• Exodoncia simple indolora: 30,00 € – 50,00 €\n• Muela del juicio (Dr. Júlio): 75,00 € – 200,00 €\n\n¿Necesitas que te veamos pronto?',
    options: [
      { label: 'Sí, agendar valoración', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Cirurgia Oral' },
      { label: 'Volver atrás', next: 'GERAL_MENU' },
    ],
  },
  INFO_CLINICA: {
    text: 'Clínica Santa Maria dos Olivais (Dirección Clínica: Dra. Ana Mata).\n• Dirección: Estrada de Moscavide N 32C, 1800-279 Lisboa.\n• Atención humana: 300 601 645 / Recepción: 211 350 066 · WhatsApp +351 912 907 024.\n• Horario: lunes a viernes de 10:00 a 19:00 · sábados de 10:00 a 13:00.',
    options: [
      { label: 'Seguros y facilidades de pago', next: 'SEGUROS_PAGAMENTOS' },
      { label: 'Agendar valoración ahora', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Consulta general' },
      { label: 'Volver al inicio', next: 'MENU_PRINCIPAL' },
    ],
  },
};

const CHATBOT_EN_NODES: Record<string, DecisionNode> = {
  MENU_PRINCIPAL: {
    text: 'Warmest welcome! Behind every clinical room here are real people caring for people—unhurriedly, gently and transparently. How may we help you today?',
    options: [
      { label: 'Explore treatments & official fees', next: 'TRATAMENTOS' },
      { label: 'Insurance reimbursement & staged payments', next: 'SEGUROS_PAGAMENTOS' },
      { label: 'Book a calm first consultation', next: 'FINALIZAR_AGENDAMENTO', treatment: 'General Consultation' },
      { label: 'Location, opening hours & direct contact', next: 'INFO_CLINICA' },
    ],
  },
  SEGUROS_PAGAMENTOS: {
    text: 'We look after your health and your peace of mind:\n\n• Dental Insurance: we practise unhurried private dentistry using certified biocompatible materials. After every visit, we issue detailed medical invoices with official OMD clinical codes so you can easily claim reimbursement from ADSE, Médis, Multicare, AdvanceCare or international insurers.\n\n• Stage-by-Stage Payments: you pay comfortably as each clinical step is completed (for implants: 50% at placement and 50% at final crown fit).',
    options: [
      { label: 'Book my consultation now', next: 'FINALIZAR_AGENDAMENTO', treatment: 'General Consultation' },
      { label: 'Back to main menu', next: 'MENU_PRINCIPAL' },
    ],
  },
  TRATAMENTOS: {
    text: 'Our multidisciplinary clinical team covers every stage of life. Which area would you like clear guidance and pricing on?',
    options: [
      { label: 'Dental Implants & Fixed Teeth', next: 'IMPLANTES_MENU' },
      { label: 'Veneers & Clinical Whitening', next: 'ESTETICA_MENU' },
      { label: 'Orthodontics & Clear Aligners', next: 'ORTODONTIA_MENU' },
      { label: 'Crowns, Dentures & Repairs', next: 'PROTESES_MENU' },
      { label: 'Preventive Care, Pain Relief & Surgery', next: 'GERAL_MENU' },
    ],
  },
  IMPLANTES_MENU: {
    text: 'Led by Dr. Ana Mata, 3D-guided Implantology restores secure chewing and natural smile confidence. What would you like to check?',
    options: [
      { label: 'Single or multiple implants', next: 'IMPLANTES_UNITARIOS' },
      { label: 'Full-arch fixed teeth (All-on-4/6)', next: 'IMPLANTES_PROTOCOLOS' },
      { label: 'Back to specialties', next: 'TRATAMENTOS' },
    ],
  },
  IMPLANTES_UNITARIOS: {
    text: 'Complete official fees (surgery + definitive crown included):\n• Single implant + crown: 745 €\n• 2 implants: 1,400 €\n• 4 implants: 2,300 €\n• Guided bone graft (if required): 200 € – 500 €\n\nStaged option: 50% at surgery and 50% at final crown fit. Shall we book your 3D evaluation?',
    options: [
      { label: 'Yes, schedule my assessment', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Implantologia' },
      { label: 'Go back', next: 'IMPLANTES_MENU' },
    ],
  },
  IMPLANTES_PROTOCOLOS: {
    text: 'Full-arch fixed rehabilitation (4–6 medical titanium implants + definitive screw-retained bridge): 4,800 € – 5,000 €.\n• Comfort removable provisional: +350 €\n• 24h immediate-load fixed provisional: +1,200 €\n\nWould you like to discuss your smile with Dr. Ana Mata?',
    options: [
      { label: 'Yes, book consultation', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Implantologia' },
      { label: 'Go back', next: 'IMPLANTES_MENU' },
    ],
  },
  ESTETICA_MENU: {
    text: 'We craft natural, radiant smiles harmonious with your facial features. Select an option:',
    options: [
      { label: 'Ultra-thin ceramic veneers', next: 'FACETAS' },
      { label: 'Enamel-safe teeth whitening', next: 'BRANQUEAMENTO' },
      { label: 'Back to specialties', next: 'TRATAMENTOS' },
    ],
  },
  FACETAS: {
    text: 'Bespoke biomimetic ceramic veneers:\n• 4 anterior teeth: 1,800 €\n• 1 full smile arch (10 teeth): 4,550 €\n• Dual-arch harmony (20 teeth): 6,500 €\n\nWould you like a personalised aesthetic consultation?',
    options: [
      { label: 'Yes, book smile consultation', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Estética dentária' },
      { label: 'Go back', next: 'ESTETICA_MENU' },
    ],
  },
  BRANQUEAMENTO: {
    text: 'Clinician-supervised medical whitening:\n• Immediate in-office session: 200 €\n• Custom supervised home kit: 150 €\n• Maintenance syringe: 25 €\n\nShall we schedule your visit?',
    options: [
      { label: 'Yes, book whitening', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Branqueamento' },
      { label: 'Go back', next: 'ESTETICA_MENU' },
    ],
  },
  ORTODONTIA_MENU: {
    text: 'Orthodontics with Dr. Mariana Aberto:\n• Orthodontic diagnostic study: 60 €\n• Precision fixed braces: 450 € / arch\n• Monthly review: 65 €\n• Final retainers: from 150 €\n• Clear aligners (Invisalign / Spark): tailored quote after study\n\nWould you like to book an assessment?',
    options: [
      { label: 'Yes, book orthodontic study', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Ortodontia invisível' },
      { label: 'Back to specialties', next: 'TRATAMENTOS' },
    ],
  },
  PROTESES_MENU: {
    text: 'Restoring everyday comfort so you can eat, speak and laugh freely:',
    options: [
      { label: 'New crowns & dentures', next: 'PROTESES_NOVAS' },
      { label: 'Denture repairs & comfort relines', next: 'PROTESES_CONSERTOS' },
      { label: 'Back to specialties', next: 'TRATAMENTOS' },
    ],
  },
  PROTESES_NOVAS: {
    text: 'Custom prosthetics:\n• Lightweight acrylic denture: 180 € – 330 €\n• Cobalt-chrome framework: 260 € – 400 €\n• Clasp-free flexible denture: 310 € – 440 €\n• All-ceramic / zirconia crown: 650 €\n\nShall we schedule a relaxed consultation?',
    options: [
      { label: 'Yes, book appointment', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Próteses' },
      { label: 'Go back', next: 'PROTESES_MENU' },
    ],
  },
  PROTESES_CONSERTOS: {
    text: 'Prompt repairs & comfort care:\n• Sore-spot adjustment & polish: 5 €\n• Acrylic repair: 60 €\n• Flexible / metal-frame repair: 100 €\n• Comfort reline: 60 € – 100 €\n\nWould you like us to check your prosthesis?',
    options: [
      { label: 'Yes, book visit now', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Próteses' },
      { label: 'Go back', next: 'PROTESES_MENU' },
    ],
  },
  GERAL_MENU: {
    text: 'Gentle preventive hygiene, rapid toothache relief and atraumatic oral surgery:',
    options: [
      { label: 'Ultrasonic hygiene, fillings & bruxism', next: 'RESTAURACOES' },
      { label: 'Root canal (pain relief) & wisdom teeth', next: 'CIRURGIA' },
      { label: 'Back to specialties', next: 'TRATAMENTOS' },
    ],
  },
  RESTAURACOES: {
    text: 'Everyday oral health:\n• Ultrasonic scaling + polish: 40 €\n• Simple aesthetic filling: 45 €\n• Complex reconstruction: 65 €\n• Custom bruxism night guard: 180 €\n\nShall we book your check-up?',
    options: [
      { label: 'Yes, book check-up', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Medicina dentária geral' },
      { label: 'Go back', next: 'GERAL_MENU' },
    ],
  },
  CIRURGIA: {
    text: 'Painless endodontics & gentle oral surgery:\n• Anterior / premolar root canal: 180 €\n• Molar root canal: 240 €\n• Gentle simple extraction: 30 € – 50 €\n• Wisdom tooth removal (Dr. Júlio): 75 € – 200 €\n\nWould you like to see our team soon?',
    options: [
      { label: 'Yes, book assessment', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Cirurgia Oral' },
      { label: 'Go back', next: 'GERAL_MENU' },
    ],
  },
  INFO_CLINICA: {
    text: 'Santa Maria dos Olivais Dental Clinic (Clinical Director: Dr. Ana Mata).\n• Address: Estrada de Moscavide N 32C, 1800-279 Lisbon.\n• Patient Care: 300 601 645 / Reception: 211 350 066 · WhatsApp +351 912 907 024.\n• Hours: Monday–Friday 10:00–19:00 · Saturday 10:00–13:00.',
    options: [
      { label: 'Insurance & payment options', next: 'SEGUROS_PAGAMENTOS' },
      { label: 'Book a consultation now', next: 'FINALIZAR_AGENDAMENTO', treatment: 'General Consultation' },
      { label: 'Back to main menu', next: 'MENU_PRINCIPAL' },
    ],
  },
};

const CHATBOT_FR_NODES: Record<string, DecisionNode> = {
  MENU_PRINCIPAL: {
    text: 'Bienvenue chaleureusement ! Ici, chaque patient est accueilli comme une personne unique, sans précipitation et en toute transparence. Comment pouvons-nous prendre soin de vous aujourd’hui ?',
    options: [
      { label: 'Découvrir les soins et tarifs officiels', next: 'TRATAMENTOS' },
      { label: 'Remboursement mutuelle et paiement par étapes', next: 'SEGUROS_PAGAMENTOS' },
      { label: 'Planifier un premier bilan serein', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Consultation générale' },
      { label: 'Adresse, horaires et accueil direct', next: 'INFO_CLINICA' },
    ],
  },
  SEGUROS_PAGAMENTOS: {
    text: 'Votre sérénité compte autant que votre santé :\n\n• Assurances & mutuelles : nous exerçons en pratique privée attentive avec des matériaux certifiés. Une facture médicale codifiée OMD vous est systématiquement remise pour vos remboursements (ADSE, Médis, Multicare ou mutuelles internationales).\n\n• Paiement progressif : vous réglez au fil des étapes cliniques réalisées (pour les implants : 50 % à la chirurgie et 50 % lors de la couronne finale).',
    options: [
      { label: 'Prendre rendez-vous maintenant', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Consultation générale' },
      { label: 'Retour au menu principal', next: 'MENU_PRINCIPAL' },
    ],
  },
  TRATAMENTOS: {
    text: 'Notre équipe pluridisciplinaire accompagne toute la famille. Quel domaine souhaitez-vous consulter ?',
    options: [
      { label: 'Implants dentaires & dents fixes', next: 'IMPLANTES_MENU' },
      { label: 'Facettes céramiques & éclaircissement', next: 'ESTETICA_MENU' },
      { label: 'Orthodontie & aligneurs transparents', next: 'ORTODONTIA_MENU' },
      { label: 'Couronnes, prothèses & réparations', next: 'PROTESES_MENU' },
      { label: 'Prévention, douleur & chirurgie orale', next: 'GERAL_MENU' },
    ],
  },
  IMPLANTES_MENU: {
    text: 'Dirigée par la Dre Ana Mata, l’implantologie guidée en 3D redonne stabilité masticatoire et confiance. Que souhaitez-vous consulter ?',
    options: [
      { label: 'Implants unitaires ou multiples', next: 'IMPLANTES_UNITARIOS' },
      { label: 'Arcade complète fixe (All-on-4/6)', next: 'IMPLANTES_PROTOCOLOS' },
      { label: 'Retour aux spécialités', next: 'TRATAMENTOS' },
    ],
  },
  IMPLANTES_UNITARIOS: {
    text: 'Honoraires officiels complets (chirurgie + couronne définitive incluse) :\n• 1 implant + couronne : 745 €\n• 2 implants : 1 400 €\n• 4 implants : 2 300 €\n• Greffe osseuse guidée (si nécessaire) : 200 € – 500 €\n\nSouhaitez-vous planifier votre bilan 3D ?',
    options: [
      { label: 'Oui, réserver mon bilan', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Implantologia' },
      { label: 'Retour', next: 'IMPLANTES_MENU' },
    ],
  },
  IMPLANTES_PROTOCOLOS: {
    text: 'Réhabilitation complète fixe d’arcade (4 à 6 implants titane + bridge fixe vissé) : 4 800 € – 5 000 €.\n• Prothèse provisoire amovible : +350 €\n• Mise en charge immédiate fixe 24h : +1 200 €\n\nSouhaitez-vous rencontrer la Dre Ana Mata ?',
    options: [
      { label: 'Oui, prendre rendez-vous', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Implantologia' },
      { label: 'Retour', next: 'IMPLANTES_MENU' },
    ],
  },
  ESTETICA_MENU: {
    text: 'Nous créons des sourires lumineux et naturels, fidèles à votre visage :',
    options: [
      { label: 'Facettes céramiques ultrafines', next: 'FACETAS' },
      { label: 'Éclaircissement médical supervisé', next: 'BRANQUEAMENTO' },
      { label: 'Retour aux spécialités', next: 'TRATAMENTOS' },
    ],
  },
  FACETAS: {
    text: 'Facettes céramiques sur mesure :\n• 4 dents antérieures : 1 800 €\n• 1 arcade (10 dents) : 4 550 €\n• 2 arcades complètes (20 dents) : 6 500 €\n\nSouhaitez-vous un bilan esthétique personnalisé ?',
    options: [
      { label: 'Oui, réserver un bilan', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Estética dentária' },
      { label: 'Retour', next: 'ESTETICA_MENU' },
    ],
  },
  BRANQUEAMENTO: {
    text: 'Éclaircissement respectueux de l’émail :\n• Séance clinique au fauteuil : 200 €\n• Kit ambulatoire sur mesure : 150 €\n• Seringue d’entretien : 25 €\n\nPlanifions-nous votre séance ?',
    options: [
      { label: 'Oui, prendre rendez-vous', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Branqueamento' },
      { label: 'Retour', next: 'ESTETICA_MENU' },
    ],
  },
  ORTODONTIA_MENU: {
    text: 'Orthodontie avec la Dre Mariana Aberto :\n• Étude orthodontique complète : 60 €\n• Appareil fixe par arcade : 450 €\n• Suivi mensuel : 65 €\n• Contentions : dès 150 €\n• Aligneurs transparents (Invisalign / Spark) : devis personnalisé\n\nSouhaitez-vous réserver une consultation ?',
    options: [
      { label: 'Oui, prendre rendez-vous', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Ortodontia invisível' },
      { label: 'Retour aux spécialités', next: 'TRATAMENTOS' },
    ],
  },
  PROTESES_MENU: {
    text: 'Retrouvez le confort de mâcher et de sourire sereinement :',
    options: [
      { label: 'Nouvelles couronnes & prothèses', next: 'PROTESES_NOVAS' },
      { label: 'Réparations & rebasages', next: 'PROTESES_CONSERTOS' },
      { label: 'Retour aux spécialités', next: 'TRATAMENTOS' },
    ],
  },
  PROTESES_NOVAS: {
    text: 'Solutions prothétiques sur mesure :\n• Prothèse acrylique : 180 € – 330 €\n• Châssis métallique : 260 € – 400 €\n• Prothèse flexible sans crochets métalliques : 310 € – 440 €\n• Couronne céramique pure / zircone : 650 €\n\nSouhaitez-vous un rendez-vous ?',
    options: [
      { label: 'Oui, réserver maintenant', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Próteses' },
      { label: 'Retour', next: 'PROTESES_MENU' },
    ],
  },
  PROTESES_CONSERTOS: {
    text: 'Réparations et confort :\n• Ajustement de confort : 5 €\n• Réparation acrylique : 60 €\n• Réparation flexible / métallique : 100 €\n• Rebasage anatomique : 60 € – 100 €\n\nSouhaitez-vous passer en clinique ?',
    options: [
      { label: 'Oui, prendre rendez-vous', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Próteses' },
      { label: 'Retour', next: 'PROTESES_MENU' },
    ],
  },
  GERAL_MENU: {
    text: 'Prévention douce, soulagement rapide des douleurs et chirurgie orale atraumatique :',
    options: [
      { label: 'Détartrage ultrasonique, caries & bruxisme', next: 'RESTAURACOES' },
      { label: 'Endodontie & dents de sagesse', next: 'CIRURGIA' },
      { label: 'Retour aux spécialités', next: 'TRATAMENTOS' },
    ],
  },
  RESTAURACOES: {
    text: 'Soins préventifs et conservateurs :\n• Détartrage ultrasonique + polissage : 40 €\n• Restauration composite simple : 45 €\n• Restauration complexe : 65 €\n• Gouttière occlusale de bruxisme : 180 €\n\nPlanifions-nous votre visite ?',
    options: [
      { label: 'Oui, prendre rendez-vous', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Medicina dentária geral' },
      { label: 'Retour', next: 'GERAL_MENU' },
    ],
  },
  CIRURGIA: {
    text: 'Endodontie indolore & chirurgie orale :\n• Dévitalisation incisive / prémolaire : 180 €\n• Dévitalisation molaire : 240 €\n• Extraction douce : 30 € – 50 €\n• Dent de sagesse (Dr Júlio) : 75 € – 200 €\n\nSouhaitez-vous être reçu rapidement ?',
    options: [
      { label: 'Oui, réserver une visite', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Cirurgia Oral' },
      { label: 'Retour', next: 'GERAL_MENU' },
    ],
  },
  INFO_CLINICA: {
    text: 'Clinique Santa Maria dos Olivais (Direction Clinique : Dre Ana Mata).\n• Adresse : Estrada de Moscavide N 32C, 1800-279 Lisbonne.\n• Accueil patient : 300 601 645 / 211 350 066 · WhatsApp +351 912 907 024.\n• Horaires : lundi–vendredi 10h00–19h00 · samedi 10h00–13h00.',
    options: [
      { label: 'Assurances & facilités de paiement', next: 'SEGUROS_PAGAMENTOS' },
      { label: 'Prendre rendez-vous maintenant', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Consultation générale' },
      { label: 'Retour au menu principal', next: 'MENU_PRINCIPAL' },
    ],
  },
};

const CHATBOT_DE_NODES: Record<string, DecisionNode> = {
  MENU_PRINCIPAL: {
    text: 'Herzlich willkommen! Bei uns stehen echte Menschen, Ruhe und absolute Transparenz im Mittelpunkt. Wie dürfen wir Ihnen heute weiterhelfen?',
    options: [
      { label: 'Behandlungen & offizielle Honorare ansehen', next: 'TRATAMENTOS' },
      { label: 'Versicherungserstattung & Ratenzahlung nach Phasen', next: 'SEGUROS_PAGAMENTOS' },
      { label: 'Jetzt entspannten Beratungstermin buchen', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Allgemeine Beratung' },
      { label: 'Adresse, Öffnungszeiten & Kontakt', next: 'INFO_CLINICA' },
    ],
  },
  SEGUROS_PAGAMENTOS: {
    text: 'Für Ihre gesundheitliche und finanzielle Sicherheit:\n\n• Krankenversicherungen: Wir arbeiten als Privatklinik ohne Zeitdruck mit zertifizierten Materialien. Sie erhalten detaillierte Arztrechnungen mit offiziellen OMD-Codes zur einfachen Erstattung bei ADSE, Médis, Multicare oder internationalen Versicherungen.\n\n• Zahlung nach Behandlungsfortschritt: Sie zahlen bequem Schritt für Schritt (bei Implantaten 50 % bei Chirurgie und 50 % bei Kroneneingliederung).',
    options: [
      { label: 'Jetzt Beratung vereinbaren', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Allgemeine Beratung' },
      { label: 'Zurück zum Hauptmenü', next: 'MENU_PRINCIPAL' },
    ],
  },
  TRATAMENTOS: {
    text: 'Unser Fachärzteteam begleitet die ganze Familie. Zu welchem Bereich wünschen Sie Informationen und Preise?',
    options: [
      { label: 'Zahnimplantate & feste Zähne', next: 'IMPLANTES_MENU' },
      { label: 'Keramik-Veneers & Bleaching', next: 'ESTETICA_MENU' },
      { label: 'Kieferorthopädie & transparente Aligner', next: 'ORTODONTIA_MENU' },
      { label: 'Kronen, Zahnersatz & Reparaturen', next: 'PROTESES_MENU' },
      { label: 'Prophylaxe, Schmerzfreiheit & Oralchirurgie', next: 'GERAL_MENU' },
    ],
  },
  IMPLANTES_MENU: {
    text: 'Unter Leitung von Dr. Ana Mata schenkt 3D-geführte Implantologie festen Biss und sicheres Lächeln:',
    options: [
      { label: 'Einzelne oder mehrere Implantate', next: 'IMPLANTES_UNITARIOS' },
      { label: 'Fester Komplettkiefer (All-on-4/6)', next: 'IMPLANTES_PROTOCOLOS' },
      { label: 'Zurück zu den Fachgebieten', next: 'TRATAMENTOS' },
    ],
  },
  IMPLANTES_UNITARIOS: {
    text: 'Komplette offizielle Honorare (inkl. Chirurgie & definitiver Krone):\n• Einzelimplantat + Krone: 745 €\n• 2 Implantate: 1.400 €\n• 4 Implantate: 2.300 €\n• Knochenaufbau (falls erforderlich): 200 € – 500 €\n\nMöchten Sie Ihre 3D-Beratung vereinbaren?',
    options: [
      { label: 'Ja, Termin vereinbaren', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Implantologia' },
      { label: 'Zurück', next: 'IMPLANTES_MENU' },
    ],
  },
  IMPLANTES_PROTOCOLOS: {
    text: 'Feste Komplettkiefer-Versorgung (4–6 Titanimplantate + verschraubte Brücke): 4.800 € – 5.000 €.\n• Herausnehmbares Provisorium: +350 €\n• Feste Sofortversorgung in 24h: +1.200 €\n\nMöchten Sie Ihren Fall mit Dr. Ana Mata besprechen?',
    options: [
      { label: 'Ja, Beratung buchen', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Implantologia' },
      { label: 'Zurück', next: 'IMPLANTES_MENU' },
    ],
  },
  ESTETICA_MENU: {
    text: 'Natürlich strahlende Zahnästhetik passend zu Ihren Gesichtszügen:',
    options: [
      { label: 'Hauchdünne Keramik-Veneers', next: 'FACETAS' },
      { label: 'Schonendes medizinisches Bleaching', next: 'BRANQUEAMENTO' },
      { label: 'Zurück zu den Fachgebieten', next: 'TRATAMENTOS' },
    ],
  },
  FACETAS: {
    text: 'Maßgefertigte Keramik-Veneers:\n• 4 Frontzähne: 1.800 €\n• 1 Zahnbogen (10 Zähne): 4.550 €\n• 2 Zahnbögen (20 Zähne): 6.500 €\n\nWünschen Sie eine ästhetische Beratung?',
    options: [
      { label: 'Ja, Termin buchen', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Estética dentária' },
      { label: 'Zurück', next: 'ESTETICA_MENU' },
    ],
  },
  BRANQUEAMENTO: {
    text: 'Zahnschmelzschonende Aufhellung:\n• Kliniksitzung mit Soforteffekt: 200 €\n• Individuelles Home-Kit unter Aufsicht: 150 €\n• Nachfüllspritze: 25 €\n\nSollen wir Ihren Termin reservieren?',
    options: [
      { label: 'Ja, Termin buchen', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Branqueamento' },
      { label: 'Zurück', next: 'ESTETICA_MENU' },
    ],
  },
  ORTODONTIA_MENU: {
    text: 'Kieferorthopädie mit Dr. Mariana Aberto:\n• Diagnostische Planung: 60 €\n• Feste Zahnspange je Kiefer: 450 €\n• Monatliche Kontrolle: 65 €\n• Retainer: ab 150 €\n• Transparente Aligner (Invisalign / Spark): individueller Plan\n\nMöchten Sie eine Erstberatung buchen?',
    options: [
      { label: 'Ja, Termin vereinbaren', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Ortodontia invisível' },
      { label: 'Zurück zu den Fachgebieten', next: 'TRATAMENTOS' },
    ],
  },
  PROTESES_MENU: {
    text: 'Hochwertiger Zahnersatz und schnelle Hilfe bei Druckstellen oder Reparaturen:',
    options: [
      { label: 'Neue Kronen & Prothesen', next: 'PROTESES_NOVAS' },
      { label: 'Reparaturen & Unterfütterungen', next: 'PROTESES_CONSERTOS' },
      { label: 'Zurück zu den Fachgebieten', next: 'TRATAMENTOS' },
    ],
  },
  PROTESES_NOVAS: {
    text: 'Individueller Zahnersatz:\n• Acrylprothese: 180 € – 330 €\n• Modellgussprothese: 260 € – 400 €\n• Klammerfreie flexible Prothese: 310 € – 440 €\n• Vollkeramik- / Zirkonkrone: 650 €\n\nMöchten Sie einen Beratungstermin?',
    options: [
      { label: 'Ja, jetzt buchen', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Próteses' },
      { label: 'Zurück', next: 'PROTESES_MENU' },
    ],
  },
  PROTESES_CONSERTOS: {
    text: 'Reparatur & Komfort:\n• Druckstellenentlastung: 5 €\n• Acryl-Reparatur: 60 €\n• Flexibel / Metall-Reparatur: 100 €\n• Unterfütterung: 60 € – 100 €\n\nSollen wir einen Termin einplanen?',
    options: [
      { label: 'Ja, Termin buchen', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Próteses' },
      { label: 'Zurück', next: 'PROTESES_MENU' },
    ],
  },
  GERAL_MENU: {
    text: 'Sanfte Vorsorge, rasche Schmerzlinderung und schonende Oralchirurgie:',
    options: [
      { label: 'Ultraschall-Reinigung, Füllungen & Knirschschiene', next: 'RESTAURACOES' },
      { label: 'Wurzelbehandlung & Weisheitszähne', next: 'CIRURGIA' },
      { label: 'Zurück zu den Fachgebieten', next: 'TRATAMENTOS' },
    ],
  },
  RESTAURACOES: {
    text: 'Vorsorge & Zahnerhalt:\n• Ultraschall-Zahnreinigung + Politur: 40 €\n• Einfache Kompositfüllung: 45 €\n• Komplexe Rekonstruktion: 65 €\n• Individuelle Bruxismus-Schiene: 180 €\n\nMöchten Sie einen Vorsorgetermin?',
    options: [
      { label: 'Ja, Termin vereinbaren', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Medicina dentária geral' },
      { label: 'Zurück', next: 'GERAL_MENU' },
    ],
  },
  CIRURGIA: {
    text: 'Schmerzfreie Endodontie & Oralchirurgie:\n• Wurzelbehandlung Frontzahn / Prämolar: 180 €\n• Wurzelbehandlung Molar: 240 €\n• Schonende Extraktion: 30 € – 50 €\n• Weisheitszahnentfernung (Dr. Júlio): 75 € – 200 €\n\nWünschen Sie einen zeitnahen Termin?',
    options: [
      { label: 'Ja, jetzt buchen', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Cirurgia Oral' },
      { label: 'Zurück', next: 'GERAL_MENU' },
    ],
  },
  INFO_CLINICA: {
    text: 'Zahnklinik Santa Maria dos Olivais (Ärztliche Leitung: Dr. Ana Mata).\n• Adresse: Estrada de Moscavide N 32C, 1800-279 Lissabon.\n• Patientenbetreuung: 300 601 645 / 211 350 066 · WhatsApp +351 912 907 024.\n• Zeiten: Mo–Fr 10:00–19:00 Uhr · Sa 10:00–13:00 Uhr.',
    options: [
      { label: 'Versicherungen & Zahlungsoptionen', next: 'SEGUROS_PAGAMENTOS' },
      { label: 'Beratungstermin vereinbaren', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Allgemeine Beratung' },
      { label: 'Zurück zum Hauptmenü', next: 'MENU_PRINCIPAL' },
    ],
  },
};

const CHATBOT_IT_NODES: Record<string, DecisionNode> = {
  MENU_PRINCIPAL: {
    text: 'Un caloroso benvenuto! Qui ogni persona viene ascoltata con calma, empatia e totale trasparenza. Come possiamo aiutarti oggi?',
    options: [
      { label: 'Scopri trattamenti e tariffe ufficiali', next: 'TRATAMENTOS' },
      { label: 'Rimborsi assicurativi e pagamenti per fasi', next: 'SEGUROS_PAGAMENTOS' },
      { label: 'Prenota una prima visita serena', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Visita generale' },
      { label: 'Indirizzo, orari e contatti diretti', next: 'INFO_CLINICA' },
    ],
  },
  SEGUROS_PAGAMENTOS: {
    text: 'Ci prendiamo cura della tua salute e della tua serenità:\n\n• Assicurazioni sanitarie: lavoriamo con dedizione privata senza fretta e materiali certificati. Rilasciamo sempre fattura medica dettagliata con codici clinici OMD per il rimborso presso ADSE, Médis, Multicare o assicurazioni internazionali.\n\n• Pagamento graduale: saldi comodamente man mano che il piano procede (per gli impianti: 50% alla chirurgia e 50% alla consegna della corona).',
    options: [
      { label: 'Prenota la mia valutazione ora', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Visita generale' },
      { label: 'Torna al menu principale', next: 'MENU_PRINCIPAL' },
    ],
  },
  TRATAMENTOS: {
    text: 'Il nostro team medico accompagna ogni fase della vita. Su quale specialità desideri orientamento e prezzi chiari?',
    options: [
      { label: 'Impianti dentali e denti fissi', next: 'IMPLANTES_MENU' },
      { label: 'Faccette in ceramica e sbiancamento', next: 'ESTETICA_MENU' },
      { label: 'Ortodonzia e allineatori trasparenti', next: 'ORTODONTIA_MENU' },
      { label: 'Corone, protesi e riparazioni', next: 'PROTESES_MENU' },
      { label: 'Prevenzione, dolore acuto e chirurgia', next: 'GERAL_MENU' },
    ],
  },
  IMPLANTES_MENU: {
    text: 'Guidata dalla Dott.ssa Ana Mata, l’implantologia 3D restituisce masticazione stabile e fiducia nel sorriso:',
    options: [
      { label: 'Impianti singoli o multipli', next: 'IMPLANTES_UNITARIOS' },
      { label: 'Arcata completa fissa (All-on-4/6)', next: 'IMPLANTES_PROTOCOLOS' },
      { label: 'Torna alle specialità', next: 'TRATAMENTOS' },
    ],
  },
  IMPLANTES_UNITARIOS: {
    text: 'Tariffe ufficiali complete (chirurgia + corona definitiva inclusa):\n• Impianto singolo + corona: 745 €\n• 2 impianti: 1.400 €\n• 4 impianti: 2.300 €\n• Rigenerazione ossea (se necessaria): 200 € – 500 €\n\nPrenotiamo la tua valutazione 3D?',
    options: [
      { label: 'Sì, prenota valutazione', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Implantologia' },
      { label: 'Indietro', next: 'IMPLANTES_MENU' },
    ],
  },
  IMPLANTES_PROTOCOLOS: {
    text: 'Riabilitazione fissa completa d’arcata (4–6 impianti in titanio + protesi fissa avvitata): 4.800 € – 5.000 €.\n• Provvisorio rimovibile comfort: +350 €\n• Carico immediato fisso in 24h: +1.200 €\n\nVuoi parlarne con la Dott.ssa Ana Mata?',
    options: [
      { label: 'Sì, prenota visita', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Implantologia' },
      { label: 'Indietro', next: 'IMPLANTES_MENU' },
    ],
  },
  ESTETICA_MENU: {
    text: 'Armonia estetica naturale progettata intorno al tuo volto:',
    options: [
      { label: 'Faccette in ceramica ultrasottili', next: 'FACETAS' },
      { label: 'Sbiancamento clinico protetto', next: 'BRANQUEAMENTO' },
      { label: 'Torna alle specialità', next: 'TRATAMENTOS' },
    ],
  },
  FACETAS: {
    text: 'Faccette ceramiche su misura:\n• 4 denti anteriori: 1.800 €\n• 1 arcata (10 denti): 4.550 €\n• 2 arcate complete (20 denti): 6.500 €\n\nDesideri una consulenza estetica?',
    options: [
      { label: 'Sì, prenota consulenza', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Estética dentária' },
      { label: 'Indietro', next: 'ESTETICA_MENU' },
    ],
  },
  BRANQUEAMENTO: {
    text: 'Sbiancamento medico sicuro per lo smalto:\n• Seduta clinica immediata: 200 €\n• Kit domiciliare su misura: 150 €\n• Siringa di mantenimento: 25 €\n\nFissiamo il tuo appuntamento?',
    options: [
      { label: 'Sì, prenota ora', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Branqueamento' },
      { label: 'Indietro', next: 'ESTETICA_MENU' },
    ],
  },
  ORTODONTIA_MENU: {
    text: 'Ortodonzia con la Dott.ssa Mariana Aberto:\n• Studio diagnostico ortodontico: 60 €\n• Apparecchio fisso per arcata: 450 €\n• Controllo mensile: 65 €\n• Contenzioni: da 150 €\n• Allineatori trasparenti (Invisalign / Spark): piano dedicato\n\nVuoi prenotare una visita?',
    options: [
      { label: 'Sì, prenota studio', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Ortodontia invisível' },
      { label: 'Torna alle specialità', next: 'TRATAMENTOS' },
    ],
  },
  PROTESES_MENU: {
    text: 'Tornare a masticare e sorridere con pieno comfort quotidiano:',
    options: [
      { label: 'Nuove corone e protesi', next: 'PROTESES_NOVAS' },
      { label: 'Riparazioni rapide e ribasature', next: 'PROTESES_CONSERTOS' },
      { label: 'Torna alle specialità', next: 'TRATAMENTOS' },
    ],
  },
  PROTESES_NOVAS: {
    text: 'Protesi personalizzate:\n• Protesi acrilica: 180 € – 330 €\n• Protesi scheletrata: 260 € – 400 €\n• Protesi flessibile senza ganci metallici: 310 € – 440 €\n• Corona in ceramica pura / zirconio: 650 €\n\nPrenotiamo un controllo?',
    options: [
      { label: 'Sì, prenota visita', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Próteses' },
      { label: 'Indietro', next: 'PROTESES_MENU' },
    ],
  },
  PROTESES_CONSERTOS: {
    text: 'Riparazioni e comfort:\n• Ritocco punti di pressione: 5 €\n• Riparazione acrilica: 60 €\n• Riparazione flessibile / scheletrata: 100 €\n• Ribasatura anatomica: 60 € – 100 €\n\nFissiamo un appuntamento?',
    options: [
      { label: 'Sì, prenota ora', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Próteses' },
      { label: 'Indietro', next: 'PROTESES_MENU' },
    ],
  },
  GERAL_MENU: {
    text: 'Prevenzione delicata, sollievo immediato dal dolore e chirurgia orale atraumatica:',
    options: [
      { label: 'Igiene a ultrasuoni, carie e bruxismo', next: 'RESTAURACOES' },
      { label: 'Endodonzia e denti del giudizio', next: 'CIRURGIA' },
      { label: 'Torna alle specialità', next: 'TRATAMENTOS' },
    ],
  },
  RESTAURACOES: {
    text: 'Salute orale quotidiana:\n• Ablazione tartaro a ultrasuoni + lucidatura: 40 €\n• Otturazione estetica semplice: 45 €\n• Ricostruzione complessa: 65 €\n• Bite notturno per bruxismo: 180 €\n\nPrenotiamo il tuo controllo?',
    options: [
      { label: 'Sì, prenota ora', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Medicina dentária geral' },
      { label: 'Indietro', next: 'GERAL_MENU' },
    ],
  },
  CIRURGIA: {
    text: 'Endodonzia indolore e chirurgia delicata:\n• Devitalizzazione incisivo / premolare: 180 €\n• Devitalizzazione molare: 240 €\n• Estrazione semplice indolore: 30 € – 50 €\n• Dente del giudizio (Dott. Júlio): 75 € – 200 €\n\nDesideri essere ricevuto al più presto?',
    options: [
      { label: 'Sì, prenota valutazione', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Cirurgia Oral' },
      { label: 'Indietro', next: 'GERAL_MENU' },
    ],
  },
  INFO_CLINICA: {
    text: 'Clinica Santa Maria dos Olivais (Direzione Clinica: Dott.ssa Ana Mata).\n• Indirizzo: Estrada de Moscavide N 32C, 1800-279 Lisbona.\n• Accoglienza pazienti: 300 601 645 / 211 350 066 · WhatsApp +351 912 907 024.\n• Orari: lunedì–venerdì 10:00–19:00 · sabato 10:00–13:00.',
    options: [
      { label: 'Assicurazioni e pagamenti per fasi', next: 'SEGUROS_PAGAMENTOS' },
      { label: 'Prenota una visita ora', next: 'FINALIZAR_AGENDAMENTO', treatment: 'Visita generale' },
      { label: 'Torna al menu principale', next: 'MENU_PRINCIPAL' },
    ],
  },
};

export function getChatbotTranslations(locale: SupportedLocale): ChatbotUiBundle {
  switch (locale) {
    case 'es':
      return {
        badge: 'Acompañamiento al Paciente · SMO',
        title: 'Orientación Humana y Citas',
        closeAria: 'Cerrar asistente',
        resetBtn: 'Volver al inicio',
        defaultConsultLabel: 'Valoración personalizada',
        saturdaySuffix: 'Sábado',
        directBookingText: (treatment) =>
          `¡Qué gusto saludarte! Hemos preparado tu solicitud para ${treatment} en la Clínica Santa Maria dos Olivais.\n\nAquí te escuchamos con calma y sin compromiso. ¿En qué horario te resulta más cómodo venir a vernos?`,
        directBookingShortHistory: (treatment) =>
          `Solicitud recibida con cariño para ${treatment}.`,
        directOptWeekdays: 'Entre semana · Lunes a viernes (10:00 a 19:00)',
        directOptSaturday: 'Sábado por la mañana (10:00 a 13:00)',
        directOptWhatsApp: 'Hablar directamente con recepción por WhatsApp (+351 912 907 024)',
        directOptMenu: 'Ver tarifas oficiales y otras dudas antes de agendar',
        whatsappDirectMsg: (treatment) =>
          `¡Hola! Me gustaría agendar una valoración tranquila para ${treatment} en la Clínica Santa Maria dos Olivais.`,
        defaultUserBubble: (treatment) => `Me gustaría valorar mi caso de ${treatment}`,
        nodes: CHATBOT_ES_NODES,
      };
    case 'en':
      return {
        badge: 'Patient Care Concierge · SMO',
        title: 'Warm Guidance & Bookings',
        closeAria: 'Close assistant',
        resetBtn: 'Start over',
        defaultConsultLabel: 'Personalised Consultation',
        saturdaySuffix: 'Saturday',
        directBookingText: (treatment) =>
          `Lovely to welcome you! We have prepared your consultation request for ${treatment} at Santa Maria dos Olivais Dental Clinic.\n\nEvery visit here is unhurried and tailored to you. When would suit you best?`,
        directBookingShortHistory: (treatment) =>
          `Consultation request noted for ${treatment}.`,
        directOptWeekdays: 'Weekdays · Monday to Friday (10:00 – 19:00)',
        directOptSaturday: 'Saturday morning (10:00 – 13:00)',
        directOptWhatsApp: 'Chat directly with reception on WhatsApp (+351 912 907 024)',
        directOptMenu: 'Explore official fees & FAQs first',
        whatsappDirectMsg: (treatment) =>
          `Hello! I would love to schedule an unhurried consultation for ${treatment} at Santa Maria dos Olivais Dental Clinic.`,
        defaultUserBubble: (treatment) => `I would like guidance on ${treatment}`,
        nodes: CHATBOT_EN_NODES,
      };
    case 'fr':
      return {
        badge: 'Accueil & Accompagnement · SMO',
        title: 'Conseil Humain & Rendez-vous',
        closeAria: 'Fermer l’assistant',
        resetBtn: 'Recommencer',
        defaultConsultLabel: 'Bilan personnalisé',
        saturdaySuffix: 'Samedi',
        directBookingText: (treatment) =>
          `Ravis de vous accueillir ! Nous avons bien noté votre souhait de consultation pour ${treatment} à la Clinique Santa Maria dos Olivais.\n\nQuel créneau vous convient le mieux pour être reçu en toute sérénité ?`,
        directBookingShortHistory: (treatment) =>
          `Demande de bilan enregistrée pour ${treatment}.`,
        directOptWeekdays: 'En semaine · Lundi au vendredi (10h00 – 19h00)',
        directOptSaturday: 'Samedi matin (10h00 – 13h00)',
        directOptWhatsApp: 'Échanger directement sur WhatsApp (+351 912 907 024)',
        directOptMenu: 'Consulter d’abord les tarifs officiels et infos',
        whatsappDirectMsg: (treatment) =>
          `Bonjour ! J’aimerais planifier une consultation sereine pour ${treatment} à la Clinique Santa Maria dos Olivais.`,
        defaultUserBubble: (treatment) => `Je souhaite un bilan pour : ${treatment}`,
        nodes: CHATBOT_FR_NODES,
      };
    case 'de':
      return {
        badge: 'Persönliche Patientenbetreuung · SMO',
        title: 'Einfühlsame Beratung & Termine',
        closeAria: 'Assistent schließen',
        resetBtn: 'Neu beginnen',
        defaultConsultLabel: 'Persönliche Erstberatung',
        saturdaySuffix: 'Samstag',
        directBookingText: (treatment) =>
          `Schön, dass Sie da sind! Wir haben Ihren Wunsch nach einer Beratung für ${treatment} in der Zahnklinik Santa Maria dos Olivais aufgenommen.\n\nWann passt Ihnen ein ruhiger Termin bei unserem Ärzteteam am besten?`,
        directBookingShortHistory: (treatment) => `Beratungswunsch für ${treatment} vorgemerkt.`,
        directOptWeekdays: 'Werktags · Montag bis Freitag (10:00 – 19:00 Uhr)',
        directOptSaturday: 'Samstagvormittag (10:00 – 13:00 Uhr)',
        directOptWhatsApp: 'Direkt per WhatsApp mit dem Empfang schreiben (+351 912 907 024)',
        directOptMenu: 'Zuerst offizielle Honorare & Fragen ansehen',
        whatsappDirectMsg: (treatment) =>
          `Guten Tag! Ich möchte gerne eine ruhige Beratung für ${treatment} in der Zahnklinik Santa Maria dos Olivais vereinbaren.`,
        defaultUserBubble: (treatment) => `Beratungswunsch: ${treatment}`,
        nodes: CHATBOT_DE_NODES,
      };
    case 'it':
      return {
        badge: 'Accoglienza Pazienti · SMO',
        title: 'Orientamento Umano & Visite',
        closeAria: 'Chiudi assistente',
        resetBtn: 'Ricomincia',
        defaultConsultLabel: 'Prima visita personalizzata',
        saturdaySuffix: 'Sabato',
        directBookingText: (treatment) =>
          `Che piacere accoglierti! Abbiamo preparato la tua richiesta per ${treatment} presso la Clinica Santa Maria dos Olivais.\n\nQui ti dedichiamo tutto il tempo necessario. Quale fascia oraria preferisci?`,
        directBookingShortHistory: (treatment) =>
          `Richiesta di valutazione registrata per ${treatment}.`,
        directOptWeekdays: 'Giorni feriali · Lunedì – Venerdì (10:00 – 19:00)',
        directOptSaturday: 'Sabato mattina (10:00 – 13:00)',
        directOptWhatsApp: 'Parla direttamente su WhatsApp (+351 912 907 024)',
        directOptMenu: 'Consulta prima tariffe ufficiali e informazioni',
        whatsappDirectMsg: (treatment) =>
          `Buongiorno! Vorrei prenotare una valutazione serena per ${treatment} presso la Clinica Santa Maria dos Olivais.`,
        defaultUserBubble: (treatment) => `Vorrei informazioni su: ${treatment}`,
        nodes: CHATBOT_IT_NODES,
      };
    case 'pt':
    default:
      return {
        badge: 'Acolhimento ao Paciente · SMO',
        title: 'Orientação Humana & Marcações',
        closeAria: 'Fechar assistente',
        resetBtn: 'Voltar ao início',
        defaultConsultLabel: 'Avaliação Personalizada',
        saturdaySuffix: 'Sábado',
        directBookingText: (treatment) =>
          `Que gosto receber o seu contacto! Preparámos o seu pedido de avaliação para ${treatment} na Clínica Santa Maria dos Olivais.\n\nAqui cada pessoa é ouvida com tempo e serenidade. Em que horário lhe é mais confortável visitar-nos?`,
        directBookingShortHistory: (treatment) =>
          `Pedido de avaliação registado para ${treatment}.`,
        directOptWeekdays: 'Durante a semana · Segunda a Sexta (10h00 às 19h00)',
        directOptSaturday: 'Sábado de manhã (10h00 às 13h00)',
        directOptWhatsApp: 'Falar diretamente com a receção no WhatsApp (+351 912 907 024)',
        directOptMenu: 'Consultar primeiro valores oficiais e outras dúvidas',
        whatsappDirectMsg: (treatment) =>
          `Olá! Gostaria de agendar uma avaliação tranquila para ${treatment} na Clínica Santa Maria dos Olivais.`,
        defaultUserBubble: (treatment) => `Gostaria de agendar avaliação para ${treatment}`,
        nodes: arvoreDecisao,
      };
  }
}
