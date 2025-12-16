"use server";

import pool from "@/lib/neon";
import { getCurrentUser } from "@/app/action";

export async function createIncome(form: FormData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const source = form.get("source") as string;
  const amount = Number(form.get("amount"));
  const date = form.get("date") as string;
  const category = Number(form.get("category"));
  const payment = form.get("payment") as string;

  // Validasi basic
  if (!source) throw new Error("Source wajib diisi");
  if (!amount || amount <= 0) throw new Error("Amount tidak valid");
  if (!date) throw new Error("Tanggal wajib diisi");
  if (!category || category <= 0) throw new Error("Category wajib dipilih");
  if (!payment) throw new Error("Payment wajib");

  try {
    const result = await pool.query(
      `INSERT INTO income
        (user_id, title, amount, date, category_id, payment_method, description)
       VALUES
        ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [user.user_id, source, amount, date, category, payment, null]
    );

    return {
      success: true,
      data: result.rows[0],
    };
  } catch (err) {
    console.error("INSERT ERROR RAW:", err);
    throw err;
  }
}

export async function getUserIncomes() {
  const user = await getCurrentUser();
  if (!user) return [];

  const res = await pool.query(
    `
    SELECT
      i.id,
      i.title,
      i.amount,
      i.payment_method as payment,
      i.date as transaction_date,
      i.created_at,
      c.name as category
    FROM income i
    JOIN categories c ON i.category_id = c.id
    WHERE i.user_id = $1
    ORDER BY i.date DESC
    `,
    [user.user_id]
  );

  return res.rows;
}

export async function fetchTotalIncome() {
  const user = await getCurrentUser();
  if (!user) return 0;

  try {
    const res = await pool.query(
      `
        SELECT COALESCE(SUM(CAST(amount AS DECIMAL)), 0) AS total
        FROM income
        WHERE user_id = $1
      `,
      [user.user_id]
    );

    return Number(res.rows[0]?.total || 0);
  } catch (err) {
    console.error("Error fetching total income:", err);
    // Fallback: return 0 if table doesn't exist or other errors
    return 0;
  }
}

export async function numberOfIncomes() {
  const user = await getCurrentUser();
  if (!user) return 0;

  const count = await pool.query(
    `SELECT COUNT(*) FROM income WHERE user_id = $1`,
    [user.user_id]
  );

  return Number(count.rows[0]?.count);
}

export async function getMostProfitableSource() {
  const user = await getCurrentUser();
  if (!user) return null;

  try {
    const res = await pool.query(
      `
      SELECT
        c.name as source,
        COALESCE(SUM(CAST(i.amount AS DECIMAL)), 0) as total_amount,
        COUNT(*) as transaction_count
      FROM income i
      JOIN categories c ON i.category_id = c.id
      WHERE i.user_id = $1
      GROUP BY c.id, c.name
      ORDER BY total_amount DESC
      LIMIT 1
      `,
      [user.user_id]
    );

    return res.rows[0] || null;
  } catch (err) {
    console.error("Error fetching most profitable source:", err);
    return null;
  }
}