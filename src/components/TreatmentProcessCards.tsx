import React, { useEffect, useRef, useState } from 'react';
import { LiquidButton } from './LiquidGlass';
import { TreatmentData } from './TreatmentRibbonItem';

interface CardTransform {
  scale: number;
  rotation: number;
  afterOpacity: number;
}

interface TreatmentProcessCardsProps {
  treatments: TreatmentData[];
  onOpenPriceModal: (treatmentId: string) => void;
  onBookTreatment: (treatmentTitle: string) => void;
}

export const TreatmentProcessCards: React.FC<TreatmentProcessCardsProps> = ({
  treatments,
  onOpenPriceModal,
  onBookTreatment,
}) => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [transforms, setTransforms] = useState<CardTransform[]>(() =>
    treatments.map(() => ({ scale: 1, rotation: 0, afterOpacity: 0 }))
  );

  useEffect(() => {
    let animationFrameId: number;

    const updateCardTransforms = () => {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const nextTransforms: CardTransform[] = [];

      for (let i = 0; i < treatments.length; i++) {
        if (i < treatments.length - 1) {
          const nextCardEl = cardRefs.current[i + 1];
          if (nextCardEl) {
            const rect = nextCardEl.getBoundingClientRect();
            // Progress r:
            // 0 when next card is below viewport (rect.top >= windowHeight)
            // 1 when next card reaches the top of viewport (rect.top <= 0)
            const r = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
            const angle = (i % 2 === 0 ? 5 : -5) * r;
            const scale = 1 - 0.25 * r;
            nextTransforms.push({
              scale,
              rotation: angle,
              afterOpacity: r,
            });
          } else {
            nextTransforms.push({ scale: 1, rotation: 0, afterOpacity: 0 });
          }
        } else {
          // The last card remains stationary at the top
          nextTransforms.push({ scale: 1, rotation: 0, afterOpacity: 0 });
        }
      }

      setTransforms(nextTransforms);
    };

    const handleScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateCardTransforms);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateCardTransforms();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [treatments]);

  return (
    <div className="process-cards relative w-full bg-paper">
      {treatments.map((t, index) => {
        const transform = transforms[index] || { scale: 1, rotation: 0, afterOpacity: 0 };

        return (
          <div
            key={t.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            style={{
              zIndex: index + 1,
            }}
            className="process-card-slot relative h-[105vh] sm:h-[100vh] w-full"
          >
            <div
              style={{
                transform: `scale(${transform.scale}) rotate(${transform.rotation}deg)`,
                transformOrigin: '50% 15%',
                willChange: 'transform',
              }}
              className="process-card sticky top-0 h-screen w-full bg-[#fbfaf7] text-ink border-t border-rule/35 shadow-[0_-16px_40px_rgba(45,50,119,0.08)] rounded-t-[28px] sm:rounded-t-[38px] overflow-hidden flex flex-col justify-between py-6 sm:py-10 md:py-12 px-5 sm:px-8 md:px-14 lg:px-20 transition-transform duration-75 ease-out"
            >
              {/* Capa de oscurecimiento progresivo idéntica a la referencia de Roll Out Studios */}
              <div
                aria-hidden="true"
                style={{
                  opacity: transform.afterOpacity * 0.55,
                }}
                className="absolute inset-0 bg-[#14161a] pointer-events-none z-30 transition-opacity duration-100 ease-out"
              />

              {/* Contenido principal de la tarjeta */}
              <div className="relative z-10 w-full h-full flex flex-col justify-between max-w-7xl mx-auto">
                {/* Cabecera superior: Índice y Título */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                  {/* Índice numérico gigante (lado izquierdo) */}
                  <div className="process-card-index lg:col-span-3 flex lg:flex-col items-baseline justify-between lg:justify-start gap-3">
                    <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light text-clinic-navy/85 tracking-tight leading-none select-none">
                      {t.number}
                    </h1>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-clinic-navy" />
                      <span className="text-[11px] font-mono tracking-widest text-muted uppercase">
                        Tratamento {t.number} / 09
                      </span>
                    </div>
                  </div>

                  {/* Lado derecho: Nombre, subtítulo e imagen */}
                  <div className="process-card-content lg:col-span-9 flex flex-col gap-4 sm:gap-6">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-rule/40 pb-3">
                      <h2 className="process-card-header font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-ink leading-tight">
                        {t.title}
                      </h2>
                      <span className="text-xs sm:text-sm font-serif italic text-muted">
                        {t.subtitle}
                      </span>
                    </div>

                    {/* Fotografía de tratamiento apaisada (5:2.8 / 16:9) con marco curvado */}
                    <div className="process-card-img aspect-[16/8.5] sm:aspect-[16/7.5] md:aspect-[16/7] w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-stone relative shadow-sm border border-rule/20">
                      <img
                        src={t.img}
                        alt={t.title}
                        className="w-full h-full object-cover object-center block"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Bloque de copia / descripción clínica especializada */}
                    <div className="process-card-copy grid grid-cols-1 sm:grid-cols-12 gap-4 items-start pt-1">
                      <div className="process-card-copy-title sm:col-span-4">
                        <p className="text-[11.5px] uppercase tracking-wider font-semibold text-clinic-navy">
                          (Especialidade Clínica)
                        </p>
                        <p className="text-xs text-muted mt-0.5 font-mono">
                          {t.duration}
                        </p>
                      </div>
                      <div className="process-card-copy-description sm:col-span-8">
                        <p className="text-xs sm:text-sm text-ink/80 leading-relaxed font-body">
                          {t.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pie de la tarjeta: Transparencia y Botones de acción */}
                <div className="border-t border-rule/50 pt-4 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <span>Protocolo clínico seguro ·</span>
                    <button
                      type="button"
                      onClick={() => onOpenPriceModal(t.id)}
                      className="text-xs font-semibold text-clinic-navy hover:underline cursor-pointer"
                    >
                      Consultar tabela de preços →
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <LiquidButton
                      type="button"
                      variant="secondary"
                      onClick={() => onOpenPriceModal(t.id)}
                      className="!text-xs !px-4 !py-2.5 !font-semibold cursor-pointer"
                    >
                      <span>Ver preços</span>
                    </LiquidButton>
                    <LiquidButton
                      type="button"
                      variant="primary"
                      onClick={() => onBookTreatment(t.title)}
                      className="!text-xs !px-5 !py-2.5 !font-semibold shadow-md cursor-pointer"
                    >
                      <span>Marcar consulta</span>
                    </LiquidButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
