import React from 'react';
import Logo from './Logo';
import { useApp } from '../context/AppContext';
import { Trophy, Users, Award, Star, ArrowRight, CheckCircle } from 'lucide-react';

export default function Hero() {
  const { t, setIsTrialModalOpen, siteSettings } = useApp();

  const heroImage = siteSettings?.heroImage || "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1920&q=80";

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${heroImage}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/60 to-neutral-950"></div>
        <div className="absolute inset-0 bg-radial from-emerald-600/10 via-transparent to-transparent"></div>
      </div>

      {/* Floating Animated Accent Elements */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-600/15 rounded-full filter blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* UEFA Standard Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-8 backdrop-blur-md shadow-lg shadow-emerald-950/50">
          <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
          <span>{t.hero.badge}</span>
        </div>

        {/* Hero Logo Display */}
        <div className="mb-6 transform hover:scale-105 transition-transform duration-500">
          <Logo className="h-24 sm:h-32 md:h-40" />
        </div>

        {/* Main Slogan */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase font-sans max-w-4xl leading-none">
          <span className="green-gradient-text drop-shadow-md">{siteSettings?.heroTitle || t.hero.slogan}</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl font-light leading-relaxed">
          {siteSettings?.heroDescription || t.hero.subtext}
        </p>

        {/* CTA Buttons Group */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => setIsTrialModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-xl shadow-emerald-900/40 hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-1 group"
          >
            <span>{siteSettings?.heroButtonText || t.hero.ctaTrial}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#about"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-wider text-gray-200 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/60 rounded-xl backdrop-blur-md transition-all"
          >
            <span>{t.hero.ctaAbout}</span>
          </a>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl">
          <div className="glass-panel p-5 rounded-2xl border border-neutral-800/80 text-center hover:border-emerald-500/40 transition-all">
            <Users className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">250+</div>
            <div className="text-xs text-gray-400 uppercase font-medium mt-1">{t.hero.statPlayers}</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-neutral-800/80 text-center hover:border-emerald-500/40 transition-all">
            <Trophy className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">42</div>
            <div className="text-xs text-gray-400 uppercase font-medium mt-1">{t.hero.statTrophies}</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-neutral-800/80 text-center hover:border-emerald-500/40 transition-all">
            <Award className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">8</div>
            <div className="text-xs text-gray-400 uppercase font-medium mt-1">{t.hero.statLicensedCoaches}</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-neutral-800/80 text-center hover:border-emerald-500/40 transition-all">
            <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">18</div>
            <div className="text-xs text-gray-400 uppercase font-medium mt-1">{t.hero.statProContracts}</div>
          </div>
        </div>

      </div>
    </section>
  );
}
