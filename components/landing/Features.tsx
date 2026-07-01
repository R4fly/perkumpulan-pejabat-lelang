import { Gavel, Users, BookOpen } from "lucide-react";

const features = [
  {
    icon: <Gavel className="h-8 w-8 text-djkn-600" />,
    title: "Integritas Lelang",
    description: "Menjaga standar profesionalisme dan etika dalam setiap pelaksanaan lelang negara.",
  },
  {
    icon: <Users className="h-8 w-8 text-djkn-600" />,
    title: "Jaringan Profesional",
    description: "Menghubungkan pejabat lelang di seluruh Indonesia untuk kolaborasi dan berbagi pengetahuan.",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-djkn-600" />,
    title: "Pengembangan Kompetensi",
    description: "Menyediakan materi pelatihan dan sertifikasi untuk meningkatkan keahlian anggota.",
  },
];

export function Features() {
  return (
    <section className="py-16 bg-djkn-50/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-djkn-800 mb-12">Fokus Kami</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-djkn-100">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-djkn-800 mb-2">{feature.title}</h3>
              <p className="text-djkn-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}