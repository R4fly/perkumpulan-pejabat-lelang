import { SITE_CONFIG } from "@/lib/types";

export function Footer() {
  return (
    <footer className="border-t bg-djkn-50 py-8 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm text-djkn-700">
        <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Hak Cipta Dilindungi.</p>
        <p className="mt-2">
          <a 
            href="https://www.instagram.com/pejabatlelang.id/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Ikuti kami di Instagram
          </a>
        </p>
      </div>
    </footer>
  );
}