import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UnsubscribeSuccessPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-djkn-50 px-4 py-12">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold text-djkn-800">
              Berhasil Berhenti Berlangganan
            </h2>
            <p className="text-djkn-600">
              Anda telah berhasil berhenti menerima notifikasi email pengumuman dari PPL.
            </p>
            <p className="text-sm text-djkn-500">
              Anda masih dapat mengakses pengumuman terbaru melalui website kami.
            </p>
            <Button asChild className="bg-djkn-700 hover:bg-djkn-800">
              <Link href="/">Kembali ke Beranda</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}