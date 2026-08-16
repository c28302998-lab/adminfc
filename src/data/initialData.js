export const initialData = {
  coaches: [
    {
      id: 1,
      name: "Александр Ковалев",
      role: "Главный тренер U-17 (2008)",
      license: "UEFA 'A' License",
      experience: "12 лет опыта (экс-Legia Warszawa Youth)",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Марек Новак",
      role: "Главный тренер U-16 (2009)",
      license: "UEFA 'A' License",
      experience: "9 лет опыта (экс-Lech Poznan Academy)",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Дмитрий Савченко",
      role: "Главный тренер U-15 (2010)",
      license: "UEFA 'B' License",
      experience: "7 лет опыта (ДЮСШ Чемпион)",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      name: "Томаш Вишневски",
      role: "Главный тренер U-14 (2011)",
      license: "UEFA 'B' License",
      experience: "6 лет опыта (Физкультурная академия)",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    }
  ],
  teams: {
    "2008": {
      name: "Football Challenge 2008 (U-17)",
      coach: {
        name: "Александр Ковалев",
        license: "UEFA 'A' License",
        phone: "+48 600 111 222",
        bio: "Специализируется на тактической подготовке и физической выносливости."
      },
      roster: [
        { id: 1, name: "Максим Громов", pos: "Вратарь (GK)", num: 1, goals: 0, age: 17, image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80" },
        { id: 2, name: "Артем Бойко", pos: "Защитник (CB)", num: 4, goals: 3, age: 17, image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" },
        { id: 3, name: "Камиль Левандовски", pos: "Полузащитник (CM)", num: 8, goals: 7, age: 17, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80" },
        { id: 4, name: "Якуб Зелински", pos: "Нападающий (ST)", num: 9, goals: 14, age: 17, image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80" },
        { id: 5, name: "Илья Захаров", pos: "Вингер (LW)", num: 11, goals: 9, age: 17, image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80" },
        { id: 6, name: "Груздов Олег", pos: "Правий півзахисник (RM)", num: 17, goals: 3, age: 18, image: "https://ui-avatars.com/api/?name=Груздов+Олег&background=1a1a1a&color=fff&size=300" },
      ],
      schedule: [
        { id: 101, home: "FC Football Challenge 2008", away: "Legia Academy U-17", date: "2026-08-02", time: "12:00", stadium: "FC Arena Park", status: "Upcoming", league: "Elite Youth League" },
        { id: 102, home: "Lech Poznan U-17", away: "FC Football Challenge 2008", date: "2026-08-09", time: "14:30", stadium: "Poznan Training Ctr", status: "Upcoming", league: "Elite Youth League" },
      ],
      results: [
        { id: 103, home: "FC Football Challenge 2008", away: "Rakow Czestochowa U-17", score: "3 : 1", date: "2026-07-18", league: "Elite Youth League" },
        { id: 104, home: "Wisla Krakow U-17", away: "FC Football Challenge 2008", score: "1 : 2", date: "2026-07-11", league: "Elite Youth League" },
      ],
      standings: [
        { rank: 1, team: "FC Football Challenge 2008", w: 12, d: 2, l: 1, gf: 38, ga: 12, pts: 38 },
        { rank: 2, team: "Legia Academy U-17", w: 11, d: 3, l: 1, gf: 35, ga: 14, pts: 36 },
        { rank: 3, team: "Lech Poznan U-17", w: 10, d: 2, l: 3, gf: 30, ga: 16, pts: 32 },
        { rank: 4, team: "Rakow Youth 2008", w: 8, d: 4, l: 3, gf: 26, ga: 18, pts: 28 },
      ]
    },
    "2009": {
      name: "Football Challenge 2009 (U-16)",
      coach: {
        name: "Марек Новак",
        license: "UEFA 'A' License",
        phone: "+48 600 222 333",
        bio: "Эксперт по комбинационному футболу и технике контроля мяча."
      },
      roster: [
        { id: 21, name: "Білий Михайло", pos: "Центральний нападник (ST)", num: 10, goals: 1, age: 16, image: "https://ui-avatars.com/api/?name=Білий+Михайло&background=1a1a1a&color=fff&size=300" },
        { id: 22, name: "Белмас Костянтин", pos: "Півзахисник (CM)", num: 20, goals: 7, age: 16, image: "https://ui-avatars.com/api/?name=Белмас+Костянтин&background=1a1a1a&color=fff&size=300" },
        { id: 23, name: "Каменчук Нікіта", pos: "Вінгер (W)", num: 7, goals: 0, age: 16, image: "https://ui-avatars.com/api/?name=Каменчук+Нікіта&background=1a1a1a&color=fff&size=300" },
        { id: 24, name: "Кошкін Артем", pos: "Воротар (GK)", num: 1, goals: 0, age: 16, image: "https://ui-avatars.com/api/?name=Кошкін+Артем&background=1a1a1a&color=fff&size=300" },
        { id: 25, name: "Лаптєв Матвій", pos: "Центр. півзахисник (CM)", num: 21, goals: 6, age: 17, image: "https://ui-avatars.com/api/?name=Лаптєв+Матвій&background=1a1a1a&color=fff&size=300" },
        { id: 26, name: "Подольний Ігор", pos: "Опорний півзахисник (CDM)", num: 8, goals: 1, age: 17, image: "https://ui-avatars.com/api/?name=Подольний+Ігор&background=1a1a1a&color=fff&size=300" },
        { id: 27, name: "Полонський Дмитро", pos: "Атакув. півзахисник (CAM)", num: 10, goals: 1, age: 16, image: "https://ui-avatars.com/api/?name=Полонський+Дмитро&background=1a1a1a&color=fff&size=300" },
        { id: 28, name: "Ружин Олексій", pos: "Лівий захисник (LB)", num: 9, goals: 3, age: 17, image: "https://ui-avatars.com/api/?name=Ружин+Олексій&background=1a1a1a&color=fff&size=300" },
        { id: 29, name: "Сенькович Марк", pos: "Атакув. півзахисник (CAM)", num: 17, goals: 0, age: 17, image: "https://ui-avatars.com/api/?name=Сенькович+Марк&background=1a1a1a&color=fff&size=300" },
        { id: 30, name: "Тимченко Дмитро", pos: "Правий захисник (RB)", num: 5, goals: 2, age: 16, image: "https://ui-avatars.com/api/?name=Тимченко+Дмитро&background=1a1a1a&color=fff&size=300" },
        { id: 31, name: "Замарацький Ілля", pos: "Лівий захисник (LB)", num: 4, goals: 1, age: 17, image: "https://ui-avatars.com/api/?name=Замарацький+Ілля&background=1a1a1a&color=fff&size=300" },
        { id: 32, name: "Жувак Даніїл", pos: "Лівий вінгер (LW)", num: 11, goals: 4, age: 16, image: "https://ui-avatars.com/api/?name=Жувак+Даніїл&background=1a1a1a&color=fff&size=300" },
      ],
      schedule: [
        { id: 201, home: "Jagiellonia U-16", away: "FC Football Challenge 2009", date: "2026-08-01", time: "11:00", stadium: "Bialystok Complex", status: "Upcoming", league: "U-16 National Cup" },
      ],
      results: [
        { id: 202, home: "FC Football Challenge 2009", away: "Slask Wroclaw U-16", score: "4 : 0", date: "2026-07-20", league: "U-16 National Cup" },
      ],
      standings: [
        { rank: 1, team: "FC Football Challenge 2009", w: 10, d: 3, l: 0, gf: 34, ga: 8, pts: 33 },
        { rank: 2, team: "Slask Wroclaw U-16", w: 9, d: 2, l: 2, gf: 29, ga: 15, pts: 29 },
      ]
    },
    "2010": {
      name: "Football Challenge 2010 (U-15)",
      coach: {
        name: "Дмитрий Савченко",
        license: "UEFA 'B' License",
        phone: "+48 600 333 444",
        bio: "Фокус на координации, индивидуальном дриблинге и прессинге."
      },
      roster: [
        { id: 51, name: "Федонюк Артем", pos: "Лівий вінгер (LW)", num: 11, goals: 6, age: 16, image: "https://ui-avatars.com/api/?name=Федонюк+Артем&background=1a1a1a&color=fff&size=300" },
        { id: 52, name: "Колісніченко Георгій", pos: "Лівий захисник (LB)", num: 3, goals: 0, age: 16, image: "https://ui-avatars.com/api/?name=Колісніченко+Георгій&background=1a1a1a&color=fff&size=300" },
        { id: 53, name: "Крулік Дмитро", pos: "Атакув. півзахисник (CAM)", num: 14, goals: 2, age: 16, image: "https://ui-avatars.com/api/?name=Крулік+Дмитро&background=1a1a1a&color=fff&size=300" },
        { id: 54, name: "Кузін Назар", pos: "Воротар (GK)", num: 1, goals: 0, age: 15, image: "https://ui-avatars.com/api/?name=Кузін+Назар&background=1a1a1a&color=fff&size=300" },
        { id: 55, name: "Лоцман Даніїл", pos: "Нападник (ST)", num: 7, goals: 12, age: 16, image: "https://ui-avatars.com/api/?name=Лоцман+Даніїл&background=1a1a1a&color=fff&size=300" },
        { id: 56, name: "Шевченко Богдан", pos: "Центральний захисник (CB)", num: 4, goals: 0, age: 15, image: "https://ui-avatars.com/api/?name=Шевченко+Богдан&background=1a1a1a&color=fff&size=300" },
        { id: 57, name: "Вадатурський Іван", pos: "Центр. півзахисник (CM)", num: 8, goals: 1, age: 15, image: "https://ui-avatars.com/api/?name=Вадатурський+Іван&background=1a1a1a&color=fff&size=300" },
      ],
      schedule: [
        { id: 301, home: "FC Football Challenge 2010", away: "Pogon Szczecin U-15", date: "2026-08-05", time: "16:00", stadium: "FC Arena Field 2", status: "Upcoming", league: "U-15 Junior League" },
      ],
      results: [
        { id: 302, home: "Gornik Zabrze U-15", away: "FC Football Challenge 2010", score: "2 : 2", date: "2026-07-15", league: "U-15 Junior League" },
      ],
      standings: [
        { rank: 1, team: "Pogon Szczecin U-15", w: 8, d: 2, l: 1, gf: 24, ga: 10, pts: 26 },
        { rank: 2, team: "FC Football Challenge 2010", w: 7, d: 4, l: 0, gf: 27, ga: 11, pts: 25 },
      ]
    },
    "2011": {
      name: "Football Challenge 2011 (U-14)",
      coach: {
        name: "Томаш Вишневски",
        license: "UEFA 'B' License",
        phone: "+48 600 444 555",
        bio: "Развивает футбольный интеллект и радость от игры."
      },
      roster: [
        { id: 71, name: "Коберняк Богдан", pos: "Правий захисник (RB)", num: 31, goals: 0, age: 14, image: "https://ui-avatars.com/api/?name=Коберняк+Богдан&background=1a1a1a&color=fff&size=300" },
        { id: 72, name: "Кормисенко Матвій", pos: "Лівий захисник (LB)", num: 3, goals: 0, age: 14, image: "https://ui-avatars.com/api/?name=Кормисенко+Матвій&background=1a1a1a&color=fff&size=300" },
        { id: 73, name: "Кротов Ілля", pos: "Центр. півзахисник (CM)", num: 8, goals: 0, age: 14, image: "https://ui-avatars.com/api/?name=Кротов+Ілля&background=1a1a1a&color=fff&size=300" },
      ],
      schedule: [
        { id: 401, home: "FC Football Challenge 2011", away: "Cracovia U-14", date: "2026-08-08", time: "10:00", stadium: "FC Arena Field 3", status: "Upcoming", league: "Young Stars Cup" },
      ],
      results: [
        { id: 402, home: "Korona Kielce U-14", away: "FC Football Challenge 2011", score: "1 : 3", date: "2026-07-19", league: "Young Stars Cup" },
      ],
      standings: [
        { rank: 1, team: "FC Football Challenge 2011", w: 9, d: 1, l: 0, gf: 31, ga: 6, pts: 28 },
        { rank: 2, team: "Cracovia U-14", w: 7, d: 2, l: 1, gf: 22, ga: 10, pts: 23 },
      ]
    }
  },
  news: [
    {
      id: 1,
      category: "tournaments",
      title: "Победа Football Challenge 2008 в летнем кубке Варшавы!",
      date: "22 Июля 2026",
      author: "Пресс-служба FC",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
      content: "Команда 2008 года рождения продемонстрировала выдающийся футбол и завоевала главный трофей летнего кубка, одержав 5 побед подряд. В финале был повержен соперник со счетом 3:1!"
    },
    {
      id: 2,
      category: "matches",
      title: "Отбор в академию на сезон 2026/2027 открыт",
      date: "18 Июля 2026",
      author: "Главный методист",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
      content: "Приглашаем юных талантливых футболистов 2008, 2009, 2010 и 2011 годов рождения на открытый просмотр. Тренировки проходят под руководством лицензированных UEFA специалистов."
    },
    {
      id: 3,
      category: "life",
      title: "Международный сбор в Испании для воспитанников FC",
      date: "10 Июля 2026",
      author: "Администрация",
      image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80",
      content: "Наши воспитанники вернулись с двухнедельного учебно-тренировочного сбора в Валенсии, где сыграли спарринги со сверстниками из европейских академий."
    }
  ],
  videos: [
    {
      id: 1,
      title: "Лучшие голы и моменты сезона | FC Football Challenge 2008",
      category: "highlights",
      duration: "04:15",
      youtubeId: "dQw4w9WgXcQ", // embeddable demo video
      thumbnail: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "День из жизни академии: Как тренируются чемпионы",
      category: "trainings",
      duration: "08:40",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Интервью с главным тренером о методике подготовки Legia & Lech",
      category: "interviews",
      duration: "06:10",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
    }
  ],
  photos: [
    {
      id: 1,
      title: "Финал Летнего Кубка 2026",
      category: "tournaments",
      url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 2,
      title: "Утренний интенсив на главном поле",
      category: "camps",
      url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 3,
      title: "Матч FC 2009 vs Legia Youth",
      category: "matches",
      url: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 4,
      title: "Командное фото на сборах в Испании",
      category: "camps",
      url: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 5,
      title: "Церемония награждения лучшего бомбардира",
      category: "tournaments",
      url: "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 6,
      title: "Тактическое занятие в конференц-зале",
      category: "camps",
      url: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=80"
    }
  ],
  partners: [
    { id: 1, name: "Nike Football", type: "Технический партнер", logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80" },
    { id: 2, name: "Orlen Energy", type: "Генеральный спонсор", logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80" },
    { id: 3, name: "Gatorade Sports", type: "Партнер по питанию", logo: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=200&q=80" },
    { id: 4, name: "Bank Pekao", type: "Финансовый партнер", logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=200&q=80" }
  ]
};
