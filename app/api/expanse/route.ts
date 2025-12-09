import { NextResponse } from "next/server";
import pool from "@/lib/neon";
import { getCurrentUser } from "@/app/action";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { item, amount, date, category, payment } = body;

    // category harus integer sesuai FK
    const categoryId = category ? Number(category) : null;

    const result = await pool.query(
      `
      INSERT INTO transactions (
        user_id,
        category_id,
        type,
        title,
        amount,
        transaction_date,
        payment
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
      `,
      [
        user.user_uid,          // FK → neon_auth.users_sync.id
        categoryId,       // integer atau null
        "EXPENSE",        // type wajib, sesuai CHECK constraint
        item,             // title
        amount,           // numeric
        date,             // timestamp
        payment           // ENUM payment
      ]
    );

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("INSERT ERROR:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
