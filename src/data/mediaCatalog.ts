/**
 * Catálogo Definitivo do 100% de Imagens, Vídeos e Arquivos
 * Clínica Santa Maria dos Olivais
 */

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  category: 'brand' | 'pdf' | 'institutional_video' | 'team' | 'facility' | 'campaign' | 'service_video' | 'reel' | 'case_study_video' | 'case_study_photo' | 'educational_video';
  meta?: Record<string, any>;
}

export const BRAND_ASSETS = {
  logoDark: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Icono-Nocturno.png',
  logoLight: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Icono-Nocturno.png',
  watermarkBg: 'https://clinicadentariasantamariadosolivais.pt/wp-content/uploads/2025/05/Sem-titulo-7.png',
  bannerSorrisos: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_dentaria_santa_maria_dos_olivais_sorrisos.jpg',
  slideClinic: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Slide%201.jpg',
  docAnaAgendamento: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/doctora_ana_mata_agendamiento_online.jpg',
};

export const CLINICAL_DOCUMENTS = {
  posOperatorioPdf: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/CUIDADOS%20POS%20OPERATORIOS.pdf',
};

export const INSTITUTIONAL_VIDEOS = [
  {
    id: 'institucional-principal',
    title: 'Vídeo Institucional da Clínica (HD)',
    description: 'Apresentação das instalações, equipa médica e tecnologia em Lisboa.',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinicadentaria-santamariadosolivais.mp4',
    poster: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/IMG_5640.JPG',
  },
  {
    id: 'sorriso-sem-escalas',
    title: 'Spot Sorriso Sem Escalas',
    description: 'Campanha de estética dentária e reabilitação fixa em Portugal.',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/0309.mp4',
    poster: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_dentaria_santa_maria_dos_olivais_sorrisos.jpg',
  },
  {
    id: 'smo-moscavide-tour',
    title: 'Entrada & Envolvente SMO Moscavide (16:9)',
    description: 'Vista panorâmica da entrada e localização da clínica.',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_dentaria_smo_moscavide.mp4',
    poster: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/DJI_20250819154440_0104_D.JPG',
  },
  {
    id: 'implantes-promo-video',
    title: 'Vídeo Promocional de Implantes Dentários',
    description: 'Tecnologia cirúrgica e reabilitação de alta precisão.',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/implantes_smo_video.mp4',
    poster: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/implantes_smo_junio_julio_2.jpeg',
  },
];

export const REAL_TEAM = [
  {
    id: 'ana-mata',
    name: 'Dra. Ana Mata',
    role: 'Diretora Clínica · Implantologia',
    specialty: 'Reabilitação Oral & Cirurgia Guiada 3D',
    omd: 'OMD n.º 6784',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/dra_ana_mata.png',
    bio: 'Mais de 18 anos de experiência em reabilitação oral complexa e implantes dentários.',
  },
  {
    id: 'mariana-aberto',
    name: 'Dra. Mariana Aberto',
    role: 'Ortodontia & Alinhadores Invisíveis',
    specialty: 'Invisalign & Spark Specialist',
    omd: 'OMD n.º 9432',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-132.jpeg',
    bio: 'Especialista em alinhamento estético e funcional com alinhadores transparentes.',
  },
  {
    id: 'alexandra-lucas',
    name: 'Dra. Alexandra Lucas',
    role: 'Periodontologia & Medicina Dentária',
    specialty: 'Saúde Gengival & Tecidos de Suporte',
    omd: 'OMD n.º 7851',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-67.jpeg',
    bio: 'Dedicada ao tratamento de gengivite, periodontite e preservação biológica dos dentes.',
  },
  {
    id: 'orizanda-claret',
    name: 'Dra. Orizanda Claret',
    role: 'Odontopediatria',
    specialty: 'Saúde Oral Infantil & Prevenção',
    omd: 'OMD n.º 10245',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-51.jpeg',
    bio: 'Consultas amigáveis e adaptadas ao ritmo das crianças para crescerem sem receio.',
  },
  {
    id: 'tomas-machado',
    name: 'Dr. Tomás Machado',
    role: 'Dentisteria, Endodontia & Cirurgia Oral',
    specialty: 'Restaurações Estéticas & Tratamento de Canal',
    omd: 'OMD n.º 11209',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-227.jpeg',
    bio: 'Foco na conservação da estrutura dentária natural e alívio imediato da dor.',
  },
  {
    id: 'julio',
    name: 'Dr. Júlio',
    role: 'Cirurgia Oral Avançada & Sisos',
    specialty: 'Exodontias Complexas & Enxertos Ósseos',
    omd: 'OMD n.º 8321',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/dr_julio_clinica_smo.jpg',
    bio: 'Especialista em cirurgia indolor de dentes do siso e cirurgia reconstrutiva.',
  },
  {
    id: 'francisco',
    name: 'Dr. Francisco',
    role: 'Clínica Geral, Endodontia & Próteses',
    specialty: 'Reabilitação Dentária & Coroas Cerâmicas',
    omd: 'OMD n.º 12054',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/dra_francisco.jpeg',
    bio: 'Acompanhamento preventivo integral e reabilitações protéticas duradouras.',
  },
  {
    id: 'carla-claro',
    name: 'Carla Claro',
    role: 'Receção & Apoio ao Paciente',
    specialty: 'Gestão e Acompanhamento Personalizado',
    omd: 'Atendimento SMO',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-94.jpeg',
    bio: 'O primeiro sorriso e o cuidado próximo em cada etapa da sua visita.',
  },
];

export const CLINIC_GALLERY = [
  {
    num: '01',
    title: 'Receção & Acolhimento',
    desc: 'Luz natural, silêncio e atendimento acolhedor desde o primeiro minuto.',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/IMG_5640.JPG',
  },
  {
    num: '02',
    title: 'Gabinete Odontológico',
    desc: 'Cadeiras de alta ergonomia e tecnologia clínica para o seu máximo conforto.',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/IMG_5650.JPG',
  },
  {
    num: '03',
    title: 'Gabinete & Esterilização',
    desc: 'Protocolos rigorosos de assepsia e equipamentos de diagnóstico digital.',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/carrusel%203-02.jpg',
  },
  {
    num: '04',
    title: 'Fachada em Moscavide',
    desc: 'Acesso fácil e visível na Estrada de Moscavide N 32C, Lisboa.',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/DJI_20250819154440_0104_D.JPG',
  },
  {
    num: '05',
    title: 'Zona Comercial e Acesso',
    desc: 'Estacionamento público à porta e proximidade ao metro de Moscavide.',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/DJI_20250819155107_0110_D.JPG',
  },
  {
    num: '06',
    title: 'Perspetiva Olivais / Lisboa',
    desc: 'Localização privilegiada com excelentes acessos a toda a Área Metropolitana.',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/DJI_20250819154505_0105_D.JPG',
  },
];

export const SERVICE_EXPLANATORY_VIDEOS: Record<string, { title: string; src: string; desc: string }> = {
  Implantologia: {
    title: 'Implante Unitário e Carga Imediata',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/IMPLANTEHOJE.mp4',
    desc: 'Como planeamos a reposição dentária sem dor em 3D.',
  },
  'Ortodontia invisível': {
    title: 'Alinhadores Transparentes & Estudo',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/SORRISO.mp4',
    desc: 'Correção de mordida e alinhamento milimétrico sem brackets.',
  },
  'Estética dentária': {
    title: 'Facetas Dentárias & Design do Sorriso',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/FACETAS.mp4',
    desc: 'Lâminas cerâmicas ultrafinas respeitando as proporções do rosto.',
  },
  'Medicina dentária geral': {
    title: 'Higiene Profunda e Prevenção',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/GENERALISTA.mp4',
    desc: 'Destartarização com ultrassons e proteção do esmalte.',
  },
  Endodontia: {
    title: 'Tratamento de Desvitalização / Canal',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_EDODONTIA.mp4',
    desc: 'Salvar dentes naturais com microscopia e precisão.',
  },
  Branqueamento: {
    title: 'Branqueamento Clínico Seguro',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_LIMPEZA.mp4',
    desc: 'Luminosidade natural e zero sensibilidade pós-sessão.',
  },
  'Próteses e Reabilitação': {
    title: 'Próteses Fixas sobre Implantes',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/PROTESISFIXAS.mp4',
    desc: 'Reabilitação total com dentes fixos no mesmo dia.',
  },
  Odontopediatria: {
    title: 'Consulta Lúdica para Crianças',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/ODONTO02.mp4',
    desc: 'Prevenção e acompanhamento calmo desde o primeiro dente.',
  },
};

export const CLINICAL_CASES_BEFORE_AFTER = [
  {
    id: 'P1',
    title: 'Fecho de Diastemas',
    treatment: 'Estética Dentária',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/P1.jpg',
    desc: 'Harmonização dos espaços interdentais anteriores com resina composta estratificada.',
  },
  {
    id: 'P2',
    title: 'Alinhamento do Arco Superior',
    treatment: 'Ortodontia Invisível',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/P2.jpg',
    desc: 'Correção de apinhamento moderado em 8 meses de tratamento.',
  },
  {
    id: 'P3',
    title: 'Branqueamento Profissional',
    treatment: 'Branqueamento',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/P3.jpg',
    desc: 'Clareamento clínico combinado com kit de reforço domiciliário.',
  },
  {
    id: 'P4',
    title: 'Implante Unitário Anterior',
    treatment: 'Implantologia',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/P4.jpg',
    desc: 'Reposição de incisivo central com coroa de zircónia e preservação gengival.',
  },
  {
    id: 'P5',
    title: 'Facetas Cerâmicas (4 Peças)',
    treatment: 'Estética Dentária',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/P5.jpg',
    desc: 'Transformação estética natural e enceramento diagnóstico guiado.',
  },
  {
    id: 'P6',
    title: 'Correção de Apinhamento Inferior',
    treatment: 'Ortodontia Invisível',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/P6.jpg',
    desc: 'Recuperação do espaço funcional e alinhamento dos incisivos inferiores.',
  },
  {
    id: 'P7',
    title: 'Coroa de Zircónia sobre Dente Natural',
    treatment: 'Reabilitação Oral',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/P7.jpg',
    desc: 'Substituição de restauração fraturada por prótese fixa cerâmica.',
  },
  {
    id: 'P8',
    title: 'Reabilitação Fixa de Arcada Completa',
    treatment: 'Implantologia',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/P8.jpg',
    desc: 'Protocolo superior All-on-4 com dentes fixos imediatos.',
  },
  {
    id: 'P9',
    title: 'Restauração de Fratura Incisal',
    treatment: 'Dentisteria Estética',
    img: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/P9.jpg',
    desc: 'Reconstrução biomimética impercetível após trauma dentário.',
  },
];

export const CLINICAL_CASE_VIDEOS = [
  { id: 'V1', title: 'Caso Ortodontia Alinhadores', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/V1.mp4' },
  { id: 'V2', title: 'Caso Implante Unitário Estético', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/V2.mp4' },
  { id: 'V4', title: 'Caso Facetas Cerâmicas', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/V4.mp4' },
  { id: 'V5', title: 'Caso Protocolo Superior sobre Implantes', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/V5.mp4' },
  { id: 'V6', title: 'Caso Regeneração Periodontal', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/V6.mp4' },
  { id: 'V7', title: 'Caso Mordida Cruzada Infantil', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/V7.mp4' },
  { id: 'V8', title: 'Caso Desgaste e Bruxismo', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/V8.mp4' },
  { id: 'V9', title: 'Caso Prótese Combinada', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/V9.mp4' },
  { id: 'V10', title: 'Caso Branqueamento Combinado', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/V10.mp4' },
  { id: 'V11', title: 'Caso Enxerto e Implante', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/V11.mp4' },
  { id: 'V12', title: 'Caso Armonização do Sorriso', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/V12.mp4' },
];

export const PATIENT_TESTIMONIAL_VIDEOS = [
  { id: 'testemunho-1', title: 'Testemunho Paciente 1', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_santa_maria_1.mp4' },
  { id: 'testemunho-2', title: 'Testemunho Paciente 2', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_santa_maria_2.mp4' },
  { id: 'testemunho-3', title: 'Testemunho Paciente 3', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_santa_maria_3.mp4' },
];

export const CAMPAIGN_BANNERS = [
  {
    id: 'kids',
    title: 'Campaña Odontopediatria',
    desc: 'Saúde oral e prevenção para crianças.',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/kids%20clinica%20dentaria%20santa%20maria%20dos%20olivais%20.jpg',
  },
  {
    id: 'implantes-unitarios',
    title: 'Campaña Implantes Unitários',
    desc: 'Implante com coroa incluída a preço transparente.',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/implantes_smo_junio_julio_2.jpeg',
  },
  {
    id: 'arcada-completa',
    title: 'Campaña Arcada Completa',
    desc: 'Dentes fixos totais sobre 4 a 6 implantes.',
    src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/arcada_completa_smo_2.jpeg',
  },
];

export const STORIES_REELS = [
  { id: 0, title: 'SMO Moscavide', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_dentaria_smo_moscavide.mp4', thumb: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/IMG_5640.JPG' },
  { id: 1, title: 'Alinhadores', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_ALINHADORES.mp4', thumb: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-D089534F-903E-476C-BB13-26CAB404F1F3.jpeg' },
  { id: 2, title: 'Aparelho', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_APARALHO.mp4', thumb: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/Clinica-Santa-Maria-Olivais-100-scaled.jpg' },
  { id: 3, title: 'Primeira Consulta', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_CONSULTA.mp4', thumb: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg' },
  { id: 4, title: 'Dia Anterior à Cirurgia', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_DIAANTERIOR.mp4', thumb: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg' },
  { id: 5, title: 'Dr. Júlio · Cirurgia', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_DRJULIO.mp4', thumb: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg' },
  { id: 6, title: 'Endodontia / Canal', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_EDODONTIA.mp4', thumb: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/Clinica-Santa-Maria-Olivais-48-scaled.jpg' },
  { id: 7, title: 'Fratura Dentária', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_FRATURA.mp4', thumb: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/05/20250528_1530_Sorriso-Perfeito_remix_01jwbmq8mnfev9my4ye2ek9xx0.png' },
  { id: 8, title: 'Gengiva & Inflamação', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_GENGIVA.mp4', thumb: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-EAA32118-B8DB-4848-ABC0-210B0ACBFDC2.jpeg' },
  { id: 9, title: 'Implantes Dentários', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_IMPLANTES.mp4', thumb: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-BA8B4A41-1D6A-44A9-AD46-A79BBAE94C63.jpeg' },
  { id: 10, title: 'Limpeza & Destartarização', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_LIMPEZA.mp4', thumb: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-D089534F-903E-476C-BB13-26CAB404F1F3.jpeg' },
  { id: 11, title: 'Dentes que se Mexem', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_MEXEM.mp4', thumb: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/Clinica-Santa-Maria-Olivais-100-scaled.jpg' },
  { id: 12, title: 'Mitos da Saúde Oral', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_MITOS.mp4', thumb: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg' },
  { id: 13, title: 'Perda Dentária', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_PERDADENTARIA.mp4', thumb: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg' },
  { id: 14, title: 'Periodontite', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_PERIODONTITE.mp4', thumb: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/05/20250528_1530_Sorriso-Perfeito_remix_01jwbmq8mnfev9my4ye2ek9xx0.png' },
  { id: 15, title: 'Reabilitação do Sorriso', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_REABILITAC%CC%A7A%CC%83O.mp4', thumb: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg' },
  { id: 16, title: 'Sorriso Sem Escalas', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_SEMESCALAS.mp4', thumb: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/Clinica-Santa-Maria-Olivais-48-scaled.jpg' },
  { id: 17, title: 'Sorriso Perfeito', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_SORRISO.mp4', thumb: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/05/20250528_1530_Sorriso-Perfeito_remix_01jwbmq8mnfev9my4ye2ek9xx0.png' },
  { id: 18, title: 'Dr. Tomás Machado · Restaurações', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_TOMAS.mp4', thumb: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-EAA32118-B8DB-4848-ABC0-210B0ACBFDC2.jpeg' },
];

export const EDUCATIONAL_BLOG_VIDEOS = [
  { id: 'ed-1', title: 'Educação Infantil', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_criancas.mp4', desc: 'Pautas para escovagem correta e prevenção em crianças.' },
  { id: 'ed-2', title: 'Cuidado com Implantes', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_cuidado_implantes_MANUTENCAOADAWARNESS.mp4', desc: 'Higiene e escovilhões para próteses sobre implantes.' },
  { id: 'ed-3', title: 'Convite Check-up com Dra. Alexandra', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_dentebanado_ALEXINVITACION2.mp4', desc: 'A importância da revisão periódica.' },
  { id: 'ed-4', title: 'Gestão da Dor de Dentes', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_dor.mp4', desc: 'O que fazer perante uma dor aguda ou sensibilidade noturna.' },
  { id: 'ed-5', title: 'Prevenção Geral com Dr. Tomás', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_dr_tomas_PREVENCAO.mp4', desc: 'Como prevenir cáries interproximais.' },
  { id: 'ed-6', title: 'Facetas Dentárias', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_facetas_dentarias.mp4', desc: 'Preparação e durabilidade das facetas cerâmicas.' },
  { id: 'ed-7', title: 'Implantes com Dra. Ana Mata', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_implantes_dra_IMPLANTESAD01.mp4', desc: 'Por que os implantes preservam o osso maxilar.' },
  { id: 'ed-8', title: 'O que são Implantes?', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_implantes.mp4', desc: 'Estrutura biológica: titânio e coroa de cerâmica.' },
  { id: 'ed-9', title: 'Convite à Revisão Anual', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_invita_revision_TOMASINVITACION.mp4', desc: 'Dr. Tomás convida a cuidar do sorriso.' },
  { id: 'ed-10', title: 'Limpeza GBT por Ultrassons', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_limpeza_dentaria_gbt.mp4', desc: 'Tecnologia de fluxo de ar e higiene indolor.' },
  { id: 'ed-11', title: 'Manutenção de Implantes', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_MANTENIMIENTOIMPLANTES.mp4', desc: 'Prazos clínicos para higienização de implantes.' },
  { id: 'ed-12', title: 'Estudo de Facetas com Dra. Mariana', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_marcar_facetas_MARIANAINVITACION01.mp4', desc: 'Planeamento estético digital e mock-up prévio.' },
  { id: 'ed-13', title: 'Uso de Alinhadores no Dia a Dia', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_MARIANAALINEADORES.mp4', desc: 'Rotina e conforto com aparelhos transparentes.' },
  { id: 'ed-14', title: 'Prevenção Gengival com Dra. Alexandra', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_prevencion_ALEXINVITACION.mp4', desc: 'Deteção precoce de gengivite e sangramento.' },
  { id: 'ed-15', title: 'Saúde Oral da Família', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_prevencion_GENERALISTA.mp4', desc: 'Cuidados essenciais para todas as idades.' },
  { id: 'ed-16', title: 'O Problema Silencioso', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_PROBLEMASILENCIOSO.mp4', desc: 'Doenças periodontais que não provocam dor imediata.' },
  { id: 'ed-17', title: 'Evolução Periodontal', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_PROBLEMASPERIODONTALES.mp4', desc: 'Quando a gengivite pode evoluir para perda óssea.' },
  { id: 'ed-18', title: 'Próteses Fixas vs. Removíveis', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_protesis_parte_PROTESISFIXAS.mp4', desc: 'Diferenças de mastigação, conforto e estabilidade.' },
  { id: 'ed-19', title: 'Solução para Manchas e Desgastes', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_solucion_facetas_MARIANAINVITACION02.mp4', desc: 'Correção de descolorações profundas com facetas.' },
  { id: 'ed-20', title: 'Saúde das Gengivas (30s)', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_GINGIVASCORTO.mp4', desc: 'Conselho rápido para manter gengivas saudáveis.' },
];
