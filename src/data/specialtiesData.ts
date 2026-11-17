export interface PriceItem {
  name: string;
  detail?: string;
  price: string;
}

export interface TreatmentPricing {
  id: string;
  title: string;
  subtitle: string;
  note?: string;
  items: PriceItem[];
}

export const TREATMENT_PRICING: Record<string, TreatmentPricing> = {
  'Implantologia': {
    id: 'Implantologia',
    title: 'Implantologia & Reabilitação Oral',
    subtitle: 'Implantes em titânio grau médico, cirurgia guiada 3D e protocolos fixos All-on-4/6',
    note: 'Pensado para a sua tranquilidade: possibilidade de pagamento faseado em 2 etapas (50% na fase cirúrgica e 50% na colocação da coroa definitiva). Emitimos fatura médica detalhada com códigos OMD e NIF para reembolso junto da sua seguradora ou subsistema (ADSE, Médis, Multicare, AdvanceCare).',
    items: [
      {
        name: 'Implante Unitário + Coroa Metalo-cerâmica',
        detail: 'Inclui cirurgia de osteointegração em titânio biocompatível e coroa fixa definitiva para voltar a mastigar com segurança',
        price: '745 €',
      },
      {
        name: '2 Implantes Dentários',
        detail: 'Reabilitação implantossuportada para repor dentes contíguos e devolver equilíbrio à mordida',
        price: '1.400 €',
      },
      {
        name: '3 Implantes Dentários',
        detail: 'Pilar protético estável para substituição fixa de múltiplos dentes ausentes',
        price: '1.800 €',
      },
      {
        name: '4 Implantes Dentários',
        detail: 'Suporte estrutural amplo para reabilitação oral parcial extensa ou arcada completa',
        price: '2.300 €',
      },
      {
        name: 'Protocolo Superior / Completo (Arcada completa)',
        detail: 'Reabilitação total fixa sobre 4 a 6 implantes + prótese definitiva aparafusada — volte a sorrir e comer sem receios',
        price: '4.800 € – 5.000 €',
      },
      {
        name: 'Prótese Provisória Fixa (Carga imediata)',
        detail: 'Dentes fixos provisórios colocados no próprio dia ou até 24h após a intervenção, quando clinicamente indicado',
        price: '1.200 €',
      },
      {
        name: 'Prótese Provisória Removível',
        detail: 'Conforto estético e funcional durante o período biológico de osteointegração',
        price: '350 €',
      },
      {
        name: 'Coroa em Cerâmica Pura / Zircónia sobre Implante',
        detail: 'Biocompatibilidade gengival superior e translucidez idêntica ao esmalte natural sobre pilar personalizado',
        price: '650 €',
      },
      {
        name: 'Enxerto Ósseo (Regeneração Óssea Guiada)',
        detail: 'Reconstrução de volume ósseo com biomateriais certificados para garantir estabilidade ao implante',
        price: '200 € – 500 €',
      },
      {
        name: 'Manutenção e Higienização de Prótese Fixa sobre Implantes',
        detail: 'Desinfeção clínica peri-implantar, controlo gengival e polimento especializado (por arcada)',
        price: '100 €',
      },
      {
        name: 'Reaperto Protético / Selamento em Compósito',
        detail: 'Revisão de rotina, calibração de torque protético e proteção do acesso do parafuso',
        price: '10 €',
      },
    ],
  },

  'Ortodontia invisível': {
    id: 'Ortodontia invisível',
    title: 'Ortodontia & Alinhadores Invisíveis',
    subtitle: 'Alinhadores transparentes (Invisalign / Spark), ortodontia fixa e contenção pós-tratamento',
    note: 'Acompanhamento próximo em cada etapa do seu sorriso. Emitimos fatura médica codificada com número de utente para pedido de reembolso no seu seguro de saúde.',
    items: [
      {
        name: 'Consulta de Estudo Ortodôntico Completo',
        detail: 'Análise cefalométrica, registo fotográfico, digitalização/moldes e plano personalizado explicado passo a passo',
        price: '60 €',
      },
      {
        name: 'Aparelho Ortodôntico Fixo',
        detail: 'Sistema corretivo de brackets de alta precisão para alinhamento dentário e equilíbrio oclusal (por arcada)',
        price: '450 €',
      },
      {
        name: 'Consulta Mensal de Controlo (Aparelho fixo)',
        detail: 'Ajuste biomecânico suave, acompanhamento da evolução e cuidado da saúde gengival',
        price: '65 €',
      },
      {
        name: 'Invisalign / Alinhadores Transparentes',
        detail: 'Goteiras invisíveis, cómodas e removíveis desenhadas digitalmente à medida da sua rotina (orçamento após estudo)',
        price: 'Sob consulta',
      },
      {
        name: 'Consulta de Evolução Invisalign',
        detail: 'Monitorização clínica do movimento dentário e entrega das novas fases de alinhadores',
        price: '75 €',
      },
      {
        name: 'Contenção Ortodôntica Fixa',
        detail: 'Fio lingual discreto aderido na face interna dos dentes para preservar o seu novo sorriso (por arcada)',
        price: '150 €',
      },
      {
        name: 'Contenção Ortodôntica Removível',
        detail: 'Goteira transparente confortável de uso noturno para estabilidade a longo prazo (por arcada)',
        price: '180 €',
      },
      {
        name: 'Disjuntor Palatino Ortopédico',
        detail: 'Expansão suave da arcada superior para melhorar o espaço dentário e a função respiratória',
        price: '480 €',
      },
      {
        name: 'Mantenedor de Espaço',
        detail: 'Preservação cuidadosa do espaço fisiológico para a erupção saudável dos dentes definitivos',
        price: '130 €',
      },
      {
        name: 'Remoção Segura de Aparelho Externo + Polimento',
        detail: 'Descolagem cuidadosa de brackets colocados noutra clínica e polimento protetor do esmalte',
        price: '100 €',
      },
    ],
  },

  'Estética dentária': {
    id: 'Estética dentária',
    title: 'Estética Dentária & Harmonização do Sorriso',
    subtitle: 'Facetas cerâmicas ultrafinas, zircónia e restaurações biomiméticas naturais',
    note: 'Não fazemos sorrisos artificiais: desenhamos cada detalhe em harmonia com o seu rosto, a sua expressão e a luz natural dos seus dentes.',
    items: [
      {
        name: 'Facetas Cerâmicas – 4 Dentes Anteriores',
        detail: 'Renovação delicada e luminosa dos dentes centrais e laterais visíveis ao sorrir',
        price: '1.800 €',
      },
      {
        name: 'Facetas Cerâmicas – 1 Arcada (10 Dentes)',
        detail: 'Reabilitação estética integral da arcada superior até ao 2.º pré-molar com máxima naturalidade',
        price: '4.550 €',
      },
      {
        name: 'Facetas Cerâmicas – 2 Arcadas (20 Dentes)',
        detail: 'Harmonização estética e funcional completa do sorriso superior e inferior',
        price: '6.500 €',
      },
      {
        name: 'Restauração Estética Estratificada em Compósito',
        detail: 'Reconstrução biomimética conservadora que imita a textura e cor do dente natural',
        price: '75 €',
      },
      {
        name: 'Coroa em Cerâmica Pura ou Zircónia Monolítica',
        detail: 'Reabilitação unitária livre de metal, resistente e integrada de forma invisível no sorriso',
        price: '650 €',
      },
      {
        name: 'Peça Cerâmica Individualizada (Inlay / Onlay)',
        detail: 'Recobrimento parcial em porcelana de alta precisão que preserva a estrutura dentária sã',
        price: '450 €',
      },
    ],
  },

  'Branqueamento': {
    id: 'Branqueamento',
    title: 'Branqueamento Dentário Clínico',
    subtitle: 'Protocolos médicos seguros em consultório e ambulatório supervisionado',
    note: 'Devolvemos luminosidade fresca ao seu sorriso sob supervisão médica rigorosa, protegendo o esmalte e as gengivas sem sensibilidade persistente.',
    items: [
      {
        name: 'Branqueamento Clínico em Consultório',
        detail: 'Sessão médica com barreira gengival fotopolimerizável, gel ativado e luminosidade visível no próprio dia',
        price: '200 €',
      },
      {
        name: 'Branqueamento Ambulatório (Kit Personalizado Casa)',
        detail: 'Goteiras termoformadas à medida dos seus dentes + estojo + seringas de gel clínico supervisionado',
        price: '150 €',
      },
      {
        name: 'Seringa Adicional de Manutenção',
        detail: 'Recarga individual de gel clínico para prolongar a frescura e o brilho do sorriso',
        price: '25 €',
      },
    ],
  },

  'Endodontia': {
    id: 'Endodontia',
    title: 'Endodontia (Desvitalização)',
    subtitle: 'Tratamento endodôntico mecanizado e alívio imediato da dor dentária',
    note: 'A nossa prioridade é aliviar a sua dor com suavidade e salvar o seu dente natural, preservando a sua raiz e a mastigação original.',
    items: [
      {
        name: 'Endodontia em Incisivo / Canino / Pré-Molar',
        detail: 'Desinfeção químico-mecânica e obturação hermética sob controlo radiográfico digital',
        price: '180 €',
      },
      {
        name: 'Endodontia em Dente Molar',
        detail: 'Tratamento especializado em dentes posteriores multirradiculares com anestesia eficaz e conforto',
        price: '240 €',
      },
      {
        name: 'Pulpectomia + Restauração Coronária',
        detail: 'Remoção delicada do tecido pulpar inflamado e selamento coronário estanque',
        price: '120 €',
      },
      {
        name: 'Pulpotomia Conservadora + Restauração',
        detail: 'Terapia pulpar vital com biomateriais protetores e reconstrução imediata',
        price: '80 €',
      },
      {
        name: 'Drenagem de Abcesso Dentário Agudo',
        detail: 'Atendimento de urgência para alívio imediato da pressão, infeção e desconforto',
        price: '25 €',
      },
    ],
  },

  'Próteses': {
    id: 'Próteses',
    title: 'Próteses Dentárias & Reabilitação',
    subtitle: 'Coroas em zircónia, próteses flexíveis sem ganchos visíveis e próteses acrílicas',
    note: 'Voltar a saborear uma refeição em família e falar com total segurança: ajustamos cada prótese à sua anatomia para que se sinta confortável desde o primeiro dia.',
    items: [
      {
        name: 'Coroa em Cerâmica Pura ou Zircónia sobre Dente',
        detail: 'Reabilitação estética livre de metal com adaptação gengival suave e natural',
        price: '650 €',
      },
      {
        name: 'Coroa Metalo-cerâmica sobre Dente',
        detail: 'Estrutura interna reforçada revestida a cerâmica estética de elevada resistência mastigatória',
        price: '550 €',
      },
      {
        name: 'Coroa Provisória Acrílica',
        detail: 'Proteção estética e funcional imediata enquanto o laboratório confecciona a peça definitiva',
        price: '70 €',
      },
      {
        name: 'Cimentação Adesiva de Coroa',
        detail: 'Recolocação clínica segura com cimentos resinosos biocompatíveis',
        price: '30 €',
      },
      {
        name: 'Prótese Removível Acrílica',
        detail: 'Reabilitação leve e personalizada — de 1 dente (180 €) até arcada de 14 dentes (330 €)',
        price: '180 € – 330 €',
      },
      {
        name: 'Prótese Esquelética em Cromo-Cobalto',
        detail: 'Estrutura fina, estável e resistente que deixa o palato mais livre (de 1 a 14 dentes)',
        price: '260 € – 400 €',
      },
      {
        name: 'Prótese Flexível Biocompatível (sem ganchos metálicos)',
        detail: 'Adaptação suave às gengivas e estética discreta translúcida (de 1 a 14 dentes)',
        price: '310 € – 440 €',
      },
      {
        name: 'Reparação / Conserto Laboratorial de Prótese',
        detail: '60 € em prótese acrílica · 100 € em prótese esquelética ou flexível',
        price: '60 € – 100 €',
      },
      {
        name: 'Acrescento de Dente em Prótese Existente',
        detail: 'Base de 60 € a 100 € (+10 € por cada dente adicional integrado)',
        price: 'Desde 60 €',
      },
      {
        name: 'Rebasamento Clínico de Prótese',
        detail: 'Readaptação interna para recuperar firmeza (60 € acrílica · 100 € flexível)',
        price: '60 € – 100 €',
      },
      {
        name: 'Ajuste Oclusal e Alívio de Conforto',
        detail: 'Eliminação cuidadosa de pequenos pontos de pressão na mucosa e polimento',
        price: '5 €',
      },
    ],
  },

  'Cirurgia Oral': {
    id: 'Cirurgia Oral',
    title: 'Cirurgia Oral & Dentes do Siso',
    subtitle: 'Exodontia atraumática de terceiros molares e regeneração óssea',
    note: 'Intervenções realizadas pelo Dr. Júlio com anestesia eficaz, técnica cirúrgica delicada e acompanhamento pós-operatório próximo para uma recuperação serena.',
    items: [
      {
        name: 'Extração Cirúrgica de Dente do Siso Incluso',
        detail: 'Remoção atraumática de terceiro molar retido, com planeamento radiográfico prévio',
        price: '100 € – 200 €',
      },
      {
        name: 'Extração de Dente do Siso Erupcionado',
        detail: 'Exodontia cuidadosa de terceiro molar visível na arcada sob anestesia local',
        price: '75 € – 200 €',
      },
      {
        name: 'Exodontia de Dente Molar',
        detail: 'Extração suave de molar sem viabilidade restauradora, preservando os tecidos vizinhos',
        price: '50 €',
      },
      {
        name: 'Exodontia de Canino ou Pré-Molar',
        detail: 'Procedimento tranquilo e indolor sob anestesia local controlada',
        price: '50 €',
      },
      {
        name: 'Exodontia de Dente Incisivo',
        detail: 'Remoção delicada em zona estética com máxima preservação do osso alveolar',
        price: '30 €',
      },
      {
        name: 'Enxerto Ósseo com Biomateriais',
        detail: 'Regeneração óssea guiada para preservar ou reconstruir o suporte maxilar',
        price: '200 € – 500 €',
      },
      {
        name: 'Regularização Cirúrgica de Rebordo Alveolar',
        detail: 'Harmonização óssea suave para conforto protético futuro (por quadrante)',
        price: '60 €',
      },
    ],
  },

  'Medicina dentária geral': {
    id: 'Medicina dentária geral',
    title: 'Medicina Dentária Geral & Preventiva',
    subtitle: 'Destartarização ultrassónica, saúde gengival, restaurações e bruxismo',
    note: 'Prevenir a tempo poupa desconfortos e tratamentos complexos. Cuidamos da sua saúde oral de rotina com delicadeza e atenção genuína.',
    items: [
      {
        name: 'Destartarização Ultrassónica + Polimento',
        detail: 'Higiene oral clínica profunda para remover tártaro, placa bacteriana e devolver frescura às gengivas',
        price: '40 €',
      },
      {
        name: 'Profilaxia e Controlo Preventivo',
        detail: 'Higienização suave de manutenção e remoção de pigmentações extrínsecas superficiais',
        price: '30 €',
      },
      {
        name: 'Alisamento Radicular / Curetagem Periodontal',
        detail: 'Terapia gengival profunda para travar inflamação e proteger o suporte ósseo (por quadrante)',
        price: '70 €',
      },
      {
        name: 'Goteira Oclusal Miorrelaxante (Bruxismo)',
        detail: 'Placa rígida feita à medida para proteger os dentes do desgaste noturno e aliviar tensão mandibular',
        price: '180 €',
      },
      {
        name: 'Restauração Adesiva Simples em Compósito',
        detail: 'Tratamento conservador de cárie inicial com resina estética da cor do seu dente',
        price: '45 €',
      },
      {
        name: 'Restauração Adesiva Complexa em Compósito',
        detail: 'Reconstrução anatómica e funcional em dentes com comprometimento de duas ou mais faces',
        price: '65 €',
      },
      {
        name: 'Restauração Provisória Protetora',
        detail: 'Selamento calmante intermédio para proteger a sensibilidade dentária',
        price: '25 €',
      },
      {
        name: 'Radiovisiografia Periapical Digital',
        detail: 'Imagem diagnóstica imediata de ultra-baixa radiação explicada consigo no ecrã',
        price: '10 €',
      },
      {
        name: 'Consulta de Urgência / Prescrição Médica',
        detail: 'Observação clínica dedicada e terapêutica farmacológica ajustada ao seu alívio',
        price: '20 €',
      },
      {
        name: 'Consulta de Revisão e Controlo Pós-Tratamento',
        detail: 'Acompanhamento próximo para confirmar que tudo evolui com total conforto (exceto cirurgia)',
        price: '5 €',
      },
    ],
  },

  'Odontopediatria': {
    id: 'Odontopediatria',
    title: 'Odontopediatria Humanizada',
    subtitle: 'Consultas lúdicas, prevenção sem lágrimas e acompanhamento infantil com a Dra. Ori',
    note: 'Uma criança que se sente respeitada e segura hoje será um adulto que sorri sem medo amanhã. Cada consulta respeita o tempo emocional do seu filho.',
    items: [
      {
        name: 'Consulta de Adaptação e Higiene Infantil',
        detail: 'Primeiro contacto carinhoso, observação lúdica e ensino divertido de escovagem para pais e crianças',
        price: 'Atendimento Lúdico',
      },
      {
        name: 'Aplicação de Selantes de Fissuras',
        detail: 'Película protetora indolor nos sulcos dos molares para prevenir cáries infantis (por arcada)',
        price: '40 €',
      },
      {
        name: 'Restauração Estética em Dente Decíduo (de leite)',
        detail: 'Tratamento delicado de cárie infantil com materiais biocompatíveis e linguagem adaptada à criança',
        price: '45 €',
      },
      {
        name: 'Exodontia Suave de Dente Decíduo',
        detail: 'Remoção rápida, carinhosa e sem trauma de dentinho de leite com mobilidade ou retenção',
        price: '35 €',
      },
      {
        name: 'Pulpotomia Pediátrica + Restauração',
        detail: 'Preservação biológica da vitalidade radicular do dente de leite e alívio do desconforto',
        price: '80 €',
      },
      {
        name: 'Pulpectomia Pediátrica + Restauração',
        detail: 'Tratamento canalar delicado para eliminar infeção e proteger o gérmen do dente definitivo',
        price: '120 €',
      },
      {
        name: 'Mantenedor de Espaço Pediátrico',
        detail: 'Guia suave que guarda o lugar exato para o dente permanente nascer alinhado',
        price: '130 €',
      },
    ],
  },
};
