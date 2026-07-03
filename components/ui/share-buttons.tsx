"use client";

import { useState, useRef, useEffect } from "react";
import {
  Share2,
  Copy,
  Check,
  Mail,
  MessageCircle,
  Send,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Custom Brand Icons
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

interface ShareButtonsProps {
  title: string;
  url: string;
  description?: string;
  className?: string;
}

export function ShareButtons({
  title,
  url,
  description = "",
  className,
}: ShareButtonsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; right: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Encode data untuk URL sharing
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(
    description.substring(0, 200)
  );

  // Share URLs untuk setiap platform
  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0ABaca selengkapnya:%20${encodedUrl}`,
  };

  // Calculate menu position saat dropdown dibuka
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const menuHeight = 420; // Estimasi tinggi menu
      const viewportHeight = window.innerHeight;
      
      // Jika menu akan overflow di bawah, tampilkan di atas tombol
      const showAbove = rect.bottom + menuHeight > viewportHeight;
      
      setMenuPosition({
        top: showAbove ? rect.top - menuHeight - 8 : rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    } else {
      setMenuPosition(null);
    }
  }, [isOpen]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    const shareUrl = shareLinks[platform];
    
    if (platform === "email") {
      window.location.href = shareUrl;
    } else {
      window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=400");
    }
    
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      {/* Toggle Button */}
      <Button
        ref={buttonRef}
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8 p-0 text-djkn-600 hover:text-djkn-800 hover:bg-djkn-100"
        title="Bagikan"
      >
        {isOpen ? (
          <X className="h-4 w-4" />
        ) : (
          <Share2 className="h-4 w-4" />
        )}
      </Button>

      {/* Dropdown Menu - Rendered with fixed positioning */}
      {isOpen && menuPosition && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu - Fixed positioning untuk menghindari overflow */}
          <div
            className="fixed z-50 w-56 rounded-lg border border-djkn-200 bg-white shadow-xl animate-in fade-in-0 zoom-in-95 duration-150"
            style={{
              top: `${menuPosition.top}px`,
              right: `${menuPosition.right}px`,
            }}
          >
            <div className="p-2">
              <div className="px-2 py-1.5 text-xs font-semibold text-djkn-500 uppercase tracking-wide">
                Bagikan via
              </div>

              {/* WhatsApp */}
              <button
                onClick={() => handleShare("whatsapp")}
                className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm text-djkn-700 hover:bg-djkn-50 transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <MessageCircle className="h-4 w-4 text-green-600" />
                </div>
                <span className="font-medium">WhatsApp</span>
              </button>

              {/* Facebook */}
              <button
                onClick={() => handleShare("facebook")}
                className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm text-djkn-700 hover:bg-djkn-50 transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <FacebookIcon className="h-4 w-4 text-blue-600" />
                </div>
                <span className="font-medium">Facebook</span>
              </button>

              {/* Twitter/X */}
              <button
                onClick={() => handleShare("twitter")}
                className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm text-djkn-700 hover:bg-djkn-50 transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100">
                  <TwitterIcon className="h-4 w-4 text-sky-600" />
                </div>
                <span className="font-medium">Twitter / X</span>
              </button>

              {/* LinkedIn */}
              <button
                onClick={() => handleShare("linkedin")}
                className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm text-djkn-700 hover:bg-djkn-50 transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <LinkedinIcon className="h-4 w-4 text-blue-700" />
                </div>
                <span className="font-medium">LinkedIn</span>
              </button>

              {/* Telegram */}
              <button
                onClick={() => handleShare("telegram")}
                className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm text-djkn-700 hover:bg-djkn-50 transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100">
                  <Send className="h-4 w-4 text-sky-500" />
                </div>
                <span className="font-medium">Telegram</span>
              </button>

              {/* Email */}
              <button
                onClick={() => handleShare("email")}
                className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm text-djkn-700 hover:bg-djkn-50 transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                  <Mail className="h-4 w-4 text-red-600" />
                </div>
                <span className="font-medium">Email</span>
              </button>

              <div className="my-1 border-t border-djkn-100" />

              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm text-djkn-700 hover:bg-djkn-50 transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-djkn-100">
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4 text-djkn-600" />
                  )}
                </div>
                <span className="font-medium">
                  {copied ? "Link Tersalin!" : "Salin Link"}
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}