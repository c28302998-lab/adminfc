import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, User } from 'lucide-react';

export function VideoModal() {
  const { activeVideo, setActiveVideo } = useApp();

  if (!activeVideo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-neutral-950 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl">
        <button
          onClick={() => setActiveVideo(null)}
          className="absolute top-4 right-4 z-10 p-2.5 text-white bg-neutral-900/80 hover:bg-neutral-800 rounded-full border border-neutral-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${activeVideo.youtubeId || 'dQw4w9WgXcQ'}?autoplay=1`}
            title={activeVideo.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-white">{activeVideo.title}</h3>
        </div>
      </div>
    </div>
  );
}

export function PhotoModal() {
  const { activePhoto, setActivePhoto } = useApp();

  if (!activePhoto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-fadeIn" onClick={() => setActivePhoto(null)}>
      <div className="relative max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setActivePhoto(null)}
          className="absolute -top-12 right-0 p-2.5 text-white bg-neutral-900 hover:bg-neutral-800 rounded-full border border-neutral-700"
        >
          <X className="w-6 h-6" />
        </button>

        <img
          src={activePhoto.url}
          alt={activePhoto.title}
          className="max-h-[80vh] w-auto max-w-full rounded-2xl border border-neutral-800 shadow-2xl object-contain"
        />

        <div className="mt-4 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-500/30">
            {activePhoto.category}
          </span>
          <h3 className="text-lg font-bold text-white mt-2">{activePhoto.title}</h3>
        </div>
      </div>
    </div>
  );
}

export function ArticleModal() {
  const { activeArticle, setActiveArticle, t } = useApp();

  if (!activeArticle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn" onClick={() => setActiveArticle(null)}>
      <div className="glass-panel-accent w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl border border-neutral-800 relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setActiveArticle(null)}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full bg-neutral-900 border border-neutral-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-64 rounded-2xl overflow-hidden mb-6 border border-neutral-800">
          <img
            src={activeArticle.image}
            alt={activeArticle.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
          <span className="absolute top-4 left-4 bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full">
            {activeArticle.category}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3 font-mono">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            {activeArticle.date}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-emerald-400" />
            {activeArticle.author}
          </span>
        </div>

        <h2 className="text-2xl font-black text-white uppercase mb-4">
          {activeArticle.title}
        </h2>

        <div className="text-gray-300 text-sm leading-relaxed font-light space-y-4">
          <p>{activeArticle.content}</p>
        </div>
      </div>
    </div>
  );
}
