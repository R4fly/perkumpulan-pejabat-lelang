"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, ChevronRight, Pin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ANNOUNCEMENT_CATEGORY_LABELS, type Announcement } from "@/lib/types";
import { formatDateShort } from "@/lib/format";

interface PreviewProps {
  items: Announcement[];
}

export function AnnouncementPreview({ items }: PreviewProps): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
  } as const;
  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  } as const;

  return (
    <section
      aria-label="Pengumuman terbaru"
      className="bg-muted/40 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-djkn-800 sm:text-4xl">
              Pengumuman Terbaru
            </h2>
            <p className="mt-2 text-muted-foreground">
              Informasi terkini seputar kegiatan asosiasi, sosialisasi regulasi,
              dan agenda lelang nasional.
            </p>
          </div>
          <Link
            href="/pengumuman"
            className="inline-flex items-center gap-1 text-sm font-semibold text-djkn-700 hover:text-djkn-800"
          >
            Lihat semua
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {items.map((announcement) => (
            <motion.li key={announcement.id} variants={item}>
              <Link
                href={`/pengumuman/${announcement.slug}`}
                className="group block h-full focus-visible:outline-none"
              >
                <Card className="h-full border-djkn-100 transition-all group-hover:-translate-y-1 group-hover:border-djkn-300 group-hover:shadow-md group-focus-visible:border-djkn-500">
                  <CardHeader className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="secondary" className="font-medium">
                        {ANNOUNCEMENT_CATEGORY_LABELS[announcement.category]}
                      </Badge>
                      {announcement.isPinned ? (
                        <span
                          className="inline-flex items-center gap-1 text-xs font-semibold text-djkn-700"
                          aria-label="Pengumuman disematkan"
                        >
                          <Pin className="h-3.5 w-3.5" aria-hidden="true" />
                          Disematkan
                        </span>
                      ) : null}
                    </div>
                    <CardTitle className="line-clamp-2 text-djkn-800 group-hover:text-djkn-700">
                      {announcement.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      {announcement.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                      <time dateTime={announcement.publishedAt}>
                        {formatDateShort(announcement.publishedAt)}
                      </time>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
