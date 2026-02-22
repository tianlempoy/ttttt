
import React, { useState, useEffect } from 'react';
import { Menu, X, User, Globe, ChevronDown, MoreHorizontal, Home, FileText, Users, Calendar, Trophy, Newspaper, Image, BookOpen, Library, Cpu, GraduationCap, Settings, BookOpenCheck } from 'lucide-react';
import { Page } from '../types';
import { SCHOOL_ASSETS } from '../constants/assets';
import { SCHOOL_THEME } from '../constants/theme';

interface NavbarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavPanel, setShowNavPanel] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Beranda', value: Page.HOME, icon: Home },
    { name: 'Profil', value: Page.PROFIL, icon: FileText },
    { name: 'Pendidik', value: Page.GURU, icon: Users },
    { name: 'Berita', value: Page.BERITA, icon: Newspaper },
    { name: 'Galeri', value: Page.GALERI, icon: Image },
    { name: 'Kegiatan', value: Page.KEGIATAN, icon: Calendar },
    { name: 'Prestasi', value: Page.PRESTASI, icon: Trophy },
    { name: 'PPDB', value: Page.PPDB, icon: GraduationCap },
  ];

  const handleNav = (page: Page) => {
    setActivePage(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navbar fixed untuk semua halaman dengan styling yang sama
  const textColorClass = isScrolled ? 'text-[#0F172A]' : 'text-[#0F172A]';
  const inactiveLinkClass = isScrolled ? 'text-[#0F172A]/50' : 'text-[#0F172A]/60';
  const navPositionClass = 'fixed top-0 left-0 right-0';
  const navBgClass = isScrolled 
    ? 'py-4 glass-nav shadow-lg bg-white/90' 
    : 'py-4 bg-white shadow-md';

  return (
    <nav className={`${navPositionClass} z-[1000] transition-all duration-700 ${navBgClass}`}>
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 flex justify-between items-center">
        
        <div className="flex items-center space-x-4">
          <div
            className="flex items-center space-x-4 cursor-pointer group active:scale-95 transition-transform"
            onClick={() => handleNav(Page.HOME)}
          >
            <img src={SCHOOL_ASSETS.LOGO} alt="Logo" className="w-10 h-10 lg:w-12 lg:h-12 drop-shadow-md" />
            <div className="flex flex-col">
              <span className={`text-xl font-bold tracking-tight transition-colors duration-500 ${textColorClass}`}>
                SMAN 2 <span className="text-[#C5A059]">TOMPASO</span>
              </span>
              <span className={`text-[9px] font-black uppercase tracking-[0.4em] transition-colors duration-500 ${isScrolled ? 'text-slate-400' : 'text-slate-400'}`}>
                Unggul dalam Pendidikan
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowNavPanel(!showNavPanel)}
            className={`p-2 rounded-full transition-colors duration-500 hover:bg-white/10 ${textColorClass}`}
          >
            <MoreHorizontal size={20} />
          </button>
        </div>

        <div className="hidden lg:flex items-center space-x-12">
          <div className="flex items-center space-x-10">
            {menuItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNav(item.value)}
                className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:text-[#C5A059] relative py-2 group ${
                  activePage === item.value ? 'text-[#C5A059]' : inactiveLinkClass
                }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#C5A059] transition-all duration-500 ${activePage === item.value ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}
          </div>
          
          <div className={`h-4 w-px transition-colors duration-500 ${isScrolled ? 'bg-slate-200' : 'bg-slate-200'}`}></div>
          
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => handleNav(Page.GURU_PORTAL)}
              className={`flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest transition-colors duration-500 hover:text-[#C5A059] ${textColorClass}`}
            >
              <BookOpenCheck size={14} className="text-[#C5A059]" />
              <span>Guru</span>
            </button>
            <button 
              onClick={() => handleNav(Page.PPDB)}
              className={`px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
                isScrolled
                ? 'bg-[#0F172A] text-white hover:bg-[#C5A059]' 
                : 'bg-[#0F172A] text-white hover:bg-[#C5A059]'
              }`}
            >
              PPDB 2026
            </button>
          </div>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className={`lg:hidden p-2 transition-colors duration-500 ${textColorClass}`}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {showNavPanel && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-8 shadow-2xl animate-reveal">
          <div className="max-w-[1600px] mx-auto">
            <h3 className="text-lg font-bold text-[#0F172A] mb-6">Navigasi Cepat</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {menuItems.filter(item => item.value !== activePage).map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.value}
                    onClick={() => {
                      handleNav(item.value);
                      setShowNavPanel(false);
                    }}
                    className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-slate-50 hover:bg-[#C5A059]/10 transition-colors group"
                  >
                    <IconComponent size={24} className="text-[#C5A059] group-hover:text-[#0F172A]" />
                    <span className="text-sm font-medium text-[#0F172A] text-center">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-8 flex flex-col space-y-6 shadow-2xl animate-reveal">
          {menuItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNav(item.value)}
              className={`text-left text-2xl font-bold tracking-tight ${activePage === item.value ? 'text-[#C5A059]' : 'text-[#0F172A]'}`}
            >
              {item.name}
            </button>
          ))}
          <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-4">
             <button onClick={() => handleNav(Page.GURU_PORTAL)} className="bg-blue-50 text-blue-700 py-4 rounded-xl font-bold text-sm border border-blue-200"><BookOpenCheck size={18} className="mx-auto mb-1" /> Guru</button>
             <button onClick={() => handleNav(Page.SIAKAD)} className="bg-slate-50 text-[#0F172A] py-4 rounded-xl font-bold text-sm">Portal</button>
             <button onClick={() => handleNav(Page.PPDB)} className="bg-[#0F172A] text-white py-4 rounded-xl font-bold text-sm">PPDB</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
