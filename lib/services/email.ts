import { Resend } from "resend";
import { WelcomeEmail } from "@/emails/welcome-email";
import { AnnouncementEmail } from "@/emails/announcement-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(userEmail: string, username: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@ppl-indonesia.org",
      to: userEmail,
      subject: "Selamat Datang di Perkumpulan Pejabat Lelang!",
      react: WelcomeEmail({ userEmail, username }),
    });

    if (error) {
      console.error("Error sending welcome email:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Unexpected error sending welcome email:", err.message);
      return { success: false, error: err.message };
    }
    return { success: false, error: "Unknown error" };
  }
}

export async function sendAnnouncementNotification(
  subscriberEmail: string,
  title: string,
  description: string,
  announcementId: string,
  unsubscribeToken: string
) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const announcementUrl = `${baseUrl}/pengumuman/${announcementId}`;
    const unsubscribeUrl = `${baseUrl}/api/unsubscribe?token=${unsubscribeToken}`;

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@ppl-indonesia.org",
      to: subscriberEmail,
      subject: `Pengumuman Baru: ${title}`,
      react: AnnouncementEmail({
        title,
        description,
        announcementUrl,
        unsubscribeUrl,
      }),
    });

    if (error) {
      console.error("Error sending announcement email:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Unexpected error sending announcement email:", err.message);
      return { success: false, error: err.message };
    }
    return { success: false, error: "Unknown error" };
  }
}