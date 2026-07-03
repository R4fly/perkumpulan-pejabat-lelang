"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Toast } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { FormField } from "@/components/ui/form-field";
import { FileUpload } from "@/components/ui/file-upload";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { createAnnouncement, deleteAnnouncement } from "@/lib/services/admin";
import { uploadImage } from "@/lib/services/upload";
import { validateAnnouncementForm } from "@/lib/validation";
import { AlertCircle } from "lucide-react"; // ← TAMBAHKAN INI
import type { Announcement } from "@/lib/services/announcements";

interface AdminDashboardClientProps {
  initialAnnouncements: Announcement[];
}

// Helper function untuk strip HTML tags (untuk preview di list)
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function AdminDashboardClient({ initialAnnouncements }: AdminDashboardClientProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
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
    description: "", // Sekarang menyimpan HTML dari RichTextEditor
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

    // Buat FormData object untuk server action
    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("description", formData.description);
    formDataObj.append("image_url", formData.image_url);

    // Validasi form
    const validation = validateAnnouncementForm(formDataObj);

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      setToast({ message: "Mohon perbaiki error pada form", type: "error" });
      return;
    }

    setFormErrors({});

    startTransition(async () => {
      try {
        let imageUrl = formData.image_url;

        // Upload file jika ada
        if (selectedFile) {
          setUploading(true);
          const uploadFormData = new FormData();
          uploadFormData.append("file", selectedFile);

          const uploadResult = await uploadImage(uploadFormData, "announcements");

          if (uploadResult.success && uploadResult.url) {
            imageUrl = uploadResult.url;
          } else {
            setToast({
              message: uploadResult.error || "Gagal upload gambar",
              type: "error",
            });
            setUploading(false);
            return;
          }
          setUploading(false);
        }

        // Update formDataObj dengan image URL final
        formDataObj.set("image_url", imageUrl);

        await createAnnouncement(formDataObj);
        setToast({ message: "Pengumuman berhasil ditambahkan!", type: "success" });

        // Reset form
        setFormData({ title: "", description: "", image_url: "" });
        setSelectedFile(null);
        setPreview(null);

        // Refresh data
        const response = await fetch("/api/announcements");
        if (response.ok) {
          const data = await response.json();
          setAnnouncements(data);
        }
      } catch (error) {
        setToast({
          message: error instanceof Error ? error.message : "Gagal menambahkan pengumuman",
          type: "error",
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
          type: "error",
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
        {/* Form Tambah Pengumuman */}
        <Card>
          <CardHeader>
            <CardTitle>Tambah Pengumuman</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Judul */}
              <FormField
                id="title"
                label="Judul"
                placeholder="Masukkan judul pengumuman"
                required
                error={formErrors.title}
                disabled={isPending || uploading}
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />

              {/* Deskripsi dengan Rich Text Editor */}
              <div className="space-y-2">
                <Label className="text-djkn-700 font-medium">
                  Deskripsi <span className="text-red-500">*</span>
                </Label>
                <RichTextEditor
                  content={formData.description}
                  onChange={(content) => handleInputChange("description", content)}
                  placeholder="Tulis deskripsi pengumuman di sini..."
                  disabled={isPending || uploading}
                />
                {formErrors.description && (
                  <div className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    <span>{formErrors.description}</span>
                  </div>
                )}
              </div>

              {/* Upload Gambar */}
              <div className="space-y-2">
                <Label className="text-djkn-700 font-medium">
                  Gambar (Opsional)
                </Label>
                <FileUpload
                  onFileSelect={(file) => {
                    setSelectedFile(file);
                    setPreview(URL.createObjectURL(file));
                  }}
                  onClear={() => {
                    setSelectedFile(null);
                    setPreview(null);
                  }}
                  preview={preview}
                  disabled={isPending || uploading}
                />
              </div>

              {/* Atau URL Gambar Manual */}
              <FormField
                id="image_url"
                label="Atau URL Gambar (Opsional)"
                placeholder="https://example.com/image.jpg"
                error={formErrors.image_url}
                disabled={isPending || uploading || !!selectedFile}
                value={formData.image_url}
                onChange={(e) => handleInputChange("image_url", e.target.value)}
              />

              <Button
                type="submit"
                className="w-full bg-djkn-700 hover:bg-djkn-800"
                disabled={isPending || uploading}
              >
                {uploading ? "Mengupload gambar..." : isPending ? "Menyimpan..." : "Simpan"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Daftar Pengumuman */}
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
                      {/* Strip HTML untuk preview di list */}
                      <p className="text-sm text-djkn-600 line-clamp-2">
                        {stripHtml(item.description || "") || "Tidak ada deskripsi"}
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