import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { createAnnouncement, deleteAnnouncement } from "@/lib/services/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: announcements } = await supabase.from("announcements").select("*").order("created_at", { ascending: false });

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-djkn-800 mb-8">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Tambah Pengumuman</CardTitle></CardHeader>
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
              <Button type="submit" className="w-full bg-djkn-700 hover:bg-djkn-800">Simpan</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Daftar Pengumuman</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {announcements?.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border border-djkn-100 rounded-lg">
                <div className="flex-1 pr-4">
                  <p className="font-semibold text-djkn-800 truncate">{item.title}</p>
                  <p className="text-sm text-djkn-600 truncate">{item.description}</p>
                </div>
                <form action={deleteAnnouncement.bind(null, item.id)}>
                  <Button type="submit" variant="destructive" size="sm">Hapus</Button>
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