import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Announcement } from "@/lib/services/announcements";

interface AnnouncementPreviewProps {
  items: Announcement[];
}

export function AnnouncementPreview({ items }: AnnouncementPreviewProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-djkn-800">Pengumuman Terbaru</h2>
          <Link href="/pengumuman" className="text-djkn-700 font-semibold hover:underline">
            Lihat Semua &rarr;
          </Link>
        </div>
        {items.length === 0 ? (
          <p className="text-center text-djkn-600">Belum ada pengumuman terbaru.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {items.map((item) => (
              <Card key={item.id} className="border-djkn-100 hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-djkn-800">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-djkn-600 line-clamp-3">
                    {item.description || "Tidak ada deskripsi."}
                  </p>
                  <p className="text-xs text-djkn-500 mt-4">
                    {new Date(item.created_at).toLocaleDateString("id-ID")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}