import type { Regulation } from "@/lib/types";

/**
 * Static seed regulations used when Supabase is not configured.
 * The data mirrors the schema in `supabase/migrations/0001_init.sql`.
 */
export const REGULATIONS_SEED: Regulation[] = [
  {
    id: "reg-001",
    title:
      "Peraturan Menteri Keuangan tentang Pejabat Lelang dan Tata Cara Pelaksanaan Lelang",
    number: "PMK 27/PMK.06/2016",
    year: 2016,
    category: "permenkeu",
    description:
      "Peraturan yang mengatur tentang pengangkatan, pemberhentian, tugas, dan wewenang pejabat lelang beserta tata cara pelaksanaan lelang di lingkungan Kementerian Keuangan.",
    effectiveDate: "2016-02-26",
    documentUrl: null,
    tags: ["pejabat lelang", "pelaksanaan lelang", "wewenang"],
  },
  {
    id: "reg-002",
    title: "Undang-Undang tentang Lelang",
    number: "UU 2/2012",
    year: 2012,
    category: "uu",
    description:
      "Lembaga negara, peralatan negara, dan barang milik negara/swasta dapat dilelang untuk kepentingan umum, pelaksanaan pembangunan, dan memenuhi kewajiban negara.",
    effectiveDate: "2012-01-10",
    documentUrl: null,
    tags: ["uu", "lelang", "dasar hukum"],
  },
  {
    id: "reg-003",
    title:
      "Peraturan Pemerintah tentang Pelaksanaan Pengadaan Tanah Bagi Pembangunan Untuk Kepentingan Umum",
    number: "PP 19/2021",
    year: 2021,
    category: "pp",
    description:
      "Mengatur pelaksanaan pengadaan tanah untuk kepentingan umum termasuk mekanisme lelang atas aset pengganti dan kompensasi.",
    effectiveDate: "2021-03-23",
    documentUrl: null,
    tags: ["pengadaan tanah", "kepentingan umum"],
  },
  {
    id: "reg-004",
    title: "Surat Edaran DJKN tentang Biaya Lelang dan Limit Lelang",
    number: "SE-12/PK.6/2024",
    year: 2024,
    category: "surat-edaran",
    description:
      "Petunjuk teknis penghitungan biaya lelang, biaya pembatalan, serta limit minimal lelang untuk berbagai kategori barang.",
    effectiveDate: "2024-08-15",
    documentUrl: null,
    tags: ["biaya lelang", "limit lelang"],
  },
  {
    id: "reg-005",
    title: "Keputusan Menteri Keuangan tentang Organisasi dan Tata Kerja DJKN",
    number: "KMK 254/KMK.01/2011",
    year: 2011,
    category: "keputusan",
    description:
      "Mengatur susunan organisasi dan tata kerja Direktorat Jenderal Kekayaan Negara termasuk unit-unit pelaksana lelang di daerah.",
    effectiveDate: "2011-07-26",
    documentUrl: null,
    tags: ["organisasi", "djkn"],
  },
  {
    id: "reg-006",
    title:
      "Peraturan Menteri Keuangan tentang Tata Cara Pelaksanaan Lelang Oleh Pejabat Leland",
    number: "PMK 213/PMK.06/2014",
    year: 2014,
    category: "permenkeu",
    description:
      "Mengatur secara rinci tata cara pelaksanaan lelang mulai dari persiapan, penawaran, penetapan pemenang, hingga serah terima barang.",
    effectiveDate: "2014-12-31",
    documentUrl: null,
    tags: ["tata cara", "pelaksanaan lelang"],
  },
];
