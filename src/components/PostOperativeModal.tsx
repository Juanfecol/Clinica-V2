import React from 'react';
import { defaultContentData } from '../data/contentData';
import GlassIcon from './GlassIcon';
import { Stethoscope, FileText, Download, Phone, X, ShieldAlert } from 'lucide-react';

interface PostOperativeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PostOperativeModal({ isOpen, onClose }: PostOperativeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2d3277]/80 backdrop-blur-2xl transition-all duration-300">
      <div className="liquid-glass-card text-[#2d3277] rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-white/60">
        {/* Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#2d3277] via-[#232760] to-[#1e2254] text-[#ffffff] flex items-center justify-between border-b border-white/15 shrink-0 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#d4e157]/15 blur-2xl pointer-events-none" />
          <div className="flex items-center gap-4 relative z-10">
            <GlassIcon icon={Stethoscope} variant="lime" size="lg" />
            <div>
              <div className="flex items-center gap-2 text-xs text-[#d4e157] font-semibold uppercase tracking-widest mb-1 font-sans">
                <span>Protocolo Cirúrgico</span>
                <span>·</span>
                <span>Clínica Santa Maria dos Olivais</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#ffffff] font-normal">
                Cuidados Pós-Operatórios
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar guia pós-operatório"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#d4e157] hover:text-[#2d3277] transition-all flex items-center justify-center font-medium text-lg cursor-pointer border border-white/20 shadow-xs relative z-10"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 flex-1 text-sm text-[#2d3277] leading-relaxed">
          <div className="bg-white/80 backdrop-blur-md p-4.5 rounded-2xl border border-[#2d3277]/10 font-medium text-xs sm:text-sm text-[#2d3277] flex items-start gap-3 shadow-xs">
            <ShieldAlert className="w-5 h-5 text-[#d4e157] shrink-0 mt-0.5" />
            <p>Recomendações médicas oficiais para uma recuperação confortável, rápida e sem complicações:</p>
          </div>

          <ol className="space-y-3.5">
            {[
              {
                title: 'Repouso Abstrato (24h a 48h):',
                desc: 'Mantenha um ritmo calmo, evitando esforços físicos ou movimentos bruscos da cabeça.',
              },
              {
                title: 'Evitar Tabaco:',
                desc: 'Não fume de todo nas primeiras 24h a 48h, pois o fumo prejudica diretamente a vascularização e cicatrização.',
              },
              {
                title: 'Sem Cuspir nem Bochechar:',
                desc: 'Evite bochechos ou cuspir no primeiro dia. Mantenha a gaze de compressão pelo período indicado na cirurgia.',
              },
              {
                title: 'Medicação Prescrita:',
                desc: 'Tome os antibióticos, anti-inflamatórios e analgésicos rigorosamente de acordo com o receituário.',
              },
              {
                title: 'Aplicação de Gelo (72h):',
                desc: 'Aplique bolsas de gelo na zona externa da face intercaladamente durante as primeiras 72 horas para conter qualquer inchaço.',
              },
              {
                title: 'Alimentação Fria & Remoção de Pontos:',
                desc: 'Opte por refeições frias ou tépidas e de consistência mole no dia da intervenção. A remoção dos pontos ocorre ao fim de 8 dias.',
              },
            ].map((step, idx) => (
              <li key={idx} className="bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#2d3277]/10 flex items-start gap-3.5 shadow-xs hover:border-[#2d3277]/25 transition-all">
                <span className="w-7 h-7 rounded-full bg-[#2d3277] text-[#d4e157] font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm border border-[#d4e157]/30">
                  {idx + 1}
                </span>
                <div>
                  <strong className="block text-[#2d3277] font-semibold mb-0.5">{step.title}</strong>
                  <span className="text-xs text-[#2d3277]/80">{step.desc}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gradient-to-r from-[#2d3277] to-[#1e2254] text-[#ffffff] border-t border-white/15 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-white/90">
            <Phone size={14} className="text-[#d4e157]" />
            <span>
              Dúvidas pós-cirúrgicas? Ligue: <span className="text-[#d4e157] font-semibold">211 350 066</span> · <span className="text-[#d4e157] font-semibold">919 861 310</span>
            </span>
          </div>

          <a
            href={defaultContentData.pdfPostOpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-bevel-button px-6 py-3 rounded-full text-[#2d3277] font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shrink-0 cursor-pointer shadow-lg"
          >
            <Download size={15} />
            <span>Descarregar Guia PDF Oficial</span>
          </a>
        </div>
      </div>
    </div>
  );
}
