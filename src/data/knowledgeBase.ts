export interface ChatOption {
  label: string;
  next: string;
  treatment?: string;
}

export interface DecisionNode {
  text: string;
  options: ChatOption[];
}

export const arvoreDecisao: Record<string, DecisionNode> = {
  MENU_PRINCIPAL: {
    text: "Olá! Que bom recebê-lo(a) na Clínica Santa Maria dos Olivais.\n\nSabemos que cuidar do sorriso pede confiança, clareza e tranquilidade. Como podemos ajudar hoje?",
    options: [
      { label: "Conhecer Tratamentos e Valores", next: "TRATAMENTOS" },
      { label: "Reembolso de Seguros e Pagamentos", next: "SEGUROS_PAGAMENTOS" },
      { label: "Marcar Consulta de Avaliação", next: "FINALIZAR_AGENDAMENTO", treatment: "Consulta Geral" },
      { label: "Morada, Horários e Contactos", next: "INFO_CLINICA" }
    ]
  },
  SEGUROS_PAGAMENTOS: {
    text: "Queremos que cuide da sua saúde oral com total transparência e sem surpresas:\n\n• Seguros e Subsistemas (Regime Livre): Trabalhamos em regime privado para dedicar a cada pessoa o tempo clínico e os materiais certificados que merece. Emitimos sempre fatura médica detalhada com todos os códigos da OMD para pedir o reembolso na sua seguradora (ADSE, Médis, Multicare, AdvanceCare, entre outras).\n\n• Pagamento ao seu ritmo: Pode pagar cada tratamento à medida que o realiza. Na Implantologia, facilitamos o pagamento faseado (50% na cirurgia e 50% na colocação da coroa definitiva).",
    options: [
      { label: "Marcar Consulta de Avaliação", next: "FINALIZAR_AGENDAMENTO", treatment: "Consulta Geral" },
      { label: "Voltar ao Início", next: "MENU_PRINCIPAL" }
    ]
  },
  TRATAMENTOS: {
    text: "Cuidamos de todas as etapas da saúde oral com a mesma equipa médica do início ao fim. Que área gostaria de consultar?",
    options: [
      { label: "Implantes Dentários e Dentes Fixos", next: "IMPLANTES_MENU" },
      { label: "Facetas Estéticas e Branqueamento", next: "ESTETICA_MENU" },
      { label: "Ortodontia e Alinhadores Invisíveis", next: "ORTODONTIA_MENU" },
      { label: "Coroas, Próteses e Reparações", next: "PROTESES_MENU" },
      { label: "Higiene, Alívio de Dor e Cirurgia", next: "GERAL_MENU" }
    ]
  },
  IMPLANTES_MENU: {
    text: "A Implantologia 3D liderada pela Dra. Ana Mata devolve-lhe a segurança de mastigar e sorrir sem receios, através de implantes biocompatíveis em titânio.\n\nO que pretende saber?",
    options: [
      { label: "Implantes Unitários ou Parciais", next: "IMPLANTES_UNITARIOS" },
      { label: "Arcada Completa Fixa (All-on-4/6)", next: "IMPLANTES_PROTOCOLOS" },
      { label: "Voltar às Especialidades", next: "TRATAMENTOS" }
    ]
  },
  IMPLANTES_UNITARIOS: {
    text: "Valores transparentes para reabilitação com implantes (cirurgia + coroa incluída no implante unitário):\n• Implante Unitário completo: 745,00 €\n• 2 Implantes Dentários: 1.400,00 €\n• 4 Implantes Dentários: 2.300,00 €\n• Regeneração óssea (se necessária): 200,00 € a 500,00 €\n\nGostaria de agendar uma avaliação tranquila para estudarmos o seu caso em 3D?",
    options: [
      { label: "Sim, quero marcar avaliação", next: "FINALIZAR_AGENDAMENTO", treatment: "Implantologia" },
      { label: "Voltar", next: "IMPLANTES_MENU" }
    ]
  },
  IMPLANTES_PROTOCOLOS: {
    text: "Para quem deseja voltar a ter todos os dentes fixos com estabilidade e naturalidade:\n• Protocolo Fixo de Arcada Completa (4 a 6 implantes + prótese fixa definitiva): 4.800,00 € – 5.000,00 €\n• Prótese Provisória Removível: +350,00 €\n• Prótese Provisória Fixa (Carga Imediata em 24h): +1.200,00 €\n\nVamos conversar numa consulta de diagnóstico sem compromisso?",
    options: [
      { label: "Sim, marcar consulta", next: "FINALIZAR_AGENDAMENTO", treatment: "Implantologia" },
      { label: "Voltar", next: "IMPLANTES_MENU" }
    ]
  },
  ESTETICA_MENU: {
    text: "Acreditamos em sorrisos luminosos que respeitam a sua expressão natural, sem artificialismos. Qual cuidado procura?",
    options: [
      { label: "Facetas Cerâmicas e Harmonização", next: "FACETAS" },
      { label: "Branqueamento Dentário Médico", next: "BRANQUEAMENTO" },
      { label: "Voltar às Especialidades", next: "TRATAMENTOS" }
    ]
  },
  FACETAS: {
    text: "Facetas cerâmicas ultrafinas desenhadas à medida do seu rosto:\n• Zona Estética Anterior (4 dentes): 1.800,00 €\n• 1 Arcada Completa (10 dentes): 4.550,00 €\n• Reabilitação de 2 Arcadas (20 dentes): 6.500,00 €\n\nDeseja marcar uma consulta de estudo estético connosco?",
    options: [
      { label: "Sim, marcar estudo estético", next: "FINALIZAR_AGENDAMENTO", treatment: "Estética dentária" },
      { label: "Voltar", next: "ESTETICA_MENU" }
    ]
  },
  BRANQUEAMENTO: {
    text: "Protocolos clínicos seguros que devolvem brilho natural protegendo o esmalte:\n• Branqueamento em Consultório (1 sessão): 200,00 €\n• Kit Personalizado com Goteiras para Casa: 150,00 €\n• Seringa adicional de manutenção: 25,00 €\n\nQuer agendar a sua avaliação prévia?",
    options: [
      { label: "Sim, marcar agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Branqueamento" },
      { label: "Voltar", next: "ESTETICA_MENU" }
    ]
  },
  ORTODONTIA_MENU: {
    text: "Alinhar o sorriso melhora a autoestima, a higiene e o descanso da articulação:\n• Consulta de Estudo Ortodôntico: 60,00 €\n• Aparelho Fixo de Precisão: 450,00 € / arcada\n• Controlo mensal: 65,00 €\n• Contenção pós-tratamento: desde 150,00 €\n• Invisalign (Alinhadores Transparentes): orçamento personalizado após estudo digital\n\nGostaria de marcar o seu estudo com a Dra. Mariana?",
    options: [
      { label: "Sim, marcar consulta", next: "FINALIZAR_AGENDAMENTO", treatment: "Ortodontia invisível" },
      { label: "Voltar às Especialidades", next: "TRATAMENTOS" }
    ]
  },
  PROTESES_MENU: {
    text: "Trabalhamos em estreita parceria laboratorial para devolver conforto mastigatório, quer precise de uma prótese nova ou de reparar a atual:",
    options: [
      { label: "Coroas e Próteses Novas", next: "PROTESES_NOVAS" },
      { label: "Consertos Rápidos e Ajustes", next: "PROTESES_CONSERTOS" },
      { label: "Voltar às Especialidades", next: "TRATAMENTOS" }
    ]
  },
  PROTESES_NOVAS: {
    text: "Soluções protéticas leves, confortáveis e naturais:\n• Prótese Removível Acrílica: 180,00 € a 330,00 €\n• Prótese Esquelética Cromo-Cobalto: 260,00 € a 400,00 €\n• Prótese Flexível (sem ganchos metálicos visíveis): 310,00 € a 440,00 €\n• Coroa em Zircónia / Cerâmica Pura: 650,00 €\n\nPodemos agendar uma observação tranquila?",
    options: [
      { label: "Sim, marcar avaliação", next: "FINALIZAR_AGENDAMENTO", treatment: "Próteses" },
      { label: "Voltar", next: "PROTESES_MENU" }
    ]
  },
  PROTESES_CONSERTOS: {
    text: "Cuidamos da adaptação e reparação da sua prótese com rapidez:\n• Ajuste de conforto na mucosa: 5,00 €\n• Conserto de prótese acrílica: 60,00 €\n• Conserto de prótese esquelética ou flexível: 100,00 €\n• Rebasamento (readaptação interna): 60,00 € a 100,00 €\n\nDeseja passar pela clínica para avaliarmos?",
    options: [
      { label: "Sim, marcar agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Próteses" },
      { label: "Voltar", next: "PROTESES_MENU" }
    ]
  },
  GERAL_MENU: {
    text: "Da prevenção de rotina ao alívio imediato de uma dor aguda, estamos cá para cuidar de si sem desconforto:",
    options: [
      { label: "Higiene Oral, Cáries e Bruxismo", next: "RESTAURACOES" },
      { label: "Desvitalização, Dor e Dentes do Siso", next: "CIRURGIA" },
      { label: "Voltar às Especialidades", next: "TRATAMENTOS" }
    ]
  },
  RESTAURACOES: {
    text: "Prevenção e medicina dentária conservadora:\n• Destartarização Ultrassónica + Polimento: 40,00 €\n• Restauração Estética Simples: 45,00 €\n• Restauração Complexa: 65,00 €\n• Goteira Miorrelaxante de Bruxismo: 180,00 €\n\nVamos reservar um horário conveniente para si?",
    options: [
      { label: "Sim, marcar consulta", next: "FINALIZAR_AGENDAMENTO", treatment: "Medicina dentária geral" },
      { label: "Voltar", next: "GERAL_MENU" }
    ]
  },
  CIRURGIA: {
    text: "Alívio seguro da dor e cirurgia oral atraumática:\n• Endodontia (Incisivo/Canino/Pré-Molar): 180,00 €\n• Endodontia em Molar: 240,00 €\n• Exodontia Simples: 30,00 € a 50,00 €\n• Extração de Dente do Siso: 75,00 € a 200,00 €\n\nSe sente desconforto, reservamos vagas diárias. Quer agendar?",
    options: [
      { label: "Sim, preciso agendar", next: "FINALIZAR_AGENDAMENTO", treatment: "Cirurgia Oral" },
      { label: "Voltar", next: "GERAL_MENU" }
    ]
  },
  INFO_CLINICA: {
    text: "Estamos de portas abertas para o(a) receber com calma em Lisboa:\n\n• Morada: Estrada de Moscavide N 32C, 1800-279 Lisboa (estacionamento à porta e parque coberto a 2 min a pé).\n• Apoio ao Paciente: 300 601 645 · Receção: 211 350 066\n• WhatsApp Direto: +351 912 907 024\n• Horário: Segunda a Sexta das 10h00 às 19h00 · Sábados das 10h00 às 13h00.",
    options: [
      { label: "Seguros e Facilidades de Pagamento", next: "SEGUROS_PAGAMENTOS" },
      { label: "Marcar Consulta de Avaliação", next: "FINALIZAR_AGENDAMENTO", treatment: "Consulta Geral" },
      { label: "Voltar ao Início", next: "MENU_PRINCIPAL" }
    ]
  }
};
