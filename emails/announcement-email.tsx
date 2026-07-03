import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface AnnouncementEmailProps {
  title: string;
  description: string;
  announcementUrl: string;
  unsubscribeUrl: string;
}

export function AnnouncementEmail({
  title,
  description,
  announcementUrl,
  unsubscribeUrl,
}: AnnouncementEmailProps) {
  // Strip HTML tags dan batasi panjang untuk preview
  const plainDescription = description
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .substring(0, 200);

  return (
    <Html>
      <Head />
      <Preview>{plainDescription}...</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src="https://perkumpulan-pejabat-lelang.vercel.app/djkn.jpeg"
              width="50"
              height="50"
              alt="Logo DJKN"
              style={logo}
            />
          </Section>

          <Heading style={h1}>Pengumuman Baru</Heading>

          <Section style={content}>
            <Heading style={titleStyle}>{title}</Heading>
            
            <Text style={text}>
              {plainDescription}
              {plainDescription.length >= 200 && "..."}
            </Text>
          </Section>

          <Section style={buttonContainer}>
            <Link href={announcementUrl} style={button}>
              Lihat Pengumuman Lengkap
            </Link>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Anda menerima email ini karena berlangganan notifikasi pengumuman dari PPL.
            <br />
            <Link href={unsubscribeUrl} style={unsubscribeLink}>
              Berhenti berlangganan
            </Link>
          </Text>

          <Text style={footerSmall}>
            <strong>Perkumpulan Pejabat Lelang (PPL)</strong>
            <br />
            Wadah Resmi Pejabat Lelang Indonesia
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const logoContainer = {
  padding: "24px 0",
  textAlign: "center" as const,
};

const logo = {
  borderRadius: "50%",
  margin: "0 auto",
};

const h1 = {
  color: "#1a5e2a",
  fontSize: "28px",
  fontWeight: "bold" as const,
  margin: "0 0 16px",
  padding: "0 48px",
  textAlign: "center" as const,
};

const content = {
  padding: "0 48px",
  marginBottom: "24px",
};

const titleStyle = {
  color: "#1a5e2a",
  fontSize: "24px",
  fontWeight: "bold" as const,
  margin: "0 0 16px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "16px",
};

const buttonContainer = {
  padding: "24px 48px",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#1a5e2a",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold" as const,
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 32px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "32px 48px",
};

const footer = {
  color: "#8898aa",
  fontSize: "14px",
  lineHeight: "22px",
  padding: "0 48px",
  textAlign: "center" as const,
};

const unsubscribeLink = {
  color: "#1a5e2a",
  textDecoration: "underline",
};

const footerSmall = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "22px",
  padding: "16px 48px 0",
  textAlign: "center" as const,
};

export default AnnouncementEmail;