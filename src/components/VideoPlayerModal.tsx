import React from 'react';
import { X } from 'lucide-react';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title?: string;
  subtitle?: string;
}

export default function VideoPlayerModal({
  isOpen,
  onClose,
  videoSrc,
  title = 'Vídeo da Clínica',
  subtitle = 'Clínica Santa Maria dos Olivais · Lisboa',
}: VideoPlayerModalProps) {
  if (!isOpen || !videoSrc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl transition-all duration-300">
      <div className="relative bg-[#14161A] text-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-white/20">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#2d3277] to-[#1e2254] flex items-center justify-between border-b border-white/10 shrink-0">
          <div>
            <span className="text-[10.5px] font-semibold text-[#d4e157] tracking-wider uppercase font-sans">
              {subtitle}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mt-0.5">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar vídeo"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#d4e157] hover:text-[#2d3277] transition-all flex items-center justify-center font-medium text-lg cursor-pointer border border-white/20"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          <video
            src={videoSrc}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          >
            O seu navegador não suporta a reprodução de vídeo.
          </video>
        </div>
      </div>
    </div>
  );
}
