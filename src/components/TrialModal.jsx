import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, UserCheck } from 'lucide-react';

export function TrialModal() {
  const { isTrialModalOpen, setIsTrialModalOpen, t, addTrialApp } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    birthYear: '2008',
    parentName: '',
    phone: '',
    email: '',
    preferredTeam: '2008',
  });

  if (!isTrialModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addTrialApp(formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsTrialModalOpen(false);
      setFormData({
        fullName: '',
        birthYear: '2008',
        parentName: '',
        phone: '',
        email: '',
        preferredTeam: '2008',
      });
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-accent w-full max-w-lg p-6 sm:p-8 rounded-3xl border border-emerald-500/40 relative shadow-2xl">
        <button
          onClick={() => setIsTrialModalOpen(false)}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full bg-neutral-900 border border-neutral-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center mx-auto mb-3">
            <UserCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-black text-white uppercase">{t.academy.formTitle}</h3>
          <p className="text-xs text-gray-400 mt-1">Football Challenge Academy</p>
        </div>

        {submitted ? (
          <div className="bg-emerald-950 border border-emerald-500 p-6 rounded-2xl text-center text-emerald-300 text-sm font-semibold">
            {t.academy.successMsg}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">{t.academy.fullName}</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                placeholder="Имя Фамилия"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">{t.academy.birthYear}</label>
                <select
                  value={formData.birthYear}
                  onChange={(e) => setFormData({ ...formData, birthYear: e.target.value, preferredTeam: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="2008">2008 (U-17)</option>
                  <option value="2009">2009 (U-16)</option>
                  <option value="2010">2010 (U-15)</option>
                  <option value="2011">2011 (U-14)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">{t.academy.parentName}</label>
                <input
                  type="text"
                  required
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Родитель"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">{t.academy.phone}</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  placeholder="+48 000 000 000"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">{t.academy.email}</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg transition-all cursor-pointer mt-4"
            >
              {t.academy.submitTrial}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function SponsorModal() {
  const { isSponsorModalOpen, setIsSponsorModalOpen, t, addSponsorApp } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    tier: 'General Partner',
  });

  if (!isSponsorModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addSponsorApp(formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsSponsorModalOpen(false);
      setFormData({
        companyName: '',
        contactName: '',
        phone: '',
        email: '',
        tier: 'General Partner',
      });
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-accent w-full max-w-lg p-6 sm:p-8 rounded-3xl border border-emerald-500/40 relative shadow-2xl">
        <button
          onClick={() => setIsSponsorModalOpen(false)}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full bg-neutral-900 border border-neutral-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-black text-white uppercase">{t.sponsors.cta}</h3>
          <p className="text-xs text-gray-400 mt-1">Оставьте ваши контакты для обсуждения деталей</p>
        </div>

        {submitted ? (
          <div className="bg-emerald-950 border border-emerald-500 p-6 rounded-2xl text-center text-emerald-300 text-sm font-semibold">
            Спасибо за обращение! Наш менеджер по партнерству свяжется с вами.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Название компании</label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                placeholder="ООО Компания"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Контактное лицо</label>
              <input
                type="text"
                required
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                placeholder="Имя Фамилия"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Телефон</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  placeholder="+48 000 000 000"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">E-mail</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  placeholder="sponsor@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Пакет партнерства</label>
              <select
                value={formData.tier}
                onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="General Partner">{t.sponsors.general}</option>
                <option value="Technical Sponsor">{t.sponsors.technical}</option>
                <option value="Gold Partner">{t.sponsors.gold}</option>
                <option value="Academy Partner">{t.sponsors.silver}</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg transition-all cursor-pointer mt-4"
            >
              Отправить заявку
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
