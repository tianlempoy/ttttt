/**
 * SCHOOL THEME - SMAN 2 TOMPASO
 * Tema warna dan konten yang diterapkan di setiap halaman
 */

export const SCHOOL_THEME = {
  // Warna Utama
  COLORS: {
    PRIMARY: '#0F172A', // Navy
    SECONDARY: '#C5A059', // Gold
    ACCENT: '#D4AF37', // Accent Gold
    BACKGROUND: '#FDFCFB', // Ivory
    TEXT: '#0F172A', // Navy
    TEXT_LIGHT: '#64748B', // Slate
    BLUE_ACCENT: '#3B82F6', // Blue
  },

  // Konten Utama
  CONTENT: {
    MOTTO: 'Cerdas, Terampil, Bermartabat',
    MOTTO_DESCRIPTION: 'Membina komunitas intelektual yang cerdas, terampil, dan bermartabat di jantung Minahasa melalui inovasi pendidikan tanpa batas.',
    VISION: 'Menjadi lembaga pendidikan unggul yang melahirkan insan cerdas, terampil, dan bermartabat berlandaskan iman, ilmu, dan teknologi.',
    MISSION: [
      'Menyelenggarakan pembelajaran berbasis teknologi mutakhir (AI & Cloud).',
      'Mengembangkan minat bakat siswa melalui kompetisi global.',
      'Menanamkan karakter luhur dan kearifan budaya lokal.',
      'Membangun kolaborasi strategis dengan institusi ternama.'
    ],
    PHILOSOPHY: {
      CERDAS: {
        title: 'Cerdas',
        desc: 'Mengutamakan perkembangan intelektual dan literasi digital yang tajam di era informasi global.',
        icon: 'Brain',
        color: 'text-blue-600 bg-blue-50'
      },
      TERAMPIL: {
        title: 'Terampil',
        desc: 'Membekali siswa dengan keahlian praktis dan kreativitas yang siap bersaing di dunia profesional.',
        icon: 'Zap',
        color: 'text-amber-600 bg-amber-50'
      },
      BERMARTABAT: {
        title: 'Bermartabat',
        desc: 'Menjunjung tinggi etika, moralitas, dan kearifan lokal Minahasa dalam setiap langkah kehidupan.',
        icon: 'Heart',
        color: 'text-red-600 bg-red-50'
      }
    },
    LEADERSHIP: [
      { name: 'Preysi Pesik', role: 'Ketua OSIS', icon: 'Crown' },
      { name: 'Esterlita Suoth', role: 'Wakil Ketua OSIS', icon: 'UserCheck' },
      { name: 'Chika Korompis', role: 'Sekretaris I', icon: 'Book' },
      { name: 'Firen Gahung', role: 'Bendahara I', icon: 'ShieldCheck' }
    ]
  },

  // Styling Konsisten
  STYLES: {
    BACKGROUND_GRADIENT: 'bg-gradient-to-br from-[#FDFCFB] to-blue-50/30',
    CARD_BACKGROUND: 'bg-gradient-to-br from-white to-blue-50',
    TEXT_GRADIENT: 'bg-gradient-to-r from-[#C5A059] to-blue-500 bg-clip-text text-transparent',
    BORDER_COLOR: 'border-blue-400',
    HOVER_EFFECT: 'hover:bg-blue-600 hover:text-white'
  }
};
