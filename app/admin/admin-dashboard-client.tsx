"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { FormField } from "@/components/ui/form-field";
import { createAnnouncement, deleteAnnouncement } from "@/lib/services/admin";
import { validateAnnouncementForm } from "@/lib/validation";
import type { Announcement } from "@/lib/services/announcements";

interface AdminDashboardClientProps {
  initialAnnouncements: Announcement[];
}

export function AdminDashboardClient({ initialAnnouncements }: AdminDashboardClientProps) {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; id: string | null; title: string }>({
    isOpen: false,
    id: null,
    title: "",
  });
  const [isPending, startTransition] = useTransition();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error saat user mulai mengetik
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validasi form
    const formDataObj = new FormData(e.currentTarget);
    const validation = validateAnnouncementForm(formDataObj);
    
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      setToast({ message: "Mohon perbaiki error pada form", type: "error" });
      return;
    }

    setFormErrors({});

    startTransition(async () => {
      try {
        await createAnnouncement(formDataObj);
        setToast({ message: "Pengumuman berhasil ditambahkan!", type: "success" });
        
        // Reset form
        setFormData({ title: "", description: "", image_url: "" });
        
        // Refresh data
        const response = await fetch("/api/announcements");
        if (response.ok) {
          const data = await response.json();
          setAnnouncements(data);
        }
      } catch (error) {
        setToast({ 
          message: error instanceof Error ? error.message : "Gagal menambahkan pengumuman", 
          type: "error" 
        });
      }
    });
  };

  const handleDeleteClick = (id: string, title: string) => {
    setDeleteDialog({ isOpen: true, id, title });
  };

  const handleDeleteConfirm = async () => {
    const idToDelete = deleteDialog.id;
    if (!idToDelete) return;

    startTransition(async () => {
      try {
        await deleteAnnouncement(idToDelete);
        setAnnouncements((prev) => prev.filter((item) => item.id !== idToDelete));
        setToast({ message: "Pengumuman berhasil dihapus!", type: "success" });
        setDeleteDialog({ isOpen: false, id: null, title: "" });
      } catch (error) {
        setToast({ 
          message: error instanceof Error ? error.message : "Gagal menghapus pengumuman", 
          type: "error" 
        });
      }
    });
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, id: null, title: "" });
  };

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
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                id="title"
                label="Judul"
                placeholder="Masukkan judul pengumuman"
                required
                error={formErrors.title}
                disabled={isPending}
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
              <FormField
                id="description"
                label="Deskripsi"
                placeholder="Masukkan deskripsi pengumuman"
                required
                error={formErrors.description}
                disabled={isPending}
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
              <FormField
                id="image_url"
                label="URL Gambar (Opsional)"
                placeholder="https://example.com/image.jpg"
                error={formErrors.image_url}
                disabled={isPending}
                value={formData.image_url}
                onChange={(e) => handleInputChange("image_url", e.target.value)}
              />
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
              <div className="space-y-3">
                {announcements.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-4 border border-djkn-100 rounded-lg hover:bg-djkn-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="font-semibold text-djkn-800 truncate">
                        {item.title}
                      </p>
                      <p className="text-sm text-djkn-600 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleDeleteClick(item.id, item.title)}
                      variant="destructive"
                      size="sm"
                      disabled={isPending}
                      className="shrink-0"
                    >
                      Hapus
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}