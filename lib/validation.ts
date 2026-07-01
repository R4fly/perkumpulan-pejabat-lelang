export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateAnnouncementForm(formData: FormData): ValidationResult {
  const errors: Record<string, string> = {};
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const image_url = formData.get("image_url") as string;

  // Validasi judul
  if (!title || title.trim().length === 0) {
    errors.title = "Judul wajib diisi";
  } else if (title.trim().length < 5) {
    errors.title = "Judul minimal 5 karakter";
  } else if (title.trim().length > 200) {
    errors.title = "Judul maksimal 200 karakter";
  }

  // Validasi deskripsi
  if (!description || description.trim().length === 0) {
    errors.description = "Deskripsi wajib diisi";
  } else if (description.trim().length < 10) {
    errors.description = "Deskripsi minimal 10 karakter";
  } else if (description.trim().length > 1000) {
    errors.description = "Deskripsi maksimal 1000 karakter";
  }

  // Validasi URL gambar (opsional)
  if (image_url && image_url.trim().length > 0) {
    try {
      const url = new URL(image_url);
      if (!["http:", "https:"].includes(url.protocol)) {
        errors.image_url = "URL harus menggunakan http atau https";
      }
    } catch {
      errors.image_url = "Format URL tidak valid";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateRegulationForm(formData: FormData): ValidationResult {
  const errors: Record<string, string> = {};
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const file_url = formData.get("file_url") as string;

  // Validasi judul
  if (!title || title.trim().length === 0) {
    errors.title = "Judul wajib diisi";
  } else if (title.trim().length < 5) {
    errors.title = "Judul minimal 5 karakter";
  } else if (title.trim().length > 200) {
    errors.title = "Judul maksimal 200 karakter";
  }

  // Validasi deskripsi
  if (!description || description.trim().length === 0) {
    errors.description = "Deskripsi wajib diisi";
  } else if (description.trim().length < 10) {
    errors.description = "Deskripsi minimal 10 karakter";
  } else if (description.trim().length > 1000) {
    errors.description = "Deskripsi maksimal 1000 karakter";
  }

  // Validasi URL file (wajib untuk peraturan)
  if (!file_url || file_url.trim().length === 0) {
    errors.file_url = "URL dokumen wajib diisi";
  } else {
    try {
      const url = new URL(file_url);
      if (!["http:", "https:"].includes(url.protocol)) {
        errors.file_url = "URL harus menggunakan http atau https";
      }
    } catch {
      errors.file_url = "Format URL tidak valid";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}