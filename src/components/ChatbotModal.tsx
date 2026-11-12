import React, { useState, useEffect } from 'react';
import { arvoreDecisao, DecisionNode } from '../data/knowledgeBase';
import { defaultContentData } from '../data/contentData';
import { MessageCircle, ArrowRight, RotateCcw, X, Check } from 'lucide-react';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTreatmentToBook: (treatment: string) => void;
  initialTreatment?: string;
  initialMessage?: string;
}

export default function ChatbotModal({
  isOpen,
  onClose,
  onSelectTreatmentToBook,
  initialTreatment,
  initialMessage,
}: ChatbotModalProps) {
  const [currentNodeKey, setCurrentNodeKey] = useState<string>('MENU_PRINCIPAL');
  const [history, setHistory] = useState<{ nodeKey: string; selectedLabel: string }[]>([]);
  const [customUserMessage, setCustomUserMessage] = useState<string | null>(null);

  // Synchronize when opened with an initial treatment / booking intent
  useEffect(() => {
    if (isOpen) {
      if (initialTreatment) {
        const msg = initialMessage || `Quero marcar consulta para ${initialTreatment}`;
        setCustomUserMessage(msg);
        setCurrentNodeKey('BOOKING_DIRECT');
        setHistory([]);
      } else {
        setCustomUserMessage(null);
        setCurrentNodeKey('MENU_PRINCIPAL');
        setHistory([]);
      }
    }
  }, [isOpen, initialTreatment, initialMessage]);

  // Handle ESC key and scroll lock
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

  // Active node logic
  let currentNode: DecisionNode;

  if (currentNodeKey === 'BOOKING_DIRECT' && initialTreatment) {
    currentNode = {
      text: `Olá! Recebemos o seu pedido para marcação de consulta de ${initialTreatment} na Clínica Santa Maria dos Olivais.\n\nPara quando prefere o seu atendimento com a equipa médica?`,
      options: [
        {
          label: 'Segunda a Sexta (10h00 às 19h00)',
          next: 'FINALIZAR_AGENDAMENTO',
          treatment: initialTreatment,
        },
        {
          label: 'Sábado de manhã (10h00 às 13h00)',
          next: 'FINALIZAR_AGENDAMENTO',
          treatment: `${initialTreatment} (Sábado)`,
        },
        {
          label: 'Falar diretamente por WhatsApp (+351 912 907 024)',
          next: 'WHATSAPP_DIRETO',
          treatment: initialTreatment,
        },
        {
          label: 'Consultar opções gerais e outras dúvidas',
          next: 'MENU_PRINCIPAL',
        },
      ],
    };
  } else {
    currentNode = arvoreDecisao[currentNodeKey] || arvoreDecisao.MENU_PRINCIPAL;
  }

  const handleOptionClick = (nextKey: string, label: string, treatment?: string) => {
    if (nextKey === 'WHATSAPP_DIRETO') {
      const treatmentName = treatment || initialTreatment || 'Consulta';
      const text = `Olá! Quero marcar consulta para ${treatmentName} na Clínica Santa Maria dos Olivais.`;
      window.open(`https://wa.me/351912907024?text=${encodeURIComponent(text)}`, '_blank');
      return;
    }

    if (nextKey === 'FINALIZAR_AGENDAMENTO') {
      const treatmentToBook = treatment || initialTreatment || 'Consulta Geral';
      onSelectTreatmentToBook(treatmentToBook);
      onClose();
      return;
    }

    setHistory([...history, { nodeKey: currentNodeKey, selectedLabel: label }]);
    setCurrentNodeKey(nextKey);
  };

  const handleReset = () => {
    setCustomUserMessage(null);
    setCurrentNodeKey('MENU_PRINCIPAL');
    setHistory([]);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="chatbot-modal-title"
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-[#14161a]/65 backdrop-blur-xl transition-all duration-300 animate-fade-in-up"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="liquid-glass-card text-[#2d3277] rounded-[28px] sm:rounded-[32px] w-full max-w-lg shadow-[0_24px_70px_rgba(0,0,0,0.35)] overflow-hidden border border-white/70 flex flex-col max-h-[85vh] relative bg-[#faf9f6]">
        {/* Specular glass reflection bar */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-20" />

        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#2d3277] via-[#242861] to-[#1c1f4c] text-[#ffffff] flex items-center justify-between border-b border-white/15 shrink-0 relative overflow-hidden">
          <div className="flex items-center gap-3.5 relative z-10">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/25 p-1.5 flex items-center justify-center shadow-inner shrink-0">
              <img
                src={defaultContentData.global.darkLogoIcon}
                alt="Clínica Santa Maria dos Olivais"
                className="w-full h-full object-contain filter brightness-110"
              />
            </div>
            <div>
              <div className="text-[11px] text-[#d4e157] font-semibold uppercase tracking-widest">
                <span>Assistente Virtual SMO</span>
              </div>
              <h3 id="chatbot-modal-title" className="font-serif font-normal text-lg sm:text-xl text-[#ffffff]">
                Marcação & Apoio ao Utente
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar assistente"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#d4e157] hover:text-[#2d3277] transition-all flex items-center justify-center font-medium text-base cursor-pointer border border-white/25 shadow-xs relative z-10"
          >
            <X size={16} strokeWidth={2.2} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 bg-white/50 backdrop-blur-md">
          {/* Custom initial user speech bubble if opened with treatment intent */}
          {customUserMessage && (
            <div className="flex justify-end">
              <div className="bg-[#2d3277] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs sm:text-[13px] font-medium max-w-[85%] shadow-sm">
                <p>{customUserMessage}</p>
              </div>
            </div>
          )}

          {/* History */}
          {history.length > 0 && (
            <div className="space-y-3 pt-1">
              {history.map((item, idx) => {
                const prevNodeText =
                  item.nodeKey === 'BOOKING_DIRECT'
                    ? `Recebemos o seu pedido para marcação de consulta de ${initialTreatment}.`
                    : arvoreDecisao[item.nodeKey]?.text;

                return (
                  <div key={idx} className="flex flex-col gap-1.5 text-xs">
                    <div className="bg-white/95 p-3.5 rounded-2xl rounded-tl-xs border border-[#2d3277]/10 text-[#2d3277] self-start max-w-[88%] leading-relaxed shadow-xs">
                      {prevNodeText}
                    </div>
                    <div className="bg-[#2d3277] text-[#d4e157] px-3.5 py-2 rounded-2xl rounded-tr-xs font-medium self-end max-w-[82%] shadow-xs flex items-center gap-1.5 border border-white/10">
                      <Check size={13} strokeWidth={2.5} />
                      <span>{item.selectedLabel}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Current Node */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl rounded-tl-xs border border-[#2d3277]/10 text-[#2d3277] text-xs sm:text-[13.5px] leading-relaxed whitespace-pre-line shadow-xs font-medium">
            {currentNode.text}
          </div>

          {/* Options */}
          <div className="space-y-2 pt-1">
            {currentNode.options.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleOptionClick(opt.next, opt.label, opt.treatment)}
                className="w-full text-left p-3 sm:p-3.5 rounded-2xl text-xs sm:text-[13px] font-medium bg-white hover:bg-stone text-[#2d3277] border border-[#2d3277]/15 hover:border-[#2d3277]/40 transition-all duration-200 flex items-center justify-between group cursor-pointer shadow-xs"
              >
                <span>{opt.label}</span>
                <ArrowRight size={14} className="text-[#2d3277] group-hover:translate-x-1 transition-transform shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-white border-t border-[#2d3277]/10 flex items-center justify-between shrink-0 text-xs">
          <button
            type="button"
            onClick={handleReset}
            className="text-[#2d3277]/80 hover:text-[#2d3277] font-semibold hover:underline underline-offset-4 cursor-pointer flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw size={13} />
            <span>Reiniciar opções</span>
          </button>
          <a
            href="https://wa.me/351912907024"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2d3277] font-semibold flex items-center gap-1.5 hover:underline"
          >
            <MessageCircle size={15} className="text-[#25D366]" />
            <span>WhatsApp (+351 912 907 024)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
