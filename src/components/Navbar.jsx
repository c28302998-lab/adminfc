import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { useApp } from '../context/AppContext';
import { Globe, Shield, Menu, X, UserCheck, Settings } from 'lucide-react';

export default function Navbar() {
  const { lang, setLang, t, setIsTrialModalOpen, setIsAdminModalOpen } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#teams", label: t.nav.teams },
    { href: "#news", label: t.nav.news },
    { href: "#tournaments", label: t.nav.tournaments },
    { href: "#media", label: t.nav.video },
    { href: "#sponsors", label: t.nav.sponsors },
    { href: "#academy", label: t.nav.academy },
    { href: "#contacts", label: t.nav.contacts },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-3 bg-neutral-950/90 backdrop-blur-md border-b border-emerald-900/30 shadow-2xl' : 'py-5 bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex-shrink-0 mr-6 lg:mr-10" onDoubleClick={(e) => { e.preventDefault(); setIsAdminModalOpen(true); }}>
          <Logo className="h-10 sm:h-14" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-emerald-400 transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions (Language Switcher, CTA Trial Button) */}
        <div className="hidden lg:flex items-center space-x-4">
          
          {/* Language Selector Pill */}
          <div className="flex items-center bg-neutral-900/80 border border-neutral-800 rounded-full p-1 text-xs">
            <Globe className="w-3.5 h-3.5 text-emerald-400 ml-2 mr-1" />
            {['ru', 'uk', 'pl', 'en'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-0.5 rounded-full font-bold uppercase transition-all ${
                  lang === l
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {l}
              </button>
            ))}
          </div>



          {/* Trial Registration CTA */}
          <button
            onClick={() => setIsTrialModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-lg shadow-emerald-900/30 hover:shadow-emerald-600/40 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <UserCheck className="w-4 h-4" />
            <span>{t.nav.joinTrial}</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center space-x-3 lg:hidden">
          {/* Language Selector Pill Mobile */}
          <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-full p-1 text-xs">
            {['ru', 'uk', 'pl', 'en'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  lang === l ? 'bg-emerald-600 text-white' : 'text-gray-400'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-neutral-900 text-gray-300 hover:text-white border border-neutral-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800 px-4 pt-4 pb-6 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold uppercase tracking-wider text-gray-300 hover:text-emerald-400 py-2 border-b border-neutral-900"
            >
              {link.label}
            </a>
          ))}
          
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsTrialModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-lg"
            >
              <UserCheck className="w-4 h-4" />
              <span>{t.nav.joinTrial}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
