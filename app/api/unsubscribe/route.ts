import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Token is required" },
      { status: 400 }
    );
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("email_subscriptions")
      .update({ subscribed_to_announcements: false })
      .eq("unsubscribe_token", token);

    if (error) {
      console.error("Error unsubscribing:", error);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    // Redirect ke halaman sukses
    return NextResponse.redirect(new URL("/unsubscribe-success", request.url));
  } catch (error) {
    console.error("Error in unsubscribe API:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}