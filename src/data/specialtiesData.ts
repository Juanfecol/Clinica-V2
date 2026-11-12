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
    title: 'Implantologia & Reabilitação',
    subtitle: 'Implantes unitários, múltiplos e protocolo All-on-4/6',
    note: 'Condições de pagamento: possibilidade de pagamento faseado em 2 vezes (50% no início e 50% na colocação da coroa definitiva). Faturas emitidas com NIF para reembolso junto da sua seguradora.',
    items: [
      {
        name: 'Implante Unitário + Coroa Metalo-cerâmica',
        detail: 'Inclui cirurgia de colocação do implante e coroa definitiva',
        price: '745 €',
      },
      {
        name: '2 Implantes Dentários',
        detail: 'Reabilitação múltipla para ausência de dentes adjacentes',
        price: '1.400 €',
      },
      {
        name: '3 Implantes Dentários',
        detail: 'Base protética para substituição de múltiplos dentes',
        price: '1.800 €',
      },
      {
        name: '4 Implantes Dentários',
        detail: 'Suporte estrutural amplo para reabilitação parcial ou total',
        price: '2.300 €',
      },
      {
        name: 'Protocolo Superior / Completo (Arcada completa)',
        detail: 'Reabilitação total com 4 a 6 implantes + prótese fixa final aparafusada',
        price: '4.800 € – 5.000 €',
      },
      {
        name: 'Prótese Provisória Fixa (Carga imediata)',
        detail: 'Dentes fixos provisórios no mesmo dia ou 24h após a cirurgia',
        price: '1.200 €',
      },
      {
        name: 'Prótese Provisória Removível',
        detail: 'Dentes provisórios durante a fase de osteointegração',
        price: '350 €',
      },
      {
        name: 'Coroa Cerâmica Pura / Zircónia sobre Implante',
        detail: 'Máxima estética e translucidez natural sobre pilar de implante',
        price: '650 €',
      },
      {
        name: 'Enxerto Ósseo',
        detail: 'Regeneração óssea guiada para viabilização de implantes',
        price: '200 € – 500 €',
      },
      {
        name: 'Limpeza de Prótese Fixa sobre Implante',
        detail: 'Higienização profissional, desinfeção e polimento (por arcada)',
        price: '100 €',
      },
      {
        name: 'Aperto de Coroa / Recolocação de Compósito',
        detail: 'Manutenção de rotina e calibração de torque em implantes',
        price: '10 €',
      },
    ],
  },

  'Ortodontia invisível': {
    id: 'Ortodontia invisível',
    title: 'Ortodontia & Alinhadores',
    subtitle: 'Invisalign, aparelhos fixos e contenções pós-tratamento',
    note: 'Faturas emitidas com número de utente para solicitação de reembolso junto da sua seguradora.',
    items: [
      {
        name: 'Consulta de Estudo Ortodôntico',
        detail: 'Análise cefalométrica, moldes ou scan intraoral e planeamento',
        price: '60 €',
      },
      {
        name: 'Aparelho Ortodôntico Fixo',
        detail: 'Sistema clássico de brackets de alta precisão (por arcada)',
        price: '450 €',
      },
      {
        name: 'Consulta de Manutenção (Aparelho fixo)',
        detail: 'Ativação e ajuste periódico mensal',
        price: '65 €',
      },
      {
        name: 'Invisalign (Alinhadores transparentes)',
        detail: 'Alinhadores invisíveis removíveis sob medida (sob consulta após estudo)',
        price: 'Sob consulta',
      },
      {
        name: 'Consulta de Manutenção Invisalign',
        detail: 'Controlo do avanço clínico e entrega de novas fases',
        price: '75 €',
      },
      {
        name: 'Aparelho de Contenção Fixo',
        detail: 'Fio lingual colado atrás dos dentes para manter o resultado (por arcada)',
        price: '150 €',
      },
      {
        name: 'Aparelho de Contenção Removível',
        detail: 'Goteira transparente de uso noturno (por arcada)',
        price: '180 €',
      },
      {
        name: 'Aparelho Disjuntor Palatino',
        detail: 'Expansão ortopédica da arcada superior estreita',
        price: '480 €',
      },
      {
        name: 'Mantenedor de Espaço',
        detail: 'Preservação de espaço para os dentes definitivos',
        price: '130 €',
      },
      {
        name: 'Remoção de Aparelho (Realizado fora da clínica)',
        detail: 'Descolagem segura de brackets e polimento do esmalte',
        price: '100 €',
      },
    ],
  },

  'Estética dentária': {
    id: 'Estética dentária',
    title: 'Estética Dentária & Facetas',
    subtitle: 'Facetas cerâmicas e harmonização do sorriso',
    note: 'Planeamento estético individualizado com respeito pelas proporções faciais naturais.',
    items: [
      {
        name: 'Facetas – 4 Dentes Anteriores',
        detail: 'Transformação imediata da zona estética frontal',
        price: '1.800 €',
      },
      {
        name: 'Facetas – 1 Arcada (10 Dentes)',
        detail: 'Reabilitação do sorriso superior até ao 2.º pré-molar',
        price: '4.550 €',
      },
      {
        name: 'Facetas – 2 Arcadas (20 Dentes)',
        detail: 'Harmonização total do sorriso superior e inferior',
        price: '6.500 €',
      },
      {
        name: 'Restauração Estética em Compósito',
        detail: 'Reconstrução biomimética anatómica com resina estratificada',
        price: '75 €',
      },
      {
        name: 'Coroa em Porcelana Pura ou Zircónia',
        detail: 'Coroa cerâmica de máxima resistência e translucidez natural',
        price: '650 €',
      },
      {
        name: 'Porcelana Dentária',
        detail: 'Peça protética cerâmica individualizada de alta precisão',
        price: '450 €',
      },
    ],
  },

  'Branqueamento': {
    id: 'Branqueamento',
    title: 'Branqueamento Dentário',
    subtitle: 'Protocolos em consultório e kits supervisionados para casa',
    note: 'Protocolos seguros que preservam a estrutura do esmalte sem provocar sensibilidade persistente.',
    items: [
      {
        name: 'Branqueamento em Consultório',
        detail: 'Sessão clínica com ativação, proteção gengival e resultado imediato',
        price: '200 €',
      },
      {
        name: 'Branqueamento (Kit para Casa)',
        detail: 'Goteiras termoformadas à medida + estojo + seringas de gel clareador',
        price: '150 €',
      },
      {
        name: 'Seringa Adicional para Kit de Casa',
        detail: 'Recarga individual de gel para manutenção periódica',
        price: '25 €',
      },
    ],
  },

  'Endodontia': {
    id: 'Endodontia',
    title: 'Endodontia (Desvitalização)',
    subtitle: 'Tratamento de canais radiculares e alívio de dor',
    note: 'Tratamento conservador para salvar o dente natural através da desinfeção e selamento de canais.',
    items: [
      {
        name: 'Desvitalização Incisivo / Canino / Pré-Molar',
        detail: 'Tratamento de canal em dentes anteriores e médios',
        price: '180 €',
      },
      {
        name: 'Desvitalização Molar',
        detail: 'Tratamento especializado em molares de anatomia multicanal',
        price: '240 €',
      },
      {
        name: 'Pulpectomia + Restauração',
        detail: 'Remoção completa da polpa infetada e restauração estanque',
        price: '120 €',
      },
      {
        name: 'Pulpotomia + Restauração',
        detail: 'Tratamento pulpar conservador com medicação biológica',
        price: '80 €',
      },
      {
        name: 'Drenagem de Abcesso Dentário',
        detail: 'Alívio imediato da dor e da pressão de infeção aguda',
        price: '25 €',
      },
    ],
  },

  'Próteses': {
    id: 'Próteses',
    title: 'Próteses Dentárias',
    subtitle: 'Coroas de zircónia, próteses flexíveis e acrílicas',
    note: 'Soluções personalizadas para recuperar a mastigação e o conforto no dia a dia.',
    items: [
      {
        name: 'Coroa Cerâmica Pura ou Zircónia sobre Dente',
        detail: 'Estética superior sem metal visível',
        price: '650 €',
      },
      {
        name: 'Coroa Metalo-cerâmica sobre Dente',
        detail: 'Estrutura reforçada de máxima durabilidade',
        price: '550 €',
      },
      {
        name: 'Coroa Provisória',
        detail: 'Proteção temporária do dente durante a confecção da definitiva',
        price: '70 €',
      },
      {
        name: 'Cimentação de Coroa',
        detail: 'Fixação adesiva profissional',
        price: '30 €',
      },
      {
        name: 'Prótese Removível Acrílica',
        detail: 'De 1 dente (180 €) a 14 dentes (330 €)',
        price: '180 € – 330 €',
      },
      {
        name: 'Prótese Esquelética com Armação Metálica',
        detail: 'Estrutura leve em cromo-cobalto (de 1 a 14 dentes)',
        price: '260 € – 400 €',
      },
      {
        name: 'Prótese Flexível (Deflex sem ganchos metálicos)',
        detail: 'Resina translúcida de grande conforto estético (de 1 a 14 dentes)',
        price: '310 € – 440 €',
      },
      {
        name: 'Conserto de Prótese',
        detail: '60 € para prótese acrílica · 100 € para esquelética ou flexível',
        price: '60 € – 100 €',
      },
      {
        name: 'Acrescento de Dente em Prótese',
        detail: 'Valor base de 60 € a 100 € (+10 € por dente adicional)',
        price: 'Desde 60 €',
      },
      {
        name: 'Rembase de Prótese Dentária',
        detail: '60 € para acrílica · 100 € para flexível',
        price: '60 € – 100 €',
      },
      {
        name: 'Ajuste de Prótese',
        detail: 'Alívio de pontos de pressão e polimento',
        price: '5 €',
      },
    ],
  },

  'Cirurgia Oral': {
    id: 'Cirurgia Oral',
    title: 'Cirurgia Oral & Sisos',
    subtitle: 'Extrações cirúrgicas, dentes do siso e enxertos ósseos',
    note: 'Procedimentos realizados pelo Dr. Júlio com técnica cirúrgica atraumática e recuperação rápida.',
    items: [
      {
        name: 'Extração de Dente do Siso Incluso',
        detail: 'Cirurgia de siso sepultado ou retido no osso maxilar',
        price: '100 € – 200 €',
      },
      {
        name: 'Extração de Dente do Siso Erupcionado',
        detail: 'Remoção de siso visível na arcada dentária',
        price: '75 € – 200 €',
      },
      {
        name: 'Extração de Dente Molar',
        detail: 'Remoção de dente molar comprometido',
        price: '50 €',
      },
      {
        name: 'Extração de Dente Canino / Pré-Molar',
        detail: 'Remoção cirúrgica indolor com anestesia local',
        price: '50 €',
      },
      {
        name: 'Extração de Dente Incisivo',
        detail: 'Remoção de dente anterior com preservação alveolar',
        price: '30 €',
      },
      {
        name: 'Enxerto Ósseo',
        detail: 'Biomateriais para regeneração óssea antes ou durante implantes',
        price: '200 € – 500 €',
      },
      {
        name: 'Cirurgia de Remodelação de Rebordo Alveolar',
        detail: 'Regularização do osso alveolar (por quadrante)',
        price: '60 €',
      },
    ],
  },

  'Medicina dentária geral': {
    id: 'Medicina dentária geral',
    title: 'Medicina Dentária Geral & Prevenção',
    subtitle: 'Destartarização, profilaxia, restaurações e bruxismo',
    note: 'Manutenção periódica para garantir a saúde dos dentes e gengivas a longo prazo.',
    items: [
      {
        name: 'Destartarização + Polimento',
        detail: 'Limpeza profunda com ultrassons e pasta profilática',
        price: '40 €',
      },
      {
        name: 'Profilaxia Dentária',
        detail: 'Higiene oral de rotina e remoção de manchas superficiais',
        price: '30 €',
      },
      {
        name: 'Curetagem / Raspagem Periodontal',
        detail: 'Tratamento de gengivite e periodontite (por quadrante)',
        price: '70 €',
      },
      {
        name: 'Placa de Relaxamento / Bruxismo',
        detail: 'Goteira rígida noturna contra o desgaste e dor mandibular (por arcada)',
        price: '180 €',
      },
      {
        name: 'Restauração Simples em Compósito',
        detail: 'Tratamento de cárie em face única com resina de alta estética',
        price: '45 €',
      },
      {
        name: 'Restauração Complexa em Compósito',
        detail: 'Reconstrução de dente com perda de 2 ou mais cúspides',
        price: '65 €',
      },
      {
        name: 'Restauração Provisória',
        detail: 'Curativo protetor temporário',
        price: '25 €',
      },
      {
        name: 'Raio X Periapical Digital',
        detail: 'Diagnóstico radiográfico intraoral imediato de baixa radiação',
        price: '10 €',
      },
      {
        name: 'Consulta Medicada',
        detail: 'Avaliação clínica para prescrição farmacológica',
        price: '20 €',
      },
      {
        name: 'Consulta de Observação Pós-Tratamento',
        detail: 'Revisão clínica de controlo (exceto cirurgia)',
        price: '5 €',
      },
    ],
  },

  'Odontopediatria': {
    id: 'Odontopediatria',
    title: 'Odontopediatria',
    subtitle: 'Consultas lúdicas, selantes e prevenção infantil com a Dra. Ori',
    note: 'Consultas pensadas ao ritmo das crianças, para que cresçam sem receio de ir ao dentista.',
    items: [
      {
        name: 'Consulta de Odontopediatria e Higiene Infantil',
        detail: 'Primeira consulta de aproximação, exame lúdico e educação de escovagem',
        price: 'Atendimento Lúdico',
      },
      {
        name: 'Selante de Fissuras',
        detail: 'Verniz protetor nos molares contra o aparecimento de cáries (por arcada)',
        price: '40 €',
      },
      {
        name: 'Restauração de Dente Decíduo (Dente de leite)',
        detail: 'Tratamento de cárie com resinas seguras e abordagem calma',
        price: '45 €',
      },
      {
        name: 'Extração de Dente Decíduo',
        detail: 'Remoção rápida e sem trauma de dente de leite móvel ou retido',
        price: '35 €',
      },
      {
        name: 'Pulpotomia + Restauração em Dente Decíduo',
        detail: 'Preservação da polpa e da vitalidade da raiz de leite',
        price: '80 €',
      },
      {
        name: 'Pulpectomia + Restauração em Dente Decíduo',
        detail: 'Remoção de infeção interna para proteção do dente definitivo',
        price: '120 €',
      },
      {
        name: 'Mantenedor de Espaço Infantil',
        detail: 'Preservação do espaço ideal para a erupção do dente permanente',
        price: '130 €',
      },
    ],
  },
};
