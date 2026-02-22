
import React from 'react';
import { ShieldCheck, Globe, GraduationCap, Scale, ChevronRight } from 'lucide-react';

const InstitutionalFramework: React.FC = () => {
  const pillars = [
    {
      title: 'Keunggulan Akademik',
      subtitle: 'SINERGI INTELEKTUAL',
      desc: 'Kurikulum SMA yang diperkuat dengan pengayaan teknologi untuk membekali siswa dengan kecakapan digital masa depan.',
      icon: <GraduationCap className="h-8 w-8" />,
    },
    {
      title: 'Integritas Karakter',
      subtitle: 'MARTABAT LUHUR',
      desc: 'Membentuk karakter siswa yang menjunjung etika Minahasa sebagai kompas moral dalam setiap interaksi.',
      icon: <Scale className="h-8 w-8" />,
    },
    {
      title: 'Sinergi Komunitas',
      subtitle: 'KEARIFAN LOKAL',
      desc: 'Membangun jejaring antara sekolah, orang tua, dan masyarakat Tompaso untuk ekosistem pendidikan yang harmonis.',
      icon: <Globe className="h-8 w-8" />,
    }
  ];

  return (
    <section className="py-32 lg:py-64 bg-[#0A0F1E] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="frame-grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#frame-grid)" />
        </svg>
      </div>

      <div className="max-w-[1700px] mx-auto px-6 lg:px-24 relative z-10">
        <div className="text-center mb-24 lg:mb-48 space-y-8 reveal">
          <div className="inline-flex items-center space-x-6">
            <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
            <span className="text-[#D4AF37] font-black tracking-[0.8em] uppercase text-[10px]">Pilar Sekolah</span>
            <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
          </div>
          <h2 className="text-5xl md:text-[110px] font-black text-white tracking-tighter leading-none">
            FONDASI <br /> <span className="text-[#D4AF37] italic font-serif-prestige font-light lowercase text-[9vw]">pendidikan.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          {pillars.map((pillar, i) => (
            <div 
              key={i} 
              className="group relative p-12 lg:p-20 rounded-[50px] lg:rounded-[80px] bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-700 hover:bg-white/[0.02]"
            >
              <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-[30px] lg:rounded-[40px] bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] mb-12 lg:mb-20 shadow-4xl group-hover:bg-[#D4AF37] group-hover:text-[#0A0F1E] transition-all duration-700">
                {pillar.icon}
              </div>

              <div className="space-y-6">
                <span className="text-[#D4AF37] text-[10px] font-black tracking-[0.5em] uppercase opacity-60">
                  {pillar.subtitle}
                </span>
                <h3 className="text-3xl lg:text-5xl font-black text-white tracking-tighter leading-tight group-hover:translate-x-4 transition-transform duration-700">
                  {pillar.title}
                </h3>
                <p className="text-slate-400 text-lg lg:text-2xl font-light leading-relaxed font-serif-prestige italic opacity-80 group-hover:opacity-100 transition-opacity">
                  "{pillar.desc}"
                </p>
              </div>

              <div className="mt-12 lg:mt-20 pt-10 border-t border-white/5">
                <button className="flex items-center space-x-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-[#D4AF37] transition-all">
                   <span>Lihat Detail</span>
                   <ChevronRight className="h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstitutionalFramework;
