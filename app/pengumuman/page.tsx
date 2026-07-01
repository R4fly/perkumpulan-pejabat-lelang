import { getAnnouncements } from "@/lib/services/announcements";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { AnimatedGrid, AnimatedCard } from "@/components/ui/animated-grid";

export default async function PengumumanPage() {
  const announcements = await getAnnouncements();

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-djkn-800">Pengumuman</h1>
        <p className="mt-2 text-lg text-djkn-600">Informasi dan pengumuman terbaru dari Perkumpulan Pejabat Lelang</p>
      </div>

      {announcements.length === 0 ? (
        <div className="text-center py-12"><p className="text-djkn-600">Belum ada pengumuman yang tersedia saat ini.</p></div>
      ) : (
        <AnimatedGrid>
          {announcements.map((item) => (
            <AnimatedCard key={item.id}>
              <Card className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow border-djkn-100 h-full">
                {item.image_url && (
                  <div className="relative h-48 w-full bg-djkn-100">
                    <Image src={item.image_url} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  </div>
                )}
                <CardHeader>
                  <Badge className="w-fit bg-djkn-100 text-djkn-700 hover:bg-djkn-100 border-0">
                    {new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                  </Badge>
                  <CardTitle className="text-xl text-djkn-800 mt-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-djkn-600">{item.description || "Tidak ada deskripsi tersedia."}</CardDescription>
                </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </AnimatedGrid>
      )}
    </main>
  );
}