import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Play, Image, Video, Maximize2 } from 'lucide-react';

export default function MediaSection() {
  const { t, videos, photos, setActiveVideo, setActivePhoto } = useApp();
  const [mediaTab, setMediaTab] = useState('video'); // 'video' or 'photo'
  const [photoFilter, setPhotoFilter] = useState('all');

  const filteredPhotos = photoFilter === 'all'
    ? photos
    : photos.filter(p => p.category === photoFilter);

  return (
    <section id="media" className="py-24 bg-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">
              MEDIA GALLERY
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              {mediaTab === 'video' ? t.video.title : t.gallery.title}
            </h2>
            <p className="mt-2 text-gray-400 text-sm sm:text-base">
              {mediaTab === 'video' ? t.video.subtitle : t.gallery.subtitle}
            </p>
          </div>

          {/* Video / Photo Tab Selector */}
          <div className="flex items-center gap-3 bg-neutral-900 p-1.5 rounded-xl border border-neutral-800">
            <button
              onClick={() => setMediaTab('video')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                mediaTab === 'video' ? 'bg-emerald-600 text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>{t.nav.video}</span>
            </button>

            <button
              onClick={() => setMediaTab('photo')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                mediaTab === 'photo' ? 'bg-emerald-600 text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>{t.nav.gallery}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Video List */}
        {mediaTab === 'video' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => setActiveVideo(vid)}
                className="glass-panel rounded-3xl overflow-hidden border border-neutral-800 hover:border-emerald-500/40 transition-all group cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-neutral-950/20 transition-colors"></div>
                  
                  {/* Play Icon Badge */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white ml-1" />
                    </div>
                  </div>

                  <span className="absolute bottom-3 right-3 bg-neutral-950/90 border border-neutral-800 text-emerald-400 font-mono text-xs px-2.5 py-1 rounded-md">
                    {vid.duration}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {vid.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                    <span>{t.video.watchBtn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Photo Gallery with Lightbox trigger */}
        {mediaTab === 'photo' && (
          <div>
            {/* Filter Pills for Photos */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {[
                { id: 'all', label: t.gallery.all },
                { id: 'matches', label: t.gallery.matches },
                { id: 'camps', label: t.gallery.camps },
                { id: 'tournaments', label: t.gallery.tournaments },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPhotoFilter(tab.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                    photoFilter === tab.id
                      ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                      : 'bg-neutral-900 border border-neutral-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setActivePhoto(photo)}
                  className="glass-panel rounded-2xl overflow-hidden border border-neutral-800 hover:border-emerald-500/50 transition-all group cursor-pointer relative h-64"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                        {photo.category}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1">
                        {photo.title}
                      </h4>
                    </div>
                    <div className="p-2 rounded-lg bg-neutral-900/80 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
