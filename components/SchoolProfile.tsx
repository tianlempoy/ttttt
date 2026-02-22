
import React, { useState, useEffect } from 'react';
import { Target, Compass, Book, Brain, Zap, Heart, ShieldCheck, Crown, UserCheck, ChevronRight } from 'lucide-react';
import { SCHOOL_ASSETS } from '../constants/assets';
import { SCHOOL_THEME } from '../constants/theme';

const SchoolProfile: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const mottoValues = [
    {
      title: SCHOOL_THEME.CONTENT.PHILOSOPHY.CERDAS.title,
      desc: SCHOOL_THEME.CONTENT.PHILOSOPHY.CERDAS.desc,
      icon: <Brain className="h-8 w-8" />,
      color: SCHOOL_THEME.CONTENT.PHILOSOPHY.CERDAS.color
    },
    {
      title: SCHOOL_THEME.CONTENT.PHILOSOPHY.TERAMPIL.title,
      desc: SCHOOL_THEME.CONTENT.PHILOSOPHY.TERAMPIL.desc,
      icon: <Zap className="h-8 w-8" />,
      color: SCHOOL_THEME.CONTENT.PHILOSOPHY.TERAMPIL.color
    },
    {
      title: SCHOOL_THEME.CONTENT.PHILOSOPHY.BERMARTABAT.title,
      desc: SCHOOL_THEME.CONTENT.PHILOSOPHY.BERMARTABAT.desc,
      icon: <Heart className="h-8 w-8" />,
      color: SCHOOL_THEME.CONTENT.PHILOSOPHY.BERMARTABAT.color
    }
  ];

  const osisLeadership = SCHOOL_THEME.CONTENT.LEADERSHIP.map(leader => ({
    name: leader.name,
    role: leader.role,
    icon: leader.icon === 'Crown' ? <Crown /> : leader.icon === 'UserCheck' ? <UserCheck /> : leader.icon === 'Book' ? <Book /> : <ShieldCheck />
  }));

  return (
    <div className="bg-[#FDFCFB]">
      {/* Profile Section Header - With Principal Photo */}
      <section className="relative pt-32 pb-32 overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0 opacity-60">
          <img src={SCHOOL_ASSETS.HERO_BUILDING} className="w-full h-full object-cover grayscale-[10%]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/60 to-[#0F172A]/30"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Principal Photo */}
            <div className="reveal flex justify-center lg:justify-start">
              <div className="relative w-72 h-96 lg:w-80 lg:h-[420px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C5A059] to-blue-500 rounded-[40px] transform -rotate-3 opacity-20 blur-xl"></div>
                <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/30 rounded-[40px] overflow-hidden shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-blue-400/40 to-[#C5A059]/40 flex items-center justify-center">
                    <div className="text-center text-white/70">
                      <span className="text-sm font-light italic">Foto Kepala Sekolah</span>
                      <p className="text-xs mt-2">(Tambahkan foto transparan di sini)</p>
                    </div>
                  </div>
                  {/* Placeholder untuk image - ganti src dengan URL foto */}
                  {/* <img src="URL_FOTO_KEPALA_SEKOLAH" className="w-full h-full object-cover" /> */}
                </div>
              </div>
            </div>

            {/* Principal Welcome Text */}
            <div className="reveal text-center lg:text-left">
              <span className="bg-gradient-to-r from-[#C5A059] to-blue-500 bg-clip-text text-transparent font-black tracking-[0.6em] uppercase text-[10px] mb-6 block">Sambutan Kepala Sekolah</span>
              <h1 className="text-5xl md:text-7xl font-medium text-white mb-8 tracking-tighter leading-tight font-serif-prestige">
                Selamat <br /> <span className="text-blue-400 italic font-light lowercase">Datang.</span>
              </h1>
              <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed font-serif-prestige italic">
                Platform digital ini kami persembahkan sebagai jembatan komunikasi yang membawa Anda lebih dekat dengan SMA Negeri 2 Tompaso. Mari bersama-sama membangun masa depan yang {SCHOOL_THEME.CONTENT.MOTTO.toLowerCase()}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission - Gold when scrolled */}
      <section className={`py-40 transition-colors duration-700 ${isScrolled ? 'bg-gradient-to-br from-[#E8D5B7] to-blue-50' : 'bg-gradient-to-br from-white to-blue-50/30'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="reveal">
              <h2 className={`text-5xl font-black ${isScrolled ? 'text-[#0F172A]' : 'text-[#0F172A]'} tracking-tighter mb-12 uppercase italic`}>VISI <span className={isScrolled ? 'bg-gradient-to-r from-[#B39548] to-blue-500 bg-clip-text text-transparent' : 'text-blue-600'}>KAMI.</span></h2>
              <p className={`text-4xl font-serif-prestige italic ${isScrolled ? 'text-[#0F172A]' : 'text-slate-600'} leading-tight border-l-4 ${isScrolled ? 'border-blue-500' : 'border-blue-400'} pl-10 py-2`}>
                "Menjadi lembaga pendidikan unggul yang melahirkan insan cerdas, terampil, dan bermartabat berlandaskan iman, ilmu, dan teknologi."
              </p>
            </div>
            <div className="reveal" style={{ transitionDelay: '0.2s' }}>
              <h2 className={`text-5xl font-black ${isScrolled ? 'text-[#0F172A]' : 'text-[#0F172A]'} tracking-tighter mb-12 uppercase italic`}>MISI <span className={isScrolled ? 'bg-gradient-to-r from-[#B39548] to-blue-500 bg-clip-text text-transparent' : 'text-blue-600'}>UTAMA.</span></h2>
              <ul className="space-y-10">
                {SCHOOL_THEME.CONTENT.MISSION.map((misi, i) => (
                  <li key={i} className="flex items-start space-x-6 group">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 ${isScrolled ? 'bg-blue-100 text-blue-600' : 'bg-blue-100 text-blue-600'} group-hover:bg-blue-600 group-hover:text-white`}>
                      <ChevronRight size={18} />
                    </div>
                    <p className={`text-xl font-light leading-snug transition-colors ${isScrolled ? 'text-[#0F172A]' : 'text-slate-600 group-hover:text-[#0F172A]'}`}>{misi}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy - Gold Accents or Enhanced Gold on Scroll */}
      <section className={`py-40 transition-colors duration-700 ${isScrolled ? SCHOOL_THEME.STYLES.BACKGROUND_GRADIENT.replace('from-[#FDFCFB]', 'from-[#E8D5B7]').replace('to-blue-50/30', 'via-blue-100 to-[#D4C1A3]') : 'bg-gradient-to-b from-[#FDFCFB] via-white to-blue-50/20'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-32 reveal">
            <span className="text-[#C5A059] font-black tracking-[0.5em] uppercase text-[10px] mb-4 block">KEPALA SEKOLAH</span>
            <h2 className={`text-5xl md:text-7xl font-black ${isScrolled ? 'text-[#0F172A]' : 'text-[#0F172A]'} tracking-tighter leading-none`}>Filosofi <br/><span className={isScrolled ? 'bg-gradient-to-r from-[#0F172A] to-blue-600 bg-clip-text text-transparent underline decoration-[#0F172A]/20' : 'text-blue-600 underline decoration-blue-400/40'}>Pendidikan.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {mottoValues.map((motto, idx) => (
              <div key={idx} className={`ivory-card p-16 rounded-[60px] group reveal transition-all duration-700 ${isScrolled ? 'bg-white/30 border border-blue-200/50 backdrop-blur-sm' : 'bg-gradient-to-br from-white to-blue-50'}`}>
                <div className={`mb-12 w-20 h-20 rounded-[30px] flex items-center justify-center shadow-sm transform group-hover:rotate-12 transition-all duration-700 ${
                  isScrolled ? 'bg-blue-100 text-blue-600' : motto.color
                }`}>
                  {motto.icon}
                </div>
                <h4 className={`text-3xl font-black mb-6 tracking-tight transition-colors ${isScrolled ? 'text-[#0F172A]' : 'text-[#0F172A]'}`}>{motto.title}</h4>
                <p className={`leading-relaxed font-light italic font-serif-prestige text-lg transition-colors ${isScrolled ? 'text-[#0F172A]' : 'text-slate-700'}`}>
                  "{motto.desc}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* School History Section */}
      <section className={`py-40 transition-colors duration-700 ${isScrolled ? 'bg-gradient-to-r from-[#E8D5B7] via-blue-50 to-blue-100' : 'bg-gradient-to-r from-white via-blue-50/20 to-white'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-32 reveal">
            <span className="text-[#C5A059] font-black tracking-[0.5em] uppercase text-[10px] mb-4 block">Jejak Sejarah</span>
            <h2 className={`text-5xl md:text-7xl font-black ${isScrolled ? 'text-[#0F172A]' : 'text-[#0F172A]'} tracking-tighter leading-none`}>Perjalanan <br/><span className={isScrolled ? 'bg-gradient-to-r from-[#0F172A] to-blue-600 bg-clip-text text-transparent underline decoration-blue-400/40' : 'text-blue-600 underline decoration-blue-300/50'}>Kami.</span></h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal space-y-8">
              <div className={`p-10 rounded-[40px] border-l-4 transition-all ${isScrolled ? 'bg-white/30 border-blue-500' : 'bg-gradient-to-r from-white to-blue-50 border-blue-400'}`}>
                <h3 className={`text-2xl font-black mb-4 ${isScrolled ? 'text-[#0F172A]' : 'text-[#0F172A]'}`}>Didirikan dengan Visi</h3>
                <p className={`text-lg leading-relaxed font-light ${isScrolled ? 'text-[#0F172A]' : 'text-slate-700'}`}>
                  SMA Negeri 2 Tompaso didirikan sebagai manifestasi komitmen pemerintah dalam memajukan pendidikan di Kabupaten Minahasa Selatan. Institusi ini dibangun dengan landasan kuat untuk menciptakan generasi pemimpin yang cerdas, terampil, dan bermartabat.
                </p>
              </div>

              <div className={`p-10 rounded-[40px] border-l-4 transition-all ${isScrolled ? 'bg-white/30 border-blue-500' : 'bg-gradient-to-r from-white to-blue-50 border-blue-400'}`}>
                <h3 className={`text-2xl font-black mb-4 ${isScrolled ? 'text-[#0F172A]' : 'text-[#0F172A]'}`}>Warisan Prestasi</h3>
                <p className={`text-lg leading-relaxed font-light ${isScrolled ? 'text-[#0F172A]' : 'text-slate-700'}`}>
                  Selama bertahun-tahun, SMA Negeri 2 Tompaso telah menghasilkan ribuan lulusan yang berkontribusi nyata di berbagai bidang. Dari sains, olahraga, seni, hingga teknologi—semua mencerminkan keunggulan akademik dan karakter yang kuat.
                </p>
              </div>

              <div className={`p-10 rounded-[40px] border-l-4 transition-all ${isScrolled ? 'bg-white/30 border-blue-500' : 'bg-gradient-to-r from-white to-blue-50 border-blue-400'}`}>
                <h3 className={`text-2xl font-black mb-4 ${isScrolled ? 'text-[#0F172A]' : 'text-[#0F172A]'}`}>Tradisi Minahasa</h3>
                <p className={`text-lg leading-relaxed font-light ${isScrolled ? 'text-[#0F172A]' : 'text-slate-700'}`}>
                  Kami memelihara kearifan lokal Minahasa sambil merangkul modernitas. Setiap program pendidikan dirancang untuk mempertahankan nilai-nilai budaya yang luhur dan relevan dengan perkembangan zaman global.
                </p>
              </div>
            </div>

            <div className={`reveal p-12 rounded-[40px] transition-all ${isScrolled ? 'bg-gradient-to-br from-white/40 to-blue-100/40 border border-blue-200/60' : 'bg-gradient-to-br from-white to-blue-50 border border-blue-200'}`}>
              <h3 className={`text-3xl font-black mb-8 bg-gradient-to-r from-[#0F172A] to-blue-600 bg-clip-text text-transparent`}>Milestone Penting</h3>
              <ul className="space-y-6">
                {[
                  { year: '1987', event: 'Pendirian SMA Negeri 2 Tompaso' },
                  { year: '1995', event: 'Akreditasi Penuh A' },
                  { year: '2005', event: 'Pembangunan Fasilitas Modern' },
                  { year: '2015', event: 'Digitalisasi Pembelajaran' },
                  { year: '2024', event: 'Transformasi AI & Cloud Computing' }
                ].map((item, i) => (
                  <li key={i} className="flex gap-6 group">
                    <span className={`text-2xl font-black min-w-fit bg-gradient-to-r from-[#C5A059] to-blue-500 bg-clip-text text-transparent`}>{item.year}</span>
                    <div className={`border-l-2 pl-6 transition-colors ${isScrolled ? 'border-blue-400/40' : 'border-blue-400/50'}`}>
                      <p className={`text-lg font-light leading-relaxed ${isScrolled ? 'text-[#0F172A]' : 'text-slate-700'}`}>{item.event}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section - Gold on Scroll */}
      <section className={`py-40 transition-colors duration-700 ${isScrolled ? 'bg-gradient-to-l from-[#D4C1A3] via-blue-100/40 to-[#D4C1A3]' : 'bg-gradient-to-b from-white to-blue-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24 reveal">
            <span className="text-[#C5A059] font-black tracking-[0.6em] uppercase text-[10px] mb-6 block">Student Leadership</span>
            <h2 className={`text-5xl md:text-7xl font-black ${isScrolled ? 'text-[#0F172A]' : 'text-[#0F172A]'} tracking-tighter leading-none`}>Suara <br /><span className={`${isScrolled ? 'bg-gradient-to-r from-[#B39548] to-blue-600 bg-clip-text text-transparent italic' : 'text-blue-600 italic'}`}>Siswa.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {osisLeadership.map((leader, i) => (
              <div key={i} className={`group p-10 rounded-[48px] hover:-translate-y-4 transition-all duration-700 reveal ${isScrolled ? 'bg-white/30 hover:bg-blue-600' : 'bg-gradient-to-br from-white to-blue-50 hover:bg-blue-600'}`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-colors shadow-sm ${isScrolled ? 'bg-gradient-to-br from-[#C5A059] to-blue-500 text-white group-hover:bg-blue-700' : 'bg-gradient-to-br from-blue-400 to-[#C5A059] text-white group-hover:bg-blue-700 group-hover:text-white'}`}>
                  {leader.icon}
                </div>
                <span className="text-[9px] font-black bg-gradient-to-r from-[#C5A059] to-blue-600 bg-clip-text text-transparent tracking-[0.3em] uppercase mb-2 block">{leader.role}</span>
                <h4 className={`text-2xl font-black transition-colors ${isScrolled ? 'text-[#0F172A] group-hover:text-white' : 'text-[#0F172A] group-hover:text-white'}`}>{leader.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SchoolProfile;
