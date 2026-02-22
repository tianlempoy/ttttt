import React, { useState } from 'react';
import { User, MapPin, Phone, BookOpen, Upload, CheckCircle, AlertCircle, Loader2, Send } from 'lucide-react';
import type { PPDBRegistration } from '../types';
import { SCHOOL_ASSETS } from '../constants/assets';

interface PPDBRegistrationProps {
  onSuccess?: (registration: PPDBRegistration) => void;
}

const PPDBRegistration: React.FC<PPDBRegistrationProps> = ({ onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    // Data Siswa
    nama_lengkap: '',
    nisn: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: 'L' as 'L' | 'P',
    agama: '',
    alamat: '',
    rt_rw: '',
    desa_kelurahan: '',
    kecamatan: '',
    kabupaten_kota: '',
    provinsi: '',
    kode_pos: '',
    
    // Data Orang Tua
    nama_ayah: '',
    nama_ibu: '',
    pekerjaan_ayah: '',
    pekerjaan_ibu: '',
    no_telp_ortu: '',
    
    // Data Sekolah Asal
    nama_sekolah_asal: '',
    npsn_sekolah_asal: '',
    alamat_sekolah_asal: '',
  });

  const steps = [
    { number: 1, title: 'Data Siswa', icon: User },
    { number: 2, title: 'Data Orang Tua', icon: Phone },
    { number: 3, title: 'Sekolah Asal', icon: BookOpen },
    { number: 4, title: 'Konfirmasi', icon: CheckCircle },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with actual Supabase call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newRegistration: PPDBRegistration = {
        id: Date.now(),
        ...formData,
        status_pendaftaran: 'menunggu',
        tanggal_daftar: new Date().toLocaleDateString('id-ID'),
        tahun_ajaran: '2025/2026',
      };
      
      setSubmitStatus('success');
      if (onSuccess) {
        onSuccess(newRegistration);
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.nama_lengkap && formData.nisn && formData.tempat_lahir && 
               formData.tanggal_lahir && formData.jenis_kelamin && formData.agama && formData.alamat;
      case 2:
        return formData.nama_ayah && formData.nama_ibu && formData.no_telp_ortu;
      case 3:
        return formData.nama_sekolah_asal && formData.npsn_sekolah_asal;
      default:
        return true;
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-black text-[#0A0F1E] mb-4">Pendaftaran Berhasil!</h2>
            <p className="text-gray-600 mb-8">
              Terima kasih telah melakukan pendaftaran. Silakan catat nomor registrasi Anda:
            </p>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-2xl font-black py-4 px-8 rounded-2xl inline-block mb-8">
              PPDB-{Date.now().toString().slice(-8)}
            </div>
            <p className="text-gray-500 text-sm">
              Simpan nomor registrasi ini untuk memeriksa status pendaftaran Anda.
              Hasil seleksi akan diinformasikan melalui website ini.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <img src={SCHOOL_ASSETS.LOGO} alt="Logo SMAN 2 Tompaso" className="w-16 h-16" />
            <div>
              <h1 className="text-3xl font-black text-[#0A0F1E]">PPDB Online</h1>
              <p className="text-gray-500 font-medium">SMAN 2 Tompaso</p>
            </div>
          </div>
          <p className="text-gray-600">Tahun Ajaran 2025/2026</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full transition-all ${
                    isActive ? 'bg-blue-600 text-white' : 
                    isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : <IconComponent className="w-6 h-6" />}
                  </div>
                  <span className={`ml-2 font-bold ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 lg:w-24 h-1 mx-4 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8">
          {/* Step 1: Data Siswa */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-[#0A0F1E] mb-6">Data Diri Siswa</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap *</label>
                  <input
                    type="text"
                    name="nama_lengkap"
                    value={formData.nama_lengkap}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">NISN *</label>
                  <input
                    type="text"
                    name="nisn"
                    value={formData.nisn}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    placeholder="10 digit NISN"
                    maxLength={10}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tempat Lahir *</label>
                  <input
                    type="text"
                    name="tempat_lahir"
                    value={formData.tempat_lahir}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    placeholder="Kota lahir"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tanggal Lahir *</label>
                  <input
                    type="date"
                    name="tanggal_lahir"
                    value={formData.tanggal_lahir}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Jenis Kelamin *</label>
                  <select
                    name="jenis_kelamin"
                    value={formData.jenis_kelamin}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Agama *</label>
                  <select
                    name="agama"
                    value={formData.agama}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Pilih Agama</option>
                    <option value="Islam">Islam</option>
                    <option value="Kristen">Kristen</option>
                    <option value="Katolik">Katolik</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Budha">Budha</option>
                    <option value="Konghucu">Konghucu</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Alamat Lengkap *</label>
                <textarea
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder="Jalan, RT/RW, No. Rumah"
                />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">RT/RW</label>
                  <input
                    type="text"
                    name="rt_rw"
                    value={formData.rt_rw}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    placeholder="001/002"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Desa/Kelurahan</label>
                  <input
                    type="text"
                    name="desa_kelurahan"
                    value={formData.desa_kelurahan}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kecamatan</label>
                  <input
                    type="text"
                    name="kecamatan"
                    value={formData.kecamatan}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kabupaten/Kota</label>
                  <input
                    type="text"
                    name="kabupaten_kota"
                    value={formData.kabupaten_kota}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Provinsi</label>
                  <input
                    type="text"
                    name="provinsi"
                    value={formData.provinsi}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kode Pos</label>
                  <input
                    type="text"
                    name="kode_pos"
                    value={formData.kode_pos}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    maxLength={5}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Data Orang Tua */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-[#0A0F1E] mb-6">Data Orang Tua / Wali</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nama Ayah *</label>
                  <input
                    type="text"
                    name="nama_ayah"
                    value={formData.nama_ayah}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    placeholder="Nama ayah kandung"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Pekerjaan Ayah</label>
                  <input
                    type="text"
                    name="pekerjaan_ayah"
                    value={formData.pekerjaan_ayah}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    placeholder="Pekerjaan ayah"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nama Ibu *</label>
                  <input
                    type="text"
                    name="nama_ibu"
                    value={formData.nama_ibu}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    placeholder="Nama ibu kandung"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Pekerjaan Ibu</label>
                  <input
                    type="text"
                    name="pekerjaan_ibu"
                    value={formData.pekerjaan_ibu}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    placeholder="Pekerjaan ibu"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nomor Telepon Orang Tua *</label>
                  <input
                    type="tel"
                    name="no_telp_ortu"
                    value={formData.no_telp_ortu}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Sekolah Asal */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-[#0A0F1E] mb-6">Data Sekolah Asal</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nama Sekolah Asal *</label>
                  <input
                    type="text"
                    name="nama_sekolah_asal"
                    value={formData.nama_sekolah_asal}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    placeholder="SMP/MTs asal"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">NPSN Sekolah Asal *</label>
                  <input
                    type="text"
                    name="npsn_sekolah_asal"
                    value={formData.npsn_sekolah_asal}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    placeholder="NPSN sekolah"
                    maxLength={8}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Alamat Sekolah Asal</label>
                  <textarea
                    name="alamat_sekolah_asal"
                    value={formData.alamat_sekolah_asal}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    placeholder="Alamat lengkap sekolah asal"
                  />
                </div>
              </div>
              
              {/* Dokumen Upload Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="font-bold text-blue-800 mb-4 flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Informasi Upload Dokumen
                </h3>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li>• Upload dokumen setelah submit formulir</li>
                  <li>• Format yang diizinkan: JPG, PNG, PDF</li>
                  <li>• Ukuran maksimal per file: 2MB</li>
                  <li>• Dokumen yang diperlukan: KK, Akte Kelahiran, Foto, Ijazah</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 4: Konfirmasi */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-[#0A0F1E] mb-6">Konfirmasi Data</h2>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-6">
                <div className="flex items-start">
                  <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold text-yellow-800">Perhatian!</h3>
                    <p className="text-sm text-yellow-700">
                      Pastikan semua data yang Anda masukkan benar. Data yang sudah submit tidak dapat diubah.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <h4 className="font-bold text-[#0A0F1E]">Data Siswa</h4>
                  <p><span className="text-gray-500">Nama:</span> {formData.nama_lengkap}</p>
                  <p><span className="text-gray-500">NISN:</span> {formData.nisn}</p>
                  <p><span className="text-gray-500">Tempat/Tgl Lahir:</span> {formData.tempat_lahir}, {formData.tanggal_lahir}</p>
                  <p><span className="text-gray-500">Jenis Kelamin:</span> {formData.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                  <p><span className="text-gray-500">Agama:</span> {formData.agama}</p>
                  <p><span className="text-gray-500">Alamat:</span> {formData.alamat}</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-bold text-[#0A0F1E]">Data Orang Tua</h4>
                  <p><span className="text-gray-500">Nama Ayah:</span> {formData.nama_ayah}</p>
                  <p><span className="text-gray-500">Nama Ibu:</span> {formData.nama_ibu}</p>
                  <p><span className="text-gray-500">No. Telp:</span> {formData.no_telp_ortu}</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-bold text-[#0A0F1E]">Sekolah Asal</h4>
                  <p><span className="text-gray-500">Nama:</span> {formData.nama_sekolah_asal}</p>
                  <p><span className="text-gray-500">NPSN:</span> {formData.npsn_sekolah_asal}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-8 py-3 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Kembali
              </button>
            ) : (
              <div />
            )}
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid()}
                className="px-8 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Lanjutkan
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Kirim Pendaftaran</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PPDBRegistration;
