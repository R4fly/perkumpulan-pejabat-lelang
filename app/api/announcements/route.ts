import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching announcements:", error.message)
      return NextResponse.json(
        { success: false, data: null, message: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Unexpected error:", err.message)
      return NextResponse.json(
        { success: false, data: null, message: err.message },
        { status: 500 }
      )
    }
    return NextResponse.json(
      { success: false, data: null, message: "Unknown error" },
      { status: 500 }
    )
  }
}