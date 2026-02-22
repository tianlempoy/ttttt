
import React from 'react';
import { Compass, Play, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { SCHOOL_ASSETS } from '../constants/assets';

const VirtualTour: React.FC = () => {
  return (
    <section className="py-40 lg:py-64 bg-white relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          
          <div className="lg:col-span-5 space-y-12 reveal">
            <div className="inline-flex items-center space-x-4 bg-slate-50 border border-slate-100 px-6 py-2 rounded-full">
              <Compass className="h-4 w-4 text-[#C5A059] animate-spin-slow" />
              <span className="text-[#C5A059] text-[10px] font-black uppercase tracking-[0.4em]">Explorasi Kampus Digital</span>
            </div>
            
            <h2 className="text-6xl md:text-[100px] font-medium text-[#0F172A] tracking-tighter leading-[0.85] font-serif-prestige">
              Jelajahi <br /> <span className="text-slate-200 italic font-light lowercase">ruang belajar.</span>
            </h2>
            
            <p className="text-slate-500 text-xl lg:text-3xl font-light leading-relaxed font-serif-prestige italic">
              "Masuki gerbang digital kami dan saksikan bagaimana teknologi bertemu dengan tradisi di setiap sudut SMAN 2 Tompaso."
            </p>
            
            <div className="space-y-8 pt-6">
              <div className="flex items-start space-x-6">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#C5A059] shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-black text-[#0F172A] uppercase text-[10px] tracking-widest mb-1">Standar Internasional</h4>
                  <p className="text-slate-400 text-sm italic">Fasilitas yang dirancang untuk mendukung kurikulum global.</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#C5A059] shrink-0">
                  <Zap size={20} />
                </div>
                <div>
                  <h4 className="font-black text-[#0F172A] uppercase text-[10px] tracking-widest mb-1">Teknologi Terintegrasi</h4>
                  <p className="text-slate-400 text-sm italic">Setiap ruang kelas dilengkapi dengan sistem cerdas Vision 2026.</p>
                </div>
              </div>
            </div>

            <button className="bg-[#0F172A] text-white px-12 py-7 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#C5A059] transition-all shadow-2xl flex items-center space-x-6 group active:scale-95">
              <span>Mulai Tur 360°</span>
              <Play className="h-4 w-4 fill-current group-hover:scale-125 transition-transform" />
            </button>
          </div>

          <div className="lg:col-span-7 relative reveal" style={{ transitionDelay: '0.4s' }}>
             <div className="relative rounded-[60px] lg:rounded-[100px] overflow-hidden aspect-[16/10] shadow-4xl group cursor-pointer border border-slate-100">
                <img 
                  src={SCHOOL_ASSETS.HERO_BUILDING} 
                  alt="Kampus SMAN 2 Tompaso" 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-[#0F172A]/20 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-700">
                      <div className="w-20 h-20 rounded-full bg-[#C5A059] flex items-center justify-center shadow-2xl">
                         <Play size={24} className="fill-current ml-1" />
                      </div>
                   </div>
                </div>
                <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end text-white">
                   <div className="glass-nav-card !bg-white/5 !backdrop-blur-xl px-10 py-6 rounded-[30px] border border-white/10">
                      <p className="text-[9px] font-black uppercase tracking-[0.5em] text-[#C5A059] mb-2">Live Discovery</p>
                      <h4 className="text-3xl font-black tracking-tighter">Main Building Hall</h4>
                   </div>
                </div>
             </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default VirtualTour;
