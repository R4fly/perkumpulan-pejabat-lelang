import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  userEmail: string;
  username: string;
}

export function WelcomeEmail({ userEmail, username }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Selamat datang di Perkumpulan Pejabat Lelang!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src="https://perkumpulan-pejabat-lelang.vercel.app/djkn.jpeg"
              width="60"
              height="60"
              alt="Logo DJKN"
              style={logo}
            />
          </Section>
          
          <Heading style={h1}>
            Selamat Datang, {username}! 👋
          </Heading>
          
          <Text style={text}>
            Terima kasih telah bergabung dengan <strong>Perkumpulan Pejabat Lelang (PPL)</strong>. 
            Kami senang Anda menjadi bagian dari komunitas kami.
          </Text>
          
          <Text style={text}>
            Sebagai anggota PPL, Anda sekarang memiliki akses ke:
          </Text>
          
          <Section style={features}>
            <Text style={featureItem}>✅ Dashboard personal dengan informasi terbaru</Text>
            <Text style={featureItem}>✅ Akses ke pengumuman dan peraturan terbaru</Text>
            <Text style={featureItem}>✅ Notifikasi email untuk update penting</Text>
            <Text style={featureItem}>✅ Jaringan profesional dengan pejabat lelang lainnya</Text>
          </Section>
          
          <Section style={buttonContainer}>
            <Link href="https://perkumpulan-pejabat-lelang.vercel.app/dashboard" style={button}>
              Buka Dashboard Saya
            </Link>
          </Section>
          
          <Text style={text}>
            Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi kami.
          </Text>
          
          <Section style={hr} />
          
          <Text style={footer}>
            <strong>Perkumpulan Pejabat Lelang (PPL)</strong>
            <br />
            Wadah Resmi Pejabat Lelang Indonesia
            <br />
            <Link href="https://www.instagram.com/pejabatlelang.id/" style={footerLink}>
              @pejabatlelang.id
            </Link>
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
  padding: "32px 0",
  textAlign: "center" as const,
};

const logo = {
  borderRadius: "50%",
  margin: "0 auto",
};

const h1 = {
  color: "#1a5e2a",
  fontSize: "32px",
  fontWeight: "bold" as const,
  margin: "0 0 16px",
  padding: "0 48px",
  textAlign: "center" as const,
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  padding: "0 48px",
  marginBottom: "16px",
};

const features = {
  padding: "0 48px",
  marginBottom: "24px",
};

const featureItem = {
  color: "#333",
  fontSize: "15px",
  lineHeight: "24px",
  marginBottom: "8px",
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
  fontSize: "12px",
  lineHeight: "22px",
  padding: "0 48px",
  textAlign: "center" as const,
};

const footerLink = {
  color: "#1a5e2a",
  textDecoration: "underline",
};

export default WelcomeEmail;