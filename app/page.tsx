import * as React from "react";
import type { Metadata } from "next";

import { AnnouncementPreview } from "@/components/landing/AnnouncementPreview";
import { CallToAction } from "@/components/landing/CallToAction";
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { listAnnouncements } from "@/lib/data";
import { formatNumber, currentYear } from "@/lib/format";
import { SITE_CONFIG } from "@/lib/types";

export const metadata: Metadata = {
  title: "Beranda",
  description: SITE_CONFIG.description,
};

export default async function HomePage(): Promise<React.JSX.Element> {
  const [announcements] = await Promise.all([listAnnouncements({ limit: 3 })]);
  const year = currentYear();
  const age = Math.max(0, year - SITE_CONFIG.establishedYear);

  return (
    <>
      <Hero
        subtitle="Asosiasi Pejabat Lelang Indonesia"
        title={`Mitra Strategis\nPelaksanaan Lelang Negara`}
        description="Perkumpulan Pejabat Lelang (PPL) adalah wadah resmi bagi pejabat lelang di Indonesia untuk berkolaborasi, mengembangkan kompetensi, dan menjaga integritas pelaksanaan lelang negara."
        primaryCta={{ href: "/tentang", label: "Tentang Kami" }}
        secondaryCta={{ href: "/peraturan", label: "Lihat Peraturan" }}
      />

      <Stats
        items={[
          {
            value: `${age}+`,
            label: "Tahun Berkarya",
            hint: `Sejak ${SITE_CONFIG.establishedYear}`,
          },
          {
            value: "34",
            label: "Provinsi",
            hint: "Seluruh Indonesia",
          },
          {
            value: formatNumber(850),
            label: "Anggota Aktif",
            hint: "Pejabat lelang tersertifikasi",
          },
          {
            value: "Rp 4,8 T",
            label: "Nilai Lelang",
            hint: "Akumulasi semester I 2026",
          },
        ]}
      />

      <Features />

      <AnnouncementPreview items={announcements} />

      <CallToAction
        title="Bergabung bersama PPL"
        description="Daftarkan diri Anda sebagai anggota untuk mengakses materi pelatihan, jaringan profesional, dan informasi regulasi terbaru."
        primaryCta={{ href: "/login", label: "Masuk / Daftar" }}
        secondaryCta={{ href: "/tentang", label: "Pelajari Lebih Lanjut" }}
      />
    </>
  );
}
