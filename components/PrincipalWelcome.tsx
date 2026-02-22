
import React from 'react';
import { ArrowUpRight, Minus, Quote } from 'lucide-react';
import { SCHOOL_ASSETS } from '../constants/assets';
import { SCHOOL_THEME } from '../constants/theme';

const PrincipalWelcome: React.FC = () => {
  return (
    <section className="py-40 lg:py-64 bg-white relative overflow-hidden">
      {/* Background Context Photo */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <img src={SCHOOL_ASSETS.HERO_BUILDING} className="w-full h-full object-cover grayscale" alt="" />
      </div>

      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.012]">
        <h2 className="text-[35vw] font-black text-[#05070B] leading-none text-right -mr-40 mt-40">AKAY.</h2>
      </div>

      <div className="sovereign-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          <div className="lg:col-span-7 space-y-16 order-2 lg:order-1 reveal">
            <div className="flex items-center space-x-8">
            <Minus className="text-[#C5A059] w-16" />
              <span className="text-[#0F172A] text-[10px] font-black uppercase tracking-[0.5em]">KEPALA SEKOLAH</span>
            </div>

            <h2 className="h-supreme text-7xl md:text-[120px] text-[#0F172A] font-black leading-[0.75] tracking-tighter">
              KEPALA <br />
              <span className="text-slate-200 italic font-manifesto font-light lowercase text-[10vw]">SEKOLAH.</span>
            </h2>

            <div className="max-w-4xl space-y-12">
              <p className="text-3xl md:text-4xl font-manifesto text-gray-500 leading-[1.2] italic">
                "{SCHOOL_THEME.CONTENT.MOTTO_DESCRIPTION}"
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-600 text-base md:text-lg font-light leading-relaxed">
                <p>
                  SMA Negeri 2 Tompaso berkomitmen untuk menghasilkan peserta didik yang tidak hanya cerdas secara akademik, tetapi juga memiliki karakter mulia dan keterampilan praktis.
                </p>
                <p>
                  Dalam era digital ini, kami mengintegrasikan teknologi terkini dengan nilai-nilai tradisional Minahasa untuk menciptakan generasi pemimpin yang bermartabat.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-12 pt-10">
              <div className="flex flex-col">
                <span className="text-[#05070B] font-black text-2xl md:text-3xl tracking-tighter uppercase">Junus N M Akay, S.Pd, M.Si</span>
              <span className="text-[#C5A059] text-[10px] font-black uppercase tracking-[0.6em] mt-3">Kepala Sekolah</span>
              </div>
            <div className="group flex items-center justify-center w-16 h-16 rounded-full border border-[#0F172A]/10 hover:bg-[#C5A059] hover:text-white transition-all duration-700 cursor-pointer">
                <ArrowUpRight className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative order-1 lg:order-2 w-full reveal">
            <div className="relative w-full h-96 lg:h-[500px]">
              {/* Glass Morphism Frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C5A059] to-blue-500 rounded-[50px] transform rotate-3 opacity-15 blur-xl"></div>
              <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/40 rounded-[50px] overflow-hidden shadow-2xl h-full group hover:border-white/60 transition-all duration-700">
                {/* Image placeholder area */}
                <div className="w-full h-full bg-gradient-to-br from-[#C5A059]/30 to-blue-400/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <img src={SCHOOL_ASSETS.HERO_BUILDING} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="text-center text-white/70 relative z-10">
                    <span className="text-sm font-light italic block">Foto Model</span>
                    <p className="text-xs mt-2">(Tambahkan foto transparan di sini)</p>
                  </div>
                  
                  {/* Commented out: uncomment and add model photo URL */}
                  {/* <img 
                    src="URL_FOTO_MODEL" 
                    alt="Model" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  /> */}
                </div>
              </div>

              {/* Info Card */}
              <div className="absolute -bottom-8 -left-8 bg-white text-[#05070B] p-10 rounded-[40px] shadow-3xl z-20 hidden md:block border border-gray-100 group">
                <Quote className="h-6 w-6 text-[#F3C623] mb-3 opacity-30" />
                <p className="text-[9px] font-black uppercase tracking-[0.5em] text-[#F3C623]">Kepala Sekolah SMA Negeri 2 Tompaso</p>
                <p className="text-lg font-black mt-1 uppercase tracking-tighter">Junus N M Akay</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PrincipalWelcome;
