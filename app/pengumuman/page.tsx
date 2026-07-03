import { Suspense } from "react";
import { getAnnouncements } from "@/lib/services/announcements";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { AnimatedGrid, AnimatedCard } from "@/components/ui/animated-grid";
import { CardGridSkeleton } from "@/components/ui/card-skeleton";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { ErrorMessage } from "@/components/ui/error-message";
import { SearchBar } from "@/components/ui/search-bar";
import { Pagination } from "@/components/ui/pagination";
import { ShareButtons } from "@/components/ui/share-buttons";

interface PengumumanPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function AnnouncementsList({ searchParams }: PengumumanPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = typeof params.search === "string" ? params.search : "";

  const response = await getAnnouncements({ page, limit: 9, search });

  if (response.data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-djkn-600">
          {search
            ? `Tidak ada pengumuman yang cocok dengan pencarian "${search}".`
            : "Belum ada pengumuman yang tersedia saat ini."}
        </p>
      </div>
    );
  }

  return (
    <>
      <AnimatedGrid>
        {response.data.map((item) => (
          <AnimatedCard key={item.id}>
            <Card className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow border-djkn-100 h-full">
              {item.image_url && (
                <div className="relative h-48 w-full bg-djkn-100">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <CardHeader>
                <Badge className="w-fit bg-djkn-100 text-djkn-700 hover:bg-djkn-100 border-0">
                  {new Date(item.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Badge>
                <CardTitle className="text-xl text-djkn-800 mt-2">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription 
                  className="text-djkn-600 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: item.description || "Tidak ada deskripsi tersedia." 
                  }}
                />
              </CardContent>
              <div className="flex items-center justify-between border-t border-djkn-100 px-6 py-3 bg-djkn-50/50">
                <div className="text-xs text-djkn-500">
                  Bagikan pengumuman ini:
                </div>
                <ShareButtons
                  title={item.title}
                  url={`${typeof window !== 'undefined' ? window.location.origin : ''}/pengumuman?id=${item.id}`}
                  description={item.description?.replace(/<[^>]*>/g, "").substring(0, 200) || ""}
                />
              </div>
            </Card>
          </AnimatedCard>
        ))}
      </AnimatedGrid>

      <div className="mt-8">
        <Pagination currentPage={response.page} totalPages={response.totalPages} />
      </div>

      <div className="mt-4 text-center text-sm text-djkn-600">
        Menampilkan {response.data.length} dari {response.total} pengumuman
      </div>
    </>
  );
}

export default function PengumumanPage({ searchParams }: PengumumanPageProps) {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-djkn-800">Pengumuman</h1>
        <p className="mt-2 text-lg text-djkn-600">
          Informasi dan pengumuman terbaru dari Perkumpulan Pejabat Lelang
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <Suspense>
          <SearchBar placeholder="Cari pengumuman..." />
        </Suspense>
      </div>

      <ErrorBoundary
        fallback={
          <ErrorMessage
            title="Gagal Memuat Pengumuman"
            message="Kami tidak dapat memuat daftar pengumuman saat ini. Silakan refresh halaman atau coba lagi nanti."
          />
        }
      >
        <Suspense fallback={<CardGridSkeleton count={9} />}>
          <AnnouncementsList searchParams={searchParams} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}