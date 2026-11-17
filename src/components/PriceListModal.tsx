import { useEffect } from 'react';
import { LiquidButton } from './LiquidGlass';
import { X } from 'lucide-react';
import { SupportedLocale } from '../i18n/types';
import { getLocalizedPricing, PRICE_MODAL_UI } from '../i18n/modalTranslations';

const CLINIC_WHATSAPP_URL = 'https://wa.me/351912907024';

interface PriceListModalProps {
  isOpen: boolean;
  onClose: () => void;
  treatmentId: string;
  locale?: SupportedLocale;
  onBookTreatment?: (treatmentTitle: string, userMessage: string) => void;
}

export default function PriceListModal({
  isOpen,
  onClose,
  treatmentId,
  locale = 'pt',
  onBookTreatment,
}: PriceListModalProps) {
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

  const ui = PRICE_MODAL_UI[locale];
  const pricing = getLocalizedPricing(treatmentId, locale);

  const handleBook = () => {
    const msg = ui.bookIntentMsg(pricing.title);
    onClose();
    if (onBookTreatment) {
      onBookTreatment(pricing.title, msg);
    }
  };

  const whatsappHref = `${CLINIC_WHATSAPP_URL}?text=${encodeURIComponent(
    ui.whatsappPriceMsg(pricing.title)
  )}`;

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
      <div className="relative w-full max-w-2xl max-h-[85svh] sm:max-h-[90vh] flex flex-col bg-paper text-ink rounded-2xl sm:rounded-3xl shadow-[0_6px_14px_rgba(24,28,74,0.10),0_24px_56px_-12px_rgba(24,28,74,0.24)] border border-rule overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-8 pb-3.5 sm:pb-6 border-b border-rule flex items-start justify-between gap-3 sm:gap-4 shrink-0 bg-paper">
          <div className="text-left">
            <span className="eyebrow text-muted block mb-0.5 sm:mb-1">
              {ui.eyebrow}
            </span>
            <h2 id="price-modal-title" className="font-serif text-xl sm:text-3xl text-ink font-normal leading-snug">
              {pricing.title}
            </h2>
            <p className="text-xs sm:text-[13px] text-muted font-normal mt-0.5 sm:mt-1 leading-relaxed">
              {pricing.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={ui.closeAria}
            className="w-11 h-11 rounded-full bg-stone hover:bg-clinic-navy text-ink hover:text-white transition-colors duration-150 flex items-center justify-center shrink-0 cursor-pointer border border-rule"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Pricing List */}
        <div className="px-4 sm:px-8 py-3 sm:py-6 overflow-y-auto flex-1 divide-y divide-rule">
          {pricing.items.map((item, idx) => (
            <div
              key={idx}
              className="py-3 sm:py-3.5 first:pt-1 last:pb-2 flex items-baseline justify-between gap-4 hover:bg-clinic-navy/[0.02] px-2 -mx-2 rounded-lg transition-colors text-left"
            >
              <div className="pr-2">
                <p className="text-[13.5px] sm:text-[15px] font-medium text-ink leading-snug">
                  {item.name}
                </p>
                {item.detail && (
                  <p className="text-xs text-muted mt-0.5 leading-relaxed">
                    {item.detail}
                  </p>
                )}
              </div>
              <span className="font-serif text-[14.5px] sm:text-[16px] font-semibold text-ink shrink-0 text-right whitespace-nowrap tabular-nums">
                {item.price}
              </span>
            </div>
          ))}

          {pricing.note && (
            <div className="pt-4 sm:pt-5 mt-3 sm:mt-4">
              <p className="text-xs text-muted leading-relaxed italic bg-white/80 p-3.5 sm:p-4 rounded-2xl border border-rule text-left">
                {pricing.note}
              </p>
            </div>
          )}
        </div>

        {/* Footer: 1 Primary CTA + 1 Secondary Bordered Action */}
        <div className="p-4 sm:p-6 bg-white border-t border-rule shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-muted text-left leading-relaxed">
            {ui.transparentNote}
          </p>

          <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
            <LiquidButton
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="lime"
              className="flex-1 sm:flex-none !px-4 sm:!px-5 !py-2.5 !text-xs !font-semibold min-h-[44px] whitespace-nowrap"
            >
              <span>WhatsApp</span>
            </LiquidButton>

            <LiquidButton
              type="button"
              variant="primary"
              onClick={handleBook}
              className="flex-1 sm:flex-none !px-5 sm:!px-6 !py-2.5 !text-xs !font-semibold min-h-[44px] whitespace-nowrap"
            >
              <span>{ui.bookBtn}</span>
            </LiquidButton>
          </div>
        </div>
      </div>
    </div>
  );
}
