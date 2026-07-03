"use client";

import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";

interface JoinDurationProps {
  joinDate: string; // ISO string dari Supabase
}

export function JoinDuration({ joinDate }: JoinDurationProps) {
  const [duration, setDuration] = useState({
    years: 0,
    months: 0,
    days: 0,
    totalDays: 0,
  });

  useEffect(() => {
    const calculateDuration = () => {
      const join = new Date(joinDate);
      const now = new Date();
      
      // Hitung total hari
      const totalDays = Math.floor(
        (now.getTime() - join.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      // Hitung tahun, bulan, hari
      let years = now.getFullYear() - join.getFullYear();
      let months = now.getMonth() - join.getMonth();
      let days = now.getDate() - join.getDate();
      
      if (days < 0) {
        months--;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
      }
      
      if (months < 0) {
        years--;
        months += 12;
      }
      
      setDuration({ years, months, days, totalDays });
    };
    
    // Hitung saat mount
    calculateDuration();
    
    // Update setiap menit untuk memastikan akurat
    const interval = setInterval(calculateDuration, 60000);
    
    return () => clearInterval(interval);
  }, [joinDate]);

  return (
    <div className="p-6 rounded-xl border border-djkn-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-purple-100">
          <Calendar className="h-5 w-5 text-purple-600" />
        </div>
      </div>
      <h3 className="font-medium text-djkn-600 mb-1">Hari Bergabung</h3>
      <p className="text-2xl font-bold text-djkn-900">
        {duration.years > 0 && `${duration.years} tahun `}
        {duration.months > 0 && `${duration.months} bulan `}
        {duration.days} hari
      </p>
      <p className="text-sm text-djkn-600 mt-1">
        Total: {duration.totalDays.toLocaleString("id-ID")} hari
      </p>
    </div>
  );
}