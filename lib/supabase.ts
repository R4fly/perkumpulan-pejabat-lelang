/**
 * Supabase clients.
 *
 * The PPL website reads public content (announcements, regulations, about)
 * directly from Supabase using the anonymous key. There is no server-side
 * service-role client yet — authentication is out of scope for this phase
 * (see CLAUDE.md §13).
 *
 * The clients are lazily constructed so the project still builds and runs
 * when the environment variables are not configured. Pages that need data
 * call `getSupabaseConfig()` to decide between the live client and the
 * static fallback in `lib/data/*`.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export interface SupabaseConfig {
  isConfigured: boolean;
  url: string | null;
  hasAnonKey: boolean;
}

/**
 * Returns the Supabase configuration status. Pages use this to decide
 * whether to fetch from Supabase or fall back to static seed data.
 */
export function getSupabaseConfig(): SupabaseConfig {
  return {
    isConfigured: Boolean(SUPABASE_URL && SUPABASE_ANON_KEY),
    url: SUPABASE_URL ?? null,
    hasAnonKey: Boolean(SUPABASE_ANON_KEY),
  };
}

let browserClient: SupabaseClient | null = null;

/**
 * Browser-side Supabase client. Safe to import from client components.
 * Returns `null` when the environment is not configured, so callers can
 * branch on the configuration status instead of throwing.
 */
export function getBrowserSupabase(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return null;
  }
  if (typeof window === "undefined") {
    return null;
  }
  if (!browserClient) {
    browserClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true },
    });
  }
  return browserClient;
}

let serverClient: SupabaseClient | null = null;

/**
 * Server-side Supabase client. Use this from Server Components, Route
 * Handlers, and Server Actions. Returns `null` when unconfigured.
 */
export function getServerSupabase(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return null;
  }
  if (typeof window !== "undefined") {
    return null;
  }
  if (!serverClient) {
    serverClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return serverClient;
}
