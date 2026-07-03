"use client";

import React from "react";
import { Bell, Menu } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-djkn-900">{title}</h1>
        {subtitle && (
          <p className="text-djkn-600 mt-1">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg bg-white border border-djkn-200 text-djkn-600 hover:text-djkn-900 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </div>
  );
}