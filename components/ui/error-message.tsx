import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorMessageProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorMessage({
  title = "Gagal Memuat Data",
  message = "Terjadi kesalahan saat mengambil data. Silakan coba lagi.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <div className="max-w-md text-center space-y-4">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
        <h3 className="text-xl font-bold text-djkn-800">{title}</h3>
        <p className="text-djkn-600">{message}</p>
        {onRetry && (
          <Button
            onClick={onRetry}
            className="bg-djkn-700 hover:bg-djkn-800"
          >
            Coba Lagi
          </Button>
        )}
      </div>
    </div>
  )
}