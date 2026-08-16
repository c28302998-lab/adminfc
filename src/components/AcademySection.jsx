import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileText, CheckCircle2, UserCheck, CreditCard, ChevronRight, Download } from 'lucide-react';

export default function AcademySection() {
  const { t, addTrialApp } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    birthYear: '2008',
    parentName: '',
    phone: '',
    email: '',
    preferredTeam: '2008',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTrialApp(formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: '',
        birthYear: '2008',
        parentName: '',
        phone: '',
        email: '',
        preferredTeam: '2008',
      });
    }, 4000);
  };

  return (
    <section id="academy" className="py-24 bg-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">
            JOIN FOOTBALL CHALLENGE
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            {t.academy.title}
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            {t.academy.subtitle}
          </p>
        </div>

        {/* How to Join Steps (3 Steps) */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white uppercase text-center mb-10">
            {t.academy.howToTitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-3xl border border-neutral-800 relative">
              <div className="text-emerald-400 font-mono font-black text-4xl mb-4">01</div>
              <h4 className="text-xl font-bold text-white uppercase mb-2">{t.academy.step1Title}</h4>
              <p className="text-gray-400 text-sm font-light leading-relaxed">{t.academy.step1Text}</p>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-neutral-800 relative">
              <div className="text-emerald-400 font-mono font-black text-4xl mb-4">02</div>
              <h4 className="text-xl font-bold text-white uppercase mb-2">{t.academy.step2Title}</h4>
              <p className="text-gray-400 text-sm font-light leading-relaxed">{t.academy.step2Text}</p>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-neutral-800 relative">
              <div className="text-emerald-400 font-mono font-black text-4xl mb-4">03</div>
              <h4 className="text-xl font-bold text-white uppercase mb-2">{t.academy.step3Title}</h4>
              <p className="text-gray-400 text-sm font-light leading-relaxed">{t.academy.step3Text}</p>
            </div>
          </div>
        </div>


        {/* Embedded Trial Application Form */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-neutral-800 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <UserCheck className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
            <h3 className="text-2xl font-black text-white uppercase">{t.academy.formTitle}</h3>
            <p className="text-xs text-gray-400 mt-1">Заполните поля ниже, и мы свяжемся с вами</p>
          </div>

          {submitted ? (
            <div className="bg-emerald-950/80 border border-emerald-500 p-6 rounded-2xl text-center text-emerald-300 text-sm font-semibold animate-fadeIn">
              {t.academy.successMsg}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">{t.academy.fullName}</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Александр Иванов"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">{t.academy.birthYear}</label>
                  <select
                    value={formData.birthYear}
                    onChange={(e) => setFormData({ ...formData, birthYear: e.target.value, preferredTeam: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="2008">2008 (U-17)</option>
                    <option value="2009">2009 (U-16)</option>
                    <option value="2010">2010 (U-15)</option>
                    <option value="2011">2011 (U-14)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">{t.academy.parentName}</label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="Михаил Иванов"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">{t.academy.phone}</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+48 600 000 000"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">{t.academy.email}</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="parent@example.com"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-950/60 transition-all cursor-pointer mt-4"
              >
                {t.academy.submitTrial}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
