import { Sidebar } from "@/components/layout/sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, User, UserPlus, UserMinus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/auth";
import { getAllUsers, promoteToAdmin, demoteToUser } from "@/lib/services/admin-management";
import { ManageAdminsClient } from "./manage-admins-client";

export default async function ManageAdminsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const profile = await getUserProfile();
  if (!profile || profile.role !== "admin") redirect("/dashboard");

  const users = await getAllUsers();

  return (
    <div className="flex min-h-screen w-full bg-djkn-50">
      <Sidebar variant="admin" userEmail={user.email || ""} userRole="admin" />
      
      <div className="flex-1 p-6 overflow-auto">
        <DashboardHeader
          title="Kelola Admin"
          subtitle="Promote atau demote user menjadi admin"
        />

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-djkn-900">
              Daftar User & Role
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ManageAdminsClient users={users} currentUserId={user.id} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}