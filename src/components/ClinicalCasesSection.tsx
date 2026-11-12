import React, { useState } from 'react';
import {
  CLINICAL_CASES_BEFORE_AFTER,
  CLINICAL_CASE_VIDEOS,
  PATIENT_TESTIMONIAL_VIDEOS,
} from '../data/mediaCatalog';
import { Play, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

interface ClinicalCasesSectionProps {
  onOpenVideo: (src: string, title: string, subtitle?: string) => void;
  onSelectTreatment: (treatment: string) => void;
}

export default function ClinicalCasesSection({
  onOpenVideo,
  onSelectTreatment,
}: ClinicalCasesSectionProps) {
  const [activeTab, setActiveTab] = useState<'fotos' | 'videos'>('fotos');
  const [activeFilter, setActiveFilter] = useState<string>('todos');

  const filteredCases = activeFilter === 'todos'
    ? CLINICAL_CASES_BEFORE_AFTER
    : CLINICAL_CASES_BEFORE_AFTER.filter((c) =>
        c.treatment.toLowerCase().includes(activeFilter.toLowerCase())
      );

  return (
    <section id="casos-clinicos" className="py-28 md:py-40 bg-stone/40 border-t border-rule overflow-hidden">
      <div className="container-page">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20">
          <div>
            <p className="eyebrow text-muted mb-4">CASOS CLÍNICOS & RESULTADOS</p>
            <h2 className="section-heading max-w-xl">
              Transformações reais, <em>sorrisos</em> que falam por si.
            </h2>
          </div>

          {/* Toggle between Photos (Antes & Depois) and Videos */}
          <div className="flex items-center gap-3">
            <div className="inline-flex p-1 rounded-full bg-paper border border-rule shadow-2xs">
              <button
                type="button"
                onClick={() => setActiveTab('fotos')}
                className={`px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                  activeTab === 'fotos'
                    ? 'bg-ink text-paper shadow-xs'
                    : 'text-muted hover:text-ink'
                }`}
              >
                Antes & Depois (9 Casos)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('videos')}
                className={`px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  activeTab === 'videos'
                    ? 'bg-ink text-paper shadow-xs'
                    : 'text-muted hover:text-ink'
                }`}
              >
                <Play size={12} className="fill-current" />
                <span>Vídeos & Testemunhos</span>
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: FOTOGRAFIAS ANTES E DEPOIS */}
        {activeTab === 'fotos' && (
          <div>
            {/* Filter tags */}
            <div className="flex flex-wrap items-center gap-2 mb-10">
              {[
                { id: 'todos', label: 'Todos os Casos' },
                { id: 'estética', label: 'Estética & Facetas' },
                { id: 'ortodontia', label: 'Ortodontia Invisível' },
                { id: 'implantologia', label: 'Implantes & Reabilitação' },
                { id: 'branqueamento', label: 'Branqueamento' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-1.5 rounded-full text-xs transition-all duration-200 cursor-pointer ${
                    activeFilter === filter.id
                      ? 'bg-ink text-paper font-medium'
                      : 'bg-paper text-muted hover:text-ink border border-rule'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Grid de Casos Antes & Depois */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCases.map((c) => (
                <div
                  key={c.id}
                  className="group bg-paper rounded-2xl overflow-hidden border border-rule hover:border-ink/30 transition-all duration-500 shadow-xs hover:shadow-md flex flex-col"
                >
                  {/* Photo container */}
                  <div className="aspect-[4/3] w-full overflow-hidden bg-stone relative">
                    <img
                      src={c.img}
                      alt={c.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-[10.5px] font-semibold tracking-wider uppercase bg-paper/90 backdrop-blur-md text-ink shadow-2xs">
                        {c.treatment}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-serif text-xl text-ink font-medium mb-2 group-hover:text-ink/80 transition-colors">
                        {c.title}
                      </h3>
                      <p className="text-xs text-muted leading-relaxed">
                        {c.desc}
                      </p>
                    </div>

                    <div className="pt-5 mt-5 border-t border-rule flex items-center justify-between">
                      <span className="text-[11px] font-medium text-ink/70 flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-[#2d3277]" />
                        Caso documentado
                      </span>
                      <button
                        type="button"
                        onClick={() => onSelectTreatment(c.treatment)}
                        className="text-xs font-medium text-ink hover:text-[#2d3277] flex items-center gap-1 transition-colors group-hover:translate-x-0.5 duration-200"
                      >
                        <span>Avaliar este tratamento</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: VÍDEOS DE CASOS CLÍNICOS E TESTEMUNHOS */}
        {activeTab === 'videos' && (
          <div className="space-y-12">
            {/* Testemunhos de Pacientes */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="eyebrow text-muted">A VOZ DOS NOSSOS PACIENTES</span>
                <div className="h-[1px] flex-1 bg-rule" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PATIENT_TESTIMONIAL_VIDEOS.map((t, idx) => (
                  <div
                    key={t.id}
                    onClick={() => onOpenVideo(t.src, t.title, 'Testemunho em Vídeo')}
                    className="group bg-paper rounded-2xl p-6 border border-rule hover:border-ink/40 transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md relative overflow-hidden"
                  >
                    <div className="w-12 h-12 rounded-full bg-stone flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-paper transition-colors mb-4">
                      <Play size={18} className="fill-current ml-0.5" />
                    </div>
                    <span className="text-[11px] font-semibold text-muted tracking-wider uppercase block mb-1">
                      PACIENTE SMO #{idx + 1}
                    </span>
                    <h3 className="font-serif text-lg text-ink font-medium mb-2">
                      {t.title}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed">
                      Experiência real sobre o acompanhamento médico e resultado final.
                    </p>
                    <div className="mt-4 pt-4 border-t border-rule text-xs font-medium text-ink flex items-center gap-1">
                      <span>Assistir testemunho</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vídeos de Procedimentos e Casos V1 a V12 */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="eyebrow text-muted">CASOS DOCUMENTADOS EM VÍDEO (V1 - V12)</span>
                <div className="h-[1px] flex-1 bg-rule" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {CLINICAL_CASE_VIDEOS.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => onOpenVideo(v.src, v.title, `Caso Clínico ${v.id}`)}
                    className="group bg-paper p-4 rounded-xl border border-rule hover:border-ink/30 transition-all text-left flex items-start gap-3 hover:shadow-xs"
                  >
                    <div className="w-8 h-8 rounded-full bg-stone flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-paper shrink-0 transition-colors mt-0.5">
                      <Play size={12} className="fill-current ml-0.5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-serif text-muted font-semibold block">
                        {v.id}
                      </span>
                      <h4 className="font-serif text-sm text-ink leading-snug line-clamp-2">
                        {v.title}
                      </h4>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
