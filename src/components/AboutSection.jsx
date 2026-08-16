import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Target, Award, Users, ChevronRight } from 'lucide-react';

export default function AboutSection() {
  const { t, coaches, partners, siteSettings } = useApp();
  const aboutImage = siteSettings?.aboutImage || "https://images.unsplash.com/photo-1574629810360-7efbb19255cb?auto=format&fit=crop&w=1920&q=80";

  return (
    <section id="about" className="py-24 bg-neutral-950 relative overflow-hidden">
      
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url('${aboutImage}')` }}
      ></div>

      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-900/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">
            FOOTBALL CHALLENGE ACADEMY
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            {siteSettings.aboutTitle || t.about.title}
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            {siteSettings.aboutSubtitle || t.about.subtitle}
          </p>
        </div>

        {/* History & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          <div className="glass-panel p-8 rounded-3xl border border-neutral-800 hover:border-emerald-500/40 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white uppercase mb-4">
              {siteSettings.historyTitle || t.about.historyTitle}
            </h3>
            <p className="text-gray-300 leading-relaxed font-light whitespace-pre-wrap">
              {(() => {
                let text = siteSettings.historyText || t.about.historyText;
                if (text && text.includes('Legia')) {
                  text = text.replace(/ Legia Warszawa.*/i, '.').replace('..', '.');
                }
                return text;
              })()}
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-neutral-800 hover:border-emerald-500/40 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white uppercase mb-4">
              {siteSettings.missionTitle || t.about.missionTitle}
            </h3>
            <p className="text-gray-300 leading-relaxed font-light whitespace-pre-wrap">
              {siteSettings.missionText || t.about.missionText}
            </p>
          </div>

        </div>

        {/* Coaching Staff Section */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">
                {t.about.staffTitle}
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                {t.about.staffSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coaches.map((coach) => (
              <div 
                key={coach.id} 
                className="group relative bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-900/20 transition-all duration-300"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden border-b-2 border-emerald-500/20">
                  <div className="absolute top-3 left-3 text-3xl font-black italic text-emerald-500 drop-shadow-md z-10 font-mono">
                    COACH
                  </div>
                  <img 
                    src={coach.image} 
                    alt={coach.name} 
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>
                </div>

                <div className="p-4 pt-1 text-center relative z-10 bg-neutral-950">
                  <h4 className="text-lg font-black text-white uppercase tracking-wide leading-tight group-hover:text-emerald-400 transition-colors">
                    {coach.name}
                  </h4>
                  <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">
                    {coach.license}
                  </div>
                  
                  <div className="mt-4 border-t border-neutral-800 pt-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {coach.role}
                    </p>
                    <p className="text-xs text-emerald-400 mt-2">
                      {coach.experience}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partners Grid */}
        <div className="pt-10 border-t border-neutral-900">
          <div className="text-center mb-8">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400">
              {t.about.partnersTitle}
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
            {partners.map((partner) => (
              <div 
                key={partner.id} 
                className="glass-panel p-4 rounded-xl border border-neutral-800 flex items-center justify-center gap-3 hover:border-emerald-500/40 transition-all"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="w-8 h-8 rounded-lg object-cover filter grayscale hover:grayscale-0 transition-all"
                />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">{partner.name}</div>
                  <div className="text-[10px] text-emerald-400">{partner.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
