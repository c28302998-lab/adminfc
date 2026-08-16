import React from 'react';
import { useApp } from '../context/AppContext';
import { Handshake, CheckCircle2, TrendingUp, Tv, Award, ArrowRight } from 'lucide-react';

export default function SponsorsSection() {
  const { t, partners, setIsSponsorModalOpen } = useApp();

  return (
    <section id="sponsors" className="py-24 bg-neutral-900/60 relative overflow-hidden">
      
      {/* Background accents */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-900/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">
            SPONSORSHIP & PARTNERSHIP
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            {t.sponsors.title}
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            {t.sponsors.subtitle}
          </p>
        </div>

        {/* Why Support Grid (3 Reasons) */}
        <div className="mb-16">
          <h3 className="text-xl font-extrabold text-white uppercase text-center mb-8">
            {t.sponsors.whyTitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-3xl border border-neutral-800 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <h4 className="text-lg font-bold text-white uppercase mb-3">
                {t.sponsors.why1Title}
              </h4>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                {t.sponsors.why1Text}
              </p>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-neutral-800 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center mb-6">
                <Tv className="w-6 h-6 text-emerald-400" />
              </div>
              <h4 className="text-lg font-bold text-white uppercase mb-3">
                {t.sponsors.why2Title}
              </h4>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                {t.sponsors.why2Text}
              </p>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-neutral-800 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center mb-6">
                <Handshake className="w-6 h-6 text-emerald-400" />
              </div>
              <h4 className="text-lg font-bold text-white uppercase mb-3">
                {t.sponsors.why3Title}
              </h4>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                {t.sponsors.why3Text}
              </p>
            </div>
          </div>
        </div>

        {/* What Partners Receive & CTA */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-emerald-500/30 green-glow-box mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase mb-6">
                {t.sponsors.perksTitle}
              </h3>

              <div className="space-y-4">
                {t.sponsors.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-gray-200 text-sm sm:text-base font-light">{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center lg:text-right">
              <div className="glass-panel-accent p-8 rounded-2xl inline-block text-left max-w-md w-full">
                <Award className="w-10 h-10 text-emerald-400 mb-4" />
                <h4 className="text-xl font-bold text-white uppercase mb-2">
                  Инвестируйте в футбольное будущее
                </h4>
                <p className="text-xs text-gray-300 mb-6">
                  Мы предлагаем гибкие формы сотрудничества для малого, среднего и крупного бизнеса.
                </p>
                <button
                  onClick={() => setIsSponsorModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-950/60 transition-all cursor-pointer group"
                >
                  <span>{t.sponsors.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Current Partners Logos */}
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Официальные спонсоры
          </span>
          <div className="mt-6 flex flex-wrap justify-center items-center gap-8">
            {partners.map(p => (
              <div key={p.id} className="flex items-center gap-3 bg-neutral-950 px-6 py-3 rounded-2xl border border-neutral-800 hover:border-emerald-500/40 transition-all">
                <img src={p.logo} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                <span className="text-sm font-bold text-white">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
