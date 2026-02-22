
import React from 'react';
import { Shield, Globe, Mail, Phone } from 'lucide-react';
import { SCHOOL_THEME } from '../constants/theme';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-white py-24 px-8 lg:px-20 border-t border-slate-100">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
          
          <div className="space-y-10">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-[#0F172A] tracking-tight">SMAN 2 <span className="text-[#C5A059]">TOMPASO</span></span>
              <span className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-400 mt-2">Pendidikan Menengah Unggul</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed uppercase tracking-widest max-w-[200px]">
              Jl. Raya Tompaso, Minahasa, Sulawesi Utara. <br /> Dedikasi untuk Keunggulan.
            </p>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C5A059]">Pusat Layanan</h4>
            <ul className="space-y-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#0F172A]">
              <li><a href="#" className="hover:text-[#C5A059] transition-colors">HUB PENDAFTARAN</a></li>
              <li><a href="#" className="hover:text-[#C5A059] transition-colors">JEJARING ALUMNI</a></li>
              <li><a href="#" className="hover:text-[#C5A059] transition-colors">PORTAL SIAKAD</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C5A059]">Kontak</h4>
            <ul className="space-y-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#0F172A]">
              <li className="flex items-center space-x-3"><Phone size={12} className="text-[#C5A059]" /> <span>+62 8XX XXXX XXXX</span></li>
              <li className="flex items-center space-x-3"><Mail size={12} className="text-[#C5A059]" /> <span>OFFICE@SMAN2TOMPASO.SCH.ID</span></li>
            </ul>
          </div>

          <div className="space-y-10">
             <button onClick={onAdminClick} className="group flex items-center space-x-4 bg-[#0F172A] text-white px-8 py-5 rounded-full hover:bg-[#C5A059] transition-all shadow-xl">
               <Shield size={16} />
               <span className="text-[10px] font-black uppercase tracking-widest">Administrator</span>
             </button>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-[9px] font-black uppercase tracking-[0.5em] text-slate-400">
           <p>© 2026 SMAN 2 Tompaso. Edisi Prestise Akademik.</p>
           <div className="flex items-center space-x-6 mt-8 md:mt-0">
             <span className="flex items-center"><Globe size={12} className="mr-2" /> Standar Global</span>
             <span className="h-4 w-px bg-slate-200"></span>
             <span>Desain oleh Christian Lempoy</span>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
