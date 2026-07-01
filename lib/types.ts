/**
 * Domain types for the Perkumpulan Pejabat Lelang (PPL) website.
 * These shapes mirror the Supabase tables defined in
 * `supabase/migrations/0001_init.sql` and are also used by the static
 * fallback data in `lib/data/*` so the UI never breaks when the database
 * is not yet configured.
 */

export type AnnouncementCategory =
  | "umum"
  | "lelang"
  | "pelatihan"
  | "kegiatan"
  | "penting";

export interface Announcement {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: AnnouncementCategory;
  publishedAt: string; // ISO 8601
  author?: string | null;
  imageUrl?: string | null;
  isPinned: boolean;
}

export type RegulationCategory =
  | "uu"
  | "pp"
  | "permenkeu"
  | "permenpanrb"
  | "keputusan"
  | "surat-edaran";

export interface Regulation {
  id: string;
  title: string;
  number: string; // e.g. "PMK 27/PMK.06/2016"
  year: number;
  category: RegulationCategory;
  description: string;
  effectiveDate: string; // ISO 8601
  documentUrl?: string | null;
  tags: string[];
}

export interface AboutContent {
  id: string;
  section: "visi" | "misi" | "sejarah" | "struktur" | "kontak";
  title: string;
  body: string;
  metadata?: Record<string, string>;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  instagramUrl: string;
  instagramHandle: string;
  establishedYear: number;
}

export const SITE_CONFIG: SiteConfig = {
  name: "Perkumpulan Pejabat Lelang",
  shortName: "PPL",
  description:
    "Asosiasi resmi pejabat lelang di Indonesia yang menaungi profesionalisme, integritas, dan pengembangan kompetensi dalam pelaksanaan lelang negara.",
  email: "sekretariat@pejabatlelang.id",
  phone: "+62 21 1234 5678",
  address: "Gedung DJKN, Jalan Lapangan Banteng Timur 2-4, Jakarta Pusat",
  instagramUrl: "https://www.instagram.com/pejabatlelang.id/",
  instagramHandle: "@pejabatlelang.id",
  establishedYear: 2010,
};

export const ANNOUNCEMENT_CATEGORY_LABELS: Record<AnnouncementCategory, string> = {
  umum: "Umum",
  lelang: "Lelang",
  pelatihan: "Pelatihan",
  kegiatan: "Kegiatan",
  penting: "Penting",
};

export const REGULATION_CATEGORY_LABELS: Record<RegulationCategory, string> = {
  uu: "Undang-Undang",
  pp: "Peraturan Pemerintah",
  permenkeu: "PMK / Permenkeu",
  permenpanrb: "PermenPANRB",
  keputusan: "Keputusan",
  "surat-edaran": "Surat Edaran",
};
