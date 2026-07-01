"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
  variant?: "default" | "destructive"
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = "Konfirmasi",
  cancelLabel = "Batal",
  onConfirm,
  onCancel,
  variant = "default",
}: ConfirmDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-md mx-4 shadow-2xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
          <CardDescription className="pt-2">{description}</CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-2 justify-end">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-djkn-200 hover:bg-djkn-50"
          >
            {cancelLabel}
          </Button>
          <Button
            onClick={onConfirm}
            className={
              variant === "destructive"
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-djkn-700 hover:bg-djkn-800"
            }
          >
            {confirmLabel}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}