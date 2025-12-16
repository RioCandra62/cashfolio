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

    const { source, amount, date, category, payment } = body;

    // Ensure category is number
    const categoryId = Number(category);

    const result = await pool.query(
      `
      INSERT INTO income (
        user_id,
        title,
        amount,
        date,
        category_id,
        payment_method,
        description
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
      `,
      [
        user.user_id,
        source,
        amount,
        date,
        categoryId,
        payment,
        null, // description optional
      ]
    );

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("INSERT ERROR:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
