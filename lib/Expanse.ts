// app/(routes)/dashboard/_actions/createExpense.ts
"use server";

import pool from "@/lib/neon";
import { getCurrentUser } from "@/app/action";

export async function createExpense(form: FormData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const item = form.get("item") as string;
  const amount = Number(form.get("amount"));
  const date = form.get("date") as string;
  const category = Number(form.get("category"));
  const payment = form.get("payment") as string;

  // Validasi basic
  if (!item) throw new Error("Item wajib diisi");
  if (!amount || amount <= 0) throw new Error("Amount tidak valid");
  if (!date) throw new Error("Tanggal wajib diisi");
  if (!category) throw new Error("Category wajib");
  if (!payment) throw new Error("Payment wajib");

  try {
    const result = await pool.query(
      `INSERT INTO transactions 
        (user_id, title, amount, transaction_date, category_id, payment)
       VALUES 
        ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [user.user_id, item, amount, date, category, payment]
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

export async function getUserExpenses() {
  const user = await getCurrentUser();
  if (!user) return [];

  const res = await pool.query(
    `
    SELECT
      t.id,
      t.title,
      t.amount,
      t.payment,
      t.created_at,
      c.name AS category_name
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = $1 AND t.category_id IS NOT NULL AND t.type = 'expanse'
    ORDER BY t.transaction_date DESC
    `,
    [user.user_id]
  );

  return res.rows;
}
export async function fetchTotalExpense() {
  const user = await getCurrentUser();
  if (!user) return 0;

  const res = await pool.query(
    `
      SELECT SUM(amount) AS total
      FROM transactions
      WHERE user_id = $1 AND category_id IS NOT NULL AND type != 'saving'
    `,
    [user.user_id]
  );

  return Number(res.rows[0]?.total || 0);
}
export async function fetchTotalSaving() {
  const user = await getCurrentUser();
  if (!user) return 0;

  const res = await pool.query(
    `
      SELECT SUM(amount) AS total
      FROM transactions
      WHERE user_id = $1 AND category_id IS NOT NULL AND type != 'expanse'
    `,
    [user.user_id]
  );

  return Number(res.rows[0]?.total || 0);
}

export async function numberOfExpanse() {
  const user = await getCurrentUser();
  if (!user) return 0;

  const count = await pool.query(
    `SELECT COUNT(*) FROM transactions WHERE user_id = $1 AND category_id IS NOT NULL`,
    [user.user_id]
  );

  return Number(count.rows[0]?.count);
}

export async function getMostExpensiveCategory() {
  const user = await getCurrentUser();
  if (!user) return null;

  const res = await pool.query(
    ` WITH total AS (
        SELECT SUM(amount) AS total_amount
        FROM transactions
        WHERE user_id = $1 AND category_id IS NOT NULL
      ),
      category_sum AS (
        SELECT
          c.id,
          c.name,
          SUM(t.amount) AS amount
        FROM transactions t
        JOIN categories c ON t.category_id = c.id
        WHERE t.user_id = $1 AND t.category_id IS NOT NULL
        GROUP BY c.id, c.name
      )
      SELECT
        c.id,
        c.name,
        c.amount,
        (c.amount / t.total_amount) * 100 AS percent
      FROM category_sum c, total t
      ORDER BY c.amount DESC
      LIMIT 1;`,
    [user.user_id]
  );

  return res.rows[0] || null;
}
