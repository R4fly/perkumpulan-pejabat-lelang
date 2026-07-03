"use client";

import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

interface Notification {
  id: string;
  title: string;
  description: string;
  created_at: string;
  type: "announcement" | "regulation" | "system";
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      // Fetch recent announcements
      const { data: announcements } = await supabase
        .from("announcements")
        .select("id, title, description, created_at")
        .order("created_at", { ascending: false })
        .limit(5);

      if (announcements) {
        setNotifications(
          announcements.map((item) => ({
            ...item,
            type: "announcement" as const,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays < 7) return `${diffDays} hari lalu`;
    return date.toLocaleDateString("id-ID");
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-djkn-900">{title}</h1>
        {subtitle && (
          <p className="text-djkn-600 mt-1">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative p-2 rounded-lg bg-white border border-djkn-200 text-djkn-600 hover:text-djkn-900 transition-colors"
          >
            <Bell className="h-5 w-5" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            )}
          </button>

          {isOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />

              {/* Notification Dropdown */}
              <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-djkn-200 bg-white shadow-xl">
                <div className="p-4 border-b border-djkn-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-djkn-900">Notifikasi</h3>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-djkn-400 hover:text-djkn-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {loading ? (
                    <div className="p-8 text-center text-djkn-500">
                      Memuat...
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="p-8 text-center text-djkn-500">
                      Tidak ada notifikasi
                    </div>
                  ) : (
                    <div className="divide-y divide-djkn-100">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="p-4 hover:bg-djkn-50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              <div className="h-2 w-2 rounded-full bg-djkn-600 mt-2"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-djkn-900 truncate">
                                {notif.title}
                              </p>
                              <p className="text-xs text-djkn-600 mt-1 line-clamp-2">
                                {notif.description?.replace(/<[^>]*>/g, "") || "Tidak ada deskripsi"}
                              </p>
                              <p className="text-xs text-djkn-400 mt-2">
                                {formatDate(notif.created_at)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}