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
  Users,
  Shield,
  Calendar,
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

  // Get REAL counts from database (NO HARDCODE)
  const [announcementCount, regulationCount] = await Promise.all([
    getAnnouncementCount(),
    getRegulationCount(),
  ]);

  // Get REAL total members count
  const { count: totalMembers } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  const realTotalMembers = totalMembers || 0;

  // Get REAL total admins count
  const { count: totalAdmins } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("role", "admin");

  const realTotalAdmins = totalAdmins || 0;

  // Get REAL recent announcements from database
  const { data: recentAnnouncements } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  // Get REAL recent regulations from database
  const { data: recentRegulations } = await supabase
    .from("regulations")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  // Calculate user's position (joined date)
  const userJoinDate = user.created_at ? new Date(user.created_at) : new Date();
  const now = new Date();
  const daysSinceJoin = Math.floor(
    (now.getTime() - userJoinDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Calculate REAL percentages for progress bars
  const announcementPercentage = Math.min(
    (announcementCount / Math.max(announcementCount + 10, 50)) * 100,
    100
  );
  const regulationPercentage = Math.min(
    (regulationCount / Math.max(regulationCount + 5, 30)) * 100,
    100
  );
  const memberPercentage = Math.min(
    (realTotalMembers / Math.max(realTotalMembers + 100, 1000)) * 100,
    100
  );

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

        {/* Stats Grid - ALL REAL DATA FROM DATABASE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={Megaphone}
            iconColor="text-djkn-600"
            iconBg="bg-djkn-100"
            title="Total Pengumuman"
            value={announcementCount}
            trend={`${announcementCount} pengumuman tersedia`}
            trendColor="neutral"
          />
          <StatsCard
            icon={FileText}
            iconColor="text-green-600"
            iconBg="bg-green-100"
            title="Total Peraturan"
            value={regulationCount}
            trend={`${regulationCount} dokumen resmi`}
            trendColor="neutral"
          />
          <JoinDuration joinDate={user.created_at || new Date().toISOString()} />
          <StatsCard
            icon={Users}
            iconColor="text-purple-600"
            iconBg="bg-purple-100"
            title="Total Anggota"
            value={realTotalMembers}
            trend={`${realTotalMembers} anggota aktif`}
            trendColor="neutral"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Announcements - REAL DATA FROM DATABASE */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-djkn-900">
                    Pengumuman Terbaru
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-djkn-700 hover:text-djkn-900" asChild>
                    <Link href="/pengumuman">
                      Lihat semua
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAnnouncements && recentAnnouncements.length > 0 ? (
                    recentAnnouncements.map((activity) => {
                      const createdDate = new Date(activity.created_at);
                      const timeAgo = (() => {
                        const diffMs = now.getTime() - createdDate.getTime();
                        const diffMins = Math.floor(diffMs / 60000);
                        const diffHours = Math.floor(diffMs / 3600000);
                        const diffDays = Math.floor(diffMs / 86400000);

                        if (diffMins < 60) return `${diffMins} menit lalu`;
                        if (diffHours < 24) return `${diffHours} jam lalu`;
                        if (diffDays < 7) return `${diffDays} hari lalu`;
                        return createdDate.toLocaleDateString("id-ID");
                      })();

                      return (
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
                              {activity.description?.replace(/<[^>]*>/g, "") || "Tidak ada deskripsi"}
                            </p>
                          </div>
                          <div className="text-xs text-djkn-400">
                            {timeAgo}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8">
                      <Activity className="h-12 w-12 text-djkn-300 mx-auto mb-3" />
                      <p className="text-djkn-500">Belum ada pengumuman</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Regulations - REAL DATA FROM DATABASE */}
            <Card className="shadow-sm mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-djkn-900">
                    Peraturan Terbaru
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-djkn-700 hover:text-djkn-900" asChild>
                    <Link href="/peraturan">
                      Lihat semua
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRegulations && recentRegulations.length > 0 ? (
                    recentRegulations.map((regulation) => {
                      const createdDate = new Date(regulation.created_at);
                      const timeAgo = (() => {
                        const diffMs = now.getTime() - createdDate.getTime();
                        const diffMins = Math.floor(diffMs / 60000);
                        const diffHours = Math.floor(diffMs / 3600000);
                        const diffDays = Math.floor(diffMs / 86400000);

                        if (diffMins < 60) return `${diffMins} menit lalu`;
                        if (diffHours < 24) return `${diffHours} jam lalu`;
                        if (diffDays < 7) return `${diffDays} hari lalu`;
                        return createdDate.toLocaleDateString("id-ID");
                      })();

                      return (
                        <div
                          key={regulation.id}
                          className="flex items-center space-x-4 p-3 rounded-lg hover:bg-djkn-50 transition-colors cursor-pointer"
                        >
                          <div className="p-2 rounded-lg bg-green-100">
                            <FileText className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-djkn-900 truncate">
                              {regulation.title}
                            </p>
                            <p className="text-xs text-djkn-500 truncate">
                              {regulation.description || "Dokumen peraturan resmi"}
                            </p>
                          </div>
                          <div className="text-xs text-djkn-400">
                            {timeAgo}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-djkn-300 mx-auto mb-3" />
                      <p className="text-djkn-500">Belum ada peraturan</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats & Actions - REAL DATA */}
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

            {/* Statistik Komunitas - REAL DATA */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-djkn-900">
                  Statistik Komunitas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-djkn-600">Total Anggota</span>
                    <span className="text-sm font-medium text-djkn-900">{realTotalMembers}</span>
                  </div>
                  <div className="w-full bg-djkn-100 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${memberPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-djkn-600">Total Pengumuman</span>
                    <span className="text-sm font-medium text-djkn-900">{announcementCount}</span>
                  </div>
                  <div className="w-full bg-djkn-100 rounded-full h-2">
                    <div 
                      className="bg-djkn-700 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${announcementPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-djkn-600">Total Peraturan</span>
                    <span className="text-sm font-medium text-djkn-900">{regulationCount}</span>
                  </div>
                  <div className="w-full bg-djkn-100 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${regulationPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-djkn-600">Total Admin</span>
                    <span className="text-sm font-medium text-djkn-900">{realTotalAdmins}</span>
                  </div>
                  <div className="w-full bg-djkn-100 rounded-full h-2">
                    <div 
                      className="bg-orange-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min((realTotalAdmins / Math.max(realTotalAdmins + 2, 10)) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info Akun */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-djkn-900">
                  Info Akun
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="h-4 w-4 text-djkn-500" />
                  <span className="text-djkn-600">Role:</span>
                  <span className="font-medium text-djkn-900">
                    {profile?.role === "admin" ? "Administrator" : "Anggota"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-djkn-500" />
                  <span className="text-djkn-600">Bergabung:</span>
                  <span className="font-medium text-djkn-900">
                    {daysSinceJoin} hari yang lalu
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Activity className="h-4 w-4 text-djkn-500" />
                  <span className="text-djkn-600">Status:</span>
                  <span className="font-medium text-green-600">Aktif</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}