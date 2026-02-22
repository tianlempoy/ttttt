
import React from 'react';
import { Monitor, Leaf, Globe, Sparkles, ArrowRight, ShieldCheck, Zap, BookOpen } from 'lucide-react';

const FeaturedPrograms: React.FC = () => {
  return (
    <section className="py-40 lg:py-64 bg-[#0A0F1E] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[200px]"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px]"></div>
      
      <div className="max-w-[1600px] mx-auto px-8 lg:px-20 relative z-10">
        <div className="mb-32 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 reveal">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-px bg-[#D4AF37]"></div>
              <span className="text-[#D4AF37] font-black tracking-[0.6em] uppercase text-[10px]">Cetak Biru Masa Depan</span>
            </div>
            <h2 className="text-6xl md:text-[110px] font-black text-white tracking-tighter leading-none">
              INISIATIF <br /> <span className="text-[#D4AF37] italic font-serif-prestige font-light lowercase text-[9vw]">strategis.</span>
            </h2>
          </div>
          <p className="text-slate-400 max-w-md text-xl lg:text-2xl font-light leading-relaxed font-serif-prestige italic">
            "Bukan sekadar perubahan kurikulum, melainkan transformasi menyeluruh cara kita belajar dan berkarya."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Initiative: Digital Classroom */}
          <div className="lg:col-span-8 group relative bg-white/5 border border-white/10 rounded-[60px] lg:rounded-[100px] p-12 lg:p-24 overflow-hidden hover:bg-white/[0.08] transition-all duration-700">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-[30px] flex items-center justify-center text-[#D4AF37] mb-12 shadow-2xl group-hover:scale-110 transition-transform duration-700">
                  <Monitor className="h-10 w-10" />
                </div>
                <h3 className="text-4xl lg:text-7xl font-black text-white mb-8 tracking-tighter">Ekosistem Belajar <br/> <span className="text-[#D4AF37]">Berbasis AI.</span></h3>
                <p className="text-slate-400 text-xl lg:text-3xl font-light leading-relaxed max-w-2xl mb-12 font-serif-prestige italic">
                  Integrasi kecerdasan buatan dalam proses evaluasi dan personalisasi materi belajar siswa untuk hasil yang lebih presisi.
                </p>
              </div>
              <button className="flex items-center space-x-6 text-[#D4AF37] font-black text-[10px] uppercase tracking-[0.4em] group/btn">
                <span>Lihat Peta Jalan Teknologi</span>
                <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center group-hover/btn:bg-[#D4AF37] group-hover/btn:text-[#0A0F1E] transition-all">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </button>
            </div>
            {/* Visual Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px] -mr-32 -mt-32"></div>
          </div>

          {/* Secondary Feature: Character Center */}
          <div className="lg:col-span-4 bg-[#D4AF37] rounded-[60px] lg:rounded-[100px] p-12 lg:p-20 text-[#0A0F1E] group hover:-translate-y-4 transition-all duration-700">
            <div className="h-full flex flex-col justify-between">
              <div>
                <ShieldCheck className="h-12 w-12 mb-10 opacity-30 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-3xl lg:text-5xl font-black mb-6 tracking-tighter">Pusat Karakter <br/> Minahasa.</h3>
                <p className="text-[#0A0F1E]/60 text-lg lg:text-xl font-bold leading-relaxed mb-10 font-serif-prestige italic">
                  Menanamkan nilai Mapalus dan keberanian leluhur sebagai fondasi etika siswa di era digital.
                </p>
              </div>
              <div className="flex items-center space-x-4 border-t border-[#0A0F1E]/10 pt-8">
                <span className="text-[10px] font-black uppercase tracking-widest">Integritas Moral</span>
                <div className="w-2 h-2 rounded-full bg-[#0A0F1E] animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Third Feature: Global Connections */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-[60px] lg:rounded-[100px] p-12 lg:p-16 text-white group hover:bg-white/[0.08] transition-all duration-700">
            <div className="flex flex-col h-full justify-between">
              <div>
                <Globe className="h-10 w-10 mb-10 text-[#D4AF37]" />
                <h3 className="text-3xl lg:text-4xl font-black mb-6 tracking-tighter">Literasi Global & <br/> Kemitraan.</h3>
                <p className="text-slate-500 text-lg lg:text-xl font-light leading-relaxed italic font-serif-prestige mb-8">
                  Membangun jejaring dengan institusi pendidikan luar negeri untuk program pertukaran budaya dan ilmu pengetahuan.
                </p>
              </div>
              <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-[#D4AF37]/60">
                <li className="flex items-center space-x-3"><Zap size={12}/> <span>English Zone</span></li>
                <li className="flex items-center space-x-3"><Zap size={12}/> <span>Dual Diploma Path</span></li>
              </ul>
            </div>
          </div>

          {/* Fourth Feature: Mapalus Digital */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#0F172A] to-blue-900/40 border border-white/10 rounded-[60px] lg:rounded-[100px] p-12 lg:p-16 text-white flex flex-col lg:flex-row items-center justify-between group overflow-hidden relative">
             <div className="max-w-md relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 text-[#D4AF37]">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-3xl lg:text-5xl font-black mb-6 tracking-tighter">Sinergi Mapalus <br/> <span className="text-[#D4AF37]">Digital.</span></h3>
                <p className="text-slate-400 text-lg lg:text-xl font-light leading-relaxed italic font-serif-prestige">
                  Platform kolaborasi antar siswa, guru, dan alumni untuk berbagi sumber daya pendidikan secara terbuka.
                </p>
             </div>
             <div className="mt-12 lg:mt-0 transform lg:translate-x-10 group-hover:translate-x-0 transition-transform duration-1000">
                <div className="w-48 h-48 border-[15px] border-white/5 rounded-full flex items-center justify-center group-hover:border-[#D4AF37]/10 transition-colors">
                   <div className="w-32 h-32 border-4 border-[#D4AF37]/20 rounded-full animate-spin-slow"></div>
                </div>
             </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default FeaturedPrograms;
