import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

interface StatsCardProps {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  title: string;
  value: string | number;
  trend?: string;
  trendColor?: "green" | "red" | "neutral";
}

export function StatsCard({
  icon: Icon,
  iconColor,
  iconBg,
  title,
  value,
  trend,
  trendColor = "green",
}: StatsCardProps) {
  return (
    <div className="p-6 rounded-xl border border-djkn-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-2 rounded-lg", iconBg)}>
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
        {trend && (
          <TrendingUp
            className={cn(
              "h-4 w-4",
              trendColor === "green" && "text-green-500",
              trendColor === "red" && "text-red-500",
              trendColor === "neutral" && "text-djkn-500"
            )}
          />
        )}
      </div>
      <h3 className="font-medium text-djkn-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-djkn-900">{value}</p>
      {trend && (
        <p
          className={cn(
            "text-sm mt-1",
            trendColor === "green" && "text-green-600",
            trendColor === "red" && "text-red-600",
            trendColor === "neutral" && "text-djkn-600"
          )}
        >
          {trend}
        </p>
      )}
    </div>
  );
}