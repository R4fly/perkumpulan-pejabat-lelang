import type { Announcement } from "@/lib/types";

/**
 * Static seed announcements used when Supabase is not configured.
 * The data mirrors the schema in `supabase/migrations/0001_init.sql`
 * and is also safe to import from any Server Component.
 */
export const ANNOUNCEMENTS_SEED: Announcement[] = [
  {
    id: "ann-001",
    title: "Rapat Kerja Nasional PPL 2026 Resmi Dibuka Pendaftarannya",
    slug: "rakernas-ppl-2026-pendaftaran-dibuka",
    excerpt:
      "Pejabat lelang di seluruh Indonesia diundang untuk mengikuti Rakernas PPL 2026 yang akan diselenggarakan di Jakarta pada Agustus mendatang.",
    content:
      "Perkumpulan Pejabat Lelang kembali menyelenggarakan Rapat Kerja Nasional (Rakernas) tahunan sebagai forum konsolidasi organisasi, penyerapan aspirasi anggota, serta perumusan program kerja tahunan. Rakernas 2026 akan berlangsung selama tiga hari di Jakarta dengan agenda utama: evaluasi kinerja asosiasi, pembahasan standar kompetensi pejabat lelang, dan sidang komisi-komisi kerja.",
    category: "kegiatan",
    publishedAt: "2026-06-20T09:00:00+07:00",
    author: "Sekretariat PPL",
    imageUrl: null,
    isPinned: true,
  },
  {
    id: "ann-002",
    title: "Sosialisasi PMK 27/PMK.06/2016 tentang Pejabat Lelang",
    slug: "sosialisasi-pmk-27-pmk-06-2016",
    excerpt:
      "Sosialisasi nasional perubahan mekanisme penerbitan surat izin dan pengawasan pejabat lelang berdasarkan PMK terbaru.",
    content:
      "Direktorat Jenderal Kekayaan Negara bersama PPL melaksanakan kegiatan sosialisasi PMK 27/PMK.06/2016 kepada seluruh anggota. Materi mencakup perubahan mekanisme penerbitan surat izin, kewajiban pelaporan, dan tata cara pengawasan pejabat lelang di lingkungan Kementerian Keuangan.",
    category: "pelatihan",
    publishedAt: "2026-06-15T13:30:00+07:00",
    author: "Bidang Pendidikan PPL",
    imageUrl: null,
    isPinned: false,
  },
  {
    id: "ann-003",
    title: "Pengumuman Libur Pelayanan Lelang Nasional",
    slug: "libur-pelayanan-lelang-nasional",
    excerpt:
      "Pelayanan lelang di seluruh KPKNL dan KPKNL Tipe B dihentikan sementara pada hari libur nasional dan cuti bersama.",
    content:
      "Menjelang hari libur nasional, pelayanan lelang di seluruh Kantor Pelayanan Kekayaan Negara dan Lelang (KPKNL) dihentikan sementara sesuai dengan Surat Edaran DJKN. Layanan akan kembali aktif pada hari kerja berikutnya. Pendaftaran peserta lelang yang telah dibuka tetap berlaku dan tidak perlu diulang.",
    category: "penting",
    publishedAt: "2026-06-10T08:00:00+07:00",
    author: "Sekretariat PPL",
    imageUrl: null,
    isPinned: true,
  },
  {
    id: "ann-004",
    title: "Bimbingan Teknis Penilaian Barang Jaminan Lelang",
    slug: "bimtek-penilaian-barang-jaminan",
    excerpt:
      "Pelatihan tiga hari tentang teknik penilaian barang jaminan lelang untuk pejabat lelang tingkat pertama dan madya.",
    content:
      "Bidang Pendidikan PPL bekerja sama dengan DJKN menyelenggarakan bimbingan teknis penilaian barang jaminan lelang. Materi meliputi dasar hukum penilaian, metode penilaian aset tetap, dan studi kasus properti komersial. Peserta akan mendapatkan sertifikat kelulusan yang diakui sebagai bagian dari angka kredit pengembangan kompetensi.",
    category: "pelatihan",
    publishedAt: "2026-06-05T10:15:00+07:00",
    author: "Bidang Pendidikan PPL",
    imageUrl: null,
    isPinned: false,
  },
  {
    id: "ann-005",
    title: "Hasil Lelang Barang Rampasan Negara Semester I 2026",
    slug: "hasil-lelang-semester-i-2026",
    excerpt:
      "Rekapitulasi nilai lelang barang rampasan negara semester pertama tahun 2026 yang mencapai kenaikan 12% dibanding periode yang sama tahun lalu.",
    content:
      "Direktorat Lelang DJKN mengumumkan hasil rekapitulasi lelang semester I tahun 2026. Total nilai lelang tercatat sebesar Rp 4,8 triliun, meningkat 12% dari periode yang sama tahun sebelumnya. Kontribusi terbesar berasal dari lelang aset properti, diikuti oleh lelang kendaraan bermotor dan barang bergerak lainnya.",
    category: "lelang",
    publishedAt: "2026-05-28T11:00:00+07:00",
    author: "Bidang Humas PPL",
    imageUrl: null,
    isPinned: false,
  },
  {
    id: "ann-006",
    title: "Penerimaan Calon Anggota PPL Periode 2026-2029",
    slug: "penerimaan-calon-anggota-2026-2029",
    excerpt:
      "Pendaftaran calon anggota baru PPL dibuka untuk pejabat lelang aktif di seluruh Indonesia hingga akhir bulan ini.",
    content:
      "PPL membuka pendaftaran calon anggota baru untuk periode kepengurusan 2026-2029. Pendaftaran dilakukan secara daring melalui sistem keanggotaan PPL. Calon anggota yang lolos seleksi akan mengikuti masa orientasi selama dua minggu sebelum ditetapkan sebagai anggota penuh.",
    category: "umum",
    publishedAt: "2026-05-20T09:00:00+07:00",
    author: "Sekretariat PPL",
    imageUrl: null,
    isPinned: false,
  },
];
