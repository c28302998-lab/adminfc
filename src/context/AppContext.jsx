import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';
import { initialData } from '../data/initialData';
import { db } from '../firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [lang, setLang] = useState('ru');
  const [loading, setLoading] = useState(true);

  const [news, setNews] = useState(initialData.news);
  const [teamsData, setTeamsData] = useState(initialData.teams);
  const [videos, setVideos] = useState(initialData.videos);
  const [photos, setPhotos] = useState(initialData.photos);
  const [trialApplications, setTrialApplications] = useState([]);
  const [sponsorApplications, setSponsorApplications] = useState([]);
  
  const defaultSettings = {
    heroTitle: "FOOTBALL CHALLENGE",
    heroSubtitle: "АКАДЕМИЯ ЧЕМПИОНОВ",
    heroDescription: "Профессиональная подготовка, дисциплина и характер. Твой путь в большой футбол начинается здесь.",
    heroButtonText: "ЗАПИСАТЬСЯ НА ПРОСМОТР",
    heroImage: "https://images.unsplash.com/photo-1518605368461-1eb47b2c0199?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    aboutTitle: "О КЛУБЕ FOOTBALL CHALLENGE",
    aboutSubtitle: "История, миссия и философия развития молодых футболистов",
    aboutImage: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    historyTitle: "Наша История",
    historyText: "Football Challenge основан с целью создания современной спортивной экосистемы, где каждый ребенок получает возможность раскрыть свой потенциал под руководством лучших специалистов по европейским стандартам.",
    missionTitle: "Миссия и Ценности",
    missionText: "Воспитание не только профессиональных атлетов, но и сильных личностей. Мы прививаем дисциплину, командный дух, уважение и менталитет победителей.",
    contactPhone: "+48 600 123 456",
    contactEmail: "footballchallange@gmail.com",
    contactAddress: "ul. Sportowa 15, Warsaw",
    contactInsta: "https://instagram.com",
    contactTg: "https://t.me",
    contactFb: "",
    contactYt: "",
    contactTk: "",
    footerText: "Все права защищены. Копирование материалов сайта без разрешения запрещено."
  };

  const [siteSettings, setSiteSettings] = useState(defaultSettings);
  const [themeSettings, setThemeSettings] = useState({ primaryColor: '#10b981' });
  const [customTranslations, setCustomTranslations] = useState(translations);
  const [coaches, setCoaches] = useState(initialData.coaches);
  const [partners, setPartners] = useState(initialData.partners);
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Load from Firebase
  useEffect(() => {
    const docRef = doc(db, "appData", "global");
    const unsubscribe = onSnapshot(docRef, async (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.news) setNews(data.news);
        if (data.teamsData) setTeamsData(data.teamsData);
        if (data.videos) setVideos(data.videos);
        if (data.photos) setPhotos(data.photos);
        if (data.trialApplications) setTrialApplications(data.trialApplications);
        if (data.sponsorApplications) setSponsorApplications(data.sponsorApplications);
        if (data.siteSettings) setSiteSettings(data.siteSettings);
        if (data.themeSettings) setThemeSettings(data.themeSettings);
        if (data.customTranslations) setCustomTranslations(data.customTranslations);
        if (data.coaches) setCoaches(data.coaches);
        if (data.partners) setPartners(data.partners);
        if (data.adminPassword) setAdminPassword(data.adminPassword);
      } else {
        await setDoc(docRef, {
          news: initialData.news,
          teamsData: initialData.teams,
          videos: initialData.videos,
          photos: initialData.photos,
          trialApplications: [],
          sponsorApplications: [],
          siteSettings: defaultSettings,
          themeSettings: { primaryColor: '#10b981' },
          customTranslations: translations,
          coaches: initialData.coaches,
          partners: initialData.partners,
          adminPassword: 'admin123'
        });
      }
      setLoading(false);
    }, (error) => {
      console.error("Firebase fetch error", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const saveToFirebase = (key, value) => {
    setDoc(doc(db, "appData", "global"), { [key]: value }, { merge: true }).catch(console.error);
  };

  useEffect(() => {
    const hex = themeSettings.primaryColor || '#10b981';
    const shadeColor = (color, percent) => {
      let R = parseInt(color.substring(1,3),16);
      let G = parseInt(color.substring(3,5),16);
      let B = parseInt(color.substring(5,7),16);
      R = parseInt(R * (100 + percent) / 100);
      G = parseInt(G * (100 + percent) / 100);
      B = parseInt(B * (100 + percent) / 100);
      R = (R<255)?R:255; G = (G<255)?G:255; B = (B<255)?B:255;
      R = Math.round(R); G = Math.round(G); B = Math.round(B);
      let RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16));
      let GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16));
      let BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16));
      return "#"+RR+GG+BB;
    };
    document.documentElement.style.setProperty('--color-emerald-300', shadeColor(hex, 40));
    document.documentElement.style.setProperty('--color-emerald-400', shadeColor(hex, 20));
    document.documentElement.style.setProperty('--color-emerald-500', hex);
    document.documentElement.style.setProperty('--color-emerald-600', shadeColor(hex, -20));
    document.documentElement.style.setProperty('--color-emerald-900', shadeColor(hex, -60));
    document.documentElement.style.setProperty('--color-emerald-950', shadeColor(hex, -80));
  }, [themeSettings]);

  const t = customTranslations[lang] || customTranslations.ru;

  const updateAndSaveCustomTranslations = (updated) => {
    setCustomTranslations(updated);
    saveToFirebase('customTranslations', updated);
  };
  
  const updateAndSaveThemeSettings = (updated) => {
    setThemeSettings(updated);
    saveToFirebase('themeSettings', updated);
  };

  const loginAdmin = (inputPassword) => {
    if (inputPassword === adminPassword) {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => setIsAdminAuthenticated(false);

  const changeAdminPassword = (newPwd) => {
    setAdminPassword(newPwd);
    saveToFirebase('adminPassword', newPwd);
  };

  const addNews = (item) => {
    const updated = [{ ...item, id: Date.now() }, ...news];
    setNews(updated); saveToFirebase('news', updated);
  };

  const deleteNews = (id) => {
    const updated = news.filter(n => n.id !== id);
    setNews(updated); saveToFirebase('news', updated);
  };

  const addTrialApp = (app) => {
    const updated = [{ ...app, id: Date.now(), date: new Date().toISOString().split('T')[0] }, ...trialApplications];
    setTrialApplications(updated); saveToFirebase('trialApplications', updated);
  };

  const addSponsorApp = (app) => {
    const updated = [{ ...app, id: Date.now(), date: new Date().toISOString().split('T')[0] }, ...sponsorApplications];
    setSponsorApplications(updated); saveToFirebase('sponsorApplications', updated);
  };

  const addPhoto = (photo) => {
    const updated = [{ ...photo, id: Date.now() }, ...photos];
    setPhotos(updated); saveToFirebase('photos', updated);
  };

  const addVideo = (vid) => {
    const updated = [{ ...vid, id: Date.now() }, ...videos];
    setVideos(updated); saveToFirebase('videos', updated);
  };

  const addPlayer = (teamYear, player) => {
    const newData = { ...teamsData };
    if (!newData[teamYear]) return;
    newData[teamYear].roster = [...newData[teamYear].roster, { ...player, id: Date.now() }];
    setTeamsData(newData); saveToFirebase('teamsData', newData);
  };

  const updatePlayer = (teamYear, playerId, updatedPlayer) => {
    const newData = { ...teamsData };
    if (!newData[teamYear]) return;
    newData[teamYear].roster = newData[teamYear].roster.map(p => p.id === playerId ? { ...p, ...updatedPlayer } : p);
    setTeamsData(newData); saveToFirebase('teamsData', newData);
  };

  const deletePlayer = (teamYear, playerId) => {
    const newData = { ...teamsData };
    if (!newData[teamYear]) return;
    newData[teamYear].roster = newData[teamYear].roster.filter(p => p.id !== playerId);
    setTeamsData(newData); saveToFirebase('teamsData', newData);
  };

  const updateTeamCoach = (teamYear, coachData) => {
    const newData = { ...teamsData };
    if (!newData[teamYear]) return;
    newData[teamYear].coach = coachData;
    setTeamsData(newData); saveToFirebase('teamsData', newData);
  };

  const addTeamSchedule = (teamYear, match) => {
    const newData = { ...teamsData };
    if (!newData[teamYear]) return;
    newData[teamYear].schedule = [...(newData[teamYear].schedule || []), { ...match, id: Date.now() }];
    setTeamsData(newData); saveToFirebase('teamsData', newData);
  };
  
  const deleteTeamSchedule = (teamYear, matchId) => {
    const newData = { ...teamsData };
    if (!newData[teamYear]) return;
    newData[teamYear].schedule = (newData[teamYear].schedule || []).filter(s => s.id !== matchId);
    setTeamsData(newData); saveToFirebase('teamsData', newData);
  };

  const addTeamResult = (teamYear, match) => {
    const newData = { ...teamsData };
    if (!newData[teamYear]) return;
    newData[teamYear].results = [...(newData[teamYear].results || []), { ...match, id: Date.now() }];
    setTeamsData(newData); saveToFirebase('teamsData', newData);
  };
  
  const deleteTeamResult = (teamYear, matchId) => {
    const newData = { ...teamsData };
    if (!newData[teamYear]) return;
    newData[teamYear].results = (newData[teamYear].results || []).filter(r => r.id !== matchId);
    setTeamsData(newData); saveToFirebase('teamsData', newData);
  };

  const updateTeamStandings = (teamYear, newStandings) => {
    const newData = { ...teamsData };
    if (!newData[teamYear]) return;
    newData[teamYear].standings = newStandings;
    setTeamsData(newData); saveToFirebase('teamsData', newData);
  };

  const updateSiteSettings = (newSettings) => {
    const updated = { ...siteSettings, ...newSettings };
    setSiteSettings(updated); saveToFirebase('siteSettings', updated);
  };

  const addCoach = (coach) => {
    const updated = [...coaches, { ...coach, id: Date.now() }];
    setCoaches(updated); saveToFirebase('coaches', updated);
  };

  const updateCoach = (id, updatedObj) => {
    const updated = coaches.map(c => c.id === id ? { ...c, ...updatedObj } : c);
    setCoaches(updated); saveToFirebase('coaches', updated);
  };

  const deleteCoach = (id) => {
    const updated = coaches.filter(c => c.id !== id);
    setCoaches(updated); saveToFirebase('coaches', updated);
  };

  const addPartner = (partner) => {
    const updated = [...partners, { ...partner, id: Date.now() }];
    setPartners(updated); saveToFirebase('partners', updated);
  };

  const deletePartner = (id) => {
    const updated = partners.filter(p => p.id !== id);
    setPartners(updated); saveToFirebase('partners', updated);
  };

  // Modal States
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [activePhoto, setActivePhoto] = useState(null);
  const [activeArticle, setActiveArticle] = useState(null);

  if (loading) {
    return <div className="h-screen w-screen flex items-center justify-center bg-neutral-950 text-emerald-500 font-bold">ЗАГРУЗКА...</div>;
  }

  return (
    <AppContext.Provider value={{
      lang, setLang, t,
      news, teamsData, videos, photos,
      trialApplications, sponsorApplications,
      isTrialModalOpen, setIsTrialModalOpen,
      isSponsorModalOpen, setIsSponsorModalOpen,
      isAdminModalOpen, setIsAdminModalOpen,
      isAdminAuthenticated, loginAdmin, logoutAdmin, changeAdminPassword,
      activeVideo, setActiveVideo, activePhoto, setActivePhoto, activeArticle, setActiveArticle,
      addNews, deleteNews, addTrialApp, addSponsorApp, addPhoto, addVideo,
      addPlayer, updatePlayer, deletePlayer, updateTeamCoach,
      addTeamSchedule, deleteTeamSchedule, addTeamResult, deleteTeamResult, updateTeamStandings,
      siteSettings, updateSiteSettings,
      coaches, addCoach, updateCoach, deleteCoach,
      partners, addPartner, deletePartner,
      themeSettings, setThemeSettings: updateAndSaveThemeSettings,
      customTranslations, setCustomTranslations: updateAndSaveCustomTranslations
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
