import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Calendar, 
  FileText, 
  Megaphone, 
  Shield,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getUserProfile();

  // Get recent announcements for dashboard
  const { data: recentAnnouncements } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  const joinDate = user.created_at 
    ? new Date(user.created_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Tidak diketahui";

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-djkn-800">
          Selamat Datang, {user.email?.split("@")[0]}! 👋
        </h1>
        <p className="text-djkn-600 mt-2">
          Kelola akun dan akses informasi terbaru dari Perkumpulan Pejabat Lelang.
        </p>
      </div>

      {/* User Info Card */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="border-djkn-100">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-djkn-100 rounded-lg">
                <User className="h-5 w-5 text-djkn-700" />
              </div>
              <CardTitle className="text-lg">Profil Akun</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-djkn-500" />
              <span className="text-djkn-700">{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-djkn-500" />
              <span className="text-djkn-700">Bergabung: {joinDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-djkn-500" />
              <span className="text-djkn-700">Role:</span>
              <Badge className={
                profile?.role === "admin" 
                  ? "bg-djkn-700 text-white" 
                  : "bg-djkn-100 text-djkn-700 border-0"
              }>
                {profile?.role === "admin" ? "Administrator" : "Anggota"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-djkn-100">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-djkn-100 rounded-lg">
                <Megaphone className="h-5 w-5 text-djkn-700" />
              </div>
              <CardTitle className="text-lg">Pengumuman Terbaru</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {recentAnnouncements && recentAnnouncements.length > 0 ? (
              <ul className="space-y-2">
                {recentAnnouncements.map((item) => (
                  <li key={item.id} className="text-sm text-djkn-700 truncate">
                    • {item.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-djkn-600">Belum ada pengumuman.</p>
            )}
            <Button asChild className="mt-4 w-full bg-djkn-700 hover:bg-djkn-800" size="sm">
              <Link href="/pengumuman">
                Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-djkn-100">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-djkn-100 rounded-lg">
                <FileText className="h-5 w-5 text-djkn-700" />
              </div>
              <CardTitle className="text-lg">Akses Cepat</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild variant="outline" className="w-full justify-start border-djkn-200 hover:bg-djkn-50">
              <Link href="/pengumuman">
                <Megaphone className="mr-2 h-4 w-4" />
                Pengumuman
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start border-djkn-200 hover:bg-djkn-50">
              <Link href="/peraturan">
                <FileText className="mr-2 h-4 w-4" />
                Peraturan
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start border-djkn-200 hover:bg-djkn-50">
              <Link href="/tentang">
                <User className="mr-2 h-4 w-4" />
                Tentang PPL
              </Link>
            </Button>
            {profile?.role === "admin" && (
              <Button asChild className="w-full bg-djkn-700 hover:bg-djkn-800">
                <Link href="/admin">
                  <Shield className="mr-2 h-4 w-4" />
                  Admin Panel
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}