"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <div className="text-3xl font-semibold tracking-tight text-djkn-900">{value}</div>
    <div className="text-sm text-djkn-600">{label}</div>
  </div>
);

const SoftButton = ({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) => (
  <button
    className={"rounded-full px-5 py-2.5 text-sm font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 bg-djkn-800 text-white hover:bg-djkn-700 focus:ring-djkn-600 " + className}
    {...props}
  >
    {children}
  </button>
);

function MiniBars() {
  return (
    <div className="mt-6 flex h-36 items-end gap-4 rounded-xl bg-gradient-to-b from-djkn-50 to-white p-4">
      {[18, 48, 72, 96].map((h, i) => (
        <motion.div key={i} initial={{ height: 0, opacity: 0.6 }} animate={{ height: h }} transition={{ delay: 0.5 + i * 0.15, type: "spring" }} className="w-10 rounded-xl bg-gradient-to-t from-djkn-200 to-djkn-400 shadow-inner" />
      ))}
    </div>
  );
}

function Planet() {
  return (
    <motion.svg initial={{ rotate: -8 }} animate={{ rotate: 0 }} transition={{ duration: 2, type: "spring" }} width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#81c784" /> {/* djkn-300 */}
          <stop offset="100%" stopColor="#2e7d32" /> {/* djkn-500 */}
        </linearGradient>
      </defs>
      <circle cx="110" cy="110" r="56" fill="url(#grad)" opacity="0.95" />
      <circle cx="94" cy="98" r="10" fill="white" opacity="0.45" />
      <circle cx="132" cy="126" r="8" fill="white" opacity="0.35" />
      <motion.ellipse cx="110" cy="110" rx="100" ry="34" stroke="white" strokeOpacity="0.6" fill="none" animate={{ strokeDashoffset: [200, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} strokeDasharray="200 200" />
      <motion.circle cx="210" cy="110" r="4" fill="white" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2.2, repeat: Infinity }} />
    </motion.svg>
  );
}

export default function FinTechLandingPage() {
  return (
    <div className="min-h-screen w-full bg-djkn-50/30">
      {/* Hero area */}
      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-6 px-4 pb-14 pt-10 md:grid-cols-2 md:px-0">
        {/* Left: headline */}
        <div className="flex flex-col justify-center space-y-8 pr-2">
          <div>
            <h1 className="text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight text-djkn-900">
              Menjaga Integritas
              <br />
              Lelang Negara.
            </h1>
            <p className="mt-4 max-w-md text-djkn-700">
              Bergabunglah dengan ratusan pejabat lelang di seluruh Indonesia dalam <span className="font-medium text-djkn-900">Perkumpulan Pejabat Lelang (PPL)</span> untuk berkolaborasi dan meningkatkan kompetensi.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/tentang">
              <SoftButton>
                Pelajari Lebih Lanjut <ArrowUpRight className="ml-1 inline h-4 w-4" />
              </SoftButton>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-2 md:max-w-sm">
            <Stat label="Anggota Aktif" value="850+" />
            <Stat label="Nilai Lelang (Semester I)" value="Rp 4,8 T" />
          </div>

          <div className="mt-6 flex items-center gap-8 opacity-70">
            <span className="text-xs text-djkn-600">MITRA RESMI</span>
            <div className="flex items-center gap-6 text-djkn-500">
              <span className="font-semibold">DJKN</span>
              <span className="font-semibold">Kemenkeu</span>
              <span className="font-semibold">Kemenkumham</span>
            </div>
          </div>
        </div>

        {/* Right: animated card grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Secure card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative col-span-1 overflow-hidden rounded-xl bg-gradient-to-b from-djkn-800 to-djkn-700 p-6 text-djkn-50 shadow-lg">
            <div className="absolute inset-0">
              <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                <defs><radialGradient id="rg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#2e7d32" stopOpacity="0.35" /><stop offset="100%" stopColor="transparent" /></radialGradient></defs>
                <rect width="400" height="400" fill="url(#rg)" />
                {[...Array(12)].map((_, i) => (<circle key={i} cx="200" cy="200" r={20 + i * 14} fill="none" stroke="currentColor" strokeOpacity="0.12" />))}
              </svg>
            </div>
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-djkn-600/60 p-2 ring-1 ring-white/10"><ShieldCheck className="h-5 w-5" /></div>
                <span className="text-xs uppercase tracking-wider text-djkn-200">Profesional & Berintegritas</span>
              </div>
              <div className="mt-6 text-xl leading-snug text-djkn-50/95">Standar etika tinggi<br /> untuk lelang negara</div>
              <motion.div className="absolute right-6 top-6 h-12 w-12 rounded-full bg-djkn-500/40" animate={{ boxShadow: ["0 0 0 0 rgba(46,125,50,0.35)", "0 0 0 16px rgba(46,125,50,0)"] }} transition={{ duration: 2.5, repeat: Infinity }} />
            </div>
          </motion.div>

          {/* Regulations card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative col-span-1 overflow-hidden rounded-xl bg-gradient-to-b from-djkn-400 to-djkn-500 p-6 text-white shadow-lg">
            <div className="pointer-events-none absolute -right-8 -top-10 opacity-70"><Planet /></div>
            <div className="relative mt-24 text-sm text-white/90">Regulasi</div>
            <div className="text-xl font-medium leading-snug">Akses peraturan<br /> dan kebijakan terbaru</div>
          </motion.div>

          {/* Stats card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="col-span-1 rounded-xl bg-white p-6 text-djkn-800 shadow-lg ring-1 ring-djkn-100">
            <div className="text-sm text-djkn-600">Pertumbuhan Anggota</div>
            <div className="mt-2 text-3xl font-semibold tracking-tight">850 <span className="text-sm font-medium text-djkn-500 align-middle">Pejabat Lelang</span></div>
            <div className="mt-1 text-xs text-djkn-600">↑ 12% dari tahun lalu</div>
            <MiniBars />
          </motion.div>

          <div className="hidden md:block" />
        </div>
      </div>
    </div>
  );
}