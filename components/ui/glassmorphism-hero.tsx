"use client";

import React from "react";
import { ArrowRight, Play, Target, Crown, Star, Building2, Landmark, Scale, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// --- MITRA PPL ---
const MITRA = [
  { name: "DJKN", icon: Landmark },
  { name: "Kemenkeu", icon: Building2 },
  { name: "Kemenkumham", icon: Scale },
  { name: "BPN", icon: Shield },
  { name: "BPK", icon: Target },
  { name: "KPK", icon: Crown },
];

// --- SUB-COMPONENTS ---
const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
    <span className="text-xl font-bold text-djkn-800 sm:text-2xl">{value}</span>
    <span className="text-[10px] uppercase tracking-wider text-djkn-600 font-medium sm:text-xs">{label}</span>
  </div>
);

// --- MAIN COMPONENT ---
export default function GlassmorphismHero() {
  return (
    <div className="relative w-full bg-gradient-to-br from-djkn-50 via-white to-djkn-100 text-djkn-900 overflow-hidden font-sans">
      {/* SCOPED ANIMATIONS */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-fade-in {
          animation: fadeSlideIn 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

      {/* Background Image with Gradient Mask */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.jpeg"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
          style={{
            maskImage: "linear-gradient(180deg, transparent, black 0%, black 70%, transparent)",
            WebkitMaskImage: "linear-gradient(180deg, transparent, black 0%, black 70%, transparent)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 md:pt-32 md:pb-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-start">
          
          {/* --- LEFT COLUMN --- */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 pt-8">
            
            {/* Badge */}
            <div className="animate-fade-in delay-100">
              <div className="inline-flex items-center gap-2 rounded-full border border-djkn-200 bg-white/60 px-3 py-1.5 backdrop-blur-md transition-colors hover:bg-white/80">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-djkn-700 flex items-center gap-2">
                  Organisasi Resmi Terakreditasi
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                </span>
              </div>
            </div>

            {/* Heading */}
            <h1 
              className="animate-fade-in delay-200 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tighter leading-[0.9]"
              style={{
                maskImage: "linear-gradient(180deg, black 0%, black 80%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(180deg, black 0%, black 80%, transparent 100%)"
              }}
            >
              Mitra Strategis<br />
              <span className="bg-gradient-to-br from-djkn-700 via-djkn-800 to-djkn-600 bg-clip-text text-transparent">
                Pelaksanaan Lelang
              </span><br />
              Negara
            </h1>

            {/* Description */}
            <p className="animate-fade-in delay-300 max-w-xl text-lg text-djkn-700 leading-relaxed">
              Perkumpulan Pejabat Lelang (PPL) adalah wadah resmi bagi pejabat lelang di Indonesia 
              untuk berkolaborasi, mengembangkan kompetensi, dan menjaga integritas pelaksanaan lelang negara.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-4">
              <Link href="/tentang">
                <button className="group inline-flex items-center justify-center gap-2 rounded-full bg-djkn-700 px-8 py-4 text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:bg-djkn-800 active:scale-[0.98]">
                  Tentang Kami
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              
              <Link href="/peraturan">
                <button className="group inline-flex items-center justify-center gap-2 rounded-full border border-djkn-300 bg-white/60 px-8 py-4 text-sm font-semibold text-djkn-800 backdrop-blur-sm transition-colors hover:bg-white/80 hover:border-djkn-400">
                  <Play className="w-4 h-4 fill-current" />
                  Lihat Peraturan
                </button>
              </Link>
            </div>
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="lg:col-span-5 space-y-6 lg:mt-12">
            
            {/* Stats Card */}
            <div className="animate-fade-in delay-500 relative overflow-hidden rounded-3xl border border-djkn-200 bg-white/60 p-8 backdrop-blur-xl shadow-2xl">
              {/* Card Glow Effect */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-djkn-200/30 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-djkn-100 ring-1 ring-djkn-200">
                    <Target className="h-6 w-6 text-djkn-700" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold tracking-tight text-djkn-800">850+</div>
                    <div className="text-sm text-djkn-600">Anggota Aktif</div>
                  </div>
                </div>

                {/* Progress Bar Section */}
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-djkn-600">Cakupan Nasional</span>
                    <span className="text-djkn-800 font-medium">34 Provinsi</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-djkn-100">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-djkn-600 to-djkn-400" />
                  </div>
                </div>

                <div className="h-px w-full bg-djkn-200 mb-6" />

                {/* Mini Stats Grid */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <StatItem value="15+" label="Tahun" />
                  <div className="w-px h-full bg-djkn-200 mx-auto" />
                  <StatItem value="Rp 4.8T" label="Nilai Lelang" />
                  <div className="w-px h-full bg-djkn-200 mx-auto" />
                  <StatItem value="100%" label="Integritas" />
                </div>

                {/* Tag Pills */}
                <div className="mt-8 flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-djkn-200 bg-white/60 px-3 py-1 text-[10px] font-medium tracking-wide text-djkn-700">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    AKTIF
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-djkn-200 bg-white/60 px-3 py-1 text-[10px] font-medium tracking-wide text-djkn-700">
                    <Crown className="w-3 h-3 text-yellow-600" />
                    RESMI
                  </div>
                </div>
              </div>
            </div>

            {/* Marquee Card */}
            <div className="animate-fade-in delay-500 relative overflow-hidden rounded-3xl border border-djkn-200 bg-white/60 py-8 backdrop-blur-xl">
              <h3 className="mb-6 px-8 text-sm font-medium text-djkn-600">Mitra & Afiliasi Resmi</h3>
              
              <div 
                className="relative flex overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)"
                }}
              >
                <div className="animate-marquee flex gap-12 whitespace-nowrap px-4">
                  {/* Triple list for seamless loop */}
                  {[...MITRA, ...MITRA, ...MITRA].map((mitra, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-2 opacity-60 transition-all hover:opacity-100 hover:scale-105 cursor-default"
                    >
                      {/* Brand Icon */}
                      <mitra.icon className="h-6 w-6 text-djkn-700" />
                      {/* Brand Name */}
                      <span className="text-lg font-bold text-djkn-800 tracking-tight">
                        {mitra.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}