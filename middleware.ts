import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Ambil cookie 'session_token'
  const token = request.cookies.get("session_token")?.value;

  // 2. Tentukan halaman mana yang mau diproteksi
  // Misal: dashboard, profile, settings -> tidak boleh masuk kalau ga login
  const protectedRoutes = ["/dashboard", "/profile", "/settings"];
  
  // 3. Tentukan halaman auth (Login/Register)
  // Kalau sudah login, jangan boleh masuk sini lagi (lempar ke dashboard)
  const authRoutes = ["/auth/login", "/auth/register", "/"];

  const { pathname } = request.nextUrl;

  // SKENARIO A: User mencoba masuk halaman rahasia tapi GAK PUNYA token
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      // Tendang balik ke halaman login
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // SKENARIO B: User SUDAH LOGIN, tapi iseng buka halaman Login lagi
  if (authRoutes.includes(pathname)) {
    if (token) {
      // Tendang ke dashboard (ngapain login lagi?)
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// Konfigurasi agar middleware tidak ngecek file gambar, css, js, dll.
// Ini biar web tetap ngebut.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};