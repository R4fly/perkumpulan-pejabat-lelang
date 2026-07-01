import { getRegulations } from "@/lib/services/regulations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { AnimatedGrid, AnimatedCard } from "@/components/ui/animated-grid";

export default async function PeraturanPage() {
  const regulations = await getRegulations();

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-djkn-800">Peraturan</h1>
        <p className="mt-2 text-lg text-djkn-600">Kumpulan peraturan dan regulasi resmi terkait profesi Pejabat Lelang</p>
      </div>

      {regulations.length === 0 ? (
        <div className="text-center py-12"><p className="text-djkn-600">Belum ada peraturan yang diunggah.</p></div>
      ) : (
        <AnimatedGrid>
          {regulations.map((item) => (
            <AnimatedCard key={item.id}>
              <Card className="flex flex-col hover:shadow-lg transition-shadow border-djkn-100 h-full">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-djkn-100 text-djkn-700 hover:bg-djkn-100 border-0">
                      {new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-djkn-800">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <CardDescription className="text-djkn-600 mb-4">{item.description || "Dokumen peraturan resmi."}</CardDescription>
                  {item.file_url && (
                    <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-djkn-700 font-semibold hover:text-djkn-800 transition-colors">
                      <FileText className="h-4 w-4" /> Lihat Dokumen
                    </a>
                  )}
                </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </AnimatedGrid>
      )}
    </main>
  );
}