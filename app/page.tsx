import * as React from "react";
import type { Metadata } from "next";
import FinTechLandingPage from "@/components/ui/fin-tech-landing-page";
import { AnnouncementPreview } from "@/components/landing/AnnouncementPreview";
import { CallToAction } from "@/components/landing/CallToAction";
import { listAnnouncements } from "@/lib/data";
import { SITE_CONFIG } from "@/lib/types";

export const metadata: Metadata = {
  title: "Beranda",
  description: SITE_CONFIG.description,
};

export default async function HomePage(): Promise<React.JSX.Element> {
  const announcements = await listAnnouncements({ limit: 3 });

  return (
    <>
      <FinTechLandingPage />
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