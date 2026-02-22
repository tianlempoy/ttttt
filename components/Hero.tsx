
import React from 'react';
import { ArrowRight as ArrowRightIcon, Sparkles as SparklesIcon, Play as PlayIcon, ShieldCheck as ShieldCheckIcon } from 'lucide-react';
import { SCHOOL_ASSETS } from '../constants/assets';
import { SCHOOL_THEME } from '../constants/theme';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0F172A] via-[#0A0F1E] to-blue-900 pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden select-none">
        <div className="absolute inset-0 transform scale-105">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover opacity-90"
            poster={SCHOOL_ASSETS.HERO_BUILDING}
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-[#0A0F1E]/15 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1E] via-[#0A0F1E]/80 to-blue-900/30 z-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCFB] via-transparent to-transparent z-20"></div>
        <div className="absolute top-0 left-1/4 w-[50%] h-[30%] bg-white/5 blur-[120px] rounded-full z-15 pointer-events-none"></div>
      </div>
      
      <div className="max-w-[1600px] mx-auto px-8 lg:px-20 w-full relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          <div className="lg:col-span-8 space-y-8 reveal active">
            {/* Premium Header */}
            <div className="flex items-center space-x-4">
              <div className="h-[1px] w-12 bg-[#C5A059]"></div>
              <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/70">
                SMA Negeri 2 Tompaso
              </span>
            </div>

            {/* Premium Bold Motto */}
            <div className="space-y-0">
              <h1 className="text-5xl lg:text-8xl font-bold text-white uppercase tracking-tighter leading-[0.9]">
                Cerdas
              </h1>
              <h1 className="text-5xl lg:text-8xl font-bold text-white uppercase tracking-tighter leading-[0.9]">
                Terampil
              </h1>
              <h1 className="text-5xl lg:text-8xl font-bold text-[#C5A059] uppercase tracking-tighter leading-[0.9]">
                Bermartabat
              </h1>
            </div>

            {/* Premium Description */}
            <div className="max-w-2xl pt-6">
              <p className="text-lg lg:text-xl font-normal leading-relaxed text-white/80">
                {SCHOOL_THEME.CONTENT.MOTTO_DESCRIPTION}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 pt-6">
              <button className="bg-gradient-to-r from-[#C5A059] to-blue-600 text-white px-12 py-7 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:from-blue-600 hover:to-[#C5A059] transition-all shadow-2xl flex items-center justify-center space-x-6 group active:scale-95">
                <span>Daftar Sekarang (PPDB)</span>
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
              
              <a 
                href="https://www.youtube.com/watch?v=ky3IooXZYH4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 px-10 py-7 group border border-white/20 rounded-full hover:border-[#C5A059] transition-all active:scale-95 bg-white/5 backdrop-blur-md shadow-xl"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-white transition-all shadow-sm">
                  <PlayIcon size={14} className="fill-current ml-1" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white drop-shadow-md">Video Profil</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 relative reveal active hidden lg:block" style={{ transitionDelay: '0.4s' }}>
             <div className="bg-[#0A0F1E]/80 backdrop-blur-3xl p-10 lg:p-14 rounded-[40px] shadow-3xl border border-white/10 max-w-[340px] hover:translate-y-[-10px] transition-transform duration-700 group/seal relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C5A059]/10 to-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover/seal:from-[#C5A059]/20 group-hover/seal:to-blue-500/20 transition-colors"></div>
                
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-8 h-8 rounded-full bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059]">
                    <ShieldCheckIcon size={16} />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#C5A059]/60">SEKOLAH MENENGAH ATAS</span>
                </div>
                
                <div className="relative inline-block mb-2">
                  <p className="text-[140px] font-light text-white tracking-tighter leading-none font-serif-prestige italic drop-shadow-[0_10px_30px_rgba(197,160,89,0.25)] select-none">
                    B
                  </p>
                  <div className="absolute -bottom-2 left-0 w-2/3 h-[2px] bg-gradient-to-r from-[#C5A059] to-blue-400"></div>
                </div>

                <div className="mt-8 space-y-1">
                  <p className="text-[11px] font-black uppercase tracking-[0.5em] text-white leading-relaxed">
                    Akreditasi
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A059] opacity-80">
                    NASIONAL BAN-S/M
                  </p>
                </div>

                <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
                   <span className="text-[8px] font-black uppercase tracking-widest text-white/30">Pusat Akademik Terverifikasi</span>
                   <div className="flex -space-x-1">
                      <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></div>
                   </div>
                </div>
              </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;
