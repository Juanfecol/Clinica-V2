import React, { useState } from 'react';
import { defaultContentData, VideoStory } from '../data/contentData';
import { Video, X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

interface StoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStoryId?: number;
}

export default function StoriesModal({ isOpen, onClose, initialStoryId = 0 }: StoriesModalProps) {
  const stories = defaultContentData.stories;
  const [activeIdx, setActiveIdx] = useState<number>(() => {
    const found = stories.findIndex((s) => s.id === initialStoryId);
    return found >= 0 ? found : 0;
  });

  if (!isOpen) return null;

  const currentStory: VideoStory = stories[activeIdx] || stories[0];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % stories.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl">
      <div className="relative bg-black/90 text-white rounded-3xl w-full max-w-md h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-white/20">
        {/* Story Top Bar */}
        <div className="absolute top-0 inset-x-0 z-20 p-4 bg-gradient-to-b from-black/90 via-black/50 to-transparent flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#d4e157] text-[#2d3277] font-serif font-bold flex items-center justify-center text-xs shadow-md border border-white">
              SMO
            </div>
            <div>
              <p className="font-semibold text-xs text-white">{currentStory.title}</p>
              <p className="text-[10px] text-white/70">Clínica Santa Maria dos Olivais</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar histórias"
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-white hover:text-black transition flex items-center justify-center font-bold text-sm border border-white/20"
          >
            <X size={16} />
          </button>
        </div>

        {/* Video / Media Display */}
        <div className="relative w-full h-full flex items-center justify-center bg-black">
          {currentStory.type === 'video' ? (
            <video
              key={currentStory.src}
              src={currentStory.src}
              poster={currentStory.thumbnail}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              src={currentStory.thumbnail}
              alt={currentStory.title}
              className="w-full h-full object-contain"
            />
          )}

          {/* Nav Controls */}
          <button
            onClick={handlePrev}
            aria-label="Vídeo anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-[#d4e157] hover:text-[#2d3277] transition-all flex items-center justify-center font-bold border border-white/20 shadow-lg"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={handleNext}
            aria-label="Seguinte vídeo"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-[#d4e157] hover:text-[#2d3277] transition-all flex items-center justify-center font-bold border border-white/20 shadow-lg"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Story Footer */}
        <div className="absolute bottom-0 inset-x-0 z-20 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-center justify-between gap-3">
          <span className="text-xs text-[#d4e157] font-medium flex items-center gap-1.5">
            <Video size={13} />
            <span>{activeIdx + 1} / {stories.length} Vídeos</span>
          </span>

          <a
            href="https://wa.me/351912907024"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full bg-[#25D366] text-black font-semibold text-xs hover:bg-white transition-all flex items-center gap-1.5 shadow-md"
          >
            <MessageCircle size={14} />
            <span>Agendar Consulta</span>
          </a>
        </div>
      </div>
    </div>
  );
}
