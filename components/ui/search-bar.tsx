"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  placeholder?: string;
  debounceMs?: number;
}

export function SearchBar({ 
  placeholder = "Cari...", 
  debounceMs = 300 
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (searchTerm.trim()) {
        params.set("search", searchTerm.trim());
        params.set("page", "1"); // Reset ke halaman 1 saat search
      } else {
        params.delete("search");
      }

      router.push(`?${params.toString()}`);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs, router, searchParams]);

  const handleClear = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-djkn-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 pr-10 border-djkn-200 focus:border-djkn-500 focus:ring-djkn-500"
      />
      {searchTerm && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-djkn-100"
        >
          <X className="h-4 w-4 text-djkn-500" />
        </Button>
      )}
    </div>
  );
}