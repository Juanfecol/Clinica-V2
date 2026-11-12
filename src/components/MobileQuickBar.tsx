import React, { useEffect, useState } from 'react';

export const MobileQuickBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide the floating bar when user reaches the booking form (#marcacao) to avoid visual redundancy
      const marcacao = document.getElementById('marcacao');
      if (marcacao) {
        const rect = marcacao.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        // If the top of the booking section is inside the viewport, hide the quick bar
        if (rect.top <= windowHeight * 0.7 && rect.bottom >= 0) {
          setIsVisible(false);
          return;
        }
      }
      setIsVisible(true);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside
      aria-label="Contacto rápido móvel"
      className={`fixed bottom-0 inset-x-0 z-40 md:hidden transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-[#faf9f6]/92 backdrop-blur-xl border-t border-[#2d3277]/15 px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-6px_24px_rgba(45,50,119,0.1)]">
        <div className="flex items-center gap-2.5 max-w-sm mx-auto">
          {/* Botón Ligar */}
          <a
            href="tel:+351300601645"
            className="flex-1 h-11 px-3 rounded-xl bg-white border border-[#2d3277]/15 text-[#2d3277] font-medium text-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-transform"
          >
            <span className="text-sm">📞</span>
            <span className="truncate">Ligar 300 601 645</span>
          </a>

          {/* Botón WhatsApp */}
          <a
            href="https://wa.me/351912907024"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-11 px-3 rounded-xl bg-[#d4e157] text-[#2d3277] font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-transform"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="truncate">WhatsApp</span>
          </a>
        </div>
      </div>
    </aside>
  );
};
