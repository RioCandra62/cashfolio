import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/app/action";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email dan password wajib diisi" }, { status: 400 });
    }

    const user = await loginUser(email, password);
    return NextResponse.json({ user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Login gagal" }, { status: 400 });
  }
}
