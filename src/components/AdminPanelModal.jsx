import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Plus, Trash2, Newspaper, Video, Users, Handshake, Lock, Key, LogOut, ShieldCheck, Eye, EyeOff, Settings, UserCircle, Image as ImageIcon } from 'lucide-react';

export default function AdminPanelModal() {
  const { 
    isAdminModalOpen, 
    setIsAdminModalOpen, 
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    changeAdminPassword,
    t, 
    news, 
    addNews, 
    deleteNews, 
    trialApplications, 
    sponsorApplications,
    addPhoto,
    addVideo,
    teamsData,
    addPlayer,
    updatePlayer,
    deletePlayer,
    updateTeamCoach,
    addTeamSchedule,
    deleteTeamSchedule,
    addTeamResult,
    deleteTeamResult,
    updateTeamStandings,
    siteSettings,
    updateSiteSettings,
    coaches,
    addCoach,
    updateCoach,
    deleteCoach,
    partners,
    addPartner,
    deletePartner,
    themeSettings,
    setThemeSettings,
    customTranslations,
    setCustomTranslations
  } = useApp();

  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('news');
  const [showChangePwd, setShowChangePwd] = useState(false);
  const [newPwdInput, setNewPwdInput] = useState('');

  // Form states for creating news
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsCategory, setNewNewsCategory] = useState('matches');
  const [newNewsContent, setNewNewsContent] = useState('');
  const [newNewsImage, setNewNewsImage] = useState('');

  // Form states for media
  const [mediaType, setMediaType] = useState('photo');
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaCategory, setMediaCategory] = useState('tournaments');

  // Settings state
  const [formSettings, setFormSettings] = useState(siteSettings || {});
  
  // Theme & Translations
  const [themeInput, setThemeInput] = useState(themeSettings?.primaryColor || '#10b981');
  const [translationsInput, setTranslationsInput] = useState(JSON.stringify(customTranslations, null, 2));

  // Player Form states
  const [selectedTeam, setSelectedTeam] = useState('2008');
  const [teamAdminSubTab, setTeamAdminSubTab] = useState('roster'); // roster, schedule, results, standings
  const [isEditingPlayer, setIsEditingPlayer] = useState(false);
  const [editingPlayerId, setEditingPlayerId] = useState(null);

  const [teamCoachForm, setTeamCoachForm] = useState({ name: '', license: '', phone: '', bio: '' });

  // Schedule forms
  const [scheduleHome, setScheduleHome] = useState('');
  const [scheduleAway, setScheduleAway] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [scheduleStadium, setScheduleStadium] = useState('');
  const [scheduleLeague, setScheduleLeague] = useState('');

  // Result forms
  const [resultHome, setResultHome] = useState('');
  const [resultAway, setResultAway] = useState('');
  const [resultScore, setResultScore] = useState('');
  const [resultDate, setResultDate] = useState('');
  const [resultLeague, setResultLeague] = useState('');

  // Standings JSON
  const [standingsJSON, setStandingsJSON] = useState('[]');

  // Sync team coach and standings when team changes
  useEffect(() => {
    if (teamsData[selectedTeam]?.coach) {
      setTeamCoachForm(teamsData[selectedTeam].coach);
    } else {
      setTeamCoachForm({ name: '', license: '', phone: '', bio: '' });
    }

    if (teamsData[selectedTeam]?.standings) {
      setStandingsJSON(JSON.stringify(teamsData[selectedTeam].standings, null, 2));
    } else {
      setStandingsJSON('[]');
    }
  }, [selectedTeam, teamsData]);
  
  const [playerName, setPlayerName] = useState('');
  const [playerPosition, setPlayerPosition] = useState('');
  const [playerNumber, setPlayerNumber] = useState('');
  const [playerGoals, setPlayerGoals] = useState('0');
  const [playerMatches, setPlayerMatches] = useState('0');
  const [playerBirthYear, setPlayerBirthYear] = useState('');
  const [playerImageBase64, setPlayerImageBase64] = useState('');

  // Coach Form states
  const [isEditingCoach, setIsEditingCoach] = useState(false);
  const [editingCoachId, setEditingCoachId] = useState(null);
  const [coachName, setCoachName] = useState('');
  const [coachRole, setCoachRole] = useState('');
  const [coachLicense, setCoachLicense] = useState('');
  const [coachExperience, setCoachExperience] = useState('');
  const [coachImageBase64, setCoachImageBase64] = useState('');

  // Partner Form states
  const [partnerName, setPartnerName] = useState('');
  const [partnerType, setPartnerType] = useState('');
  const [partnerLogoBase64, setPartnerLogoBase64] = useState('');

  // Image resizing helper
  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // compress to save localStorage space but keep decent quality
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setter(dataUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  if (!isAdminModalOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    const success = loginAdmin(passwordInput);
    if (success) {
      setLoginError(false);
      setPasswordInput('');
    } else {
      setLoginError(true);
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPwdInput.trim().length < 4) {
      alert('Пароль должен быть не менее 4 символов');
      return;
    }
    changeAdminPassword(newPwdInput.trim());
    alert('Пароль администратора успешно изменен!');
    setNewPwdInput('');
    setShowChangePwd(false);
  };

  const handleAddNewsSubmit = (e) => {
    e.preventDefault();
    addNews({
      title: newNewsTitle,
      category: newNewsCategory,
      content: newNewsContent,
      author: 'Администратор CMS',
      date: new Date().toLocaleDateString(),
      image: newNewsImage || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80'
    });
    setNewNewsTitle('');
    setNewNewsContent('');
    setNewNewsImage('');
    alert('Новость успешно опубликована!');
  };

  const handleAddMediaSubmit = (e) => {
    e.preventDefault();
    if (mediaType === 'photo') {
      addPhoto({
        title: mediaTitle,
        category: mediaCategory,
        url: mediaUrl || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80'
      });
      alert('Фотография успешно добавлена в галерею!');
    } else {
      addVideo({
        title: mediaTitle,
        category: mediaCategory,
        duration: '05:00',
        youtubeId: 'dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80'
      });
      alert('Видео успешно добавлено!');
    }
    setMediaTitle('');
    setMediaUrl('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-accent w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl border border-emerald-500/40 relative shadow-2xl">
        


        {/* --- PASSWORD AUTHENTICATION SCREEN --- */}
        {!isAdminAuthenticated ? (
          <div className="max-w-md mx-auto py-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 green-glow-box">
              <Lock className="w-8 h-8 text-emerald-400" />
            </div>

            <h2 className="text-2xl font-black text-white uppercase">Вход в панель CMS</h2>
            <p className="text-xs text-gray-400 mt-1 mb-6">Football Challenge Administrative Access</p>

            {loginError && (
              <div className="mb-4 bg-red-950/80 border border-red-500/50 p-3 rounded-xl text-red-300 text-xs font-semibold animate-pulse">
                Неверный пароль. Попробуйте еще раз.
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Пароль администратора</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => { setPasswordInput(e.target.value); setLoginError(false); }}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 pr-10"
                    placeholder="Введите пароль..."
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg transition-all cursor-pointer"
              >
                Войти в систему
              </button>
            </form>
          </div>
        ) : (
          /* --- AUTHENTICATED CMS DASHBOARD --- */
          <div>
            {/* Modal Header with User Status and Logout */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-neutral-800 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-500/30">
                    ADMINISTRATOR SYSTEM
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono bg-neutral-900 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3 h-3" />
                    AUTHENTICATED
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white uppercase mt-2">
                  {t.admin.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowChangePwd(!showChangePwd)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-semibold text-gray-300 border border-neutral-800"
                >
                  <Key className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Сменить пароль</span>
                </button>

                <button
                  onClick={logoutAdmin}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-xs font-semibold text-red-300 border border-red-900/40"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Выйти</span>
                </button>
              </div>
            </div>

            {/* Change Password Bar */}
            {showChangePwd && (
              <form onSubmit={handleChangePassword} className="mb-6 p-4 rounded-2xl bg-neutral-950 border border-emerald-500/40 flex flex-col sm:flex-row gap-3 items-center">
                <input
                  type="password"
                  required
                  value={newPwdInput}
                  onChange={(e) => setNewPwdInput(e.target.value)}
                  placeholder="Новый пароль (мин 4 символа)..."
                  className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase rounded-xl"
                >
                  Сохранить пароль
                </button>
              </form>
            )}

            {/* CMS Tabs Selector */}
            <div className="flex flex-wrap items-center gap-2 pb-4 mb-6 border-b border-neutral-800">
              <button
                onClick={() => setActiveAdminTab('news')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                  activeAdminTab === 'news' ? 'bg-emerald-600 text-white' : 'bg-neutral-900 text-gray-400 hover:text-white'
                }`}
              >
                <Newspaper className="w-4 h-4" />
                <span>{t.admin.tabNews}</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('media')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                  activeAdminTab === 'media' ? 'bg-emerald-600 text-white' : 'bg-neutral-900 text-gray-400 hover:text-white'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>{t.admin.tabMedia}</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('trials')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                  activeAdminTab === 'trials' ? 'bg-emerald-600 text-white' : 'bg-neutral-900 text-gray-400 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>{t.admin.tabApplications} ({trialApplications.length})</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('sponsors')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                  activeAdminTab === 'sponsors' ? 'bg-emerald-600 text-white' : 'bg-neutral-900 text-gray-400 hover:text-white'
                }`}
              >
                <Handshake className="w-4 h-4" />
                <span>{t.admin.tabSponsorsReq} ({sponsorApplications.length})</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('rosters')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                  activeAdminTab === 'rosters' ? 'bg-emerald-600 text-white' : 'bg-neutral-900 text-gray-400 hover:text-white'
                }`}
              >
                <UserCircle className="w-4 h-4" />
                <span>Составы</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('settings')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                  activeAdminTab === 'settings' ? 'bg-emerald-600 text-white' : 'bg-neutral-900 text-gray-400 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Настройки сайта</span>
              </button>
              
              <button
                onClick={() => setActiveAdminTab('coaches')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                  activeAdminTab === 'coaches' ? 'bg-emerald-600 text-white' : 'bg-neutral-900 text-gray-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Тренеры</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('partners')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                  activeAdminTab === 'partners' ? 'bg-emerald-600 text-white' : 'bg-neutral-900 text-gray-400 hover:text-white'
                }`}
              >
                <Handshake className="w-4 h-4" />
                <span>Партнеры</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('design')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                  activeAdminTab === 'design' ? 'bg-emerald-600 text-white' : 'bg-neutral-900 text-gray-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Дизайн</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('translations')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                  activeAdminTab === 'translations' ? 'bg-emerald-600 text-white' : 'bg-neutral-900 text-gray-400 hover:text-white'
                }`}
              >
                <Newspaper className="w-4 h-4" />
                <span>Тексты (JSON)</span>
              </button>
            </div>

            {/* Tab 1: Manage News */}
            {activeAdminTab === 'news' && (
              <div className="space-y-8">
                {/* Create News Form */}
                <form onSubmit={handleAddNewsSubmit} className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase text-emerald-400">{t.admin.addNewsBtn}</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">{t.admin.titleInput}</label>
                      <input
                        type="text"
                        required
                        value={newNewsTitle}
                        onChange={(e) => setNewNewsTitle(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                        placeholder="Заголовок статьи"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">{t.admin.categoryInput}</label>
                      <select
                        value={newNewsCategory}
                        onChange={(e) => setNewNewsCategory(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="matches">{t.news.matches}</option>
                        <option value="tournaments">{t.news.tournaments}</option>
                        <option value="life">{t.news.life}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">{t.admin.imageInput}</label>
                    <input
                      type="url"
                      value={newNewsImage}
                      onChange={(e) => setNewNewsImage(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">{t.admin.contentInput}</label>
                    <textarea
                      rows="3"
                      required
                      value={newNewsContent}
                      onChange={(e) => setNewNewsContent(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                      placeholder="Полный текст новости..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-bold uppercase text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow cursor-pointer"
                  >
                    {t.admin.save}
                  </button>
                </form>

                {/* News Feed Items with Delete Button */}
                <div>
                  <h3 className="text-sm font-bold text-white uppercase mb-4">Опубликованные новости ({news.length})</h3>
                  <div className="space-y-3">
                    {news.map((item) => (
                      <div key={item.id} className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.title} className="w-12 h-12 rounded-xl object-cover" />
                          <div>
                            <h4 className="text-sm font-bold text-white">{item.title}</h4>
                            <div className="text-[11px] text-gray-400">{item.date} • {item.category}</div>
                          </div>
                        </div>

                        <button
                          onClick={() => deleteNews(item.id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/50 rounded-lg border border-red-900/40"
                          title={t.admin.delete}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Manage Media */}
            {activeAdminTab === 'media' && (
              <form onSubmit={handleAddMediaSubmit} className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase text-emerald-400">{t.admin.addMediaBtn}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Тип медиа</label>
                    <select
                      value={mediaType}
                      onChange={(e) => setMediaType(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="photo">Фотография</option>
                      <option value="video">Видео (YouTube)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">{t.admin.categoryInput}</label>
                    <select
                      value={mediaCategory}
                      onChange={(e) => setMediaCategory(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="matches">{t.gallery.matches}</option>
                      <option value="camps">{t.gallery.camps}</option>
                      <option value="tournaments">{t.gallery.tournaments}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">{t.admin.titleInput}</label>
                  <input
                    type="text"
                    required
                    value={mediaTitle}
                    onChange={(e) => setMediaTitle(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    placeholder="Описание медиа..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">URL адрес</label>
                  <input
                    type="url"
                    required
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    placeholder="https://..."
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold uppercase text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow cursor-pointer"
                >
                  {t.admin.save}
                </button>
              </form>
            )}

            {/* Tab 3: Trial Applications */}
            {activeAdminTab === 'trials' && (
              <div className="space-y-4">
                {trialApplications.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-sm">{t.admin.noApps}</div>
                ) : (
                  trialApplications.map((app) => (
                    <div key={app.id} className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                          Команда {app.preferredTeam}
                        </span>
                        <h4 className="text-base font-bold text-white mt-1">{app.fullName} ({app.birthYear} г.р.)</h4>
                        <div className="text-xs text-gray-400 mt-1">
                          Родитель: <span className="text-gray-200">{app.parentName}</span>
                        </div>
                      </div>

                      <div className="text-left sm:text-right text-xs font-mono text-emerald-400">
                        <div>{app.phone}</div>
                        <div className="text-gray-400">{app.email}</div>
                        <div className="text-[10px] text-gray-500 mt-1">{app.date}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 4: Sponsor Requests */}
            {activeAdminTab === 'sponsors' && (
              <div className="space-y-4">
                {sponsorApplications.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-sm">{t.admin.noApps}</div>
                ) : (
                  sponsorApplications.map((req) => (
                    <div key={req.id} className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                          {req.tier}
                        </span>
                        <h4 className="text-base font-bold text-white mt-1">{req.companyName}</h4>
                        <div className="text-xs text-gray-400 mt-1">
                          Контакт: <span className="text-gray-200">{req.contactName}</span>
                        </div>
                      </div>

                      <div className="text-left sm:text-right text-xs font-mono text-emerald-400">
                        <div>{req.phone}</div>
                        <div className="text-gray-400">{req.email}</div>
                        <div className="text-[10px] text-gray-500 mt-1">{req.date}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 5: Rosters */}
            {activeAdminTab === 'rosters' && (
              <div className="space-y-8">
                <div className="flex gap-2 border-b border-neutral-800 pb-4 overflow-x-auto">
                  {Object.keys(teamsData).map(year => (
                    <button
                      key={year}
                      onClick={() => { setSelectedTeam(year); setIsEditingPlayer(false); }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all whitespace-nowrap ${selectedTeam === year ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50' : 'bg-neutral-900 text-gray-400 border border-neutral-800 hover:text-white'}`}
                    >
                      Команда {year}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2 border-b border-neutral-800 pb-4 overflow-x-auto">
                  {[
                    { id: 'roster', label: 'Состав и Тренер' },
                    { id: 'schedule', label: 'Расписание' },
                    { id: 'results', label: 'Результаты' },
                    { id: 'standings', label: 'Турнирная таблица' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setTeamAdminSubTab(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all whitespace-nowrap ${teamAdminSubTab === tab.id ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-500/30' : 'bg-transparent text-gray-400 hover:text-white'}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {teamAdminSubTab === 'roster' && (
                  <>
                    <form onSubmit={(e) => {
                  e.preventDefault();
                  updateTeamCoach(selectedTeam, teamCoachForm);
                  alert('Тренер команды обновлен!');
                }} className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4 mb-8">
                  <h3 className="text-sm font-bold text-white uppercase text-emerald-400">Тренер команды {selectedTeam}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Имя тренера</label>
                      <input type="text" required value={teamCoachForm?.name || ''} onChange={e => setTeamCoachForm({...teamCoachForm, name: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="Напр. Марек Новак" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Лицензия</label>
                      <input type="text" value={teamCoachForm?.license || ''} onChange={e => setTeamCoachForm({...teamCoachForm, license: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="Напр. UEFA 'A' License" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Телефон</label>
                      <input type="text" value={teamCoachForm?.phone || ''} onChange={e => setTeamCoachForm({...teamCoachForm, phone: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="Напр. +48 600 222 333" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">О тренере</label>
                      <input type="text" value={teamCoachForm?.bio || ''} onChange={e => setTeamCoachForm({...teamCoachForm, bio: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="Эксперт по технике..." />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all">
                      Сохранить тренера
                    </button>
                  </div>
                </form>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  const payload = {
                    name: playerName,
                    position: playerPosition,
                    number: playerNumber,
                    goals: playerGoals,
                    matches: playerMatches,
                    birthYear: playerBirthYear,
                    image: playerImageBase64 || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=400&q=80'
                  };
                  if (isEditingPlayer) {
                    updatePlayer(selectedTeam, editingPlayerId, payload);
                    alert('Данные игрока обновлены!');
                  } else {
                    addPlayer(selectedTeam, payload);
                    alert('Игрок добавлен!');
                  }
                  setPlayerName('');
                  setPlayerPosition('');
                  setPlayerNumber('');
                  setPlayerGoals('0');
                  setPlayerMatches('0');
                  setPlayerBirthYear('');
                  setPlayerImageBase64('');
                  setIsEditingPlayer(false);
                }} className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase text-emerald-400">
                    {isEditingPlayer ? 'Редактировать игрока' : 'Добавить нового игрока'}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">ФИО Игрока</label>
                      <input type="text" required value={playerName} onChange={e => setPlayerName(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="Иван Иванов" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Позиция (напр. Нападающий (ST))</label>
                      <input type="text" required value={playerPosition} onChange={e => setPlayerPosition(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="Нападающий (ST)" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Номер на футболке</label>
                      <input type="text" value={playerNumber} onChange={e => setPlayerNumber(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="10" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Год рождения</label>
                      <input type="text" value={playerBirthYear} onChange={e => setPlayerBirthYear(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="2008" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Голы</label>
                      <input type="number" value={playerGoals} onChange={e => setPlayerGoals(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Матчи</label>
                      <input type="number" value={playerMatches} onChange={e => setPlayerMatches(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1 flex items-center gap-2"><ImageIcon className="w-4 h-4"/> Фото (загрузить с устройства)</label>
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setPlayerImageBase64)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-900 file:text-emerald-300 hover:file:bg-emerald-800" />
                      {playerImageBase64 && <img src={playerImageBase64} alt="Preview" className="mt-3 w-16 h-16 object-cover rounded-xl border border-emerald-500/50" />}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button type="submit" className="px-6 py-2.5 text-xs font-bold uppercase text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow cursor-pointer">
                      {isEditingPlayer ? 'Сохранить изменения' : 'Добавить игрока'}
                    </button>
                    {isEditingPlayer && (
                      <button type="button" onClick={() => {
                        setIsEditingPlayer(false);
                        setPlayerName('');
                        setPlayerPosition('');
                        setPlayerNumber('');
                        setPlayerGoals('0');
                        setPlayerMatches('0');
                        setPlayerBirthYear('');
                        setPlayerImageBase64('');
                      }} className="px-6 py-2.5 text-xs font-bold uppercase text-gray-300 bg-neutral-800 hover:bg-neutral-700 rounded-xl cursor-pointer">
                        Отмена
                      </button>
                    )}
                  </div>
                </form>

                <div>
                  <h3 className="text-sm font-bold text-white uppercase mb-4">Текущий состав {selectedTeam} ({teamsData[selectedTeam]?.roster.length || 0})</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {teamsData[selectedTeam]?.roster.map(p => (
                      <div key={p.id} className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="w-12 h-12 rounded-full object-cover border border-neutral-800" />
                          <div>
                            <h4 className="text-sm font-bold text-white">{p.name} {p.number ? `(#${p.number})` : ''}</h4>
                            <div className="text-[11px] text-gray-400">{p.position}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => {
                            setIsEditingPlayer(true);
                            setEditingPlayerId(p.id);
                            setPlayerName(p.name || '');
                            setPlayerPosition(p.position || '');
                            setPlayerNumber(p.number || '');
                            setPlayerGoals(p.goals || '0');
                            setPlayerMatches(p.matches || '0');
                            setPlayerBirthYear(p.birthYear || '');
                            setPlayerImageBase64(p.image || '');
                          }} className="p-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/50 rounded-lg border border-emerald-900/40">
                            Изменить
                          </button>
                          <button onClick={() => deletePlayer(selectedTeam, p.id)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/50 rounded-lg border border-red-900/40">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                </>
                )}

                {teamAdminSubTab === 'schedule' && (
                  <div className="space-y-6">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      addTeamSchedule(selectedTeam, {
                        home: scheduleHome,
                        away: scheduleAway,
                        date: scheduleDate,
                        time: scheduleTime,
                        stadium: scheduleStadium,
                        league: scheduleLeague,
                        status: 'Upcoming'
                      });
                      alert('Матч добавлен в расписание!');
                      setScheduleHome('');
                      setScheduleAway('');
                      setScheduleDate('');
                      setScheduleTime('');
                      setScheduleStadium('');
                      setScheduleLeague('');
                    }} className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
                      <h3 className="text-sm font-bold text-white uppercase text-emerald-400">Добавить матч (Расписание)</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><label className="block text-xs text-gray-500 mb-1">Домашняя команда</label><input type="text" required value={scheduleHome} onChange={e => setScheduleHome(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" /></div>
                        <div><label className="block text-xs text-gray-500 mb-1">Гостевая команда</label><input type="text" required value={scheduleAway} onChange={e => setScheduleAway(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" /></div>
                        <div><label className="block text-xs text-gray-500 mb-1">Дата</label><input type="date" required value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" /></div>
                        <div><label className="block text-xs text-gray-500 mb-1">Время</label><input type="time" required value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" /></div>
                        <div><label className="block text-xs text-gray-500 mb-1">Стадион</label><input type="text" required value={scheduleStadium} onChange={e => setScheduleStadium(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" /></div>
                        <div><label className="block text-xs text-gray-500 mb-1">Турнир</label><input type="text" required value={scheduleLeague} onChange={e => setScheduleLeague(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" /></div>
                      </div>
                      <div className="flex justify-end"><button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all">Добавить</button></div>
                    </form>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase mb-4">Текущее расписание</h3>
                      <div className="space-y-2">
                        {teamsData[selectedTeam]?.schedule?.map(m => (
                          <div key={m.id} className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex items-center justify-between gap-4">
                            <div><div className="text-sm text-white font-bold">{m.home} - {m.away}</div><div className="text-xs text-gray-400">{m.date} {m.time} | {m.stadium} | {m.league}</div></div>
                            <button onClick={() => deleteTeamSchedule(selectedTeam, m.id)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/50 rounded-lg border border-red-900/40"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {teamAdminSubTab === 'results' && (
                  <div className="space-y-6">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      addTeamResult(selectedTeam, {
                        home: resultHome,
                        away: resultAway,
                        score: resultScore,
                        date: resultDate,
                        league: resultLeague
                      });
                      alert('Результат добавлен!');
                      setResultHome('');
                      setResultAway('');
                      setResultScore('');
                      setResultDate('');
                      setResultLeague('');
                    }} className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
                      <h3 className="text-sm font-bold text-white uppercase text-emerald-400">Добавить результат</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><label className="block text-xs text-gray-500 mb-1">Домашняя команда</label><input type="text" required value={resultHome} onChange={e => setResultHome(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" /></div>
                        <div><label className="block text-xs text-gray-500 mb-1">Гостевая команда</label><input type="text" required value={resultAway} onChange={e => setResultAway(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" /></div>
                        <div><label className="block text-xs text-gray-500 mb-1">Счет</label><input type="text" required value={resultScore} onChange={e => setResultScore(e.target.value)} placeholder="Напр. 3 : 1" className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" /></div>
                        <div><label className="block text-xs text-gray-500 mb-1">Дата</label><input type="date" required value={resultDate} onChange={e => setResultDate(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" /></div>
                        <div className="col-span-1 sm:col-span-2"><label className="block text-xs text-gray-500 mb-1">Турнир</label><input type="text" required value={resultLeague} onChange={e => setResultLeague(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" /></div>
                      </div>
                      <div className="flex justify-end"><button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all">Добавить</button></div>
                    </form>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase mb-4">Сыгранные матчи</h3>
                      <div className="space-y-2">
                        {teamsData[selectedTeam]?.results?.map(r => (
                          <div key={r.id} className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex items-center justify-between gap-4">
                            <div><div className="text-sm text-white font-bold">{r.home} <span className="text-emerald-400 px-2">{r.score}</span> {r.away}</div><div className="text-xs text-gray-400">{r.date} | {r.league}</div></div>
                            <button onClick={() => deleteTeamResult(selectedTeam, r.id)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/50 rounded-lg border border-red-900/40"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {teamAdminSubTab === 'standings' && (
                  <div className="space-y-6">
                    <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
                      <h3 className="text-sm font-bold text-white uppercase text-emerald-400">Редактор турнирной таблицы (JSON)</h3>
                      <p className="text-xs text-gray-400">Для изменения таблицы отредактируйте данные ниже в формате JSON. Каждый объект - это команда.</p>
                      <textarea
                        value={standingsJSON}
                        onChange={e => setStandingsJSON(e.target.value)}
                        className="w-full h-96 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-emerald-400 font-mono focus:outline-none focus:border-emerald-500"
                        spellCheck="false"
                      />
                      <div className="flex justify-end">
                        <button onClick={() => {
                          try {
                            const parsed = JSON.parse(standingsJSON);
                            updateTeamStandings(selectedTeam, parsed);
                            alert('Таблица успешно обновлена!');
                          } catch (err) {
                            alert('Ошибка формата JSON: ' + err.message);
                          }
                        }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all">
                          Сохранить таблицу
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 6: Site Settings */}
            {activeAdminTab === 'settings' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                updateSiteSettings(formSettings);
                alert('Настройки сайта сохранены!');
              }} className="space-y-6">
                
                <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase text-emerald-400 mb-4 border-b border-neutral-800 pb-2">Главный экран (Hero)</h3>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1 flex items-center gap-2"><ImageIcon className="w-4 h-4"/> Главное Изображение (URL или файл)</label>
                    <div className="flex flex-col gap-2">
                      <input type="text" value={formSettings.heroImage || ''} onChange={e => setFormSettings({...formSettings, heroImage: e.target.value})} placeholder="URL картинки..." className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-600">ИЛИ</span>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, (base64) => setFormSettings({...formSettings, heroImage: base64}))} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-900 file:text-emerald-300 hover:file:bg-emerald-800" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Главный заголовок</label>
                    <input type="text" value={formSettings.heroTitle || ''} onChange={e => setFormSettings({...formSettings, heroTitle: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Подзаголовок</label>
                    <input type="text" value={formSettings.heroSubtitle || ''} onChange={e => setFormSettings({...formSettings, heroSubtitle: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Текст описания</label>
                    <textarea rows="3" value={formSettings.heroDescription || ''} onChange={e => setFormSettings({...formSettings, heroDescription: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Текст на кнопке</label>
                    <input type="text" value={formSettings.heroButtonText || ''} onChange={e => setFormSettings({...formSettings, heroButtonText: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                  </div>
                </div>
                
                <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase text-emerald-400 mb-4 border-b border-neutral-800 pb-2">Блок «Об Академии»</h3>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1 flex items-center gap-2"><ImageIcon className="w-4 h-4"/> Изображение Блока (URL или файл)</label>
                    <div className="flex flex-col gap-2">
                      <input type="text" value={formSettings.aboutImage || ''} onChange={e => setFormSettings({...formSettings, aboutImage: e.target.value})} placeholder="URL картинки..." className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-600">ИЛИ</span>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, (base64) => setFormSettings({...formSettings, aboutImage: base64}))} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-900 file:text-emerald-300 hover:file:bg-emerald-800" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Заголовок блока</label>
                    <input type="text" value={formSettings.aboutTitle || ''} onChange={e => setFormSettings({...formSettings, aboutTitle: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Подзаголовок</label>
                    <input type="text" value={formSettings.aboutSubtitle || ''} onChange={e => setFormSettings({...formSettings, aboutSubtitle: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Заголовок Истории</label>
                      <input type="text" value={formSettings.historyTitle || ''} onChange={e => setFormSettings({...formSettings, historyTitle: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                      <label className="block text-xs font-semibold text-gray-400 uppercase mt-4 mb-1">Текст Истории</label>
                      <textarea rows="4" value={formSettings.historyText || ''} onChange={e => setFormSettings({...formSettings, historyText: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Заголовок Миссии</label>
                      <input type="text" value={formSettings.missionTitle || ''} onChange={e => setFormSettings({...formSettings, missionTitle: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                      <label className="block text-xs font-semibold text-gray-400 uppercase mt-4 mb-1">Текст Миссии</label>
                      <textarea rows="4" value={formSettings.missionText || ''} onChange={e => setFormSettings({...formSettings, missionText: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase text-emerald-400 mb-4 border-b border-neutral-800 pb-2">Контакты</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Телефон</label>
                      <input type="text" value={formSettings.contactPhone || ''} onChange={e => setFormSettings({...formSettings, contactPhone: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Email</label>
                      <input type="email" value={formSettings.contactEmail || ''} onChange={e => setFormSettings({...formSettings, contactEmail: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Физический Адрес</label>
                      <input type="text" value={formSettings.contactAddress || ''} onChange={e => setFormSettings({...formSettings, contactAddress: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                  </div>
                </div>
                <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase text-emerald-400 mb-4 border-b border-neutral-800 pb-2">Футер и Соцсети</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Instagram</label>
                      <input type="url" value={formSettings.contactInsta || ''} onChange={e => setFormSettings({...formSettings, contactInsta: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Telegram</label>
                      <input type="url" value={formSettings.contactTg || ''} onChange={e => setFormSettings({...formSettings, contactTg: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Facebook</label>
                      <input type="url" value={formSettings.contactFb || ''} onChange={e => setFormSettings({...formSettings, contactFb: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">YouTube</label>
                      <input type="url" value={formSettings.contactYt || ''} onChange={e => setFormSettings({...formSettings, contactYt: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">TikTok</label>
                      <input type="url" value={formSettings.contactTk || ''} onChange={e => setFormSettings({...formSettings, contactTk: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Копирайт / Футер текст</label>
                      <input type="text" value={formSettings.footerText || ''} onChange={e => setFormSettings({...formSettings, footerText: e.target.value})} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                  </div>
                </div>
                
                <button type="submit" className="px-6 py-3 text-xs font-bold uppercase text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow w-full cursor-pointer">
                  Сохранить настройки сайта
                </button>
              </form>
            )}

            {/* Tab: Design */}
            {activeAdminTab === 'design' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                setThemeSettings({ primaryColor: themeInput });
                alert('Тема сайта обновлена!');
              }} className="space-y-6">
                <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase text-emerald-400 mb-4 border-b border-neutral-800 pb-2">Настройки Цвета</h3>
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-gray-400">Выберите основной цвет сайта (кнопки, акценты, иконки). По умолчанию используется Изумрудный (#10b981).</p>
                    <div className="flex items-center gap-4">
                      <input 
                        type="color" 
                        value={themeInput} 
                        onChange={(e) => setThemeInput(e.target.value)}
                        className="w-16 h-16 rounded cursor-pointer border-0 p-0 bg-transparent"
                      />
                      <input 
                        type="text" 
                        value={themeInput} 
                        onChange={(e) => setThemeInput(e.target.value)}
                        className="w-32 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="px-6 py-3 text-xs font-bold uppercase text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow w-full cursor-pointer">
                  Применить цвет
                </button>
              </form>
            )}

            {/* Tab: Translations */}
            {activeAdminTab === 'translations' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                try {
                  const parsed = JSON.parse(translationsInput);
                  setCustomTranslations(parsed);
                  alert('Тексты и переводы успешно сохранены!');
                } catch(error) {
                  alert('Ошибка в формате JSON! Проверьте синтаксис.');
                }
              }} className="space-y-6">
                <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase text-emerald-400 mb-4 border-b border-neutral-800 pb-2">Глобальные тексты и переводы</h3>
                  <p className="text-sm text-gray-400">Здесь вы можете изменить любые тексты интерфейса (в формате JSON). Будьте осторожны, сохраняйте структуру кавычек и запятых.</p>
                  <textarea 
                    rows="20" 
                    value={translationsInput}
                    onChange={(e) => setTranslationsInput(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-4 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <button type="submit" className="px-6 py-3 text-xs font-bold uppercase text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow w-full cursor-pointer">
                  Сохранить переводы
                </button>
              </form>
            )}

            {/* Tab 7: Coaches */}
            {activeAdminTab === 'coaches' && (
              <div className="space-y-8">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const payload = {
                    name: coachName,
                    role: coachRole,
                    license: coachLicense,
                    experience: coachExperience,
                    image: coachImageBase64 || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
                  };
                  if (isEditingCoach) {
                    updateCoach(editingCoachId, payload);
                    alert('Данные тренера обновлены!');
                  } else {
                    addCoach(payload);
                    alert('Тренер добавлен!');
                  }
                  setCoachName(''); setCoachRole(''); setCoachLicense(''); setCoachExperience(''); setCoachImageBase64('');
                  setIsEditingCoach(false);
                }} className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase text-emerald-400">
                    {isEditingCoach ? 'Редактировать тренера' : 'Добавить нового тренера'}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">ФИО</label>
                      <input type="text" required value={coachName} onChange={e => setCoachName(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Должность</label>
                      <input type="text" required value={coachRole} onChange={e => setCoachRole(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="Главный тренер" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Лицензия</label>
                      <input type="text" value={coachLicense} onChange={e => setCoachLicense(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="UEFA PRO" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Опыт (кратко)</label>
                      <input type="text" value={coachExperience} onChange={e => setCoachExperience(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1 flex items-center gap-2"><ImageIcon className="w-4 h-4"/> Фото (загрузить с устройства)</label>
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setCoachImageBase64)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-900 file:text-emerald-300 hover:file:bg-emerald-800" />
                      {coachImageBase64 && <img src={coachImageBase64} alt="Preview" className="mt-3 w-16 h-16 object-cover rounded-xl border border-emerald-500/50" />}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="px-6 py-2.5 text-xs font-bold uppercase text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow cursor-pointer">
                      {isEditingCoach ? 'Сохранить изменения' : 'Добавить тренера'}
                    </button>
                    {isEditingCoach && (
                      <button type="button" onClick={() => {
                        setIsEditingCoach(false); setCoachName(''); setCoachRole(''); setCoachLicense(''); setCoachExperience(''); setCoachImageBase64('');
                      }} className="px-6 py-2.5 text-xs font-bold uppercase text-gray-300 bg-neutral-800 hover:bg-neutral-700 rounded-xl cursor-pointer">
                        Отмена
                      </button>
                    )}
                  </div>
                </form>

                <div>
                  <h3 className="text-sm font-bold text-white uppercase mb-4">Тренерский штаб ({coaches.length})</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {coaches.map(c => (
                      <div key={c.id} className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img src={c.image} alt={c.name} className="w-12 h-12 rounded-full object-cover border border-neutral-800" />
                          <div>
                            <h4 className="text-sm font-bold text-white">{c.name}</h4>
                            <div className="text-[11px] text-gray-400">{c.role} • {c.license}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => {
                            setIsEditingCoach(true); setEditingCoachId(c.id); setCoachName(c.name || ''); setCoachRole(c.role || ''); setCoachLicense(c.license || ''); setCoachExperience(c.experience || ''); setCoachImageBase64(c.image || '');
                          }} className="p-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/50 rounded-lg border border-emerald-900/40">Изменить</button>
                          <button onClick={() => deleteCoach(c.id)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/50 rounded-lg border border-red-900/40"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 8: Partners */}
            {activeAdminTab === 'partners' && (
              <div className="space-y-8">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  addPartner({
                    name: partnerName,
                    type: partnerType,
                    logo: partnerLogoBase64 || 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?auto=format&fit=crop&w=400&q=80'
                  });
                  alert('Партнер добавлен!');
                  setPartnerName(''); setPartnerType(''); setPartnerLogoBase64('');
                }} className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase text-emerald-400">Добавить партнера / спонсора</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Название компании</label>
                      <input type="text" required value={partnerName} onChange={e => setPartnerName(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Тип партнерства</label>
                      <input type="text" value={partnerType} onChange={e => setPartnerType(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="Генеральный спонсор" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1 flex items-center gap-2"><ImageIcon className="w-4 h-4"/> Логотип (загрузить с устройства)</label>
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setPartnerLogoBase64)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-900 file:text-emerald-300 hover:file:bg-emerald-800" />
                      {partnerLogoBase64 && <img src={partnerLogoBase64} alt="Preview" className="mt-3 h-12 object-contain bg-white/10 rounded border border-emerald-500/50 p-2" />}
                    </div>
                  </div>
                  <button type="submit" className="px-6 py-2.5 text-xs font-bold uppercase text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow cursor-pointer">
                    Добавить партнера
                  </button>
                </form>

                <div>
                  <h3 className="text-sm font-bold text-white uppercase mb-4">Партнеры ({partners.length})</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {partners.map(p => (
                      <div key={p.id} className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-white/10 p-2 rounded border border-neutral-800 flex items-center justify-center w-12 h-12">
                            <img src={p.logo} alt={p.name} className="max-w-full max-h-full object-contain filter grayscale" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white">{p.name}</h4>
                            <div className="text-[11px] text-gray-400">{p.type}</div>
                          </div>
                        </div>
                        <button onClick={() => deletePartner(p.id)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/50 rounded-lg border border-red-900/40"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
