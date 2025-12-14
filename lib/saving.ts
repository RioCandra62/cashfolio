"use server";

import pool from "@/lib/neon";
import { getCurrentUser } from "@/app/action";

export async function ensureSavingCategory(userId: string) {
  // cek dulu
  const res = await pool.query(
    `SELECT id
     FROM categories
     WHERE user_id = $1 AND name = 'Saving'
     LIMIT 1`,
    [userId]
  );

  if (res.rows.length > 0) {
    return res.rows[0].category_id;
  }

  // kalau belum ada → buat
  const insertRes = await pool.query(
    `INSERT INTO categories (user_id, name)
     VALUES ($1, 'Saving')
     RETURNING id`,
    [userId]
  );

  return insertRes.rows[0].category_id;
}

export async function createSaving(form: FormData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const title = form.get("item") as string;
  const targetAmount = Number(form.get("amount"));
  const targetDate = form.get("date") as string | null;

  // VALIDASI
  if (!title) throw new Error("Judul saving wajib diisi");
  if (!targetAmount || targetAmount <= 0) {
    throw new Error("Target amount tidak valid");
  }

  try {
    // 🔥 PASTIKAN CATEGORY "Saving" ADA
    await ensureSavingCategory(user.user_id);

    const result = await pool.query(
      `
      INSERT INTO saving
        (user_id, title, target, saved, target_date)
      VALUES
        ($1, $2, $3, 0, $4)
      RETURNING *
      `,
      [user.user_id, title, targetAmount, targetDate]
    );

    return {
      success: true,
      data: result.rows[0],
    };
  } catch (err) {
    console.error("CREATE SAVING ERROR:", err);
    throw new Error("Gagal membuat saving");
  }
}

// export async function createSaving(form: FormData) {
//   const user = await getCurrentUser();
//   if (!user) throw new Error("Unauthorized");

//   const title = form.get("item") as string;
//   const targetAmount = Number(form.get("amount"));
//   const targetDate = form.get("date") as string | null;

//   // VALIDASI
//   if (!title) throw new Error("Judul saving wajib diisi");
//   if (!targetAmount || targetAmount <= 0)
//     throw new Error("Target amount tidak valid");

//   try {
//     const result = await pool.query(
//       `
//       INSERT INTO saving
//         (user_id, title, target,target_date)
//       VALUES
//         ($1, $2, $3, $4)
//       RETURNING *
//       `,
//       [user.user_id, title, targetAmount, targetDate]
//     );

//     return {
//       success: true,
//       data: result.rows[0],
//     };
//   } catch (err) {
//     console.error("CREATE SAVING ERROR:", err);
//     throw new Error("Gagal membuat saving");
//   }
// }

export async function getUserSaving() {
  const user = await getCurrentUser();
  if (!user) return [];

  const res = await pool.query(`SELECT * FROM saving where user_id = $1`, [
    user.user_id,
  ]);

  return res.rows;
}

export async function getSavedByID(savingId: string) {
  const user = await getCurrentUser();
  if (!user) return 0;

  const res = await pool.query(
    `SELECT saved FROM saving WHERE id = $1 AND user_id = $2`,
    [savingId, user.user_id]
  );

  return Number(res.rows[0]?.saved);
}

export async function getSavingCategoryId(userId: string) {
  const res = await pool.query(
    `
    SELECT id
    FROM categories
    WHERE user_id = $1 AND name = 'Saving'
    LIMIT 1
    `,
    [userId]
  );

  return res.rows[0]?.id ?? null;
}

export async function tabungById(form: FormData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const savingId = form.get("id") as string;
  const amount = Number(form.get("tabung"));

  if (!savingId || amount <= 0) {
    throw new Error("Data tidak valid");
  }

  // 1️⃣ update saving
  await pool.query(
    `UPDATE saving SET saved = saved + $1 WHERE id = $2 AND user_id = $3`,
    [amount, savingId, user.user_id]
  );

  // 2️⃣ ambil category Saving
  const categoryRes = await pool.query(
    `SELECT id FROM categories WHERE user_id = $1 AND name = 'Saving' LIMIT 1`,
    [user.user_id]
  );

  if (categoryRes.rows.length === 0) {
    throw new Error("Category 'Saving' belum ada");
  }

  const categoryId = categoryRes.rows[0].id;

  // 3️⃣ insert transaction
  await pool.query(
    `
    INSERT INTO transactions
      (user_id, title, amount, transaction_date, category_id, payment)
    VALUES
      ($1, $2, $3, NOW(), $4, $5)
    `,
    [user.user_id, "Nabung", amount, categoryId, "Cash"]
  );

  return { success: true };
}

export async function getTotalSaving() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const res = await pool.query(
    `SELECT SUM(saved) as total FROM saving WHERE user_id=$1`,
    [user.user_id]
  );

  return Number(res.rows[0]?.total || 0);
}
export async function getTotalTarget() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const res = await pool.query(
    `SELECT SUM(target) as total FROM saving WHERE user_id=$1`,
    [user.user_id]
  );

  return Number(res.rows[0]?.total || 0);
}

export async function getNumberSaving() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const res = await pool.query(
    `SELECT count(*) as number FROM saving WHERE user_id=$1`,
    [user.user_id]
  );

  return Number(res.rows[0]?.number || 0);
}

export async function getCompleteSaving() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const res = await pool.query(
    `SELECT count(*) as comp FROM saving WHERE user_id=$1 AND saved = target`,
    [user.user_id]
  );

  return Number(res.rows[0]?.comp || 0);
}
