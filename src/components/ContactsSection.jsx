import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Mail, Video } from 'lucide-react';

export default function ContactsSection() {
  const { t, siteSettings } = useApp();

  return (
    <section id="contacts" className="py-24 bg-neutral-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">
            GET IN TOUCH
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            {t.contacts.title}
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            {t.contacts.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Details Cards */}
          <div className="space-y-6">
            
            {/* Address */}
            <div className="glass-panel p-6 rounded-2xl border border-neutral-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase">{t.contacts.addressTitle}</h4>
                <p className="text-xs text-gray-300 mt-1">{siteSettings?.contactAddress || t.contacts.addressText}</p>
              </div>
            </div>

            {/* Phones */}
            <div className="glass-panel p-6 rounded-2xl border border-neutral-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase">{t.contacts.phoneTitle}</h4>
                <p className="text-xs font-mono text-gray-300 mt-1">{siteSettings?.contactPhone || '+48 600 123 456'}</p>
              </div>
            </div>

            {/* Email */}
            <div className="glass-panel p-6 rounded-2xl border border-neutral-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase">{t.contacts.emailTitle}</h4>
                <p className="text-xs font-mono text-gray-300 mt-1">{siteSettings?.contactEmail || 'info@footballchallenge.com'}</p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="glass-panel p-6 rounded-2xl border border-neutral-800">
              <h4 className="text-sm font-bold text-white uppercase mb-4">{t.contacts.socTitle}</h4>
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-emerald-500/40 text-xs font-semibold text-gray-300 hover:text-white transition-all"
                >
                  <svg className="w-4 h-4 fill-blue-500" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  <span>Facebook</span>
                </a>

                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-emerald-500/40 text-xs font-semibold text-gray-300 hover:text-white transition-all"
                >
                  <svg className="w-4 h-4 fill-pink-500" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  <span>Instagram</span>
                </a>

                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-emerald-500/40 text-xs font-semibold text-gray-300 hover:text-white transition-all"
                >
                  <Video className="w-4 h-4 text-emerald-400" />
                  <span>TikTok</span>
                </a>

                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-emerald-500/40 text-xs font-semibold text-gray-300 hover:text-white transition-all"
                >
                  <svg className="w-4 h-4 fill-red-500" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  <span>YouTube</span>
                </a>
              </div>
            </div>

          </div>

          {/* Interactive Google Map Embed */}
          <div className="lg:col-span-2 glass-panel rounded-3xl overflow-hidden border border-neutral-800 relative h-96 lg:h-auto min-h-[400px]">
            <iframe
              title="Football Challenge Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d156388.3543883017!2d20.921112449999998!3d52.2330653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471bcc51a16fe4d0%3A0x2f90119f187a5369!2sWarsaw%2C%20Poland!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              className="w-full h-full border-0 filter brightness-90 contrast-125 saturate-50"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
}
