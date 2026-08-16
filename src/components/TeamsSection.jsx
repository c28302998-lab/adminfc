import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, User, Calendar, Trophy, BarChart3, Award, Phone, X } from 'lucide-react';

export default function TeamsSection() {
  const { t, teamsData, coaches } = useApp();
  const [selectedYear, setSelectedYear] = useState('2008');
  const [activeSubTab, setActiveSubTab] = useState('roster');
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const team = teamsData[selectedYear];

  return (
    <section id="teams" className="py-24 bg-neutral-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">
            ACADEMY AGE CATEGORIES
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            {t.teams.title}
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            {t.teams.subtitle}
          </p>
        </div>

        {/* Year Selector Cards (2008, 2009, 2010, 2011) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {['2008', '2009', '2010', '2011'].map((year) => {
            const isSelected = selectedYear === year;
            return (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`p-5 rounded-2xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-lg shadow-emerald-950/50 green-glow-box'
                    : 'glass-panel border-neutral-800 text-gray-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight">
                  {year}
                </div>
                <div className="text-xs font-semibold uppercase mt-1 text-emerald-400">
                  {year === '2008' && 'U-17 Squad'}
                  {year === '2009' && 'U-16 Squad'}
                  {year === '2010' && 'U-15 Squad'}
                  {year === '2011' && 'U-14 Squad'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Team Content Container */}
        {team && (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-neutral-800">
            
            {/* Team Header Title & Navigation Sub-Tabs */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-neutral-800 gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">
                  {team.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {t.teams.tabs.coach}: <span className="text-emerald-400 font-semibold">{team.coach.name}</span> ({team.coach.license})
                </p>
              </div>

              {/* Sub-Tabs Selector */}
              <div className="flex flex-wrap items-center gap-2 bg-neutral-950/80 p-1.5 rounded-xl border border-neutral-800">
                {[
                  { id: 'roster', label: t.teams.tabs.roster, icon: Users },
                  { id: 'coach', label: t.teams.tabs.coach, icon: User },
                  { id: 'schedule', label: t.teams.tabs.schedule, icon: Calendar },
                  { id: 'results', label: t.teams.tabs.results, icon: Trophy },
                  { id: 'standings', label: t.teams.tabs.standings, icon: BarChart3 },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeSubTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSubTab(tab.id)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'text-gray-400 hover:text-white hover:bg-neutral-900'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab 1: Roster (Состав) */}
            {activeSubTab === 'roster' && (
              <div className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {team.roster.map((player) => (
                    <div key={player.id} className="group relative bg-gradient-to-b from-neutral-800 to-neutral-950 rounded-2xl overflow-hidden border border-neutral-700 hover:border-emerald-500 transition-all duration-300 shadow-xl">
                      {/* Top right number */}
                      <div className="absolute top-3 right-4 text-4xl font-black italic text-white/90 drop-shadow-md z-10 font-mono">
                        {player.num}
                      </div>
                      
                      {/* Player Image */}
                      <div className="relative aspect-[3/4] w-full overflow-hidden">
                        <img 
                          src={player.image} 
                          alt={player.name} 
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Gradient overlay to transition smoothly to the dark bottom section */}
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent"></div>
                      </div>
                      
                      {/* Info Section */}
                      <div className="relative z-20 p-5 pt-0 text-center bg-neutral-950">
                        <h4 className="text-xl font-black text-white uppercase tracking-tight leading-tight">{player.name}</h4>
                        <p className="text-emerald-400 font-bold text-xs uppercase tracking-widest mt-1 mb-4">{player.pos}</p>
                        
                        <div className="flex justify-center gap-4 mb-4">
                           <div className="text-center">
                             <div className="text-white font-black font-mono text-lg">{player.goals}</div>
                             <div className="text-[10px] text-gray-400 uppercase font-bold">Голы</div>
                           </div>
                           <div className="text-center">
                             <div className="text-white font-black font-mono text-lg">{player.assists || 0}</div>
                             <div className="text-[10px] text-gray-400 uppercase font-bold">Пасы</div>
                           </div>
                        </div>

                        <button 
                          onClick={() => setSelectedPlayer(player)}
                          className="w-full py-2.5 rounded-xl border border-emerald-500/50 text-emerald-400 text-xs font-bold uppercase tracking-wider hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer"
                        >
                          Подробнее
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Head Coach (Тренер) */}
            {activeSubTab === 'coach' && (
              <div className="mt-8 flex justify-center sm:justify-start">
                {(() => {
                  const globalCoach = coaches.find(c => c.name === team.coach.name);
                  const coachImage = globalCoach?.image || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=300&q=80'; // Fallback
                  
                  return (
                    <div className="group relative bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-900/20 transition-all duration-300 w-full max-w-[280px]">
                      <div className="relative aspect-[3/4] w-full overflow-hidden border-b-2 border-emerald-500/20">
                        <div className="absolute top-3 left-3 text-3xl font-black italic text-emerald-500 drop-shadow-md z-10 font-mono">
                          COACH
                        </div>
                        <img 
                          src={coachImage} 
                          alt={team.coach.name} 
                          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>
                      </div>

                      <div className="p-4 pt-1 text-center relative z-10 bg-neutral-950">
                        <h4 className="text-lg font-black text-white uppercase tracking-wide leading-tight group-hover:text-emerald-400 transition-colors">
                          {team.coach.name}
                        </h4>
                        <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">
                          {team.coach.license}
                        </div>
                        
                        <div className="mt-4 border-t border-neutral-800 pt-3">
                          <p className="text-xs text-gray-400 font-light px-2 line-clamp-3">
                            {team.coach.bio}
                          </p>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-emerald-400 mt-4 bg-emerald-950/30 py-2 rounded-lg border border-emerald-900/50">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{team.coach.phone}</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Tab 3: Schedule (Расписание) */}
            {activeSubTab === 'schedule' && (
              <div className="mt-8 space-y-4">
                {team.schedule.map((match) => (
                  <div key={match.id} className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 live-indicator"></div>
                      <div>
                        <div className="text-xs font-bold text-emerald-400 uppercase">{match.league}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{match.stadium}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-center">
                      <span className="font-bold text-white text-sm sm:text-base">{match.home}</span>
                      <span className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-lg text-emerald-400 text-xs font-mono font-bold">
                        {match.time}
                      </span>
                      <span className="font-bold text-white text-sm sm:text-base">{match.away}</span>
                    </div>

                    <div className="text-xs text-gray-400 font-mono">
                      {match.date}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 4: Results (Результаты) */}
            {activeSubTab === 'results' && (
              <div className="mt-8 space-y-4">
                {team.results.map((match) => (
                  <div key={match.id} className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-xs font-bold text-emerald-400 uppercase">{match.league}</div>
                    
                    <div className="flex items-center gap-4 text-center">
                      <span className="font-bold text-white text-sm">{match.home}</span>
                      <span className="px-4 py-1.5 bg-emerald-950 border border-emerald-500/40 rounded-xl text-emerald-300 font-mono font-extrabold text-lg">
                        {match.score}
                      </span>
                      <span className="font-bold text-white text-sm">{match.away}</span>
                    </div>

                    <div className="text-xs text-gray-400 font-mono">{match.date}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 5: Standings Table (Турнирная таблица) */}
            {activeSubTab === 'standings' && (
              <div className="mt-8 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-neutral-800 text-xs font-bold uppercase text-gray-400">
                      <th className="py-3 px-4">{t.teams.tableRank}</th>
                      <th className="py-3 px-4">{t.teams.tableTeam}</th>
                      <th className="py-3 px-2 text-center">{t.teams.matchesPlayed}</th>
                      <th className="py-3 px-2 text-center">{t.teams.tableW}</th>
                      <th className="py-3 px-2 text-center">{t.teams.tableD}</th>
                      <th className="py-3 px-2 text-center">{t.teams.tableL}</th>
                      <th className="py-3 px-2 text-center">{t.teams.tableGF}</th>
                      <th className="py-3 px-2 text-center">{t.teams.tableGA}</th>
                      <th className="py-3 px-2 text-center">{t.teams.tableGD}</th>
                      <th className="py-3 px-4 text-center text-emerald-400 font-bold">{t.teams.tablePts}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900 font-mono">
                    {team.standings.map((row) => (
                      <tr 
                        key={row.rank} 
                        className={`hover:bg-neutral-900/60 ${row.team.includes('Football Challenge') ? 'bg-emerald-950/40 font-bold text-white' : 'text-gray-300'}`}
                      >
                        <td className="py-3.5 px-4 font-bold">{row.rank}</td>
                        <td className="py-3.5 px-4 font-sans font-semibold">{row.team}</td>
                        <td className="py-3.5 px-2 text-center">{row.w + row.d + row.l}</td>
                        <td className="py-3.5 px-2 text-center">{row.w}</td>
                        <td className="py-3.5 px-2 text-center">{row.d}</td>
                        <td className="py-3.5 px-2 text-center">{row.l}</td>
                        <td className="py-3.5 px-2 text-center">{row.gf}</td>
                        <td className="py-3.5 px-2 text-center">{row.ga}</td>
                        <td className="py-3.5 px-2 text-center">{row.gf - row.ga}</td>
                        <td className="py-3.5 px-4 text-center font-extrabold text-emerald-400 text-base">{row.pts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Player Details Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedPlayer(null)}>
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-2xl overflow-hidden relative shadow-2xl" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedPlayer(null)}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black text-white rounded-full transition-colors z-50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex flex-col md:flex-row min-h-[400px]">
              {/* Left side: Full bleed image */}
              <div className="md:w-2/5 relative overflow-hidden bg-neutral-950 flex-shrink-0 min-h-[300px] md:min-h-full border-b md:border-b-0 md:border-r border-neutral-800">
                <div className="absolute top-4 left-4 text-6xl font-black italic text-emerald-500 drop-shadow-lg font-mono z-20">
                  {selectedPlayer.num}
                </div>
                <img 
                  src={selectedPlayer.image} 
                  alt={selectedPlayer.name} 
                  className="absolute inset-0 w-full h-full object-cover object-center z-10"
                />
              </div>
              
              {/* Right side: Info */}
              <div className="md:w-3/5 p-8 flex flex-col justify-center relative z-20 bg-neutral-900 md:bg-transparent">
                <div className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-1">{selectedPlayer.pos}</div>
                <h3 className="text-3xl font-black text-white uppercase leading-none mb-6">{selectedPlayer.name}</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-neutral-950 p-6 rounded-3xl border border-neutral-800 text-center flex flex-col justify-center min-h-[110px]">
                    <div className="text-4xl font-black font-mono text-white mb-1.5">{selectedPlayer.goals}</div>
                    <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Забитые голы</div>
                  </div>
                  <div className="bg-neutral-950 p-6 rounded-3xl border border-neutral-800 text-center flex flex-col justify-center min-h-[110px]">
                    <div className="text-4xl font-black font-mono text-white mb-1.5">{selectedPlayer.assists || 0}</div>
                    <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Голевые передачи</div>
                  </div>
                  <div className="bg-neutral-950 p-6 rounded-3xl border border-neutral-800 text-center flex flex-col justify-center min-h-[110px]">
                    <div className="text-3xl font-bold font-mono text-white mb-1.5">{selectedPlayer.gamesPlayed || 0}</div>
                    <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Матчи</div>
                  </div>
                  <div className="bg-neutral-950 p-6 rounded-3xl border border-neutral-800 text-center flex flex-col justify-center min-h-[110px]">
                    <div className="text-3xl font-bold font-mono text-white mb-1.5">{selectedPlayer.height || '-'} <span className="text-lg">см</span></div>
                    <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Рост</div>
                  </div>
                </div>
                
                {selectedPlayer.bio ? (
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {selectedPlayer.bio}
                  </p>
                ) : (
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Перспективный игрок академии Football Challenge.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
