import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, Clock, User, FileText, Calendar } from 'lucide-react';
import { SCHOOL_ASSETS } from '../constants/assets';

interface PPDBStatusProps {
  onCheckStatus?: (registrationNumber: string) => void;
}

const PPDBStatus: React.FC<PPDBStatusProps> = ({ onCheckStatus }) => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [status, setStatus] = useState<'menunggu' | 'diterima' | 'ditolak' | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationNumber.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call - replace with actual Supabase call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Demo: accept certain numbers for testing
    const demoStatuses: Record<string, 'menunggu' | 'diterima' | 'ditolak'> = {
      'PPDB-12345678': 'diterima',
      'PPDB-87654321': 'menunggu',
      'PPDB-11111111': 'ditolak',
    };
    
    const foundStatus = demoStatuses[registrationNumber] || 'menunggu';
    setStatus(foundStatus);
    setShowResult(true);
    setIsSearching(false);
    
    if (onCheckStatus) {
      onCheckStatus(registrationNumber);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'diterima':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'ditolak':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'diterima':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'ditolak':
        return <XCircle className="w-6 h-6 text-red-600" />;
      default:
        return <Clock className="w-6 h-6 text-yellow-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'diterima':
        return 'Selamat! Anda Diterima';
      case 'diterolak':
        return 'Mohon Maaf, Anda Tidak Diterima';
      default:
        return 'Menunggu Verifikasi';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <img src={SCHOOL_ASSETS.LOGO} alt="Logo SMAN 2 Tompaso" className="w-16 h-16" />
            <div>
              <h1 className="text-3xl font-black text-[#0A0F1E]">Cek Status PPDB</h1>
              <p className="text-gray-500 font-medium">SMAN 2 Tompaso</p>
            </div>
          </div>
          <p className="text-gray-600">Tahun Ajaran 2025/2026</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-[#0A0F1E] mb-6">Masukkan Nomor Registrasi</h2>
          
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                placeholder="Contoh: PPDB-12345678"
                className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-lg"
              />
            </div>
            
            <button
              type="submit"
              disabled={isSearching || !registrationNumber.trim()}
              className="w-full px-6 py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isSearching ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Mencari...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Cek Status</span>
                </>
              )}
            </button>
          </form>
          
          <p className="text-gray-500 text-sm text-center mt-4">
            Nomor registrasi diberikan setelah melakukan pendaftaran online
          </p>
        </div>

        {/* Result */}
        {showResult && status && (
          <div className={`rounded-3xl p-8 border-2 ${getStatusColor(status)}`}>
            <div className="flex items-center justify-center mb-6">
              {getStatusIcon(status)}
            </div>
            
            <h3 className="text-2xl font-black text-center mb-4">
              {getStatusText(status)}
            </h3>
            
            {status === 'menunggu' && (
              <div className="text-center space-y-2">
                <p className="text-sm">
                  Pendaftaran Anda sedang dalam proses verifikasi.
                </p>
                <p className="text-sm">
                  Hasil seleksi akan diinformasikan melalui website ini.
                </p>
              </div>
            )}
            
            {status === 'diterima' && (
              <div className="text-center space-y-4">
                <p className="text-sm">
                  Selamat! Anda telah diterima sebagai siswa baru SMAN 2 Tompaso.
                </p>
                <div className="bg-white/50 rounded-xl p-4 space-y-2">
                  <p className="text-sm font-bold">Langkah Selanjutnya:</p>
                  <ul className="text-sm text-left space-y-1">
                    <li>1. Melakukan daftar ulang di sekolah</li>
                    <li>2. Membayar biaya pendaftaran</li>
                    <li>3. Mengumpulkan dokumen asli</li>
                  </ul>
                </div>
              </div>
            )}
            
            {status === 'ditolak' && (
              <div className="text-center space-y-2">
                <p className="text-sm">
                  Mohon maaf, pendaftaran Anda tidak dapat dilanjutkan.
                </p>
                <p className="text-sm">
                  Silakan mencoba lagi pada tahun ajaran berikutnya.
                </p>
              </div>
            )}
            
            <div className="mt-6 pt-6 border-t border-current/20 text-center">
              <p className="text-xs">Nomor Registrasi: {registrationNumber}</p>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mt-8">
          <h3 className="font-bold text-blue-800 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Informasi Tambahan
          </h3>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• Hasil seleksi bersifat final dan tidak dapat diganggu gugat</li>
            <li>• Hubungi sekolah jika ada pertanyaan lebih lanjut</li>
            <li>• Tetap pantau website untuk informasi terbaru</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Belum mendapat nomor registrasi? 
            <a href="#" onClick={() => window.location.href = '?page=PPDB'} className="text-blue-600 font-bold ml-1">
              Daftar Sekarang
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PPDBStatus;
