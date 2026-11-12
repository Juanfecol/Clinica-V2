import React, { useEffect } from 'react';
import { TREATMENT_PRICING, TreatmentPricing } from '../data/specialtiesData';
import { LiquidButton } from './LiquidGlass';
import { openLeadConnectorWidget, CLINIC_WHATSAPP_URL } from '../utils/leadConnector';
import { X } from 'lucide-react';

interface PriceListModalProps {
  isOpen: boolean;
  onClose: () => void;
  treatmentId: string;
  onBookTreatment?: (treatmentTitle: string, userMessage: string) => void;
}

export default function PriceListModal({
  isOpen,
  onClose,
  treatmentId,
  onBookTreatment,
}: PriceListModalProps) {
  // ESC key and body scroll lock
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

  // Retrieve strictly the pricing data for this category
  const pricing: TreatmentPricing | undefined =
    TREATMENT_PRICING[treatmentId] ||
    Object.values(TREATMENT_PRICING).find(
      (p) =>
        p.id.toLowerCase() === treatmentId.toLowerCase() ||
        treatmentId.toLowerCase().includes(p.id.toLowerCase())
    ) ||
    TREATMENT_PRICING['Implantologia'];

  const handleBook = () => {
    const msg = `Quero marcar consulta para ${pricing.title}`;
    onClose();
    if (onBookTreatment) {
      onBookTreatment(pricing.title, msg);
    }
    openLeadConnectorWidget(pricing.title);
  };

  const handleWhatsApp = () => {
    const text = `Olá! Gostaria de consultar informações sobre os preços de ${pricing.title} na Clínica Santa Maria dos Olivais.`;
    window.open(`${CLINIC_WHATSAPP_URL}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="price-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#14161a]/60 backdrop-blur-md animate-fade-in-up"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#faf9f6] text-[#2d3277] rounded-3xl shadow-[0_20px_60px_rgba(45,50,119,0.18)] border border-[#2d3277]/10 overflow-hidden">
        {/* Simple & Elegant Header */}
        <div className="p-6 sm:p-8 pb-5 sm:pb-6 border-b border-[#2d3277]/10 flex items-start justify-between gap-4 shrink-0 bg-[#faf9f6]">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2d3277]/60 block mb-1">
              Tabela de Preços · Clínica Santa Maria dos Olivais
            </span>
            <h2 id="price-modal-title" className="font-serif text-2xl sm:text-3xl text-[#2d3277] font-normal leading-snug">
              {pricing.title}
            </h2>
            <p className="text-xs sm:text-[13px] text-[#2d3277]/70 font-normal mt-1 leading-relaxed">
              {pricing.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="w-9 h-9 rounded-full bg-stone hover:bg-[#2d3277] text-[#2d3277] hover:text-white transition-all duration-200 flex items-center justify-center shrink-0 cursor-pointer border border-[#2d3277]/10"
          >
            <X size={16} strokeWidth={2.2} />
          </button>
        </div>

        {/* Clean, Editorial Pricing List */}
        <div className="px-6 sm:px-8 py-4 sm:py-6 overflow-y-auto flex-1 divide-y divide-[#2d3277]/8">
          {pricing.items.map((item, idx) => (
            <div
              key={idx}
              className="py-3.5 first:pt-1 last:pb-2 flex items-baseline justify-between gap-4 hover:bg-[#2d3277]/[0.02] px-2 -mx-2 rounded-lg transition-colors"
            >
              <div className="pr-2">
                <p className="text-[14px] sm:text-[15px] font-medium text-[#2d3277] leading-snug">
                  {item.name}
                </p>
                {item.detail && (
                  <p className="text-xs text-[#2d3277]/60 mt-0.5 leading-relaxed">
                    {item.detail}
                  </p>
                )}
              </div>
              <span className="font-serif text-[15px] sm:text-[16px] font-semibold text-[#2d3277] shrink-0 text-right whitespace-nowrap">
                {item.price}
              </span>
            </div>
          ))}

          {/* Discreet Clinical & Payment Note */}
          {pricing.note && (
            <div className="pt-5 mt-4">
              <p className="text-[12px] text-[#2d3277]/70 leading-relaxed italic bg-white/70 p-3.5 rounded-xl border border-[#2d3277]/8">
                {pricing.note}
              </p>
            </div>
          )}
        </div>

        {/* Minimalist Footer with LiquidButtons matching the site */}
        <div className="p-4 sm:p-6 bg-white border-t border-[#2d3277]/10 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#2d3277]/65 text-center sm:text-left">
            Valores oficiais e transparentes sem custos ocultos.
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <LiquidButton
              type="button"
              variant="lime"
              onClick={handleWhatsApp}
              className="flex-1 sm:flex-none !px-5 !py-2.5 !text-xs !font-semibold shadow-md"
            >
              <span>WhatsApp</span>
            </LiquidButton>

            <LiquidButton
              type="button"
              variant="primary"
              onClick={handleBook}
              className="flex-1 sm:flex-none !px-6 !py-2.5 !text-xs !font-semibold shadow-md"
            >
              <span>Marcar consulta</span>
            </LiquidButton>
          </div>
        </div>
      </div>
    </div>
  );
}
