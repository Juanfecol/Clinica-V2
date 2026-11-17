import { useState, useEffect } from 'react';
import { DecisionNode } from '../data/knowledgeBase';
import { MessageCircle, ArrowRight, RotateCcw, X, Check } from 'lucide-react';
import { SupportedLocale } from '../i18n/types';
import { getChatbotTranslations } from '../i18n/modalTranslations';
import { trackWhatsAppClick } from '../utils/metaGoogleTracking';

const CLINIC_DARK_LOGO_ICON = 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Icono-Nocturno.png';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTreatmentToBook: (treatment: string) => void;
  locale?: SupportedLocale;
  initialTreatment?: string;
  initialMessage?: string;
}

export default function ChatbotModal({
  isOpen,
  onClose,
  onSelectTreatmentToBook,
  locale = 'pt',
  initialTreatment,
  initialMessage,
}: ChatbotModalProps) {
  const chatUi = getChatbotTranslations(locale);
  const [currentNodeKey, setCurrentNodeKey] = useState<string>('MENU_PRINCIPAL');
  const [history, setHistory] = useState<{ nodeKey: string; selectedLabel: string }[]>([]);
  const [customUserMessage, setCustomUserMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialTreatment) {
        const msg = initialMessage || chatUi.defaultUserBubble(initialTreatment);
        setCustomUserMessage(msg);
        setCurrentNodeKey('BOOKING_DIRECT');
        setHistory([]);
      } else {
        setCustomUserMessage(null);
        setCurrentNodeKey('MENU_PRINCIPAL');
        setHistory([]);
      }
    }
  }, [isOpen, initialTreatment, initialMessage, chatUi]);

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

  let currentNode: DecisionNode;

  if (currentNodeKey === 'BOOKING_DIRECT' && initialTreatment) {
    currentNode = {
      text: chatUi.directBookingText(initialTreatment),
      options: [
        {
          label: chatUi.directOptWeekdays,
          next: 'FINALIZAR_AGENDAMENTO',
          treatment: initialTreatment,
        },
        {
          label: chatUi.directOptSaturday,
          next: 'FINALIZAR_AGENDAMENTO',
          treatment: `${initialTreatment} (${chatUi.saturdaySuffix})`,
        },
        {
          label: chatUi.directOptWhatsApp,
          next: 'WHATSAPP_DIRETO',
          treatment: initialTreatment,
        },
        {
          label: chatUi.directOptMenu,
          next: 'MENU_PRINCIPAL',
        },
      ],
    };
  } else {
    currentNode = chatUi.nodes[currentNodeKey] || chatUi.nodes.MENU_PRINCIPAL;
  }

  const getDirectWhatsAppHref = (treatment?: string) => {
    const treatmentName = treatment || initialTreatment || chatUi.defaultConsultLabel;
    const text = chatUi.whatsappDirectMsg(treatmentName);
    return `https://wa.me/351912907024?text=${encodeURIComponent(text)}`;
  };

  const handleOptionClick = (nextKey: string, label: string, treatment?: string) => {

    if (nextKey === 'FINALIZAR_AGENDAMENTO') {
      const treatmentToBook = treatment || initialTreatment || chatUi.defaultConsultLabel;
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
      <div className="text-ink rounded-[28px] sm:rounded-[32px] w-full max-w-lg shadow-[0_6px_14px_rgba(24,28,74,0.12),0_24px_60px_-12px_rgba(24,28,74,0.32)] overflow-hidden border border-white/70 flex flex-col max-h-[85svh] sm:max-h-[85vh] relative bg-paper">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-20" />

        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#2d3277] via-[#242861] to-[#1c1f4c] text-[#ffffff] flex items-center justify-between border-b border-white/15 shrink-0 relative overflow-hidden">
          <div className="flex items-center gap-3.5 relative z-10 text-left">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/25 p-1.5 flex items-center justify-center shadow-inner shrink-0">
              <img
                src={CLINIC_DARK_LOGO_ICON}
                alt="Clínica Santa Maria dos Olivais"
                className="w-full h-full object-contain filter brightness-110"
              />
            </div>
            <div>
              <div className="text-[11px] text-[#e6ef8a] font-semibold uppercase tracking-[0.09em]">
                <span>{chatUi.badge}</span>
              </div>
              <h3 id="chatbot-modal-title" className="font-serif font-normal text-lg sm:text-xl text-[#ffffff]">
                {chatUi.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={chatUi.closeAria}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#d4e157] hover:text-[#1e2258] transition-colors duration-150 flex items-center justify-center font-medium text-base cursor-pointer border border-white/25 shadow-xs relative z-10"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 bg-white/50 backdrop-blur-md">
          {customUserMessage && (
            <div className="flex justify-end">
              <div className="bg-[#2d3277] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs sm:text-[13px] font-medium max-w-[85%] shadow-sm">
                <p>{customUserMessage}</p>
              </div>
            </div>
          )}

          {history.length > 0 && (
            <div className="space-y-3 pt-1">
              {history.map((item, idx) => {
                const prevNodeText =
                  item.nodeKey === 'BOOKING_DIRECT'
                    ? chatUi.directBookingShortHistory(initialTreatment || chatUi.defaultConsultLabel)
                    : chatUi.nodes[item.nodeKey]?.text;

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

          <div className="bg-white p-4 sm:p-5 rounded-2xl rounded-tl-xs border border-[#2d3277]/10 text-[#2d3277] text-xs sm:text-[13.5px] leading-relaxed whitespace-pre-line shadow-xs font-medium">
            {currentNode.text}
          </div>

          <div className="space-y-2 pt-1">
            {currentNode.options.map((opt, idx) =>
              opt.next === 'WHATSAPP_DIRETO' ? (
                <a
                  key={idx}
                  href={getDirectWhatsAppHref(opt.treatment)}
                  onClick={() => trackWhatsAppClick(opt.treatment || initialTreatment)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-left p-3 sm:p-3.5 min-h-[44px] rounded-2xl text-xs sm:text-[13px] font-medium bg-white hover:bg-stone text-ink border border-rule hover:border-clinic-navy/40 transition-colors duration-150 flex items-center justify-between group cursor-pointer shadow-xs"
                >
                  <span>{opt.label} ↗</span>
                  <ArrowRight size={14} className="text-ink group-hover:translate-x-1 transition-transform shrink-0" />
                </a>
              ) : (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleOptionClick(opt.next, opt.label, opt.treatment)}
                  className="w-full text-left p-3 sm:p-3.5 min-h-[44px] rounded-2xl text-xs sm:text-[13px] font-medium bg-white hover:bg-stone text-ink border border-rule hover:border-clinic-navy/40 transition-colors duration-150 flex items-center justify-between group cursor-pointer shadow-xs"
                >
                  <span>{opt.label}</span>
                  <ArrowRight size={14} className="text-ink group-hover:translate-x-1 transition-transform shrink-0" />
                </button>
              )
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-white border-t border-rule flex items-center justify-between gap-3 shrink-0 text-xs">
          <button
            type="button"
            onClick={handleReset}
            className="min-h-[40px] px-1 text-muted hover:text-ink font-semibold underline underline-offset-4 cursor-pointer flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw size={13} />
            <span>{chatUi.resetBtn}</span>
          </button>
          <a
            href="https://wa.me/351912907024"
            onClick={() => trackWhatsAppClick(initialTreatment)}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[40px] text-ink font-semibold flex items-center gap-1.5 underline underline-offset-4 hover:text-clinic-navy tabular-nums"
          >
            <MessageCircle size={15} className="text-[#25D366] shrink-0" />
            <span>WhatsApp (+351 912 907 024) ↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
