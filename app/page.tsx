import * as React from "react";
import type { Metadata } from "next";
import GlassmorphismHero from "@/components/ui/glassmorphism-hero";
import { AnnouncementPreview } from "@/components/landing/AnnouncementPreview";
import { CallToAction } from "@/components/landing/CallToAction";
import { listAnnouncements } from "@/lib/data";
import { SITE_CONFIG } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Beranda",
  description: SITE_CONFIG.description,
};

export default async function HomePage(): Promise<React.JSX.Element> {
  const announcements = await listAnnouncements({ limit: 3 });
  
  // Check if user is logged in
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <>
      <GlassmorphismHero />
      <AnnouncementPreview items={announcements} />
      <CallToAction
        title="Bergabung bersama PPL"
        description="Daftarkan diri Anda sebagai anggota untuk mengakses materi pelatihan, jaringan profesional, dan informasi regulasi terbaru."
        primaryCta={{ 
          href: user ? "/dashboard" : "/login", 
          label: user ? "Buka Dashboard" : "Masuk / Daftar" 
        }}
        secondaryCta={{ href: "/tentang", label: "Pelajari Lebih Lanjut" }}
      />
    </>
  );
}