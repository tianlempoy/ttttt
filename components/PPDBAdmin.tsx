import React, { useState, useEffect } from 'react';
import { Users, FileText, CheckCircle, XCircle, Clock, Search, Download, Eye, Trash2, Edit3, Loader2, RefreshCw, User, Phone, MapPin, BookOpen, Filter } from 'lucide-react';
import { PPDBRegistration } from '../types';

interface PPDBAdminProps {
  onLogout?: () => void;
}

const PPDBAdmin: React.FC<PPDBAdminProps> = ({ onLogout }) => {
  const [registrations, setRegistrations] = useState<PPDBRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'menunggu' | 'diterima' | 'ditolak'>('all');
  const [selectedRegistration, setSelectedRegistration] = useState<PPDBRegistration | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Demo data
  const demoData: PPDBRegistration[] = [
    {
      id: 1,
      nama_lengkap: 'Ahmad Fauzi',
      nisn: '1234567890',
      tempat_lahir: 'Tompaso',
      tanggal_lahir: '2010-05-15',
      jenis_kelamin: 'L',
      agama: 'Islam',
      alamat: 'Jl. Raya Tompaso No. 123',
      rt_rw: '001/002',
      desa_kelurahan: 'Tompaso',
      kecamatan: 'Tompaso',
      kabupaten_kota: 'Minahasa',
      provinsi: 'Sulawesi Utara',
      kode_pos: '95356',
      nama_ayah: 'Budi Santoso',
      nama_ibu: 'Siti Aminah',
      pekerjaan_ayah: 'Petani',
      pekerjaan_ibu: 'Ibu Rumah Tangga',
      no_telp_ortu: '081234567890',
      nama_sekolah_asal: 'SMPN 1 Tompaso',
      npsn_sekolah_asal: '12345678',
      alamat_sekolah_asal: 'Jl. SMPN 1 Tompaso',
      status_pendaftaran: 'menunggu',
      tanggal_daftar: '15/01/2025',
      tahun_ajaran: '2025/2026',
    },
    {
      id: 2,
      nama_lengkap: 'Siti Rahayu',
      nisn: '0987654321',
      tempat_lahir: 'Manado',
      tanggal_lahir: '2010-08-20',
      jenis_kelamin: 'P',
      agama: 'Kristen',
      alamat: 'Jl. Pahlawan No. 45',
      rt_rw: '002/001',
      desa_kelurahan: 'Tompaso',
      kecamatan: 'Tompaso',
      kabupaten_kota: 'Minahasa',
      provinsi: 'Sulawesi Utara',
      kode_pos: '95356',
      nama_ayah: 'Joko Wijaya',
      nama_ibu: 'Maria Lumowo',
      pekerjaan_ayah: 'Pegawai Negeri',
      pekerjaan_ibu: 'Guru',
      no_telp_ortu: '081234567891',
      nama_sekolah_asal: 'SMPN 2 Tompaso',
      npsn_sekolah_asal: '12345679',
      alamat_sekolah_asal: 'Jl. SMPN 2 Tompaso',
      status_pendaftaran: 'diterima',
      tanggal_daftar: '14/01/2025',
      tahun_ajaran: '2025/2026',
    },
    {
      id: 3,
      nama_lengkap: 'Budi Santoso',
      nisn: '1122334455',
      tempat_lahir: 'Bitung',
      tanggal_lahir: '2010-03-10',
      jenis_kelamin: 'L',
      agama: 'Islam',
      alamat: 'Jl. Laut No. 78',
      rt_rw: '003/004',
      desa_kelurahan: 'Tompaso',
      kecamatan: 'Tompaso',
      kabupaten_kota: 'Minahasa',
      provinsi: 'Sulawesi Utara',
      kode_pos: '95356',
      nama_ayah: 'Ahmad',
      nama_ibu: 'Wati',
      pekerjaan_ayah: 'Wiraswasta',
      pekerjaan_ibu: 'Ibu Rumah Tangga',
      no_telp_ortu: '081234567892',
      nama_sekolah_asal: 'MTsN Tompaso',
      npsn_sekolah_asal: '12345680',
      alamat_sekolah_asal: 'Jl. MTsN Tompaso',
      status_pendaftaran: 'ditolak',
      tanggal_daftar: '13/01/2025',
      tahun_ajaran: '2025/2026',
    },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRegistrations(demoData);
    setLoading(false);
  };

  const handleUpdateStatus = async (id: string | number, newStatus: 'menunggu' | 'diterima' | 'ditolak') => {
    setIsUpdating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setRegistrations(prev => 
      prev.map(reg => 
        reg.id === id ? { ...reg, status_pendaftaran: newStatus } : reg
      )
    );
    setIsUpdating(false);
    setSelectedRegistration(null);
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = reg.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.nisn.includes(searchTerm) ||
                         reg.nama_sekolah_asal.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || reg.status_pendaftaran === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'diterima':
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Diterima</span>;
      case 'ditolak':
        return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">Ditolak</span>;
      default:
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">Menunggu</span>;
    }
  };

  const stats = {
    total: registrations.length,
    menunggu: registrations.filter(r => r.status_pendaftaran === 'menunggu').length,
    diterima: registrations.filter(r => r.status_pendaftaran === 'diterima').length,
    ditolak: registrations.filter(r => r.status_pendaftaran === 'ditolak').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-black text-[#0A0F1E]">PPDB Admin Panel</h1>
            <span className="text-gray-400">|</span>
            <span className="text-sm text-gray-500">SMAN 2 Tompaso</span>
          </div>
          <button
            onClick={onLogout}
            className="text-sm text-gray-500 hover:text-red-600 font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Total</p>
                <p className="text-3xl font-black text-[#0A0F1E]">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Menunggu</p>
                <p className="text-3xl font-black text-yellow-600">{stats.menunggu}</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-xl">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Diterima</p>
                <p className="text-3xl font-black text-green-600">{stats.diterima}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Ditolak</p>
                <p className="text-3xl font-black text-red-600">{stats.ditolak}</p>
              </div>
              <div className="bg-red-100 p-4 rounded-xl">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari berdasarkan nama, NISN, atau sekolah asal..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600"
              >
                <option value="all">Semua Status</option>
                <option value="menunggu">Menunggu</option>
                <option value="diterima">Diterima</option>
                <option value="ditolak">Ditolak</option>
              </select>
            </div>
            <button
              onClick={loadData}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-500">Memuat data...</p>
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500">Tidak ada data ditemukan</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">No</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Nama</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">NISN</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Sekolah Asal</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Tanggal Daftar</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredRegistrations.map((reg, index) => (
                    <tr key={reg.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-bold text-[#0A0F1E]">{reg.nama_lengkap}</p>
                          <p className="text-xs text-gray-500">{reg.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{reg.nisn}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{reg.nama_sekolah_asal}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{reg.tanggal_daftar}</td>
                      <td className="px-6 py-4">{getStatusBadge(reg.status_pendaftaran)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedRegistration(reg)}
                            className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                            title="Lihat Detail"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 hover:bg-green-50 rounded-lg text-green-600 transition-colors"
                            title="Terima"
                            onClick={() => handleUpdateStatus(reg.id, 'diterima')}
                            disabled={isUpdating}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                            title="Tolak"
                            onClick={() => handleUpdateStatus(reg.id, 'ditolak')}
                            disabled={isUpdating}
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal Detail */}
      {selectedRegistration && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h3 className="text-xl font-black text-[#0A0F1E]">Detail Pendaftaran</h3>
              <button
                onClick={() => setSelectedRegistration(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Status:</span>
                {getStatusBadge(selectedRegistration.status_pendaftaran)}
              </div>

              {/* Data Siswa */}
              <div>
                <h4 className="font-bold text-[#0A0F1E] mb-3 flex items-center">
                  <User className="w-4 h-4 mr-2" /> Data Siswa
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Nama Lengkap:</span>
                    <p className="font-medium">{selectedRegistration.nama_lengkap}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">NISN:</span>
                    <p className="font-medium">{selectedRegistration.nisn}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Tempat/Tgl Lahir:</span>
                    <p className="font-medium">{selectedRegistration.tempat_lahir}, {selectedRegistration.tanggal_lahir}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Jenis Kelamin:</span>
                    <p className="font-medium">{selectedRegistration.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Agama:</span>
                    <p className="font-medium">{selectedRegistration.agama}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Alamat:</span>
                    <p className="font-medium">{selectedRegistration.alamat}</p>
                  </div>
                </div>
              </div>

              {/* Data Orang Tua */}
              <div>
                <h4 className="font-bold text-[#0A0F1E] mb-3 flex items-center">
                  <Phone className="w-4 h-4 mr-2" /> Data Orang Tua
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Nama Ayah:</span>
                    <p className="font-medium">{selectedRegistration.nama_ayah}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Pekerjaan Ayah:</span>
                    <p className="font-medium">{selectedRegistration.pekerjaan_ayah}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Nama Ibu:</span>
                    <p className="font-medium">{selectedRegistration.nama_ibu}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">No. Telp:</span>
                    <p className="font-medium">{selectedRegistration.no_telp_ortu}</p>
                  </div>
                </div>
              </div>

              {/* Sekolah Asal */}
              <div>
                <h4 className="font-bold text-[#0A0F1E] mb-3 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" /> Sekolah Asal
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Nama Sekolah:</span>
                    <p className="font-medium">{selectedRegistration.nama_sekolah_asal}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">NPSN:</span>
                    <p className="font-medium">{selectedRegistration.npsn_sekolah_asal}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                {selectedRegistration.status_pendaftaran !== 'diterima' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedRegistration.id, 'diterima')}
                    disabled={isUpdating}
                    className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Terima</span>
                  </button>
                )}
                {selectedRegistration.status_pendaftaran !== 'ditolak' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedRegistration.id, 'ditolak')}
                    disabled={isUpdating}
                    className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Tolak</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PPDBAdmin;
