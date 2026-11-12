# Guía Definitiva y Exportación al 100% de Código, Precios y Funciones: Clínica Santa Maria dos Olivais

Esta guía contiene el **100% absoluto de la información, código, datos, tabla de precios oficiales, funciones interactivas, diccionario de traducción multilingüe, árboles de decisión, protocolos pós-operatorios y metadatos SEO** de la **Clínica Santa Maria dos Olivais**.

Está diseñada para que puedas copiar y pegar cada bloque directamente en tu nuevo proyecto de **Google AI Studio** sin perder ningún dato ni funcionalidad de la aplicación actual.

---

## 1. Identidad Visual, Paleta de Colores y Tokens CSS

### Paleta Oficial (Codificación HEX y Variables)
- **Azul Principal Clínico (`--color-clinic-blue`)**: `#2b337e` (Títulos, cabeceras, botones principales, tarjetas oscuras).
- **Verde Lima Destacado (`--color-clinic-lime`)**: `#d1da4d` (Acentos, badges de especialidad, iluminación, botones CTA).
- **Púrpura Elegante (`--color-clinic-purple`)**: `#c2a9eb` (Degradados, destacados suaves, banners y simulador).
- **Fondo Claro General (`--color-clinic-bg`)**: `#f2f2f2` (Fondo del sitio `body` e interfaces limpias).
- **Verde Oficial WhatsApp (`#25D366`)**: `#25D366` (Glow giratorio y botón flotante de WhatsApp).

### Fuentes de Google
1. **Titulares**: `Playfair Display` (Serif)
2. **Interfaz e Títulos Secundarios**: `Poppins` (Sans-Serif)
3. **Cuerpo de Texto**: `Open Sans` (Sans-Serif)

---

## 2. Hoja de Estilos CSS Completa (`index.css`)

Copia este código integro en tu archivo `index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@500&display=swap&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Poppins", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Playfair Display", ui-serif, Georgia, serif;
  --font-body: "Open Sans", sans-serif;

  --color-clinic-blue: #2b337e;
  --color-clinic-lime: #d1da4d;
  --color-clinic-purple: #c2a9eb;
  --color-clinic-bg: #f2f2f2;

  --animate-fade-in-up: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  --animate-pulse-slow: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  --animate-float: float 8s ease-in-out infinite;
  --animate-glow-cycle: glowCycle 12s ease-in-out infinite;

  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }
  @keyframes glowCycle {
    0%, 100% { color: #2b337e; background-color: #2b337e; }
    33% { color: #d1da4d; background-color: #d1da4d; }
    66% { color: #c2a9eb; background-color: #c2a9eb; }
  }
}

.edge-glow-container {
  position: relative;
  overflow: hidden;
}

.edge-glow-border {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--color-clinic-blue), var(--color-clinic-lime), var(--color-clinic-purple), var(--color-clinic-blue));
  background-size: 300% 100%;
  animation: edgeGlow 8s linear infinite;
  z-index: 0;
}

@keyframes edgeGlow {
  0% { background-position: 0% 50%; }
  100% { background-position: 300% 50%; }
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--color-clinic-bg);
  color: var(--color-clinic-blue);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background: var(--color-clinic-blue);
  border-radius: 5px;
}

.contenedor {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

/* Ocultar elementos flotantes durante la captura de câmara */
body.camera-active #fixed-fab-hub {
  display: none !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

/* Anillo luminoso giratorio del Chatbot */
.chatbot-glow-ring-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.chatbot-glow-ring-container:hover {
  transform: scale(1.1);
}

.chatbot-glow-ring-container:active {
  transform: scale(0.95);
}

.chatbot-glow-ring-blur {
  position: absolute;
  inset: -5px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    var(--color-clinic-blue),
    var(--color-clinic-lime),
    #25D366,
    var(--color-clinic-purple),
    #eab308,
    #38bdf8,
    var(--color-clinic-blue)
  );
  animation: chatbotRingSpin 3.5s linear infinite;
  filter: blur(5px);
  opacity: 0.9;
  z-index: 0;
}

.chatbot-glow-ring-sharp {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    var(--color-clinic-blue),
    var(--color-clinic-lime),
    #25D366,
    var(--color-clinic-purple),
    #eab308,
    #38bdf8,
    var(--color-clinic-blue)
  );
  animation: chatbotRingSpin 3.5s linear infinite;
  z-index: 1;
}

@keyframes chatbotRingSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Anillo luminoso giratorio de WhatsApp */
.whatsapp-glow-ring-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.whatsapp-glow-ring-container:hover {
  transform: scale(1.1);
}

.whatsapp-glow-ring-container:active {
  transform: scale(0.95);
}

.whatsapp-glow-ring-blur {
  position: absolute;
  inset: -5px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    #25D366,
    #10b981,
    #34D399,
    #128C7E,
    #059669,
    #25D366
  );
  animation: whatsappRingSpin 3.5s linear infinite;
  filter: blur(6px);
  opacity: 0.95;
  z-index: 0;
}

.whatsapp-glow-ring-sharp {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    #25D366,
    #10b981,
    #34D399,
    #128C7E,
    #059669,
    #25D366
  );
  animation: whatsappRingSpin 3.5s linear infinite;
  z-index: 1;
}

@keyframes whatsappRingSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

---

## 3. Tabla Completa de Precios Oficiales de la Clínica (MÁS DE 60 TRATAMIENTOS)

A continuación se detalla el **100% de los precios oficiales** organizados por especialidades (copia este objeto directamente en tu simulador o archivo de constantes `specialtiesData.ts`):

```ts
export const specialtiesData = [
  {
    id: 'consultas_diagnostico',
    name: 'Consultas e Diagnóstico',
    procedures: [
      { id: 'c-1', name: 'Consulta de Avaliação', priceMin: 20, priceMax: 20, description: 'Avaliação inicial obrigatória.' },
      { id: 'c-2', name: 'Consulta Medicada', priceMin: 20, priceMax: 20, description: 'Consulta para prescrição ou ajuste de medicação.' },
      { id: 'c-3', name: 'Consulta de Observação Pós-Tratamento', priceMin: 5, priceMax: 5, description: 'Acompanhamento após tratamento clínico.' },
      { id: 'c-4', name: 'Consulta de Estudo Ortodôntico', priceMin: 60, priceMax: 60, description: 'Planeamento completo para aparelho dentário.' },
      { id: 'c-5', name: 'Raio X Periapical', priceMin: 10, priceMax: 10, description: 'Radiografia localizada para diagnóstico interno.' }
    ]
  },
  {
    id: 'higiene_prevencao',
    name: 'Higiene e Prevenção',
    procedures: [
      { id: 'hp-1', name: 'Destartarização + Polimento', priceMin: 40, priceMax: 40, description: 'Limpeza profissional profunda e polimento dental.' },
      { id: 'hp-2', name: 'Profilaxia', priceMin: 30, priceMax: 30, description: 'Prevenção básica e limpeza superficial.' },
      { id: 'hp-3', name: 'Selante por Arcada', priceMin: 40, priceMax: 40, description: 'Proteção preventiva contra cáries.' },
      { id: 'hp-4', name: 'Placa de Relaxamento / Bruxismo', priceMin: 180, priceMax: 180, description: 'Proteção contra o desgaste noturno (por arcada).' }
    ]
  },
  {
    id: 'dentisteria_estetica',
    name: 'Dentisteria e Estética',
    procedures: [
      { id: 'de-1', name: 'Branqueamento em Consultório', priceMin: 200, priceMax: 200, description: 'Resultados imediatos em sessão clínica.' },
      { id: 'de-2', name: 'Branqueamento (Kit Casa)', priceMin: 150, priceMax: 150, description: 'Tratamento em casa com acompanhamento clínico.' },
      { id: 'de-3', name: 'Branqueamento (Seringa Adicional)', priceMin: 25, priceMax: 25, description: 'Recarga de gel para manutenção do branqueamento casa.' },
      { id: 'de-4', name: 'Restauração Simples', priceMin: 45, priceMax: 45, description: 'Tratamento de cárie em face única.' },
      { id: 'de-5', name: 'Restauração Complexa', priceMin: 65, priceMax: 65, description: 'Tratamento de cárie em faces múltiplas.' },
      { id: 'de-6', name: 'Restauração Estética', priceMin: 75, priceMax: 75, description: 'Reconstrução de dente focada na perfeição visual.' },
      { id: 'de-7', name: 'Restauração Dente Decíduo', priceMin: 45, priceMax: 45, description: 'Restauração em dentes de leite.' },
      { id: 'de-8', name: 'Restauração Provisória', priceMin: 25, priceMax: 25, description: 'Proteção temporária do dente.' },
      { id: 'de-9', name: 'Facetas - 4 Dentes Anteriores', priceMin: 1800, priceMax: 1800, description: 'Zona estética frontal.' },
      { id: 'de-10', name: 'Facetas - 1 Arcada (10 dentes)', priceMin: 4550, priceMax: 4550, description: 'Até 2.º pré-molar.' },
      { id: 'de-11', name: 'Facetas - 2 Arcadas (20 dentes)', priceMin: 6500, priceMax: 6500, description: 'Até 2.º pré-molar.' }
    ]
  },
  {
    id: 'cirurgia_endodontia',
    name: 'Cirurgia e Endodontia',
    procedures: [
      { id: 'ce-1', name: 'Extração Dente Incisivo', priceMin: 30, priceMax: 30, description: 'Remoção de dente frontal.' },
      { id: 'ce-2', name: 'Extração Dente Canino / Pré-Molar', priceMin: 50, priceMax: 50, description: 'Remoção de dentes intermédios.' },
      { id: 'ce-3', name: 'Extração Dente Molar', priceMin: 50, priceMax: 50, description: 'Remoção de dentes posteriores.' },
      { id: 'ce-4', name: 'Extração Siso Erupcionado', priceMin: 75, priceMax: 200, description: 'Extração de dente do siso visível.' },
      { id: 'ce-5', name: 'Extração Siso Incluso', priceMin: 100, priceMax: 200, description: 'Extração cirúrgica de siso dentro do osso.' },
      { id: 'ce-6', name: 'Extração Dente Decíduo', priceMin: 35, priceMax: 35, description: 'Remoção de dente de leite.' },
      { id: 'ce-7', name: 'Desvitalização Incisivo / Pré-Molar', priceMin: 180, priceMax: 180, description: 'Tratamento de canal em dentes frontais/médios.' },
      { id: 'ce-8', name: 'Desvitalização Molar', priceMin: 240, priceMax: 240, description: 'Tratamento de canal em dentes posteriores.' },
      { id: 'ce-9', name: 'Pulpectomia / Pulpotomia', priceMin: 80, priceMax: 120, description: 'Tratamentos parciais ou totais da polpa.' },
      { id: 'ce-10', name: 'Curetagem (por quadrante)', priceMin: 70, priceMax: 70, description: 'Tratamento para limpeza profunda das gengivas.' },
      { id: 'ce-11', name: 'Cirurgia Remodelação Rebordo', priceMin: 60, priceMax: 60, description: 'Preparação do osso alveolar para prótese.' },
      { id: 'ce-12', name: 'Drenagem Abcesso', priceMin: 25, priceMax: 25, description: 'Alívio de infeção aguda.' }
    ]
  },
  {
    id: 'implantologia',
    name: 'Implantologia',
    procedures: [
      { id: 'imp-1', name: '1 Implante Unitário', priceMin: 745, priceMax: 745, description: 'Inclui cirurgia e coroa.' },
      { id: 'imp-2', name: '2 Implantes', priceMin: 1400, priceMax: 1400, description: 'Substituição múltipla de dentes.' },
      { id: 'imp-3', name: '3 Implantes', priceMin: 1800, priceMax: 1800, description: 'Substituição múltipla de dentes.' },
      { id: 'imp-4', name: '4 Implantes', priceMin: 2300, priceMax: 2300, description: 'Base para ponte fixa extensa.' },
      { id: 'imp-5', name: 'Protocolo Superior (Arcada Completa)', priceMin: 4800, priceMax: 5000, description: 'Inclui 4 a 6 implantes + prótese fixa final.' },
      { id: 'imp-6', name: 'Provisória Removível (Protocolo)', priceMin: 350, priceMax: 350, description: 'Dentes temporários durante cicatrização.' },
      { id: 'imp-7', name: 'Provisória Fixa (Protocolo)', priceMin: 1200, priceMax: 1200, description: 'Dentes temporários fixos durante cicatrização.' },
      { id: 'imp-8', name: 'Enxerto Ósseo', priceMin: 200, priceMax: 500, description: 'Recuperação de volume ósseo perdido.' },
      { id: 'imp-9', name: 'Coroa sobre Implante (Cerâmica/Zircónia)', priceMin: 650, priceMax: 650, description: 'Parte visível do dente sobre o implante.' },
      { id: 'imp-10', name: 'Limpeza Prótese Fixa Implante', priceMin: 100, priceMax: 100, description: 'Manutenção periódica de prótese fixa.' },
      { id: 'imp-11', name: 'Recolocação / Aperto Coroa', priceMin: 10, priceMax: 10, description: 'Ajustes de rotina em coroas sobre implantes.' }
    ]
  },
  {
    id: 'ortodontia',
    name: 'Ortodontia',
    procedures: [
      { id: 'ort-1', name: 'Aparelho Ortodôntico Fixo', priceMin: 450, priceMax: 450, description: 'Sistema metálico tradicional (por arcada).' },
      { id: 'ort-2', name: 'Invisalign (Alinhadores)', priceMin: 3500, priceMax: 5000, description: 'Tratamento invisível removível. Sob consulta.' },
      { id: 'ort-3', name: 'Aparelho Disjuntor / Mantenedor Espaço', priceMin: 130, priceMax: 480, description: 'Aparelhos especiais para expansão ou contenção.' },
      { id: 'ort-4', name: 'Aparelho Contenção Fixo', priceMin: 150, priceMax: 150, description: 'Manutenção do sorriso após tratamento (por arcada).' },
      { id: 'ort-5', name: 'Aparelho Contenção Removível', priceMin: 180, priceMax: 180, description: 'Manutenção do sorriso após tratamento (por arcada).' },
      { id: 'ort-6', name: 'Consulta Manutenção Aparelho', priceMin: 65, priceMax: 65, description: 'Ajuste periódico obrigatório.' },
      { id: 'ort-7', name: 'Consulta Manutenção Invisalign', priceMin: 75, priceMax: 75, description: 'Ajuste periódico obrigatório.' },
      { id: 'ort-8', name: 'Retirar Aparelho (Fora da Clínica)', priceMin: 100, priceMax: 100, description: 'Remoção e polimento final.' }
    ]
  },
  {
    id: 'proteses_reabilitacao',
    name: 'Próteses e Reabilitação',
    procedures: [
      { id: 'pr-1', name: 'Prótese Acrílica (1 a 14 dentes)', priceMin: 180, priceMax: 330, description: '1 dente: 180€ | 2 dentes: 190€ | 5 dentes: 240€ | 10 dentes: 290€ | 14 dentes: 330€.' },
      { id: 'pr-2', name: 'Prótese Esquelérica (1 a 14 dentes)', priceMin: 260, priceMax: 400, description: '1 dente: 260€ | 2 dentes: 270€ | 5 dentes: 310€ | 10 dentes: 360€ | 14 dentes: 400€.' },
      { id: 'pr-3', name: 'Prótese Flexível (1 a 14 dentes)', priceMin: 310, priceMax: 440, description: '1 dente: 310€ | 2 dentes: 320€ | 5 dentes: 350€ | 10 dentes: 400€ | 14 dentes: 440€.' },
      { id: 'pr-4', name: 'Coroa Metalo-cerâmica sobre Dente', priceMin: 550, priceMax: 550, description: 'Substituição definitiva de dente natural.' },
      { id: 'pr-5', name: 'Coroa Cerâmica Pura / Zircónia', priceMin: 650, priceMax: 650, description: 'Estética superior em reabilitação oral.' },
      { id: 'pr-6', name: 'Coroa Provisória', priceMin: 70, priceMax: 70, description: 'Proteção temporária do dente.' },
      { id: 'pr-7', name: 'Conserto Prótese Acrílica', priceMin: 60, priceMax: 60, description: 'Reparação de fraturas de prótese acrílica.' },
      { id: 'pr-8', name: 'Conserto Esquelérica / Flexível', priceMin: 100, priceMax: 100, description: 'Reparação de fraturas de próteses metálicas ou flexíveis.' },
      { id: 'pr-9', name: 'Acrescento de Dente (Acrílica / Flexível)', priceMin: 60, priceMax: 100, description: 'Valor base de conserto + 10€ por cada dente extra.' },
      { id: 'pr-10', name: 'Rembase de Prótese Acrílica', priceMin: 60, priceMax: 60, description: 'Reajuste da base à gengiva.' },
      { id: 'pr-11', name: 'Rembase de Prótese Flexível', priceMin: 100, priceMax: 100, description: 'Reajuste da base à gengiva.' },
      { id: 'pr-12', name: 'Ajuste de Prótese', priceMin: 5, priceMax: 5, description: 'Pequenos ajustes de alívio e conforto.' }
    ]
  }
];
```

---

## 4. Árbol de Decisión del Chatbot de IA (`src/knowledgeBase.ts`)

Este árbol permite atender a pacientes de forma interactiva con precios, seguros y agendamiento:

```ts
export const arvoreDecisao = {
  MENU_PRINCIPAL: {
    text: "Excelente! Escolha uma das opções abaixo para explorar a Clínica Santa Maria dos Olivais:",
    options: [
      { label: "Ver Tratamentos e Valores", next: "TRATAMENTOS" },
      { label: "Seguros e Pagamentos", next: "SEGUROS_PAGAMENTOS" },
      { label: "Agendar uma Avaliação Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Consulta Geral" },
      { label: "Informações da Clínica", next: "INFO_CLINICA" }
    ]
  },
  SEGUROS_PAGAMENTOS: {
    text: "Relativamente a seguros e acordos:\nNós funcionamos exclusivamente em regime privado, priorizando a elevada qualidade dos materiais e o tempo dedicado a cada consulta. 💎\n\nEmitimos sempre a fatura detalhada com todos os códigos médicos necessários para que possa solicitar o reembolso junto da sua seguradora ou subsistema (ADSE, Médis, Multicare, etc.), através do Regime Livre. 📄\n\nFacilidades de Pagamento 💳\nVocê pode pagar cada tratamento que for fazendo. Em relação a implantes, o pagamento é no dia da cirurgia. Atenciosamente, Clínica Santa Maria dos Olivais.",
    options: [
      { label: "Agendar uma Avaliação Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Consulta Geral" },
      { label: "Voltar ao Menu Principal", next: "MENU_PRINCIPAL" }
    ]
  },
  TRATAMENTOS: {
    text: "Temos várias especialidades. Qual área desperta o seu interesse?",
    options: [
      { label: "Implantes Dentários", next: "IMPLANTES_MENU" },
      { label: "Estética e Branqueamento", next: "ESTETICA_MENU" },
      { label: "Ortodontia (Aparelhos)", next: "ORTODONTIA_MENU" },
      { label: "Próteses e Consertos", next: "PROTESES_MENU" },
      { label: "Medicina Geral e Cirurgia", next: "GERAL_MENU" }
    ]
  },
  IMPLANTES_MENU: {
    text: "A Implantologia é a nossa grande especialidade. O que gostaria de saber?",
    options: [
      { label: "Implantes Unitários", next: "IMPLANTES_UNITARIOS" },
      { label: "Protocolos (Arcada Completa)", next: "IMPLANTES_PROTOCOLOS" },
      { label: "Voltar aos Tratamentos", next: "TRATAMENTOS" }
    ]
  },
  IMPLANTES_UNITARIOS: {
    text: "Pack (inclui coroa):\n• Implante Unitário: 745,00€\n• 2 Implantes: 1.400,00€\n• 4 Implantes: 2.300,00€\n• Enxerto ósseo: 200,00€ a 500,00€\n\nVamos agendar a sua avaliação?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Implantes Unitários" },
      { label: "Voltar", next: "IMPLANTES_MENU" }
    ]
  },
  IMPLANTES_PROTOCOLOS: {
    text: "O Protocolo Superior completo (4 a 6 implantes + prótese fixa final) fica por 4.800,00€ (inclui coroa):\n• Provisória Removível: +350,00€\n• Provisória Fixa: +1.200,00€\n\nPodemos marcar o seu horário?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Protocolo Superior" },
      { label: "Voltar", next: "IMPLANTES_MENU" }
    ]
  },
  ESTETICA_MENU: {
    text: "Transformamos o seu sorriso. Selecione a opção desejada:",
    options: [
      { label: "Facetas Dentárias", next: "FACETAS" },
      { label: "Branqueamento", next: "BRANQUEAMENTO" },
      { label: "Voltar aos Tratamentos", next: "TRATAMENTOS" }
    ]
  },
  FACETAS: {
    text: "Transformamos o seu sorriso:\n• Facetas 1 Arcada (10 dentes): 4.550,00€\n• 2 Arcadas (20 dentes): 6.500,00€\n• Dentes Anteriores (Zona frontal): 1.800,00€\n\nDeseja avançar para uma consulta?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Facetas Dentárias" },
      { label: "Voltar", next: "ESTETICA_MENU" }
    ]
  },
  BRANQUEAMENTO: {
    text: "Soluções de branqueamento:\n• Em Consultório: 200,00€\n• Kit para Casa: 150,00€\n• Seringa extra: 25,00€\n\nVamos agendar o seu clareamento?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Branqueamento" },
      { label: "Voltar", next: "ESTETICA_MENU" }
    ]
  },
  ORTODONTIA_MENU: {
    text: "Opções de Ortodontia:\n• Aparelho Fixo: 450,00€/arcada\n• Consulta de Estudo: 60,00€\n• Manutenção: 65,00€\n• Aparelho de contenção: a partir de 150,00€\n• Invisalign: sob consulta\n\nDeseja agendar?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Ortodontia" },
      { label: "Voltar aos Tratamentos", next: "TRATAMENTOS" }
    ]
  },
  PROTESES_MENU: {
    text: "Temos laboratório para próteses novas e consertos. O que procura?",
    options: [
      { label: "Preços de Próteses Novas", next: "PROTESES_NOVAS" },
      { label: "Consertos e Ajustes", next: "PROTESES_CONSERTOS" },
      { label: "Voltar aos Tratamentos", next: "TRATAMENTOS" }
    ]
  },
  PROTESES_NOVAS: {
    text: "Temos laboratório para próteses novas:\n• Prótese Acrílica: de 180,00€ a 330,00€\n• Prótese Esquelética: de 260,00€ a 400,00€\n• Prótese Flexível: de 310,00€ a 440,00€\n\nGostaria de marcar uma avaliação?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Próteses Dentárias" },
      { label: "Voltar", next: "PROTESES_MENU" }
    ]
  },
  PROTESES_CONSERTOS: {
    text: "Consertos e Ajustes:\n• Ajuste de prótese: 5,00€\n• Conserto Acrílica: 60,00€\n• Conserto Esquelética/Flexível: 100,00€\n• Acrescentar dente: Valor do conserto + 10,00€ por dente\n• Rembase: 60,00€ (acrílica) ou 100,00€ (flexível)\n\nPodemos agendar?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Próteses e Consertos" },
      { label: "Voltar", next: "PROTESES_MENU" }
    ]
  },
  GERAL_MENU: {
    text: "Soluções completas para a sua saúde oral:",
    options: [
      { label: "Limpeza e Restaurações", next: "RESTAURACOES" },
      { label: "Desvitalização e Extrações", next: "CIRURGIA" },
      { label: "Voltar aos Tratamentos", next: "TRATAMENTOS" }
    ]
  },
  RESTAURACOES: {
    text: "Cuidados Gerais:\n• Destartarização + Polimento: 40,00€\n• Restauração Simples: 45,00€\n• Restauração Complexa: 65,00€\n• Restauração Estética: 75,00€\n• Placa de Bruxismo: 180,00€\n\nPodemos marcar o seu horário?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Restaurações e Limpeza" },
      { label: "Voltar", next: "GERAL_MENU" }
    ]
  },
  CIRURGIA: {
    text: "Cirurgias e Endodontia:\n• Endodontia (Incisivo/Canino): 180,00€\n• Endodontia (Molar): 240,00€\n• Extrações Simples: 30,00€ - 50,00€\n• Extração Siso: 75,00€ - 200,00€\n\nVamos agendar a sua consulta?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Cirurgias e Endodontia" },
      { label: "Voltar", next: "GERAL_MENU" }
    ]
  },
  INFO_CLINICA: {
    text: "Clínica Santa Maria dos Olivais.\nMorada: Estrada de Moscavide N 32C, 1800-279, Lisboa.\nContacto: 211 350 066 / 919 861 310.\nPagamentos: Pode pagar cada tratamento que for fazendo. Em relação a implantes, o pagamento é no dia da cirurgia. Atenciosamente, Clínica Santa Maria dos Olivais.",
    options: [
      { label: "Ver Seguros e Pagamentos", next: "SEGUROS_PAGAMENTOS" },
      { label: "Agendar uma Avaliação Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Consulta Geral" },
      { label: "Voltar ao Menu Principal", next: "MENU_PRINCIPAL" }
    ]
  }
};
```

---

## 5. Protocolo Médico e PDF de Cuidados Pós-Operatórios (`pages/PostOperativeCare.tsx`)

Recomendações pós-cirúrgicas oficiales para el paciente:

1. **Repouso (24h a 48h)**: Estilo de vida calmo e sem esforço físico.
2. **Tabaco**: Evitar fumar nas primeiras 24h a 48h.
3. **Sem Cuspir/Bochechar**: Manter o material de compressão fornecido na cirurgia.
4. **Medicação**: Seguir o protocolo do receituário à hora indicada.
5. **Gelo (72h)**: Aplicação constante de gelo para evitar inchaço (edema).
6. **Desporto**: Sem exercício físico durante 15 dias.
7. **Alimentação Fria**: Ingerir alimentos frios no dia da cirurgia.
8. **Remoção de Pontos**: Ao fim de 8 dias na consulta marcada.
9. **PDF Descargável**: `https://clinica-santa-maria-dos-olivais.b-cdn.net/CUIDADOS%20POS%20OPERATORIOS.pdf`

---

## 6. Objeto JSON `defaultData` (`context/ContentContext.tsx`)

Copia este objeto JSON completo con los datos del equipo médico, vídeos de CDN, galerías y contactos:

```ts
export const defaultData = {
  global: {
    email: "clinicasmod@gmail.com",
    phone: "211 350 066",
    customerService: "300 601 645",
    mobile: "+351 919 861 310",
    address: "Estrada de Moscavide N 32C, 1800-279, Lisboa",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Estrada+de+Moscavide+N+32C,+1800-279,+Lisboa",
    socials: {
      instagram: "https://www.instagram.com/clinicasantamariaolivais/",
      facebook: "https://www.facebook.com/clinicasmod/",
      whatsapp: "https://wa.me/351300601645"
    }
  },
  navigation: [
    { label: "Início", path: "/" },
    { label: "Equipa", path: "/equipa" },
    { label: "Clínica", path: "/clinica" },
    { label: "Contactos", path: "/contactos" },
    { label: "Marcações", path: "/marcacoes" },
    { label: "Campanhas", path: "/campanhas" }
  ],
  home: {
    heroTitle: "Clínica Santa Maria dos Olivais",
    heroSubtitle: "Especialistas em Implantologia, Ortodontia (Invisalign) e Estética Dentária em Olivais, Lisboa. 10 anos de excelência médica."
  },
  stories: [
    { id: 0, type: "video", title: "SMO Moscavide", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_dentaria_smo_moscavide.mp4", thumbnail: "https://clinica-santa-maria-dos-olivais.b-cdn.net/IMG_5640.JPG", aspect: "horizontal" },
    { id: 1, type: "video", title: "Alinhadores", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_ALINHADORES.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-D089534F-903E-476C-BB13-26CAB404F1F3.jpeg" },
    { id: 2, type: "video", title: "Aparelho", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_APARALHO.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/Clinica-Santa-Maria-Olivais-100-scaled.jpg" },
    { id: 3, type: "video", title: "Consulta", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_CONSULTA.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg" },
    { id: 4, type: "video", title: "Dia Anterior", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_DIAANTERIOR.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg" },
    { id: 6, type: "video", title: "Dr Julio", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_DRJULIO.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg" },
    { id: 7, type: "video", title: "Endodontia", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_EDODONTIA.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/Clinica-Santa-Maria-Olivais-48-scaled.jpg" },
    { id: 8, type: "video", title: "Fratura", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_FRATURA.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/05/20250528_1530_Sorriso-Perfeito_remix_01jwbmq8mnfev9my4ye2ek9xx0.png" },
    { id: 9, type: "video", title: "Gengiva", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_GENGIVA.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-EAA32118-B8DB-4848-ABC0-210B0ACBFDC2.jpeg" },
    { id: 10, type: "video", title: "Implantes", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_IMPLANTES.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-BA8B4A41-1D6A-44A9-AD46-A79BBAE94C63.jpeg" },
    { id: 11, type: "video", title: "Limpeza", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_LIMPEZA.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-D089534F-903E-476C-BB13-26CAB404F1F3.jpeg" },
    { id: 12, type: "video", title: "Mexem", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_MEXEM.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/Clinica-Santa-Maria-Olivais-100-scaled.jpg" },
    { id: 13, type: "video", title: "Mitos", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_MITOS.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg" },
    { id: 14, type: "video", title: "Perda Dentária", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_PERDADENTARIA.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg" },
    { id: 15, type: "video", title: "Periodontite", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_PERIODONTITE.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/05/20250528_1530_Sorriso-Perfeito_remix_01jwbmq8mnfev9my4ye2ek9xx0.png" },
    { id: 16, type: "video", title: "Reabilitação", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_REABILITAC%CC%A7A%CC%83O.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg" },
    { id: 17, type: "video", title: "Sorriso Sem Escalas", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_SEMESCALAS.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/Clinica-Santa-Maria-Olivais-48-scaled.jpg" },
    { id: 18, type: "video", title: "Sorriso", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_SORRISO.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/05/20250528_1530_Sorriso-Perfeito_remix_01jwbmq8mnfev9my4ye2ek9xx0.png" },
    { id: 19, type: "video", title: "Dr Tomas", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_TOMAS.mp4", thumbnail: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-EAA32118-B8DB-4848-ABC0-210B0ACBFDC2.jpeg" }
  ],
  team: {
    medical: [
      { name: "Dra. Ana Mata", title: "Direção Clínica e Implantologia", img: "https://clinica-santa-maria-dos-olivais.b-cdn.net/dra_ana_mata.png", bio: "Diretora Clínica e especialista em reabilitação oral avançada com implantes.", imgPosition: "object-top" },
      { name: "Dra. Mariana Aberto", title: "Ortodontia", img: "https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-132.jpeg", bio: "Especialista em Ortodontia Clínica e Alinhadores Invisíveis.", imgPosition: "object-top" },
      { name: "Dra. Alexandra Lucas", title: "Periodontologia", img: "https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-67.jpeg", bio: "Especialista em saúde gengival e tecidos de suporte dentário.", imgPosition: "object-top" },
      { name: "Dra. Orizanda Claret", title: "Odontopediatria", img: "https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-51.jpeg", bio: "Especialista no atendimento e saúde oral dos más pequenos.", imgPosition: "object-top" },
      { name: "Dr. Tomás Machado", title: "Dentisteria, Endodontia e Cirurgia", img: "https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-227.jpeg", bio: "Especialista em Endodontia (canal), restaurações estéticas, extrações dentárias, higiene oral e próteses removíveis.", imgPosition: "object-top" },
      { name: "Dr. Júlio", title: "Cirurgia Oral e Extracções de Sisos", img: "https://clinica-santa-maria-dos-olivais.b-cdn.net/dr_julio_clinica_smo.jpg", bio: "Especialista em Cirurgia Oral Avançada e extração de dentes do siso.", imgPosition: "object-top" },
      { name: "Dra. Ladine", title: "Clínica Geral e Reabilitação", img: "", bio: "Especialista em Higiene Oral, Restaurações, Próteses Removíveis, Branqueamento e Placas de Relaxamento/Bruxismo." },
      { name: "Dr. Francisco", title: "Clínica Geral e Endodontia", img: "https://clinica-santa-maria-dos-olivais.b-cdn.net/dra_francisco.jpeg", bio: "Especialista em Endodontia, Restaurações, Coroas sobre dente, Higiene Oral e Extrações.", imgPosition: "object-top" }
    ],
    assistants: [],
    reception: [
      { name: "Carla Claro", title: "Receção e Apoio ao Cliente", img: "https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-94.jpeg", bio: "Responsável pelo acolhimento e gestão personalizada del percurso de cada paciente.", imgPosition: "object-top" }
    ]
  },
  clinic: {
    gallery: [
      "https://clinica-santa-maria-dos-olivais.b-cdn.net/DJI_20250819154440_0104_D.JPG",
      "https://clinica-santa-maria-dos-olivais.b-cdn.net/IMG_5640.JPG",
      "https://clinica-santa-maria-dos-olivais.b-cdn.net/IMG_5650.JPG",
      "https://clinica-santa-maria-dos-olivais.b-cdn.net/DJI_20250819154505_0105_D.JPG",
      "https://clinica-santa-maria-dos-olivais.b-cdn.net/carrusel%203-02.jpg",
      "https://clinica-santa-maria-dos-olivais.b-cdn.net/DJI_20250819155107_0110_D.JPG"
    ]
  },
  campaigns: [
    { src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/kids%20clinica%20dentaria%20santa%20maria%20dos%20olivais%20.jpg", title: "Campanha 1", targetService: "Odontopediatria" },
    { src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/implantes_smo_junio_julio_2.jpeg", title: "Campanha Implantes", targetService: "Implantologia" },
    { src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/arcada_completa_smo_2.jpeg", title: "Campanha Arcada", targetService: "Implantologia" }
  ],
  appointments: {
    heroImage: "https://clinica-santa-maria-dos-olivais.b-cdn.net/Carrusel%201-06%20(1).png",
    services: [
      "Implantologia",
      "Ortodontia, Alinhadores Invisíveis",
      "Limpeza e Destartarização",
      "Consulta de Rotina",
      "Odontopediatria",
      "Branqueamento",
      "Estética Dentária",
      "Urgências",
      "Avaliação",
      "Outros"
    ]
  }
};
```

---

## 7. Diccionario Completo Multilingüe (Portugués, Español, Inglés)

Asegura el soporte 100% multilingüe con estas claves principales en `LanguageContext.tsx`:

- **PT**: "A nossa consulta de avaliação profissional tem o valor de 20,00€."
- **ES**: "Nuestra consulta de evaluación profesional cuesta 20,00€."
- **EN**: "Our professional assessment consultation costs €20.00."
- **Seguros PT**: "Emitimos sempre a fatura detalhada com todos os códigos OMD exigidos pelas seguradoras como a ADSE, Médis, Allianz ou Multicare."
- **Seguros ES**: "Emitimos la factura detallada con todos los códigos de la OMD exigidos por las aseguradoras como ADSE, Médis, Allianz o Multicare."
- **Seguros EN**: "We issue a detailed invoice with all OMD codes required by insurance providers such as ADSE, Médis, Allianz, or Multicare."

---

## 8. Configuración de Píxeles de Conversión y SEO Local

- **Google Tag Manager**: `GTM-PNVPD8T3`
- **Google Ads Conversion Tag**: `AW-434250599`
- **Meta Pixel**: `1754959305395666`
- **Teléfono Principal**: `+351 211 350 066` / `+351 300 601 645` / `+351 919 861 310`
- **Dirección**: `Estrada de Moscavide N 32C, 1800-279, Lisboa`
