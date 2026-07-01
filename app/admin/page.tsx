import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { createAnnouncement, deleteAnnouncement } from "@/lib/services/admin";
import { getUserProfile } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getUserProfile();
  
  if (!profile || profile.role !== 'admin') {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-red-800 mb-2">Akses Ditolak</h1>
            <p className="text-red-700">
              Anda tidak memiliki izin untuk mengakses halaman admin.
            </p>
            <Button asChild className="mt-4 bg-djkn-700 hover:bg-djkn-800">
              <a href="/">Kembali ke Beranda</a>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false });

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
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Tambah Pengumuman</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createAnnouncement} className="space-y-4">
              <div>
                <Label htmlFor="title">Judul</Label>
                <Input id="title" name="title" required className="mt-1 border-djkn-200" />
              </div>
              <div>
                <Label htmlFor="description">Deskripsi</Label>
                <Input id="description" name="description" required className="mt-1 border-djkn-200" />
              </div>
              <div>
                <Label htmlFor="image_url">URL Gambar (Opsional)</Label>
                <Input id="image_url" name="image_url" className="mt-1 border-djkn-200" />
              </div>
              <Button type="submit" className="w-full bg-djkn-700 hover:bg-djkn-800">
                Simpan
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Pengumuman</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {announcements?.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border border-djkn-100 rounded-lg">
                <div className="flex-1 pr-4">
                  <p className="font-semibold text-djkn-800 truncate">{item.title}</p>
                  <p className="text-sm text-djkn-600 truncate">{item.description}</p>
                </div>
                <form action={deleteAnnouncement.bind(null, item.id)}>
                  <Button type="submit" variant="destructive" size="sm">
                    Hapus
                  </Button>
                </form>
              </div>
            ))}
            {(!announcements || announcements.length === 0) && (
              <p className="text-center text-djkn-600 py-4">Belum ada pengumuman.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}