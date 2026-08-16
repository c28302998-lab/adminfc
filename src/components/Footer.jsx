import React from 'react';
import Logo from './Logo';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  const { t, siteSettings } = useApp();

  return (
    <footer className="bg-black border-t border-neutral-900 pt-16 pb-12 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Logo className="h-12" />
            <p className="text-gray-400 text-xs font-light leading-relaxed">
              Развиваем талант. Создаем будущее. Профессиональная футбольная академия по европейским стандартам.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>UEFA Certified Academy</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-emerald-400 transition-colors">{t.nav.about}</a></li>
              <li><a href="#teams" className="hover:text-emerald-400 transition-colors">{t.nav.teams} (2008-2011)</a></li>
              <li><a href="#news" className="hover:text-emerald-400 transition-colors">{t.nav.news}</a></li>
              <li><a href="#tournaments" className="hover:text-emerald-400 transition-colors">{t.nav.tournaments}</a></li>
            </ul>
          </div>

          {/* Col 3: Academy */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase mb-4">Академия</h4>
            <ul className="space-y-2">
              <li><a href="#media" className="hover:text-emerald-400 transition-colors">{t.nav.video} & {t.nav.gallery}</a></li>
              <li><a href="#sponsors" className="hover:text-emerald-400 transition-colors">{t.nav.sponsors}</a></li>
              <li><a href="#academy" className="hover:text-emerald-400 transition-colors">{t.nav.academy}</a></li>
              <li><a href="#contacts" className="hover:text-emerald-400 transition-colors">{t.nav.contacts}</a></li>
            </ul>
          </div>

          {/* Col 4: Contacts summary */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase mb-4">Контакты</h4>
            <p className="text-gray-400 font-mono">{siteSettings?.contactAddress || 'ul. Sportowa 15, Warsaw'}</p>
            <p className="text-gray-400 font-mono mt-1">{siteSettings?.contactPhone || '+48 600 123 456'}</p>
            <p className="text-emerald-400 font-mono mt-1">{siteSettings?.contactEmail || 'info@footballchallenge.com'}</p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div>
            {siteSettings?.footerText || '© 2026 Football Challenge Academy. Все права защищены.'}
          </div>
          <div className="flex items-center gap-4">
            {siteSettings?.contactInsta && <a href={siteSettings.contactInsta} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">Instagram</a>}
            {siteSettings?.contactTg && <a href={siteSettings.contactTg} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">Telegram</a>}
            {siteSettings?.contactFb && <a href={siteSettings.contactFb} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">Facebook</a>}
            {siteSettings?.contactYt && <a href={siteSettings.contactYt} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">YouTube</a>}
            {siteSettings?.contactTk && <a href={siteSettings.contactTk} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">TikTok</a>}
          </div>
        </div>

      </div>
    </footer>
  );
}
