import React, { useState, useEffect } from 'react';
import { 
  LogOut, LayoutDashboard, Users, FileText, BarChart3, Calendar, Clock, 
  Bell, Plus, Trash2, Edit3, Loader2, RefreshCw, Save, X, AlertCircle,
  Crown, Shield, Award, TrendingUp, Activity, FileCheck, BookOpen,
  ChevronRight, Sparkles, Lock, Eye, Settings, UserCheck
} from 'lucide-react';
import { teacherLogout, fetchNews, fetchSchedules, fetchAnnouncements, insertNews, updateNews, deleteNews, insertSchedule, updateSchedule, deleteSchedule, insertAnnouncement, updateAnnouncement, deleteAnnouncement } from '../lib/actions';
import { NewsItem } from '../types';
import { SCHOOL_ASSETS } from '../constants/assets';

interface TeacherDashboardProps {
  onLogout: () => void;
  teacherInfo?: any;
}

interface Schedule {
  id: string | number;
  title: string;
  day?: string;
  startTime?: string;
  endTime?: string;
  description: string;
  type: 'daily' | 'weekly' | 'event' | 'holiday';
  created_at?: string;
}

interface Announcement {
  id: string | number;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'archived';
  published_date: string;
  created_at?: string;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onLogout, teacherInfo }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // State untuk form editing
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  const isAdmin = teacherInfo?.role === 'admin' || teacherInfo?.role === 'kepala_sekolah' || teacherInfo?.role === 'tata_usaha';
  const isKepalaSekolah = teacherInfo?.role === 'kepala_sekolah';
  const isTataUsaha = teacherInfo?.role === 'tata_usaha';
  const isPremiumUser = isKepalaSekolah || isTataUsaha;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [newsRes, scheduleRes, announcementRes] = await Promise.all([
        fetchNews(),
        fetchSchedules(),
        fetchAnnouncements()
      ]);
      if (newsRes.data) setNews(newsRes.data);
      if (scheduleRes.data) setSchedules(scheduleRes.data);
      if (announcementRes.data) setAnnouncements(announcementRes.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await teacherLogout();
    onLogout();
  };

  const handleNewItem = (type: string) => {
    setEditingItem(null);
    if (type === 'news') {
      setFormData({
        title: '',
        category: 'Pengumuman',
        excerpt: '',
        content: '',
        image_url: '',
        author_name: teacherInfo?.fullName || ''
      });
    } else if (type === 'schedule') {
    } else if (type === 'announcement') {
      setFormData({
        title: '',
        content: '',
        priority: 'medium',
        status: 'active'
      });
    }
    setIsFormOpen(true);
  };

  const handleEdit = (item: any, type: string) => {
    setEditingItem({ ...item, type });
    setFormData(item);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      if (activeTab === 'berita') {
        if (editingItem) {
          await updateNews(editingItem.id, formData);
        } else {
          await insertNews(formData);
        }
        loadData();
      } else if (activeTab === 'jadwal') {
        if (editingItem) {
          await updateSchedule(editingItem.id, formData);
        } else {
          await insertSchedule(formData);
        }
        loadData();
      } else if (activeTab === 'pengumuman') {
        if (editingItem) {
          await updateAnnouncement(editingItem.id, { ...formData, published_date: new Date().toLocaleDateString('id-ID') });
        } else {
          await insertAnnouncement({ ...formData, published_date: new Date().toLocaleDateString('id-ID') });
        }
        loadData();
      }
      setIsFormOpen(false);
      setFormData({});
    } catch (err) {
      console.error("Submit Error:", err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: string | number, type: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus item ini?')) return;
    
    try {
      if (type === 'news') {
        await deleteNews(id);
      } else if (type === 'schedule') {
        await deleteSchedule(id);
      } else if (type === 'announcement') {
        await deleteAnnouncement(id);
      }
      loadData();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  const getRoleLabel = (role: string) => {
    const roles: { [key: string]: string } = {
      'guru': '👨‍🏫 Guru',
      'kepala_sekolah': '🎓 Kepala Sekolah',
      'tata_usaha': '📋 Tata Usaha',
      'admin': '🛡️ Administrator'
    };
    return roles[role] || role;
  };

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      'low': 'bg-green-100 text-green-700',
      'medium': 'bg-blue-100 text-blue-700',
      'high': 'bg-red-100 text-red-700'
    };
    return colors[priority] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-[#F8F9FB] min-h-screen pb-32">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-[60] py-5 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-5">
            <img src={SCHOOL_ASSETS.LOGO} alt="Logo SMAN 2 Tompaso" className="w-12 h-12 rounded-2xl shadow-lg shadow-blue-500/20 object-cover" />
            <div>

              <h1 className="text-xl font-black text-[#0A0F1E] tracking-tight uppercase">
                Portal <span className="text-blue-600">Guru</span>
              </h1>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-0.5">
                SMAN 2 Tompaso Official
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-sm font-bold text-[#0A0F1E]">{teacherInfo?.fullName}</p>
              <p className="text-[10px] text-gray-500 font-medium">{getRoleLabel(teacherInfo?.role)}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="group text-[10px] font-black text-gray-400 hover:text-red-500 transition-all uppercase tracking-widest flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Welcome Section - Premium Design for Kepala Sekolah & Tata Usaha */}
        {isPremiumUser ? (
          <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 text-white mb-10 shadow-2xl">
            {/* Premium decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-amber-500/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-amber-400/30">
                    <span className="text-amber-300 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                      {isKepalaSekolah ? <><Crown className="w-4 h-4" /> Pimpinan Utama</> : <><Shield className="w-4 h-4" /> Staff Tata Usaha</>}
                    </span>
                  </div>
                </div>
                <h2 className="text-3xl font-black mb-3">Selamat Datang, {teacherInfo?.fullName}! 🎓</h2>
                <p className="text-slate-300 text-lg mb-6">
                  ✨ Anda memiliki akses premium untuk mengelola dan memantau seluruh konten sekolah.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setActiveTab('berita')} className="bg-white/10 backdrop-blur-sm hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-bold transition-all border border-white/10">
                    📰 Kelola Berita
                  </button>
                  <button onClick={() => setActiveTab('jadwal')} className="bg-white/10 backdrop-blur-sm hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-bold transition-all border border-white/10">
                    📅 Kelola Jadwal
                  </button>
                  <button onClick={() => setShowPolicyModal(true)} className="bg-amber-500/20 hover:bg-amber-500/30 px-4 py-2 rounded-xl text-sm font-bold transition-all border border-amber-400/30 text-amber-300">
                    📋 Ketentuan & Kebijakan
                  </button>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-2xl shadow-amber-500/30">
                  {isKepalaSekolah ? <Crown className="w-12 h-12 text-white" /> : <Shield className="w-12 h-12 text-white" />}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 text-white mb-10 shadow-xl shadow-blue-600/20">
            <h2 className="text-3xl font-black mb-3">Selamat Datang, {teacherInfo?.fullName}! 👋</h2>
            <p className="text-blue-100 text-lg">
              {isAdmin ? '🔐 Anda memiliki akses penuh untuk mengelola konten sekolah.' : 'Lihat informasi dan data terkini dari sekolah.'}
            </p>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200 overflow-x-auto pb-4">
          {[
            { id: 'dashboard', label: '📊 Dashboard', icon: BarChart3 },
            ...(isAdmin ? [{ id: 'berita', label: '📰 Kelola Berita', icon: FileText }] : [{ id: 'berita', label: '📰 Berita', icon: FileText }]),
            ...(isAdmin ? [{ id: 'jadwal', label: '📅 Kelola Jadwal', icon: Calendar }] : [{ id: 'jadwal', label: '📅 Jadwal', icon: Calendar }]),
            ...(isAdmin ? [{ id: 'pengumuman', label: '🔔 Kelola Pengumuman', icon: Bell }] : [])
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-bold text-sm uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Total Berita</p>
                    <p className="text-4xl font-black text-[#0A0F1E] mt-2">{news.length}</p>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-xl">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Jadwal Aktif</p>
                    <p className="text-4xl font-black text-[#0A0F1E] mt-2">{schedules.length}</p>
                  </div>
                  <div className="bg-green-100 p-4 rounded-xl">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Pengumuman Aktif</p>
                    <p className="text-4xl font-black text-[#0A0F1E] mt-2">{announcements.filter(a => a.status === 'active').length}</p>
                  </div>
                  <div className="bg-red-100 p-4 rounded-xl">
                    <Bell className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Status Akses</p>
                    <p className="text-xl font-black text-[#0A0F1E] mt-2">{isAdmin ? '✅ Admin' : '✅ Terbatas'}</p>
                  </div>
                  <div className="bg-purple-100 p-4 rounded-xl">
                    <LayoutDashboard className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Berita Tab */}
        {activeTab === 'berita' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-black text-[#0A0F1E]">Kelola Berita</h3>
              {isAdmin && (
                <button
                  onClick={() => handleNewItem('news')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Tambah Berita</span>
                </button>
              )}
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Memuat data...</p>
              </div>
            ) : news.length === 0 ? (
              <div className="bg-gray-50 rounded-2xl p-12 text-center border border-gray-200">
                <p className="text-gray-500 font-medium">Belum ada berita</p>
              </div>
            ) : (
              news.map(item => (
                <div key={item.id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex space-x-6">
                    {item.image_url && (
                      <img 
                        src={item.image_url} 
                        alt={item.title}
                        className="w-24 h-24 rounded-xl object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full mr-3">
                            {item.category}
                          </span>
                          <h4 className="text-lg font-bold text-[#0A0F1E] mt-2">{item.title}</h4>
                        </div>
                        {isAdmin && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(item, 'news')}
                              className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id, 'news')}
                              className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mt-3 line-clamp-2">{item.excerpt}</p>
                      <div className="flex items-center space-x-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-4">
                        <span>📝 {item.author_name}</span>
                        <span>📅 {item.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Jadwal Tab */}
        {activeTab === 'jadwal' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-black text-[#0A0F1E]">Kelola Jadwal Sekolah</h3>
              {isAdmin && (
                <button
                  onClick={() => handleNewItem('schedule')}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Tambah Jadwal</span>
                </button>
              )}
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Memuat data...</p>
              </div>
            ) : schedules.length === 0 ? (
              <div className="bg-gray-50 rounded-2xl p-12 text-center border border-gray-200">
                <p className="text-gray-500 font-medium">Belum ada jadwal</p>
              </div>
            ) : (
              schedules.map(item => (
                <div key={item.id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-bold text-[#0A0F1E]">{item.title}</h4>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-[10px] font-bold rounded-full">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2">{item.description}</p>
                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                        {item.day && <span>📅 {item.day}</span>}
                        {item.startTime && item.endTime && <span>🕐 {item.startTime} - {item.endTime}</span>}
                      </div>
                    </div>
                    {isAdmin && (
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleEdit(item, 'schedule')}
                          className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, 'schedule')}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Pengumuman Tab */}
        {activeTab === 'pengumuman' && isAdmin && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-black text-[#0A0F1E]">Kelola Pengumuman</h3>
              <button
                onClick={() => handleNewItem('announcement')}
                className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Tambah Pengumuman</span>
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Memuat data...</p>
              </div>
            ) : announcements.length === 0 ? (
              <div className="bg-gray-50 rounded-2xl p-12 text-center border border-gray-200">
                <p className="text-gray-500 font-medium">Belum ada pengumuman</p>
              </div>
            ) : (
              announcements.map(item => (
                <div key={item.id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-bold text-[#0A0F1E]">{item.title}</h4>
                        <span className={`px-3 py-1 text-[10px] font-bold rounded-full ${getPriorityColor(item.priority)}`}>
                          {item.priority.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 text-[10px] font-bold rounded-full ${item.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {item.status === 'active' ? 'AKTIF' : 'ARSIP'}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2">{item.content}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-3">📅 {item.published_date}</p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(item, 'announcement')}
                        className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, 'announcement')}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Policy Modal for Premium Users */}
      {showPolicyModal && isPremiumUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center">
                    <FileCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">Ketentuan & Kebijakan</h3>
                    <p className="text-slate-400 text-sm">Portal Guru SMAN 2 Tompaso</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPolicyModal(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Akses Info */}
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    {isKepalaSekolah ? <Crown className="w-5 h-5 text-amber-600" /> : <Shield className="w-5 h-5 text-amber-600" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900 text-lg">
                      {isKepalaSekolah ? 'Akses Pimpinan Utama' : 'Akses Staff Tata Usaha'}
                    </h4>
                    <p className="text-amber-700 text-sm mt-1">
                      {isKepalaSekolah 
                        ? 'Anda memiliki akses premium sebagai Kepala Sekolah untuk memantau dan mengelola seluruh konten sekolah.'
                        : 'Anda memiliki akses premium sebagai Staff Tata Usaha untuk mengelola konten operasional sekolah.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Kebijakan */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Kebijakan Penggunaan
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-4 bg-slate-50 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Eye className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">Akses Informasi</p>
                      <p className="text-slate-600 text-sm">Dapat melihat semua berita, jadwal, dan pengumuman sekolah.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-slate-50 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Edit3 className="w-3 h-3 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">Kelola Konten</p>
                      <p className="text-slate-600 text-sm">Dapat menambah, edit, dan hapus berita, jadwal, dan pengumuman.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-slate-50 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Lock className="w-3 h-3 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">Kerahasiaan Data</p>
                      <p className="text-slate-600 text-sm">Tidak diperkenankan membagikan akses kepada pihak lain.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-slate-50 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertCircle className="w-3 h-3 text-red-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">Tanggung Jawab</p>
                      <p className="text-slate-600 text-sm">Setiap perubahan konten menjadi tanggung jawab pengguna.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Peringatan */}
              <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                <div className="flex items-start space-x-4">
                  <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-900">Perhatian!</h4>
                    <p className="text-red-700 text-sm mt-1">
                      Penyalahgunaan akses dapat menyebabkan pencabutan hak akses permanen. Hubungi administrator jika menemukan masalah.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tombol Tutup */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowPolicyModal(false)}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && isAdmin && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h3 className="text-2xl font-black text-[#0A0F1E]">
                {editingItem ? 'Edit Item' : 'Tambah Item Baru'}
              </h3>
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingItem(null);
                  setFormData({});
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* News Form */}
              {activeTab === 'berita' && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Judul Berita *</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      placeholder="Masukkan judul berita"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Kategori *</label>
                      <select
                        value={formData.category || 'Pengumuman'}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      >
                        <option>Pendidikan</option>
                        <option>Prestasi</option>
                        <option>Kegiatan Siswa</option>
                        <option>Agenda Sekolah</option>
                        <option>Pengumuman</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Penulis</label>
                      <input
                        type="text"
                        value={formData.author_name || ''}
                        onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        placeholder="Nama penulis"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Ringkasan *</label>
                    <textarea
                      required
                      value={formData.excerpt || ''}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      placeholder="Ringkasan singkat berita"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Isi Berita *</label>
                    <textarea
                      required
                      value={formData.content || ''}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      placeholder="Isi lengkap berita"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">URL Gambar</label>
                    <input
                      type="url"
                      value={formData.image_url || ''}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </>
              )}

              {/* Schedule Form */}
              {activeTab === 'jadwal' && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nama Jadwal *</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      placeholder="Contoh: Jam Operasional"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Harinya</label>
                      <input
                        type="text"
                        value={formData.day || ''}
                        onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        placeholder="Contoh: Senin - Jumlah"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Tipe</label>
                      <select
                        value={formData.type || 'daily'}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="daily">Harian</option>
                        <option value="weekly">Mingguan</option>
                        <option value="event">Acara</option>
                        <option value="holiday">Libur</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Jam Mulai</label>
                      <input
                        type="time"
                        value={formData.startTime || ''}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Jam Selesai</label>
                      <input
                        type="time"
                        value={formData.endTime || ''}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi *</label>
                    <textarea
                      required
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      placeholder="Deskripsi jadwal"
                      rows={3}
                    />
                  </div>
                </>
              )}

              {/* Announcement Form */}
              {activeTab === 'pengumuman' && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Judul Pengumuman *</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      placeholder="Masukkan judul pengumuman"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Prioritas</label>
                      <select
                        value={formData.priority || 'medium'}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="low">Rendah</option>
                        <option value="medium">Sedang</option>
                        <option value="high">Tinggi</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                      <select
                        value={formData.status || 'active'}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="active">Aktif</option>
                        <option value="archived">Arsip</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Isi Pengumuman *</label>
                    <textarea
                      required
                      value={formData.content || ''}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      placeholder="Isi lengkap pengumuman"
                      rows={4}
                    />
                  </div>
                </>
              )}

              {/* Form Actions */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingItem(null);
                    setFormData({});
                  }}
                  className="flex-1 px-6 py-3 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {submitLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Simpan</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
