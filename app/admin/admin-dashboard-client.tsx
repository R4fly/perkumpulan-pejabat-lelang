"use client"

import { useState, useTransition } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toast } from "@/components/ui/toast"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { createAnnouncement, deleteAnnouncement } from "@/lib/services/admin"
import type { Announcement } from "@/lib/services/announcements"

interface AdminDashboardClientProps {
  initialAnnouncements: Announcement[]
}

export function AdminDashboardClient({ initialAnnouncements }: AdminDashboardClientProps) {
  const [announcements, setAnnouncements] = useState(initialAnnouncements)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null)
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; id: string | null; title: string }>({
    isOpen: false,
    id: null,
    title: "",
  })
  const [isPending, startTransition] = useTransition()

  const handleCreate = async (formData: FormData) => {
    startTransition(async () => {
      try {
        await createAnnouncement(formData)
        setToast({ message: "Pengumuman berhasil ditambahkan!", type: "success" })
        
        // Refresh data
        const response = await fetch("/api/announcements")
        if (response.ok) {
          const data = await response.json()
          setAnnouncements(data)
        }
      } catch (error) {
        setToast({ 
          message: error instanceof Error ? error.message : "Gagal menambahkan pengumuman", 
          type: "error" 
        })
      }
    })
  }

  const handleDeleteClick = (id: string, title: string) => {
    setDeleteDialog({ isOpen: true, id, title })
  }

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.id) return

    startTransition(async () => {
      try {
        await deleteAnnouncement(deleteDialog.id)
        setAnnouncements((prev) => prev.filter((item) => item.id !== deleteDialog.id))
        setToast({ message: "Pengumuman berhasil dihapus!", type: "success" })
        setDeleteDialog({ isOpen: false, id: null, title: "" })
      } catch (error) {
        setToast({ 
          message: error instanceof Error ? error.message : "Gagal menghapus pengumuman", 
          type: "error" 
        })
      }
    })
  }

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, id: null, title: "" })
  }

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Hapus Pengumuman"
        description={`Apakah Anda yakin ingin menghapus "${deleteDialog.title}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Hapus"
        cancelLabel="Batal"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        variant="destructive"
      />

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Tambah Pengumuman</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={handleCreate} className="space-y-4">
              <div>
                <Label htmlFor="title">Judul</Label>
                <Input
                  id="title"
                  name="title"
                  required
                  className="mt-1 border-djkn-200 focus:border-djkn-500 focus:ring-djkn-500"
                  disabled={isPending}
                />
              </div>
              <div>
                <Label htmlFor="description">Deskripsi</Label>
                <Input
                  id="description"
                  name="description"
                  required
                  className="mt-1 border-djkn-200 focus:border-djkn-500 focus:ring-djkn-500"
                  disabled={isPending}
                />
              </div>
              <div>
                <Label htmlFor="image_url">URL Gambar (Opsional)</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  className="mt-1 border-djkn-200 focus:border-djkn-500 focus:ring-djkn-500"
                  disabled={isPending}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-djkn-700 hover:bg-djkn-800"
                disabled={isPending}
              >
                {isPending ? "Menyimpan..." : "Simpan"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Pengumuman</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {announcements.length === 0 ? (
              <p className="text-center text-djkn-600 py-4">Belum ada pengumuman.</p>
            ) : (
              announcements.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 border border-djkn-100 rounded-lg hover:bg-djkn-50 transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <p className="font-semibold text-djkn-800 truncate">
                      {item.title}
                    </p>
                    <p className="text-sm text-djkn-600 truncate">
                      {item.description}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleDeleteClick(item.id, item.title)}
                    variant="destructive"
                    size="sm"
                    disabled={isPending}
                  >
                    Hapus
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}