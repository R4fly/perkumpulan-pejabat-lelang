"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (isLoginMode) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        router.refresh();
        router.push("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setSuccessMessage("Registrasi berhasil! Silakan cek email Anda untuk verifikasi akun.");
        setEmail("");
        setPassword("");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes("Invalid login credentials")) {
          setError("Email atau password salah.");
        } else if (err.message.includes("User already registered")) {
          setError("Email ini sudah terdaftar.");
        } else {
          setError(err.message);
        }
      } else {
        setError("Terjadi kesalahan yang tidak diketahui.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-djkn-50 px-4 py-12">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-djkn-800">
            {isLoginMode ? "Masuk ke PPL" : "Daftar Akun PPL"}
          </CardTitle>
          <CardDescription className="text-djkn-600">
            {isLoginMode 
              ? "Masukkan kredensial Anda untuk mengakses dashboard" 
              : "Buat akun Anda untuk mulai menggunakan layanan"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                {error}
              </div>
            )}
            {successMessage && (
              <div className="rounded-md bg-green-50 p-3 text-sm text-green-700 border border-green-200">
                {successMessage}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-djkn-700 font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-djkn-200 focus:border-djkn-500 focus:ring-djkn-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-djkn-700 font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="border-djkn-200 focus:border-djkn-500 focus:ring-djkn-500"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-djkn-700 hover:bg-djkn-800 text-white font-semibold transition-colors" 
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : (isLoginMode ? "Masuk" : "Daftar")}
            </Button>
            
            <div className="text-center text-sm text-djkn-600">
              {isLoginMode ? "Belum punya akun? " : "Sudah punya akun? "}
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(!isLoginMode);
                  setError(null);
                  setSuccessMessage(null);
                }}
                className="font-semibold text-djkn-700 hover:underline"
              >
                {isLoginMode ? "Daftar di sini" : "Masuk di sini"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}