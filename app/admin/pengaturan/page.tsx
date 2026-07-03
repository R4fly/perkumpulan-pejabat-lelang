import { Sidebar } from "@/components/layout/sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/auth";

export default async function AdminPengaturanPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const profile = await getUserProfile();
  if (!profile || profile.role !== "admin") redirect("/dashboard");

  return (
    <div className="flex min-h-screen w-full bg-djkn-50">
      <Sidebar variant="admin" userEmail={user.email || ""} userRole="admin" />
      
      <div className="flex-1 p-6 overflow-auto">
        <DashboardHeader
          title="Pengaturan Admin"
          subtitle="Konfigurasi sistem dan preferensi"
        />

        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="text-center space-y-4 py-12">
              <AlertCircle className="h-16 w-16 text-djkn-400 mx-auto" />
              <h2 className="text-2xl font-bold text-djkn-800">
                Fitur Dalam Pengembangan
              </h2>
              <p className="text-djkn-600 max-w-md mx-auto">
                Halaman pengaturan admin dengan konfigurasi sistem sedang dalam pengembangan.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}