"use server";

import pool from "@/lib/neon";
import { getCurrentUser } from "@/app/action";

export async function SaveBudget(form: FormData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("unauthorized");

  const periode = form.get("periode") as string;
  const count = Number(form.get("count"));

  if (!periode) throw new Error("Choose Periode");
  if (!count || count < 1) throw new Error("Invalid number of budgets");

  const insertedBudgets: any[] = [];

  try {
    for (let i = 0; i < count; i++) {
      const category_name = form.get(`category_${i}`) as string;
      const amount = Number(form.get(`amount_${i}`));

      // Validasi tiap row
      if (!category_name || category_name.trim() === "") {
        throw new Error(`Category #${i + 1} is required`);
      }
      if (!amount || amount <= 0) {
        throw new Error(`Amount #${i + 1} is not valid`);
      }

      // Insert category + budget
      const query = await pool.query(
        `
        WITH new_category AS (
          INSERT INTO categories (name, user_id)
          VALUES ($1, $4)
          RETURNING id
        )
        INSERT INTO budgeting (budget, periode, user_id, category_id)
        SELECT $2, $3, $4, id FROM new_category
        RETURNING *;
        `,
        [category_name, amount, periode, user.user_id]
      );

      insertedBudgets.push(query.rows[0]);
    }

    return {
      success: true,
      data: insertedBudgets,
    };
  } catch (err: unknown) {
    console.error("INSERT ERROR RAW:", err);

    // Pastikan selalu throw Error dengan message string
    let msg = "Failed to save budgets";
    if (err instanceof Error) {
      msg = err.message;
    } else if (typeof err === "string") {
      msg = err;
    } else if (err && typeof err === "object" && "message" in err) {
      msg = (err as any).message;
    }

    throw new Error(msg);
  }
}

export async function fetchTotalBudget() {
  const user = await getCurrentUser();
  if (!user) return 0;

  const res = await pool.query(
    `SELECT SUM(budget) AS total FROM budgeting where user_id = $1`,
    [user.user_id]
  );

  return Number(res.rows[0]?.total || 0);
}

export async function getUserBudget() {
  const user = await getCurrentUser();
  if (!user) return [];

  const res = await pool.query(
    `SELECT b.id, b.budget, c.name FROM budgeting b JOIN categories c ON b.category_id = c.id WHERE b.user_id = $1 ORDER BY b.budget DESC`,
    [user.user_id]
  );

  return res.rows;
}

export async function getCatNumber() {
  const user = await getCurrentUser();
  if (!user) return 0;

  const count = await pool.query(
    `SELECT COUNT(*) FROM budgeting WHERE user_id = $1`,
    [user.user_id]
  );

  return Number(count.rows[0]?.count ?? 0);
}

export async function getCategory() {
  const user = await getCurrentUser();
  if (!user) return [];

  const cat = await pool.query(`SELECT * FROM categories WHERE user_id = $1`, [
    user.user_id,
  ]);

  return cat.rows;
}

export async function getTotalBudget() {
  const user = await getCurrentUser();
  if (!user) return 0;

  const total = await pool.query(
    `SELECT SUM(budget) AS total FROM budgeting WHERE user_id = $1`,
    [user.user_id]
  );
  return Number(total.rows[0]?.total || 0);
}

export async function getBudgetLimitByID() {
  const user = await getCurrentUser();
  if (!user) return [];

  const res = await pool.query(
    `SELECT categories.name, budgeting.budget, SUM(transactions.amount), 
SUM(transactions.amount) / budgeting.budget * 100 as percentage, 
budgeting.budget - SUM(transactions.amount) as remaining 
FROM categories JOIN budgeting 
ON categories.id = budgeting.category_id LEFT JOIN transactions 
ON categories.id = transactions.category_id WHERE categories.user_id = $1 
GROUP BY categories.name, budgeting.budget`,
    [user.user_id]
  );

  return res.rows;
}
