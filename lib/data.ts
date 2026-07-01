/**
 * Data access layer for the public site.
 *
 * Pages should call these helpers instead of querying Supabase directly.
 * When Supabase is configured the helpers fetch from the database; when it
 * is not, they return the static seed data in `lib/data/*` so the site
 * is still navigable while the database is being provisioned.
 */

import { getServerSupabase } from "@/lib/supabase";
import type {
  Announcement,
  AnnouncementCategory,
  Regulation,
  RegulationCategory,
} from "@/lib/types";

import { ANNOUNCEMENTS_SEED } from "@/lib/data/announcements";
import { REGULATIONS_SEED } from "@/lib/data/regulations";

export interface ListOptions {
  limit?: number;
  category?: AnnouncementCategory | RegulationCategory;
}

function isAnnouncementCategory(value: unknown): value is AnnouncementCategory {
  return (
    typeof value === "string" &&
    ["umum", "lelang", "pelatihan", "kegiatan", "penting"].includes(value)
  );
}

function isRegulationCategory(value: unknown): value is RegulationCategory {
  return (
    typeof value === "string" &&
    ["uu", "pp", "permenkeu", "permenpanrb", "keputusan", "surat-edaran"].includes(
      value,
    )
  );
}

/**
 * Returns announcements ordered by pinned first, then by publishedAt desc.
 */
export async function listAnnouncements(
  options: ListOptions = {},
): Promise<Announcement[]> {
  const { limit, category } = options;
  const supabase = getServerSupabase();

  if (supabase) {
    let query = supabase
      .from("announcements")
      .select("*")
      .order("is_pinned", { ascending: false })
      .order("published_at", { ascending: false });

    if (category) {
      query = query.eq("category", category);
    }
    if (typeof limit === "number") {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (!error && data) {
      return data.map(rowToAnnouncement);
    }
    // Fall through to seed data on error so the page still renders.
  }

  let items = [...ANNOUNCEMENTS_SEED];
  if (category) {
    items = items.filter((item) => item.category === category);
  }
  items.sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
  if (typeof limit === "number") {
    items = items.slice(0, limit);
  }
  return items;
}

/**
 * Returns a single announcement by slug, or `null` if not found.
 */
export async function getAnnouncementBySlug(
  slug: string,
): Promise<Announcement | null> {
  const supabase = getServerSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (!error && data) {
      return rowToAnnouncement(data);
    }
  }

  return ANNOUNCEMENTS_SEED.find((item) => item.slug === slug) ?? null;
}

/**
 * Returns regulations ordered by year desc, then by effective date desc.
 */
export async function listRegulations(
  options: ListOptions = {},
): Promise<Regulation[]> {
  const { limit, category } = options;
  const supabase = getServerSupabase();

  if (supabase) {
    let query = supabase
      .from("regulations")
      .select("*")
      .order("year", { ascending: false })
      .order("effective_date", { ascending: false });

    if (category) {
      query = query.eq("category", category);
    }
    if (typeof limit === "number") {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (!error && data) {
      return data.map(rowToRegulation);
    }
  }

  let items = [...REGULATIONS_SEED];
  if (category) {
    items = items.filter((item) => item.category === category);
  }
  items.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime();
  });
  if (typeof limit === "number") {
    items = items.slice(0, limit);
  }
  return items;
}

// --- row mappers --------------------------------------------------------

interface AnnouncementRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  published_at: string;
  author?: string | null;
  image_url?: string | null;
  is_pinned?: boolean | null;
}

function rowToAnnouncement(row: AnnouncementRow): Announcement {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    category: isAnnouncementCategory(row.category) ? row.category : "umum",
    publishedAt: row.published_at,
    author: row.author ?? null,
    imageUrl: row.image_url ?? null,
    isPinned: Boolean(row.is_pinned),
  };
}

interface RegulationRow {
  id: string;
  title: string;
  number: string;
  year: number;
  category: string;
  description: string;
  effective_date: string;
  document_url?: string | null;
  tags?: string[] | null;
}

function rowToRegulation(row: RegulationRow): Regulation {
  return {
    id: row.id,
    title: row.title,
    number: row.number,
    year: row.year,
    category: isRegulationCategory(row.category) ? row.category : "permenkeu",
    description: row.description,
    effectiveDate: row.effective_date,
    documentUrl: row.document_url ?? null,
    tags: row.tags ?? [],
  };
}
