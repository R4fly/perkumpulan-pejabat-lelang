import { BentoGridShowcase } from "@/components/ui/bento-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Target, Award, BookOpen, Building } from "lucide-react";

const VisiCard = () => (
  <Card className="h-full bg-gradient-to-br from-djkn-700 to-djkn-800 text-white border-0">
    <CardHeader>
      <Target className="h-8 w-8 text-djkn-200 mb-2" />
      <CardTitle className="text-2xl text-white">Visi PPL</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-djkn-100 leading-relaxed">
        Menjadi organisasi profesi yang unggul, berintegritas, dan diakui secara nasional dalam mendukung pelaksanaan lelang negara yang transparan dan akuntabel.
      </p>
    </CardContent>
  </Card>
);

const MisiCard = () => (
  <Card className="h-full">
    <CardHeader>
      <BookOpen className="h-6 w-6 text-djkn-600 mb-2" />
      <CardTitle className="text-lg">Misi Kami</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2 text-sm text-djkn-700">
      <p>• Meningkatkan kompetensi anggota.</p>
      <p>• Menjaga standar etika profesi.</p>
      <p>• Memfasilitasi kolaborasi nasional.</p>
    </CardContent>
  </Card>
);

const NilaiCard = () => (
  <Card className="h-full">
    <CardContent className="flex h-full flex-col justify-center gap-3 p-6">
      <Badge className="w-fit bg-djkn-100 text-djkn-700 border-0 hover:bg-djkn-200">
        <Shield className="mr-1.5 h-3 w-3" /> Integritas
      </Badge>
      <Badge className="w-fit bg-djkn-100 text-djkn-700 border-0 hover:bg-djkn-200">
        <Award className="mr-1.5 h-3 w-3" /> Profesionalisme
      </Badge>
      <Badge className="w-fit bg-djkn-100 text-djkn-700 border-0 hover:bg-djkn-200">
        <Users className="mr-1.5 h-3 w-3" /> Kolaborasi
      </Badge>
    </CardContent>
  </Card>
);

const StatistikCard = () => (
  <Card className="flex h-full flex-col justify-between bg-djkn-50 p-6 border-djkn-100">
    <Users className="h-8 w-8 text-djkn-600" />
    <div>
      <p className="text-5xl font-bold text-djkn-800">850+</p>
      <p className="text-sm text-djkn-600 mt-2">Pejabat lelang tersertifikasi yang aktif tersebar di seluruh Indonesia.</p>
    </div>
  </Card>
);

const MitraCard = () => (
  <Card className="h-full">
    <CardHeader>
      <Building className="h-6 w-6 text-djkn-600 mb-2" />
      <CardTitle className="text-lg">Mitra & Afiliasi</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col gap-2 text-sm text-djkn-700">
      <p>• Direktorat Jenderal Kekayaan Negara (DJKN)</p>
      <p>• Kementerian Keuangan RI</p>
      <p>• Kementerian Hukum dan HAM</p>
    </CardContent>
  </Card>
);

const SejarahCard = () => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle className="text-lg">Sejarah Singkat</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-djkn-700 leading-relaxed">
        Didirikan pada tahun 2010, PPL telah menjadi wadah utama bagi para pejabat lelang di Indonesia untuk berkembang dan berkontribusi bagi negara.
      </p>
    </CardContent>
  </Card>
);

export default function TentangPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-djkn-800">Tentang Kami</h1>
        <p className="mt-2 text-lg text-djkn-600 max-w-2xl mx-auto">
          Mengenal lebih dekat visi, misi, dan nilai-nilai yang dipegang teguh oleh Perkumpulan Pejabat Lelang (PPL).
        </p>
      </div>

      <BentoGridShowcase
        integrations={<MitraCard />}
        featureTags={<NilaiCard />}
        mainFeature={<VisiCard />}
        secondaryFeature={<MisiCard />}
        statistic={<StatistikCard />}
        journey={<SejarahCard />}
      />
    </main>
  );
}