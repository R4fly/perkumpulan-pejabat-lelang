import * as React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, Scale } from "lucide-react";

import { Instagram } from "@/components/ui/instagram-icon";
import { SITE_CONFIG } from "@/lib/types";
import { currentYear } from "@/lib/format";

const FOOTER_NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/peraturan", label: "Peraturan" },
  { href: "/pengumuman", label: "Pengumuman" },
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/login", label: "Masuk" },
] as const;

const FOOTER_CONTACT_LINKS = [
  {
    href: `mailto:${SITE_CONFIG.email}`,
    label: SITE_CONFIG.email,
  },
  {
    href: `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`,
    label: SITE_CONFIG.phone,
  },
] as const;

export function Footer(): React.JSX.Element {
  const year = currentYear();

  return (
    <footer className="mt-auto border-t border-djkn-100 bg-djkn-900 text-djkn-50">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 text-djkn-50 hover:text-white"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-djkn-700 text-djkn-50">
              <Scale className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">{SITE_CONFIG.name}</span>
              <span className="text-xs text-djkn-200">
                Sejak {SITE_CONFIG.establishedYear}
              </span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-djkn-100/90">
            {SITE_CONFIG.description}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-djkn-100">
            Navigasi
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {FOOTER_NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-djkn-100/90 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-djkn-100">
            Hubungi Kami
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-djkn-200" aria-hidden="true" />
              <a
                href={FOOTER_CONTACT_LINKS[0].href}
                className="text-djkn-100/90 transition-colors hover:text-white"
              >
                {FOOTER_CONTACT_LINKS[0].label}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-djkn-200" aria-hidden="true" />
              <a
                href={FOOTER_CONTACT_LINKS[1].href}
                className="text-djkn-100/90 transition-colors hover:text-white"
              >
                {FOOTER_CONTACT_LINKS[1].label}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-djkn-200" aria-hidden="true" />
              <span className="text-djkn-100/90">{SITE_CONFIG.address}</span>
            </li>
            <li className="flex items-center gap-2 pt-1">
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${SITE_CONFIG.instagramHandle}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-djkn-700 text-djkn-100 transition-colors hover:border-djkn-300 hover:bg-djkn-800 hover:text-white"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-djkn-100/90 transition-colors hover:text-white"
              >
                {SITE_CONFIG.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-djkn-800">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-djkn-200 sm:flex-row sm:px-6 lg:px-8">
          <p>
            &copy; {year} {SITE_CONFIG.name}. Hak cipta dilindungi.
          </p>
          <p>Asosiasi Pejabat Lelang Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
