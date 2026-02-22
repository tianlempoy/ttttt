
import React, { useState } from 'react';
import { Cpu, Globe2, Zap, ArrowRight, Target, BookOpen, GraduationCap, Microscope } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    { label: 'Status Sekolah', value: 'B', sub: 'Akreditasi BAN-S/M' },
    { label: 'Penyelesaian Studi', value: '100%', sub: 'Target Kelulusan' },
    { label: 'Kecakapan Digital', value: '98%', sub: 'Siswa Terampil IT' },
    { label: 'Pengembangan Diri', value: '15+', sub: 'Ekstrakurikuler Aktif' },
  ];

  return (
    <div className="py-32 bg-white border-y border-slate-100 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-32">
          {stats.map((s, i) => (
            <div key={i} className="group cursor-default reveal active">
              <p className="text-5xl md:text-[100px] lg:text-[130px] font-black text-[#0F172A] tracking-tighter leading-none transition-all duration-1000 group-hover:text-[#C5A059]">
                {s.value}
              </p>
              <div className="h-1 w-12 lg:w-20 bg-[#C5A059] my-6 lg:my-10 transition-all duration-1000 group-hover:w-full"></div>
              <p className="text-[#0F172A] font-black text-[10px] lg:text-[12px] uppercase tracking-[0.5em] mb-2">{s.label}</p>
              <p className="text-slate-400 text-[8px] lg:text-[10px] font-bold uppercase tracking-widest italic">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CareerPathExplorer: React.FC = () => {
  const [selected, setSelected] = useState<string | null>('science');

  const paths = [
    { 
      id: 'science', 
      name: 'Peminatan MIPA', 
      icon: <Microscope className="h-6 w-6" />, 
      focus: 'Sains & Teknologi', 
      target: 'Analisis & Eksperimen', 
      desc: 'Mendalami Matematika dan Ilmu Pengetahuan Alam untuk membangun fondasi berpikir kritis dan saintifik bagi siswa.' 
    },
    { 
      id: 'social', 
      name: 'Peminatan IPS', 
      icon: <Globe2 className="h-6 w-6" />, 
      focus: 'Sosial & Humaniora', 
      target: 'Kepemimpinan & Sosial', 
      desc: 'Memahami dinamika kemasyarakatan, sejarah, dan ekonomi untuk membentuk karakter siswa yang peka terhadap realitas sosial.' 
    },
    { 
      id: 'tech', 
      name: 'Literasi Digital', 
      icon: <Cpu className="h-6 w-6" />, 
      focus: 'Kecakapan Abad 21', 
      target: 'Inovasi Teknologi', 
      desc: 'Program pengayaan teknologi informasi wajib bagi seluruh siswa SMA Negeri 2 Tompaso untuk menghadapi era digital.' 
    }
  ];

  return (
    <div className="py-40 bg-[#0F172A] relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="reveal active">
            <div className="inline-flex items-center space-x-6 bg-white/5 px-8 py-3 rounded-full mb-12 border border-white/10">
              <Target className="h-4 w-4 text-[#C5A059]" />
              <span className="text-[#C5A059] text-[10px] font-black uppercase tracking-[0.5em]">Eksplorasi Bakat Siswa</span>
            </div>
            <h2 className="text-[10vw] lg:text-[110px] font-medium text-white tracking-tighter leading-[0.8] mb-16 font-serif-prestige">
              Temukan <br /> <span className="text-slate-500 italic font-light lowercase text-[8vw]">minat bakatmu.</span>
            </h2>
            <div className="space-y-6">
              {paths.map(p => (
                <button 
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  className={`w-full p-8 rounded-[40px] border transition-all duration-700 flex items-center justify-between group ${
                    selected === p.id ? 'bg-[#C5A059] border-[#C5A059] text-[#0F172A]' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-8">
                    <div className={`p-5 rounded-[20px] transition-all duration-700 ${selected === p.id ? 'bg-[#0F172A]/10' : 'bg-white/5'}`}>{p.icon}</div>
                    <div className="text-left">
                      <p className="font-black text-xs lg:text-base uppercase tracking-widest">{p.name}</p>
                    </div>
                  </div>
                  <ArrowRight className={`h-5 w-5 transition-all duration-700 ${selected === p.id ? 'translate-x-0' : '-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className={`relative min-h-[500px] flex items-center justify-center transition-all duration-1000 ${selected ? 'opacity-100 scale-100' : 'opacity-10 scale-95 blur-xl'}`}>
            <div className="bg-white/5 backdrop-blur-3xl w-full rounded-[60px] p-16 lg:p-24 relative z-10 border border-white/10 shadow-3xl">
              {selected ? (
                <div className="space-y-12">
                  <span className="text-[#C5A059] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Fokus Pembelajaran</span>
                  <h3 className="text-4xl lg:text-7xl font-medium text-white mb-8 leading-[0.9] font-serif-prestige">
                    Bidang: <br /> <span className="text-[#C5A059] italic font-light">{paths.find(p => p.id === selected)?.focus}</span>
                  </h3>
                  <div className="space-y-10">
                    <div>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Target Kompetensi</p>
                      <p className="text-white text-2xl lg:text-4xl font-light font-serif-prestige italic leading-snug">"{paths.find(p => p.id === selected)?.target}"</p>
                    </div>
                    <p className="text-slate-400 text-lg lg:text-2xl font-light italic leading-relaxed font-serif-prestige max-w-lg">"{paths.find(p => p.id === selected)?.desc}"</p>
                    <button className="w-full lg:w-auto bg-white text-[#0F172A] px-16 py-8 rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#C5A059] transition-all shadow-xl active:scale-95">Detail Kurikulum</button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <BookOpen className="h-20 w-20 mx-auto mb-10 text-white/5" />
                  <p className="text-2xl font-serif-prestige italic text-white/10 uppercase tracking-widest">Pilih Bidang Peminatan...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
