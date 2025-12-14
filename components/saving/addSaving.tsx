"use client";

import { X } from "lucide-react";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSaving } from "@/lib/saving";

export default function AddSaving({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  const [form, setForm] = useState({
    item: "",
    amount: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const formData = new FormData();
      formData.append("item", form.item);
      formData.append("amount", form.amount);
      formData.append("date", form.date);

      // nanti ganti ke createSaving()
      await createSaving(formData);

      setMsg("Saving goal berhasil dibuat ✨");

      setForm({
        item: "",
        amount: "",
        date: "",
      });

      setTimeout(() => onClose(), 600);
    } catch (err: any) {
      setMsg(err.message || "Gagal membuat saving.");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col rounded-3xl"
      >
        {/* HEADER */}
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Create Saving Goal</h2>
            <p className="text-sm text-gray-500">Plan your future money ✨</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* TITLE */}
          <div>
            <label className="text-sm font-semibold">Saving Title</label>
            <input
              name="item"
              value={form.item}
              onChange={handleChange}
              placeholder="e.g. Buy Laptop"
              className="mt-2 w-full p-3 border rounded-xl"
            />
          </div>

          {/* AMOUNT + DATE */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold">Target Amount</label>
              <input
                name="amount"
                type="number"
                value={form.amount}
                onChange={handleChange}
                placeholder="20000000"
                className="mt-2 w-full p-3 border rounded-xl"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Target Date</label>
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className="mt-2 w-full p-3 border rounded-xl"
              />
            </div>
          </div>
          {msg && <p className="text-sm text-center text-green-600">{msg}</p>}
        </div>

        {/* FOOTER */}
        <div className="p-6 border-t flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl border"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            type="submit"
            className="px-6 py-2 rounded-xl bg-[#0D1B52] text-white hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Create Goal"}
          </button>
        </div>
      </form>
    </div>
  );
}
