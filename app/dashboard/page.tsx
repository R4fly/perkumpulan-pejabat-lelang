import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/auth";
import { Sidebar } from "@/components/layout/sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { JoinDuration } from "@/components/dashboard/join-duration";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Megaphone, 
  FileText, 
  Activity,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { getAnnouncementCount } from "@/lib/services/announcements";
import { getRegulationCount } from "@/lib/services/regulations";

export default async function UserDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getUserProfile();

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

  return (
    <div className="flex min-h-screen w-full bg-djkn-50">
      <Sidebar
        variant="user"
        userEmail={user.email || ""}
        userRole={profile?.role || "user"}
      />
      
      <div className="flex-1 p-6 overflow-auto">
        <DashboardHeader
          title="Dashboard"
          subtitle="Selamat datang kembali di dashboard Anda"
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={Megaphone}
            iconColor="text-djkn-600"
            iconBg="bg-djkn-100"
            title="Total Pengumuman"
            value={announcementCount}
            trend="Tersedia untuk dilihat"
            trendColor="neutral"
          />
          <StatsCard
            icon={FileText}
            iconColor="text-green-600"
            iconBg="bg-green-100"
            title="Total Peraturan"
            value={regulationCount}
            trend="Dokumen resmi"
            trendColor="neutral"
          />
          {/* Ganti StatsCard "Hari Bergabung" dengan JoinDuration */}
          <JoinDuration joinDate={user.created_at || new Date().toISOString()} />
          <StatsCard
            icon={Activity}
            iconColor="text-orange-600"
            iconBg="bg-orange-100"
            title="Status Akun"
            value="Aktif"
            trend="Akun terverifikasi"
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
                    Pengumuman Terbaru
                  </CardTitle>
                  <Link href="/pengumuman">
                    <Button variant="ghost" size="sm" className="text-djkn-700 hover:text-djkn-900">
                      Lihat semua
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAnnouncements && recentAnnouncements.length > 0 ? (
                    recentAnnouncements.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center space-x-4 p-3 rounded-lg hover:bg-djkn-50 transition-colors cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-djkn-100">
                          <Megaphone className="h-4 w-4 text-djkn-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-djkn-900 truncate">
                            {activity.title}
                          </p>
                          <p className="text-xs text-djkn-500 truncate">
                            {activity.description || "Tidak ada deskripsi"}
                          </p>
                        </div>
                        <div className="text-xs text-djkn-400">
                          {new Date(activity.created_at).toLocaleDateString("id-ID")}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-djkn-500 py-8">
                      Belum ada pengumuman
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-djkn-900">
                  Akses Cepat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start border-djkn-200 hover:bg-djkn-50"
                >
                  <Link href="/pengumuman">
                    <Megaphone className="mr-2 h-4 w-4" />
                    Lihat Pengumuman
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start border-djkn-200 hover:bg-djkn-50"
                >
                  <Link href="/peraturan">
                    <FileText className="mr-2 h-4 w-4" />
                    Lihat Peraturan
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start border-djkn-200 hover:bg-djkn-50"
                >
                  <Link href="/tentang">
                    <Activity className="mr-2 h-4 w-4" />
                    Tentang PPL
                  </Link>
                </Button>
                {profile?.role === "admin" && (
                  <Button
                    asChild
                    className="w-full bg-djkn-700 hover:bg-djkn-800"
                  >
                    <Link href="/admin">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Admin Panel
                      <ArrowRight className="ml-auto h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}