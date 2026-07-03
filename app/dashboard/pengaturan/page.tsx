import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/auth";
import { Sidebar } from "@/components/layout/sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default async function PengaturanPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getUserProfile();

  return (
    <div className="flex min-h-screen w-full bg-djkn-50">
      <Sidebar
        variant="user"
        userEmail={user.email || ""}
        userRole={profile?.role || "user"}
      />
      
      <div className="flex-1 p-6 overflow-auto">
        <DashboardHeader
          title="Pengaturan"
          subtitle="Kelola preferensi dan pengaturan akun Anda"
        />

        <div className="max-w-2xl">
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <AlertCircle className="h-16 w-16 text-djkn-400 mx-auto" />
                <h2 className="text-2xl font-bold text-djkn-800">
                  Fitur Dalam Pengembangan
                </h2>
                <p className="text-djkn-600 max-w-md mx-auto">
                  Halaman pengaturan sedang dalam pengembangan. 
                  Fitur ini akan segera tersedia untuk mengelola preferensi akun Anda.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}