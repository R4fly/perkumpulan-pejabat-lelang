import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/auth";
import { Sidebar } from "@/components/layout/sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Calendar, Shield } from "lucide-react";

export default async function ProfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getUserProfile();

  const joinDate = user.created_at 
    ? new Date(user.created_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Tidak diketahui";

  return (
    <div className="flex min-h-screen w-full bg-djkn-50">
      <Sidebar
        variant="user"
        userEmail={user.email || ""}
        userRole={profile?.role || "user"}
      />
      
      <div className="flex-1 p-6 overflow-auto">
        <DashboardHeader
          title="Profil Saya"
          subtitle="Informasi akun dan keanggotaan Anda"
        />

        <div className="max-w-2xl">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-djkn-900">
                Informasi Akun
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-djkn-100 rounded-lg">
                  <User className="h-6 w-6 text-djkn-700" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-djkn-900 mb-1">Nama Pengguna</h3>
                  <p className="text-djkn-600">{user.email?.split("@")[0]}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-djkn-100 rounded-lg">
                  <Mail className="h-6 w-6 text-djkn-700" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-djkn-900 mb-1">Email</h3>
                  <p className="text-djkn-600">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-djkn-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-djkn-700" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-djkn-900 mb-1">Tanggal Bergabung</h3>
                  <p className="text-djkn-600">{joinDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-djkn-100 rounded-lg">
                  <Shield className="h-6 w-6 text-djkn-700" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-djkn-900 mb-1">Role</h3>
                  <Badge className={
                    profile?.role === "admin" 
                      ? "bg-djkn-700 text-white" 
                      : "bg-djkn-100 text-djkn-700 border-0"
                  }>
                    {profile?.role === "admin" ? "Administrator" : "Anggota"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}