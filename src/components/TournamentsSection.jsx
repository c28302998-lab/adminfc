import React from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Calendar, MapPin, Shield } from 'lucide-react';

export default function TournamentsSection() {
  const { t, teamsData } = useApp();

  // Consolidate upcoming & completed matches across teams
  const allUpcoming = [];
  const allCompleted = [];

  Object.keys(teamsData).forEach(year => {
    const team = teamsData[year];
    if (team.schedule) {
      team.schedule.forEach(m => allUpcoming.push({ ...m, year }));
    }
    if (team.results) {
      team.results.forEach(r => allCompleted.push({ ...r, year }));
    }
  });

  return (
    <section id="tournaments" className="py-24 bg-neutral-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">
            MATCH FIXTURES & STANDINGS
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            {t.tournaments.title}
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            {t.tournaments.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Upcoming Matches */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-neutral-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white uppercase">
                  {t.tournaments.upcoming}
                </h3>
                <span className="text-xs text-gray-400">National & International Cups</span>
              </div>
            </div>

            <div className="space-y-4">
              {allUpcoming.map((match) => (
                <div key={match.id} className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 hover:border-emerald-500/40 transition-all">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                    <span className="font-bold text-emerald-400 uppercase">{match.league} ({match.year})</span>
                    <span className="font-mono">{match.date} • {match.time}</span>
                  </div>

                  <div className="flex items-center justify-between text-center font-bold text-white text-sm sm:text-base py-1">
                    <span className="flex-1 text-right">{match.home}</span>
                    <span className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-lg text-emerald-400 font-mono text-xs font-bold mx-3">
                      VS
                    </span>
                    <span className="flex-1 text-left">{match.away}</span>
                  </div>

                  <div className="mt-3 pt-2 border-t border-neutral-900 flex items-center justify-between text-[11px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      {match.stadium}
                    </span>
                    <span className="text-emerald-400 font-semibold">{match.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Matches Archive */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-neutral-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white uppercase">
                  {t.tournaments.completed}
                </h3>
                <span className="text-xs text-gray-400">Latest match results</span>
              </div>
            </div>

            <div className="space-y-4">
              {allCompleted.map((match) => (
                <div key={match.id} className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-[11px] font-bold text-emerald-400 uppercase">{match.league} ({match.year})</div>
                    <div className="text-xs font-semibold text-white mt-1">{match.home} vs {match.away}</div>
                  </div>

                  <div className="px-4 py-2 bg-emerald-950 border border-emerald-500/40 rounded-xl text-emerald-300 font-mono font-extrabold text-base">
                    {match.score}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
