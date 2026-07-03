import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/auth";
import { Sidebar } from "@/components/layout/sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Megaphone, 
  FileText, 
  Users,
  TrendingUp,
  Activity,
  Eye,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { getAnnouncements, getAnnouncementCount } from "@/lib/services/announcements";
import { getRegulations, getRegulationCount } from "@/lib/services/regulations";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getUserProfile();

  // Check admin role
  if (!profile || profile.role !== "admin") {
    redirect("/dashboard");
  }

  // Get counts
  const [announcementCount, regulationCount] = await Promise.all([
    getAnnouncementCount(),
    getRegulationCount(),
  ]);

  // Get recent announcements
  const { data: recentAnnouncements } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  // Mock data (ganti dengan real data jika ada)
  const memberCount = 850; // Ganti dengan real count dari database
  const totalViews = 12450; // Ganti dengan real analytics

  return (
    <div className="flex min-h-screen w-full bg-djkn-50">
      <Sidebar
        variant="admin"
        userEmail={user.email || ""}
        userRole="admin"
      />
      
      <div className="flex-1 p-6 overflow-auto">
        <DashboardHeader
          title="Admin Dashboard"
          subtitle="Kelola konten dan monitor aktivitas PPL"
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={Megaphone}
            iconColor="text-djkn-600"
            iconBg="bg-djkn-100"
            title="Total Pengumuman"
            value={announcementCount}
            trend="+3 bulan ini"
            trendColor="green"
          />
          <StatsCard
            icon={FileText}
            iconColor="text-green-600"
            iconBg="bg-green-100"
            title="Total Peraturan"
            value={regulationCount}
            trend="+1 bulan ini"
            trendColor="green"
          />
          <StatsCard
            icon={Users}
            iconColor="text-purple-600"
            iconBg="bg-purple-100"
            title="Total Anggota"
            value={memberCount}
            trend="+12 baru"
            trendColor="green"
          />
          <StatsCard
            icon={Eye}
            iconColor="text-orange-600"
            iconBg="bg-orange-100"
            title="Total Views"
            value={totalViews.toLocaleString("id-ID")}
            trend="+8% dari minggu lalu"
            trendColor="green"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-djkn-900">
                    Aktivitas Terbaru
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-djkn-700 hover:text-djkn-900">
                    Lihat semua
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { icon: Megaphone, title: "Pengumuman baru ditambahkan", desc: "Rapat Anggota Tahunan 2026", time: "2 jam lalu", color: "djkn" },
                    { icon: FileText, title: "Peraturan diupdate", desc: "PMK No. 12/2026", time: "5 jam lalu", color: "green" },
                    { icon: Users, title: "Anggota baru terdaftar", desc: "john.doe@example.com", time: "1 hari lalu", color: "purple" },
                    { icon: Activity, title: "Sistem maintenance", desc: "Backup database selesai", time: "2 hari lalu", color: "orange" },
                    { icon: TrendingUp, title: "Laporan bulanan", desc: "Laporan Januari 2026 tersedia", time: "3 hari lalu", color: "blue" },
                  ].map((activity, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-djkn-50 transition-colors cursor-pointer"
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          activity.color === "djkn" ? "bg-djkn-100" :
                          activity.color === "green" ? "bg-green-100" :
                          activity.color === "purple" ? "bg-purple-100" :
                          activity.color === "orange" ? "bg-orange-100" :
                          "bg-blue-100"
                        }`}
                      >
                        <activity.icon
                          className={`h-4 w-4 ${
                            activity.color === "djkn" ? "text-djkn-600" :
                            activity.color === "green" ? "text-green-600" :
                            activity.color === "purple" ? "text-purple-600" :
                            activity.color === "orange" ? "text-orange-600" :
                            "text-blue-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-djkn-900 truncate">
                          {activity.title}
                        </p>
                        <p className="text-xs text-djkn-500 truncate">
                          {activity.desc}
                        </p>
                      </div>
                      <div className="text-xs text-djkn-400">
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-djkn-900">
                  Aksi Cepat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  asChild
                  className="w-full bg-djkn-700 hover:bg-djkn-800"
                >
                  <Link href="/admin/pengumuman">
                    <Megaphone className="mr-2 h-4 w-4" />
                    Kelola Pengumuman
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start border-djkn-200 hover:bg-djkn-50"
                >
                  <Link href="/admin/peraturan">
                    <FileText className="mr-2 h-4 w-4" />
                    Kelola Peraturan
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start border-djkn-200 hover:bg-djkn-50"
                >
                  <Link href="/admin/anggota">
                    <Users className="mr-2 h-4 w-4" />
                    Kelola Anggota
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start border-djkn-200 hover:bg-djkn-50"
                >
                  <Link href="/admin/laporan">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Lihat Laporan
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-djkn-900">
                  Statistik Cepat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-djkn-600">Pengumuman Bulan Ini</span>
                    <span className="text-sm font-medium text-djkn-900">12</span>
                  </div>
                  <div className="w-full bg-djkn-100 rounded-full h-2">
                    <div className="bg-djkn-700 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-djkn-600">Anggota Baru</span>
                    <span className="text-sm font-medium text-djkn-900">24</span>
                  </div>
                  <div className="w-full bg-djkn-100 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-djkn-600">Traffic Website</span>
                    <span className="text-sm font-medium text-djkn-900">8.7k</span>
                  </div>
                  <div className="w-full bg-djkn-100 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}