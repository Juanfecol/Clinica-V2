import React, { useEffect, useRef, useState } from 'react';
import { LiquidButton } from './LiquidGlass';

export interface TreatmentData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  img: string;
  caption: string;
  description: string;
  benefits: string[];
  duration: string;
}

interface TreatmentRibbonItemProps {
  treatment: TreatmentData;
  index: number;
  isActive: boolean;
  onHover: (treatment: TreatmentData) => void;
  onClick: (treatment: TreatmentData) => void;
  onOpenPriceModal: (treatmentId: string) => void;
}

export const TreatmentRibbonItem: React.FC<TreatmentRibbonItemProps> = ({
  treatment,
  index,
  isActive,
  onHover,
  onClick,
  onOpenPriceModal,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isEntered, setIsEntered] = useState<boolean>(false);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    // IntersectionObserver tracks when the ribbon step enters and leaves view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const rect = entry.boundingClientRect;
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;

          if (entry.isIntersecting) {
            // When moving into the viewport (scrolling down or up)
            setIsEntered(true);
          } else {
            // If the element exits through the BOTTOM (i.e. user scrolled UP)
            // Reset so that when the user scrolls back DOWN, it re-enters like a staircase ribbon
            if (rect.top > windowHeight * 0.88) {
              setIsEntered(false);
            }
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: [0, 0.15],
      }
    );

    observer.observe(el);

    // Fast scroll check: ensures reset when the user quickly scrolls up past this item
    const checkScrollPosition = () => {
      if (!itemRef.current) return;
      const rect = itemRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top > windowHeight + 20) {
        setIsEntered(false);
      }
    };

    window.addEventListener('scroll', checkScrollPosition, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  // Cascading stair-step stagger (0ms, 75ms, 150ms, 225ms...) for items entering together
  const staggerDelay = isEntered ? `${(index % 4) * 80}ms` : '0ms';

  return (
    <div
      ref={itemRef}
      className="treatment-ribbon-wrapper relative overflow-hidden"
    >
      <div
        style={{
          transitionDelay: staggerDelay,
        }}
        className={`treatment-ribbon-step ${
          isEntered ? 'is-stepped-in' : ''
        } ${
          isActive ? 'active bg-stone/50' : 'hover:bg-stone/25'
        } group flex items-center justify-between py-6 md:py-7 px-4 sm:px-5 -mx-4 rounded-xl cursor-pointer relative transition-all duration-700 ease-out`}
        onMouseEnter={() => onHover(treatment)}
        onClick={() => onClick(treatment)}
      >
        {/* Guia visual de cinta / peldaño en escalera */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-7 min-w-0 pr-3">
          {/* Indicador de peldaño / número con línea animada hacia abajo idéntica a la del head */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            <span
              aria-hidden="true"
              style={{
                ['--line-delay' as string]: `${index * 0.22}s`,
              } as React.CSSProperties}
              className={`treatment-scroll-line ${isActive ? 'is-active' : ''}`}
            />
            <span
              className={`text-xs font-serif tracking-wider transition-colors duration-300 ${
                isActive ? 'text-ink font-bold' : 'text-muted'
              }`}
            >
              {treatment.number}
            </span>
          </div>

          {/* Título del tratamiento con entrada tipográfica fluida */}
          <div className="min-w-0">
            <h3
              className={`treatment-title font-serif text-xl sm:text-2xl md:text-[2.35rem] font-light leading-snug transition-all duration-300 truncate sm:overflow-visible ${
                isActive ? 'text-ink font-normal' : 'text-ink/80 group-hover:text-ink'
              }`}
            >
              {treatment.title}
            </h3>
            <p className="text-xs text-muted/80 mt-1 hidden sm:block truncate max-w-md">
              {treatment.subtitle}
            </p>
          </div>
        </div>

        {/* Botão Preços: abre pop-up elegante com tabela de valores */}
        <div className="shrink-0 pl-2">
          <LiquidButton
            type="button"
            variant={isActive ? 'primary' : 'secondary'}
            onClick={(e) => {
              e.stopPropagation();
              onOpenPriceModal(treatment.id);
            }}
            className={`treatment-cta !text-xs !px-3.5 sm:!px-4 !py-2 !font-semibold flex items-center transition-all duration-300 ${
              isActive
                ? 'opacity-100 translate-x-0 shadow-sm'
                : 'opacity-70 sm:opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 !text-ink'
            }`}
            title={`Consultar preços de ${treatment.title}`}
          >
            <span>Preços</span>
          </LiquidButton>
        </div>

        {/* Línea divisoria que se dibuja de izquierda a derecha cuando entra el peldaño */}
        <div className="treatment-ribbon-track" />
      </div>
    </div>
  );
};
