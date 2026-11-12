export interface TeamMember {
  name: string;
  title: string;
  img: string;
  bio: string;
  imgPosition?: string;
  omd?: string;
}

export interface VideoStory {
  id: number;
  type: 'video' | 'image';
  title: string;
  src: string;
  thumbnail: string;
  aspect?: string;
}

export interface Campaign {
  src: string;
  title: string;
  targetService: string;
  description?: string;
}

export const defaultContentData = {
  global: {
    name: "Clínica Santa Maria dos Olivais",
    email: "clinicasmod@gmail.com",
    phone: "211 350 066",
    customerService: "300 601 645",
    mobile: "+351 912 907 024",
    whatsappNum: "351912907024",
    address: "Estrada de Moscavide N 32C, 1800-279, Lisboa",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Estrada+de+Moscavide+N+32C,+1800-279,+Lisboa",
    darkLogoIcon: "https://clinica-santa-maria-dos-olivais.b-cdn.net/Icono-Nocturno.png",
    socials: {
      instagram: "https://www.instagram.com/clinicasantamariaolivais/",
      facebook: "https://www.facebook.com/clinicasmod/",
      whatsapp: "https://wa.me/351912907024"
    }
  },
  team: [
    {
      name: "Dra. Ana Mata",
      title: "Direção Clínica e Implantologia",
      img: "https://clinica-santa-maria-dos-olivais.b-cdn.net/dra_ana_mata.png",
      bio: "Diretora Clínica e especialista em reabilitação oral avançada com implantes.",
      imgPosition: "object-top",
      omd: "Cédula OMD"
    },
    {
      name: "Dra. Mariana Aberto",
      title: "Ortodontia & Alinhadores",
      img: "https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-132.jpeg",
      bio: "Especialista em Ortodontia Clínica e Alinhadores Invisíveis (Invisalign).",
      imgPosition: "object-top",
      omd: "Cédula OMD"
    },
    {
      name: "Dra. Alexandra Lucas",
      title: "Periodontologia",
      img: "https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-67.jpeg",
      bio: "Especialista em saúde gengival e tecidos de suporte dentário.",
      imgPosition: "object-top",
      omd: "Cédula OMD"
    },
    {
      name: "Dra. Orizanda Claret",
      title: "Odontopediatria",
      img: "https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-51.jpeg",
      bio: "Especialista no atendimento e saúde oral das crianças.",
      imgPosition: "object-top",
      omd: "Cédula OMD"
    },
    {
      name: "Dr. Tomás Machado",
      title: "Dentisteria & Endodontia",
      img: "https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-227.jpeg",
      bio: "Especialista em Endodontia (canal), restaurações estéticas e próteses.",
      imgPosition: "object-top",
      omd: "Cédula OMD"
    },
    {
      name: "Dr. Júlio",
      title: "Cirurgia Oral & Sisos",
      img: "https://clinica-santa-maria-dos-olivais.b-cdn.net/dr_julio_clinica_smo.jpg",
      bio: "Especialista em Cirurgia Oral Avançada e extração de dentes do siso.",
      imgPosition: "object-top",
      omd: "Cédula OMD"
    },
    {
      name: "Dra. Ladine",
      title: "Clínica Geral & Reabilitação",
      img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=80",
      bio: "Especialista em Higiene Oral, Restaurações, Próteses e Bruxismo.",
      imgPosition: "object-top",
      omd: "Cédula OMD"
    },
    {
      name: "Dr. Francisco",
      title: "Clínica Geral & Endodontia",
      img: "https://clinica-santa-maria-dos-olivais.b-cdn.net/dra_francisco.jpeg",
      bio: "Especialista em Endodontia, Coroas sobre dente e Extrações.",
      imgPosition: "object-top",
      omd: "Cédula OMD"
    },
    {
      name: "Carla Claro",
      title: "Receção & Apoio ao Cliente",
      img: "https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-94.jpeg",
      bio: "Responsável pelo acolhimento e gestão personalizada de cada paciente.",
      imgPosition: "object-top",
      omd: "Atendimento"
    }
  ] as TeamMember[],
  stories: [
    { id: 0, type: "video", title: "SMO Moscavide", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_dentaria_smo_moscavide.mp4", thumbnail: "https://clinica-santa-maria-dos-olivais.b-cdn.net/IMG_5640.JPG", aspect: "horizontal" },
    { id: 1, type: "video", title: "Alinhadores", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_ALINHADORES.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-D089534F-903E-476C-BB13-26CAB404F1F3.jpeg" },
    { id: 2, type: "video", title: "Aparelho", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_APARALHO.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/Clinica-Santa-Maria-Olivais-100-scaled.jpg" },
    { id: 3, type: "video", title: "Consulta", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_CONSULTA.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg" },
    { id: 4, type: "video", title: "Dia Anterior", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_DIAANTERIOR.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg" },
    { id: 6, type: "video", title: "Dr Júlio", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_DRJULIO.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg" },
    { id: 7, type: "video", title: "Endodontia", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_EDODONTIA.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/Clinica-Santa-Maria-Olivais-48-scaled.jpg" },
    { id: 8, type: "video", title: "Fratura", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_FRATURA.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/05/20250528_1530_Sorriso-Perfeito_remix_01jwbmq8mnfev9my4ye2ek9xx0.png" },
    { id: 9, type: "video", title: "Gengiva", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_GENGIVA.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-EAA32118-B8DB-4848-ABC0-210B0ACBFDC2.jpeg" },
    { id: 10, type: "video", title: "Implantes", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_IMPLANTES.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-BA8B4A41-1D6A-44A9-AD46-A79BBAE94C63.jpeg" },
    { id: 11, type: "video", title: "Limpeza", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_LIMPEZA.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-D089534F-903E-476C-BB13-26CAB404F1F3.jpeg" },
    { id: 12, type: "video", title: "Implantes & Mobilidade", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_MEXEM.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/Clinica-Santa-Maria-Olivais-100-scaled.jpg" },
    { id: 13, type: "video", title: "Mitos da Saúde Oral", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_MITOS.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg" },
    { id: 14, type: "video", title: "Perda Dentária", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_PERDADENTARIA.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg" },
    { id: 15, type: "video", title: "Periodontite", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_PERIODONTITE.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/05/20250528_1530_Sorriso-Perfeito_remix_01jwbmq8mnfev9my4ye2ek9xx0.png" },
    { id: 16, type: "video", title: "Reabilitação", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_REABILITAC%CC%A7A%CC%83O.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg" },
    { id: 17, type: "video", title: "Sorriso Sem Escalas", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_SEMESCALAS.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/Clinica-Santa-Maria-Olivais-48-scaled.jpg" },
    { id: 18, type: "video", title: "Sorriso Perfeito", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_SORRISO.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/05/20250528_1530_Sorriso-Perfeito_remix_01jwbmq8mnfev9my4ye2ek9xx0.png" },
    { id: 19, type: "video", title: "Dr Tomás Machado", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_TOMAS.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-EAA32118-B8DB-4848-ABC0-210B0ACBFDC2.jpeg" }
  ] as VideoStory[],
  clinicGallery: [
    { title: "Instalações Principais", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/DJI_20250819154440_0104_D.JPG" },
    { title: "Gabinete de Consulta", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/IMG_5640.JPG" },
    { title: "Receção & Atendimento", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/IMG_5650.JPG" },
    { title: "Fachada Moscavide", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/DJI_20250819154505_0105_D.JPG" },
    { title: "Tecnologia Odontológica", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/carrusel%203-02.jpg" },
    { title: "Vista Exterior Olivais", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/DJI_20250819155107_0110_D.JPG" }
  ],
  campaigns: [
    {
      src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/kids%20clinica%20dentaria%20santa%20maria%20dos%20olivais%20.jpg",
      title: "Odontopediatria Especializada",
      targetService: "Odontopediatria",
      description: "Consultas sem receio para os mais pequenos crescerem com sorrisos saudáveis."
    },
    {
      src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/implantes_smo_junio_julio_2.jpeg",
      title: "Especial Implantes Unitários",
      targetService: "Implantologia",
      description: "Pack completo de Implante Unitário com coroa a partir de 745€."
    },
    {
      src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/arcada_completa_smo_2.jpeg",
      title: "Protocolo Arcada Completa",
      targetService: "Implantologia",
      description: "Reabilitação fixa total superior a partir de 4.800€."
    }
  ] as Campaign[],
  pdfPostOpUrl: "https://clinica-santa-maria-dos-olivais.b-cdn.net/CUIDADOS%20POS%20OPERATORIOS.pdf"
};
