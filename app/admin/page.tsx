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
  ArrowRight,
  Shield,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { getAnnouncementCount } from "@/lib/services/announcements";
import { getRegulationCount } from "@/lib/services/regulations";

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

  // Get REAL counts from database (no hardcode)
  const [announcementCount, regulationCount] = await Promise.all([
    getAnnouncementCount(),
    getRegulationCount(),
  ]);

  // Get REAL member count from profiles table
  const { count: memberCount } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  const realMemberCount = memberCount || 0;

  // Get REAL admin count
  const { count: adminCount } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("role", "admin");

  const realAdminCount = adminCount || 0;

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

  // Get REAL recent users (latest registered)
  const { data: recentUsers } = await supabase
    .from("profiles")
    .select("id, email, role, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  // Build REAL activity feed from database
  const activityFeed: Array<{
    icon: typeof Megaphone;
    title: string;
    desc: string;
    time: string;
    color: string;
  }> = [];

  // Add recent announcements to activity feed
  if (recentAnnouncements) {
    recentAnnouncements.forEach((item) => {
      const createdDate = new Date(item.created_at);
      const now = new Date();
      const diffMs = now.getTime() - createdDate.getTime();
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      let timeAgo = "";
      if (diffHours < 1) timeAgo = "Baru saja";
      else if (diffHours < 24) timeAgo = `${diffHours} jam lalu`;
      else if (diffDays < 7) timeAgo = `${diffDays} hari lalu`;
      else timeAgo = createdDate.toLocaleDateString("id-ID");

      activityFeed.push({
        icon: Megaphone,
        title: "Pengumuman baru ditambahkan",
        desc: item.title,
        time: timeAgo,
        color: "djkn",
      });
    });
  }

  // Add recent regulations to activity feed
  if (recentRegulations) {
    recentRegulations.forEach((item) => {
      const createdDate = new Date(item.created_at);
      const now = new Date();
      const diffMs = now.getTime() - createdDate.getTime();
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      let timeAgo = "";
      if (diffHours < 1) timeAgo = "Baru saja";
      else if (diffHours < 24) timeAgo = `${diffHours} jam lalu`;
      else if (diffDays < 7) timeAgo = `${diffDays} hari lalu`;
      else timeAgo = createdDate.toLocaleDateString("id-ID");

      activityFeed.push({
        icon: FileText,
        title: "Peraturan baru diupload",
        desc: item.title,
        time: timeAgo,
        color: "green",
      });
    });
  }

  // Add recent user registrations to activity feed
  if (recentUsers) {
    recentUsers.forEach((item) => {
      const createdDate = new Date(item.created_at);
      const now = new Date();
      const diffMs = now.getTime() - createdDate.getTime();
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      let timeAgo = "";
      if (diffHours < 1) timeAgo = "Baru saja";
      else if (diffHours < 24) timeAgo = `${diffHours} jam lalu`;
      else if (diffDays < 7) timeAgo = `${diffDays} hari lalu`;
      else timeAgo = createdDate.toLocaleDateString("id-ID");

      activityFeed.push({
        icon: Users,
        title: "Anggota baru terdaftar",
        desc: item.email,
        time: timeAgo,
        color: "purple",
      });
    });
  }

  // Sort activity feed by time (most recent first)
  activityFeed.sort((a, b) => {
    const timeOrder = (time: string) => {
      if (time === "Baru saja") return 0;
      if (time.includes("jam")) return parseInt(time);
      if (time.includes("hari")) return parseInt(time) * 24;
      return 999;
    };
    return timeOrder(a.time) - timeOrder(b.time);
  });

  // Limit to 8 most recent activities
  const displayActivities = activityFeed.slice(0, 8);

  // Calculate REAL percentages for progress bars
  const announcementPercentage = Math.min((announcementCount / Math.max(announcementCount + 10, 50)) * 100, 100);
  const regulationPercentage = Math.min((regulationCount / Math.max(regulationCount + 5, 30)) * 100, 100);
  const memberPercentage = Math.min((realMemberCount / Math.max(realMemberCount + 100, 1000)) * 100, 100);

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

        {/* Stats Grid - ALL REAL DATA */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={Megaphone}
            iconColor="text-djkn-600"
            iconBg="bg-djkn-100"
            title="Total Pengumuman"
            value={announcementCount}
            trend={`${announcementCount} pengumuman aktif`}
            trendColor="neutral"
          />
          <StatsCard
            icon={FileText}
            iconColor="text-green-600"
            iconBg="bg-green-100"
            title="Total Peraturan"
            value={regulationCount}
            trend={`${regulationCount} dokumen tersedia`}
            trendColor="neutral"
          />
          <StatsCard
            icon={Users}
            iconColor="text-purple-600"
            iconBg="bg-purple-100"
            title="Total Anggota"
            value={realMemberCount}
            trend={`${realMemberCount} anggota terdaftar`}
            trendColor="neutral"
          />
          <StatsCard
            icon={Shield}
            iconColor="text-orange-600"
            iconBg="bg-orange-100"
            title="Total Admin"
            value={realAdminCount}
            trend={`${realAdminCount} administrator aktif`}
            trendColor="neutral"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity - REAL DATA FROM DATABASE */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-djkn-900">
                    Aktivitas Terbaru
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-djkn-700 hover:text-djkn-900" asChild>
                    <Link href="/admin/laporan">
                      Lihat semua
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {displayActivities.length === 0 ? (
                    <div className="text-center py-8">
                      <Activity className="h-12 w-12 text-djkn-300 mx-auto mb-3" />
                      <p className="text-djkn-500">Belum ada aktivitas terbaru</p>
                    </div>
                  ) : (
                    displayActivities.map((activity, i) => (
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
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Stats - REAL DATA */}
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
                  <Link href="/admin/manage-admins">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Kelola Admin
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start border-djkn-200 hover:bg-djkn-50"
                >
                  <Link href="/admin/pengumuman">
                    <Megaphone className="mr-2 h-4 w-4" />
                    Kelola Pengumuman
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
              </CardContent>
            </Card>

            {/* Statistik Sistem - REAL DATA */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-djkn-900">
                  Statistik Sistem
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                    <span className="text-sm text-djkn-600">Total Anggota</span>
                    <span className="text-sm font-medium text-djkn-900">{realMemberCount}</span>
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
                    <span className="text-sm text-djkn-600">Total Admin</span>
                    <span className="text-sm font-medium text-djkn-900">{realAdminCount}</span>
                  </div>
                  <div className="w-full bg-djkn-100 rounded-full h-2">
                    <div 
                      className="bg-orange-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min((realAdminCount / Math.max(realAdminCount + 2, 10)) * 100, 100)}%` }}
                    ></div>
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