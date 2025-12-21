"use server";
import pool from "@/lib/neon";
import { getCurrentUser } from "@/app/action";

export async function getTotalIncomeThisMonth() {
  const user = await getCurrentUser();
  if (!user) return 0;

  const res = await pool.query(
    `SELECT COALESCE(SUM(CAST(amount AS numeric)), 0) AS total
   FROM income
   WHERE user_id = $1
     AND date >= DATE_TRUNC('month', CURRENT_DATE)
     AND date <  DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'`,
    [user.user_id]
  );

  return Number(res.rows[0]?.total || 0);
}
export async function getTotalExpanseThisMonth() {
  const user = await getCurrentUser();
  if (!user) return 0;

  const res = await pool.query(
    `SELECT COALESCE(SUM(amount), 0) AS total
FROM transactions
WHERE user_id = $1
  AND transaction_date >= DATE_TRUNC('month', CURRENT_DATE)
  AND transaction_date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month' AND type != 'saving'`,
    [user.user_id]
  );

  return Number(res.rows[0]?.total || 0);
}

export async function getLatestGoingSaving() {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    const res = await pool.query(
      `select * from saving where target != saved and user_id = $1 limit 1`,
      [user.user_id]
    );

    return res.rows;
}
