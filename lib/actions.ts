
import { NewsItem } from '../types';

/**
 * MOCK DATABASE ACTIONS (LocalStorage Based)
 * Sistem ini memungkinkan Admin Dashboard bekerja tanpa backend database.
 */

const STORAGE_KEY = 'sman2t_news_data';
const AUTH_KEY = 'sman2t_admin_session';
const TEACHER_AUTH_KEY = 'sman2t_teacher_session';

/**
 * DAFTAR PENGGUNA GURU - SYSTEM AUTHENTICATION
 * Password sudah di-hash (dalam produksi gunakan bcrypt)
 */
interface TeacherUser {
  username: string;
  fullName: string;
  password: string; // Dalam praktik gunakan hash bcrypt
  role: 'admin' | 'kepala_sekolah' | 'tata_usaha' | 'guru';
  email: string;
}

const AUTHORIZED_TEACHERS: TeacherUser[] = [
  {
    username: 'admin@sman2t',
    fullName: 'Administrator Website',
    password: 'AdmSMAN2T@2026!Kw7Qt9Mx#Vb5Np2Zd',
    role: 'admin',
    email: 'admin@sman2tompaso.sch.id'
  },
  {
    username: 'junus.akay',
    fullName: 'Junus N M Akay, S.Pd',
    password: 'KplSMAN2T@2026!Jn8Ky4Pw#Lx6Qm3Rb',
    role: 'kepala_sekolah',
    email: 'kepala@sman2tompaso.sch.id'
  },
  {
    username: 'tata.usaha',
    fullName: 'Tata Usaha SMAN 2 Tompaso',
    password: 'TtUSMAN2T@2026!Tu9Hp2Xc#Gf8Rm4Pq',
    role: 'tata_usaha',
    email: 'tatausaha@sman2tompaso.sch.id'
  },
  {
    username: 'rosni.lumentah',
    fullName: 'Rosni Lumentah, S.Pd',
    password: 'RsNiSMAN@2026!Rl5Zn7Kp#Dj9Qx2Wv',
    role: 'guru',
    email: 'rosni.lumentah@sman2tompaso.sch.id'
  },
  {
    username: 'diane.langi',
    fullName: 'Diane Langi, S.Pd',
    password: 'DinSMAN2T@2026!Dl6Mq8Yx#Hv3Pt5Ks',
    role: 'guru',
    email: 'diane.langi@sman2tompaso.sch.id'
  },
  {
    username: 'david.paemboonan',
    fullName: 'David Paemboonan, S.Pd',
    password: 'DvdSMAN2T@2026!Dp4Nj6Yw#St8Bx2Cm',
    role: 'guru',
    email: 'david.paemboonan@sman2tompaso.sch.id'
  },
  {
    username: 'kambat.sitanau',
    fullName: 'Kambat Sitanau, S.Pd',
    password: 'KbSMAN2T@2026!Kb7Fr3Zu#Wl9Mn5Dq',
    role: 'guru',
    email: 'kambat.sitanau@sman2tompaso.sch.id'
  }
];

// Data Awal untuk simulasi
const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'msg-2026-01',
    title: "Segenap Keluarga Besar SMAN 2 Tompaso Mengucapkan Selamat Natal 2025 & Tahun Baru 2026",
    category: "Pengumuman",
    date: "25/12/2025",
    author_name: "Kepala Sekolah",
    excerpt: "Momen refleksi dan transformasi menuju visi sekolah digital yang lebih cerdas, terampil, dan bermartabat di tahun yang baru.",
    content: `Salam Sejahtera bagi kita semua,\n\nDi penghujung tahun 2025 ini, SMAN 2 Tompaso merayakan momen penuh sukacita dan harapan. Natal bukan sekadar perayaan, melainkan pengingat bagi kita semua untuk terus membawa terang dalam dunia pendidikan melalui integritas dan kasih.\n\nMemasuki tahun 2026, SMAN 2 Tompaso berkomitmen penuh untuk memacu akselerasi transformasi digital. Kita akan melangkah lebih jauh, merajut mimpi-mimpi besar siswa-siswi kita menjadi realitas yang nyata di era Vision 2026.\n\nMari kita jadikan semangat baru ini sebagai motor penggerak untuk menjadi pribadi yang lebih cerdas teknologi, lebih terampil dalam berkarya, dan senantiasa bermartabat dalam perilaku.\n\nSelamat Natal 2025 bagi yang merayakan, dan Selamat Tahun Baru 2026 untuk kita semua. Semoga berkat Tuhan senantiasa menyertai langkah SMAN 2 Tompaso.\n\nSalam Transformasi,\nJunus N M Akay, S.Pd\nKepala SMAN 2 Tompaso`,
    image_url: "https://i.ibb.co.com/M55mkPHY/images-2.jpg",
    created_at: "2025-12-25T00:00:00.000Z"
  },
  {
    id: 'news-2025-12',
    title: "Inovasi Kurikulum: Ujian Semester Berbasis Proyek Oleh Siswa Kelas 12 SMAN 2 Tompaso",
    category: "Pendidikan",
    date: "12/12/2025",
    author_name: "Tim Kurikulum",
    excerpt: "Siswa kelas 12 menunjukkan kompetensi luar biasa dalam memecahkan masalah nyata melalui Project-Based Assessment tahun ajaran ini.",
    content: `Dalam rangka implementasi Kurikulum Merdeka yang lebih mendalam, SMA Negeri 2 Tompaso menyelenggarakan Ujian Semester Berbasis Proyek (Project-Based Assessment) bagi seluruh siswa kelas 12 yang dilaksanakan pada tanggal 12 Desember 2025.\n\nBerbeda dengan ujian konvensional, metode ini menuntut siswa untuk berkolaborasi, berpikir kritis, dan menciptakan solusi nyata atas permasalahan di masyarakat Tompaso. Berbagai proyek unggulan dipresentasikan, mulai dari prototipe sistem irigasi cerdas, aplikasi manajemen pasar tradisional, hingga dokumenter pelestarian budaya lokal.\n\nKepala Sekolah, Bapak Junus N M Akay, menyampaikan bahwa metode ini bertujuan untuk mengukur tidak hanya pengetahuan teoretis, tetapi juga kesiapan mental dan keterampilan praktis siswa sebelum melangkah ke jenjang perguruan tinggi atau dunia kerja.\n\n"Kami melihat antusiasme yang luar biasa. Siswa tidak lagi hanya menghafal, mereka mencipta. Inilah esensi dari transformasi pendidikan yang kami usung," ujar beliau saat meninjau sesi presentasi proyek.\n\nEvaluasi dilakukan oleh tim penguji internal dan eksternal untuk memastikan kualitas capaian pembelajaran tetap berada pada standar tertinggi.`,
    image_url: "https://i.ibb.co.com/nM7F2Srg/FB-IMG-1767525007335.jpg",
    created_at: "2025-12-12T09:00:00.000Z"
  },
  {
    id: '1',
    title: "SMAN 2 Tompaso Raih Penghargaan Sekolah Digital Terinovatif 2026",
    category: "Prestasi",
    date: "10/01/2026",
    author_name: "Tim Humas",
    excerpt: "Berkat integrasi sistem pembelajaran berbasis AI, SMAN 2 Tompaso diakui sebagai pionir transformasi digital.",
    content: "SMAN 2 Tompaso resmi dinobatkan sebagai sekolah digital paling inovatif tahun ini. Penghargaan ini diberikan atas keberhasilan sekolah dalam mengimplementasikan platform pembelajaran berbasis cloud dan kecerdasan buatan (AI).",
    image_url: "https://i.ibb.co.com/ymGxjc7R/FB-IMG-1767525533073.jpg",
    created_at: "2026-01-10T08:00:00.000Z"
  }
];

// Sinkronisasi Data
const getStoredNews = (): NewsItem[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_NEWS));
    return INITIAL_NEWS;
  }
  return JSON.parse(stored);
};

/**
 * Authentication (Mock)
 */
export const login = async (email: string, password: string) => {
  if ((email === 'nextgvnx' || email.includes('@')) && password === 'nextgvnx09') {
    const session = { id: 'admin-1', email, expires: Date.now() + 86400000 };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return { data: { user: session }, error: null };
  }
  return { data: { user: null }, error: { message: 'Kredensial salah.' } };
};

export const logout = async () => {
  localStorage.removeItem(AUTH_KEY);
  return { error: null };
};

/**
 * TEACHER AUTHENTICATION (Sistem Login Guru)
 */
export const teacherLogin = async (username: string, password: string) => {
  const teacher = AUTHORIZED_TEACHERS.find(
    t => t.username.toLowerCase() === username.toLowerCase() && t.password === password
  );

  if (teacher) {
    const session = { 
      id: teacher.username, 
      fullName: teacher.fullName,
      role: teacher.role,
      email: teacher.email,
      expires: Date.now() + 86400000 // 24 jam
    };
    localStorage.setItem(TEACHER_AUTH_KEY, JSON.stringify(session));
    return { data: { user: session }, error: null };
  }

  return { 
    data: { user: null }, 
    error: { message: 'Username atau password salah. Periksa kembali kredensial Anda.' } 
  };
};

export const teacherLogout = async () => {
  localStorage.removeItem(TEACHER_AUTH_KEY);
  return { error: null };
};

export const getCurrentTeacher = async () => {
  const session = localStorage.getItem(TEACHER_AUTH_KEY);
  if (!session) return null;
  const parsed = JSON.parse(session);
  if (Date.now() > parsed.expires) {
    localStorage.removeItem(TEACHER_AUTH_KEY);
    return null;
  }
  return parsed;
};

export const getCurrentUser = async () => {
  const session = localStorage.getItem(AUTH_KEY);
  if (!session) return null;
  const parsed = JSON.parse(session);
  if (Date.now() > parsed.expires) {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
  return parsed;
};

/**
 * Database Operations (LocalStorage Implementation)
 */
export const fetchNews = async () => {
  try {
    const data = getStoredNews();
    return { data, error: null };
  } catch (err) {
    return { data: [], error: err };
  }
};

export const fetchCategories = async () => {
  return { 
    data: [
      { name: 'Pendidikan' }, 
      { name: 'Prestasi' }, 
      { name: 'Kegiatan Siswa' }, 
      { name: 'Agenda Sekolah' }, 
      { name: 'Pengumuman' }
    ], 
    error: null 
  };
};

export const insertNews = async (news: Omit<NewsItem, 'id' | 'date'>) => {
  const currentNews = getStoredNews();
  const newEntry: NewsItem = {
    ...news,
    id: Math.random().toString(36).substring(2, 11),
    date: new Date().toLocaleDateString('id-ID'),
    created_at: new Date().toISOString()
  };
  
  const updated = [newEntry, ...currentNews];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return { data: [newEntry], error: null };
};

export const updateNews = async (id: string | number, news: Omit<NewsItem, 'id' | 'date'>) => {
  const currentNews = getStoredNews();
  const updated = currentNews.map(item => 
    item.id.toString() === id.toString() 
      ? { ...item, ...news } 
      : item
  );
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return { data: updated, error: null };
};

export const deleteNews = async (id: string | number) => {
  const currentNews = getStoredNews();
  const filtered = currentNews.filter(item => item.id.toString() !== id.toString());
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return { error: null };
};
/**
 * Manajemen Jadwal Sekolah
 */
const SCHEDULE_KEY = 'sman2t_schedule_data';

const INITIAL_SCHEDULES = [
  {
    id: 'sched-1',
    title: 'Jam Operasional',
    day: 'Senin - Jumat',
    startTime: '07:00',
    endTime: '15:30',
    description: 'Waktu aktif sekolah untuk kegiatan pembelajaran',
    type: 'daily' as const,
    created_at: new Date().toISOString()
  },
  {
    id: 'sched-2',
    title: 'Program Pengembangan',
    day: 'Sabtu',
    startTime: '07:00',
    endTime: '12:00',
    description: 'Program ekstrakurikuler dan pengembangan diri siswa',
    type: 'weekly' as const,
    created_at: new Date().toISOString()
  }
];

const getStoredSchedules = () => {
  const stored = localStorage.getItem(SCHEDULE_KEY);
  if (!stored) {
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(INITIAL_SCHEDULES));
    return INITIAL_SCHEDULES;
  }
  return JSON.parse(stored);
};

export const fetchSchedules = async () => {
  try {
    const data = getStoredSchedules();
    return { data, error: null };
  } catch (err) {
    return { data: [], error: err };
  }
};

export const insertSchedule = async (schedule: Omit<any, 'id' | 'created_at'>) => {
  const currentSchedules = getStoredSchedules();
  const newEntry = {
    ...schedule,
    id: Math.random().toString(36).substring(2, 11),
    created_at: new Date().toISOString()
  };
  
  const updated = [newEntry, ...currentSchedules];
  localStorage.setItem(SCHEDULE_KEY, JSON.stringify(updated));
  return { data: [newEntry], error: null };
};

export const updateSchedule = async (id: string | number, schedule: Omit<any, 'id'>) => {
  const currentSchedules = getStoredSchedules();
  const updated = currentSchedules.map((item: any) => 
    item.id.toString() === id.toString() 
      ? { ...item, ...schedule } 
      : item
  );
  
  localStorage.setItem(SCHEDULE_KEY, JSON.stringify(updated));
  return { data: updated, error: null };
};

export const deleteSchedule = async (id: string | number) => {
  const currentSchedules = getStoredSchedules();
  const filtered = currentSchedules.filter((item: any) => item.id.toString() !== id.toString());
  localStorage.setItem(SCHEDULE_KEY, JSON.stringify(filtered));
  return { error: null };
};

/**
 * Manajemen Pengumuman
 */
const ANNOUNCEMENT_KEY = 'sman2t_announcement_data';

const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    title: 'Pengumuman Penting: Jadwal Ujian Akhir Tahun',
    content: 'Ujian akhir tahun akan dilaksanakan mulai tanggal 15 Mei 2026. Siswa diminta untuk mempersiapkan diri dengan baik.',
    priority: 'high' as const,
    status: 'active' as const,
    published_date: new Date().toLocaleDateString('id-ID'),
    created_at: new Date().toISOString()
  }
];

const getStoredAnnouncements = () => {
  const stored = localStorage.getItem(ANNOUNCEMENT_KEY);
  if (!stored) {
    localStorage.setItem(ANNOUNCEMENT_KEY, JSON.stringify(INITIAL_ANNOUNCEMENTS));
    return INITIAL_ANNOUNCEMENTS;
  }
  return JSON.parse(stored);
};

export const fetchAnnouncements = async () => {
  try {
    const data = getStoredAnnouncements();
    return { data, error: null };
  } catch (err) {
    return { data: [], error: err };
  }
};

export const insertAnnouncement = async (announcement: Omit<any, 'id' | 'created_at'>) => {
  const currentAnnouncements = getStoredAnnouncements();
  const newEntry = {
    ...announcement,
    id: Math.random().toString(36).substring(2, 11),
    created_at: new Date().toISOString()
  };
  
  const updated = [newEntry, ...currentAnnouncements];
  localStorage.setItem(ANNOUNCEMENT_KEY, JSON.stringify(updated));
  return { data: [newEntry], error: null };
};

export const updateAnnouncement = async (id: string | number, announcement: Omit<any, 'id'>) => {
  const currentAnnouncements = getStoredAnnouncements();
  const updated = currentAnnouncements.map((item: any) => 
    item.id.toString() === id.toString() 
      ? { ...item, ...announcement } 
      : item
  );
  
  localStorage.setItem(ANNOUNCEMENT_KEY, JSON.stringify(updated));
  return { data: updated, error: null };
};

export const deleteAnnouncement = async (id: string | number) => {
  const currentAnnouncements = getStoredAnnouncements();
  const filtered = currentAnnouncements.filter((item: any) => item.id.toString() !== id.toString());
  localStorage.setItem(ANNOUNCEMENT_KEY, JSON.stringify(filtered));
  return { error: null };
};

/**
 * Manajemen Data Guru & Pendidik
 */
const TEACHER_DATA_KEY = 'sman2t_teacher_data';

const INITIAL_TEACHERS = [
  {
    id: 'guru-1',
    nama: 'Drs. Budi Santoso, M.Pd',
    nip: '19780515 200501 1 004',
    spesialisasi: 'Matematika',
    email: 'budi.santoso@sman2tompaso.sch.id',
    phone: '+62812345678',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500',
    jabatan: 'Guru Mata Pelajaran',
    status: 'aktif' as const,
    created_at: new Date().toISOString()
  }
];

const getStoredTeachers = () => {
  const stored = localStorage.getItem(TEACHER_DATA_KEY);
  if (!stored) {
    localStorage.setItem(TEACHER_DATA_KEY, JSON.stringify(INITIAL_TEACHERS));
    return INITIAL_TEACHERS;
  }
  return JSON.parse(stored);
};

export const fetchTeachers = async () => {
  try {
    const data = getStoredTeachers();
    return { data, error: null };
  } catch (err) {
    return { data: [], error: err };
  }
};

export const insertTeacher = async (teacher: Omit<any, 'id' | 'created_at'>) => {
  const currentTeachers = getStoredTeachers();
  const newEntry = {
    ...teacher,
    id: Math.random().toString(36).substring(2, 11),
    created_at: new Date().toISOString()
  };
  
  const updated = [newEntry, ...currentTeachers];
  localStorage.setItem(TEACHER_DATA_KEY, JSON.stringify(updated));
  return { data: [newEntry], error: null };
};

export const updateTeacher = async (id: string | number, teacher: Omit<any, 'id'>) => {
  const currentTeachers = getStoredTeachers();
  const updated = currentTeachers.map((item: any) => 
    item.id.toString() === id.toString() 
      ? { ...item, ...teacher } 
      : item
  );
  
  localStorage.setItem(TEACHER_DATA_KEY, JSON.stringify(updated));
  return { data: updated, error: null };
};

export const deleteTeacher = async (id: string | number) => {
  const currentTeachers = getStoredTeachers();
  const filtered = currentTeachers.filter((item: any) => item.id.toString() !== id.toString());
  localStorage.setItem(TEACHER_DATA_KEY, JSON.stringify(filtered));
  return { error: null };
};

/**
 * Manajemen Data OSIS
 */
const OSIS_KEY = 'sman2t_osis_data';

const INITIAL_OSIS = [
  {
    id: 'osis-1',
    nama: 'Mohammad Rizki Pratama',
    jabatan: 'Ketua OSIS',
    kelas: 'XII IPA 1',
    email: 'rizki.pratama@sman2tompaso.sch.id',
    phone: '+62821234567',
    photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500',
    masa_jabatan: '2025-2026',
    departemen: 'Pimpinan',
    status: 'aktif' as const,
    created_at: new Date().toISOString()
  }
];

const getStoredOSIS = () => {
  const stored = localStorage.getItem(OSIS_KEY);
  if (!stored) {
    localStorage.setItem(OSIS_KEY, JSON.stringify(INITIAL_OSIS));
    return INITIAL_OSIS;
  }
  return JSON.parse(stored);
};

export const fetchOSIS = async () => {
  try {
    const data = getStoredOSIS();
    return { data, error: null };
  } catch (err) {
    return { data: [], error: err };
  }
};

export const insertOSIS = async (member: Omit<any, 'id' | 'created_at'>) => {
  const currentOSIS = getStoredOSIS();
  const newEntry = {
    ...member,
    id: Math.random().toString(36).substring(2, 11),
    created_at: new Date().toISOString()
  };
  
  const updated = [newEntry, ...currentOSIS];
  localStorage.setItem(OSIS_KEY, JSON.stringify(updated));
  return { data: [newEntry], error: null };
};

export const updateOSIS = async (id: string | number, member: Omit<any, 'id'>) => {
  const currentOSIS = getStoredOSIS();
  const updated = currentOSIS.map((item: any) => 
    item.id.toString() === id.toString() 
      ? { ...item, ...member } 
      : item
  );
  
  localStorage.setItem(OSIS_KEY, JSON.stringify(updated));
  return { data: updated, error: null };
};

export const deleteOSIS = async (id: string | number) => {
  const currentOSIS = getStoredOSIS();
  const filtered = currentOSIS.filter((item: any) => item.id.toString() !== id.toString());
  localStorage.setItem(OSIS_KEY, JSON.stringify(filtered));
  return { error: null };
};