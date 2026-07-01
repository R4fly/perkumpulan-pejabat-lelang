"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Gavel,
  GraduationCap,
  Newspaper,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: Gavel,
    title: "Pelaksanaan Lelang",
    description:
      "Pedoman dan tata cara pelaksanaan lelang barang milik negara dan swasta sesuai regulasi yang berlaku.",
    href: "/peraturan",
  },
  {
    icon: GraduationCap,
    title: "Pengembangan Kompetensi",
    description:
      "Program pelatihan dan bimbingan teknis berkelanjutan untuk peningkatan kapasitas pejabat lelang.",
    href: "/pengumuman",
  },
  {
    icon: Newspaper,
    title: "Pengumuman Resmi",
    description:
      "Informasi terkini seputar kegiatan asosiasi, regulasi, dan jadwal lelang tingkat nasional.",
    href: "/pengumuman",
  },
  {
    icon: Users,
    title: "Jaringan Profesional",
    description:
      "Wadah kolaborasi antar pejabat lelang di seluruh Indonesia untuk memperkuat integritas profesi.",
    href: "/tentang",
  },
];

export function Features(): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
  } as const;
  const card = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  } as const;

  return (
    <section
      id="layanan"
      aria-label="Layanan utama"
      className="bg-background py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-djkn-800 sm:text-4xl">
            Layanan Perkumpulan
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Empat pilar utama yang menjadi fokus Perkumpulan Pejabat Lelang dalam
            menjalankan peran asosiasi profesional.
          </p>
        </div>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.li key={feature.title} variants={card}>
                <Link
                  href={feature.href}
                  className="group block h-full focus-visible:outline-none"
                >
                  <Card className="h-full border-djkn-100 transition-all group-hover:-translate-y-1 group-hover:border-djkn-300 group-hover:shadow-md group-focus-visible:border-djkn-500">
                    <CardHeader>
                      <span className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-md bg-djkn-50 text-djkn-700">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <CardTitle className="text-djkn-800">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
