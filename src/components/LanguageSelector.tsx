import React, { useEffect, useRef, useState } from 'react';
import {
  SUPPORTED_LANGUAGES,
  getCurrentLanguage,
  changeLanguage,
  LanguageOption,
} from '../utils/translator';

interface LanguageSelectorProps {
  headerTheme?: 'transparent' | 'dark' | 'light';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ headerTheme = 'transparent' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState<{ code: string; isAuto: boolean }>({
    code: 'pt',
    isAuto: false,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Read current language on mount
    const detected = getCurrentLanguage();
    setCurrent(detected);

    // Close on click outside
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    // Close on Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelect = (lang: LanguageOption) => {
    setCurrent({ code: lang.code, isAuto: false });
    setIsOpen(false);
    changeLanguage(lang.code, true);
  };

  const activeLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === current.code) || SUPPORTED_LANGUAGES[0];

  const isLightText = headerTheme === 'transparent' || headerTheme === 'dark';

  return (
    <div ref={containerRef} className="relative inline-block text-left z-30">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Idioma atual: ${activeLang.nativeName}. Clique para alterar.`}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 backdrop-blur-md cursor-pointer ${
          isLightText
            ? 'bg-white/10 hover:bg-white/20 text-paper border border-white/20 shadow-xs'
            : 'bg-[#2d3277]/8 hover:bg-[#2d3277]/15 text-ink border border-[#2d3277]/15 shadow-xs'
        }`}
      >
        <span className="text-sm leading-none" role="img" aria-hidden="true">
          {activeLang.flag}
        </span>
        <span className="font-semibold uppercase text-[11px] sm:text-xs">
          {activeLang.code}
        </span>
        {current.isAuto && (
          <span
            className="text-[9px] px-1 py-0.2 rounded font-mono uppercase tracking-wider bg-[#d4e157] text-[#2d3277] font-bold hidden sm:inline"
            title="Traduzido automaticamente de acordo com o idioma do seu dispositivo"
          >
            Auto
          </span>
        )}
        <svg
          className={`w-3 h-3 transition-transform duration-200 opacity-70 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-48 sm:w-52 rounded-2xl bg-[#faf9f6]/95 backdrop-blur-xl border border-[#2d3277]/15 shadow-[0_16px_40px_rgba(45,50,119,0.18)] py-1.5 z-50 animate-fade-in-up"
        >
          <div className="px-3.5 py-2 border-b border-[#2d3277]/10 flex items-center justify-between">
            <span className="text-[10px] font-semibold tracking-wider text-muted uppercase">
              Idioma / Language
            </span>
            {current.isAuto && (
              <span className="text-[9.5px] text-[#2d3277] font-medium bg-[#d4e157]/60 px-1.5 py-0.5 rounded-full">
                Dispositivo
              </span>
            )}
          </div>

          <div className="py-1 max-h-64 overflow-y-auto no-scrollbar">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = lang.code === current.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang)}
                  role="menuitem"
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-xs transition-colors duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-[#2d3277]/10 text-[#2d3277] font-semibold'
                      : 'text-ink/80 hover:bg-[#2d3277]/5 hover:text-ink font-normal'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none" role="img" aria-hidden="true">
                      {lang.flag}
                    </span>
                    <span className="text-left">
                      {lang.nativeName}
                      {lang.code === 'pt' && (
                        <span className="ml-1 text-[10px] text-muted font-normal">(Original)</span>
                      )}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2d3277]" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default LanguageSelector;
