"use server";

import pool from "@/lib/neon";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { z } from "zod"; 
import { cookies } from "next/headers"; 

// --- SKEMA VALIDASI ---
const RegisterSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi").max(100, "Nama terlalu panjang"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// REGISTER USER
export async function registerUser(name: string, email: string, password: string) {
  const validatedFields = RegisterSchema.safeParse({ name, email, password });

  if (!validatedFields.success) {
    throw new Error(validatedFields.error.issues[0].message);
  }

  const check = await pool.query("SELECT * FROM neon_auth.users_sync WHERE email = $1", [email]);
  
  if (check.rows.length > 0) {
    throw new Error("Email sudah terdaftar");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const rawJsonData = JSON.stringify({
    id: randomUUID(),
    display_name: name,
    primary_email: email,
    signed_up_at_millis: Date.now(),
  });

  try {
    const insert = await pool.query(
      `INSERT INTO neon_auth.users_sync 
        (raw_json, password, updated_at) 
       VALUES 
        ($1, $2, NOW()) 
       RETURNING id, name, email`,
      [rawJsonData, hashedPassword]
    );

    return insert.rows[0];
  } catch (error: any) {
    if (error.code === "22001") {
      throw new Error("Kolom password di database terlalu pendek. Ubah jadi TEXT atau VARCHAR(255).");
    }
    throw error;
  }
}

// LOGIN USER
export async function loginUser(email: string, password: string) {
  const validatedFields = LoginSchema.safeParse({ email, password });
  if (!validatedFields.success) throw new Error("Format email atau password tidak valid");

  const res = await pool.query("SELECT * FROM neon_auth.users_sync WHERE email = $1", [email]);
  const user = res.rows[0];

  let isValidUser = false;
  if (user) {
    isValidUser = await bcrypt.compare(password, user.password);
  }

  if (!user || !isValidUser) {
    throw new Error("Email atau password salah");
  }

  // --- PERBAIKAN PENTING DI SINI ---
  // Cookie HARUS diset SEBELUM return!
  const cookieStore = await cookies();
  cookieStore.set("session_token", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 hari
    path: "/",
  });

  const { password: _pw, ...userWithoutPassword } = user;
  
  // Return harus PALING BAWAH
  return userWithoutPassword;
}

// LOGOUT USER
export async function logoutUser() {
  const cookieStore = await cookies();
  
  // PERBAIKAN: Nama cookie harus sama dengan saat login ("session_token")
  cookieStore.delete("session_token");

  return { success: true };
}