import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/app/action";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    const user = await registerUser(name, email, password);
    return NextResponse.json({ user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Register gagal" }, { status: 400 });
  }
}
