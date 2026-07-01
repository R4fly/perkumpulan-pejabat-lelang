import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { getUserProfile } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { AdminDashboardClient } from "./admin-dashboard-client"

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const profile = await getUserProfile()

  if (!profile || profile.role !== "admin") {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-red-800 mb-2">Akses Ditolak</h1>
            <p className="text-red-700">
              Anda tidak memiliki izin untuk mengakses halaman admin.
            </p>
            <a
              href="/"
              className="mt-4 inline-flex items-center justify-center rounded-md bg-djkn-700 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-djkn-800"
            >
              Kembali ke Beranda
            </a>
          </div>
        </div>
      </main>
    )
  }

  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-djkn-800">Admin Dashboard</h1>
        <p className="text-djkn-600 mt-2">
          Login sebagai: <span className="font-semibold">{user.email}</span>
          <span className="ml-2 px-2 py-1 bg-djkn-100 text-djkn-700 rounded text-xs font-medium">
            {profile.role}
          </span>
        </p>
      </div>

      <AdminDashboardClient initialAnnouncements={announcements || []} />
    </main>
  )
}