"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type UploadCategory = "announcements" | "regulations";

export interface UploadResult {
  success: boolean;
  url?: string;
  path?: string;
  error?: string;
}

export async function uploadImage(
  formData: FormData,
  category: UploadCategory
): Promise<UploadResult> {
  const supabase = await createClient();

  try {
    const file = formData.get("file") as File;

    if (!file) {
      return { success: false, error: "Tidak ada file yang diupload" };
    }

    // Validasi file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return { success: false, error: "Ukuran file maksimal 10MB" };
    }

    // Validasi MIME type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return { 
        success: false, 
        error: "Format file tidak didukung. Gunakan JPG, PNG, WebP, atau GIF" 
      };
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split(".").pop();
    const fileName = `${category}/${timestamp}-${randomString}.${fileExtension}`;

    // Upload ke Supabase Storage
    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      return { success: false, error: error.message };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("uploads")
      .getPublicUrl(data.path);

    return {
      success: true,
      url: urlData.publicUrl,
      path: data.path,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Unexpected upload error:", err.message);
      return { success: false, error: err.message };
    }
    return { success: false, error: "Terjadi kesalahan yang tidak diketahui" };
  }
}

export async function deleteImage(path: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  try {
    const { error } = await supabase.storage.from("uploads").remove([path]);

    if (error) {
      console.error("Delete error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Unexpected delete error:", err.message);
      return { success: false, error: err.message };
    }
    return { success: false, error: "Terjadi kesalahan yang tidak diketahui" };
  }
}