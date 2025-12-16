"use client";

import { X } from "lucide-react";
import { useState, ChangeEvent, FormEvent } from "react";
import { createIncome } from "@/lib/Income";

export default function AddIncome({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}) {
  const [form, setForm] = useState({
    source: "",
    amount: "",
    date: "",
    category: "",
    payment: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const formData = new FormData();
      formData.append("source", form.source);
      formData.append("amount", form.amount);
      formData.append("date", form.date);
      formData.append("category", form.category);
      formData.append("payment", form.payment);

      await createIncome(formData);

      setMsg("Berhasil menambahkan income!");

      // Trigger refresh data
      if (onSuccess) {
        onSuccess();
      }

      // Reset form
      setForm({
        source: "",
        amount: "",
        date: "",
        category: "",
        payment: "",
      });

      // Tutup modal setelah sukses
      setTimeout(() => {
        onClose();
      }, 600);
    } catch (err: unknown) {
      const error = err as Error;
      setMsg(error.message || "Gagal menambahkan income.");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col rounded-3xl">
        {/* Header */}
        <div className="p-6 pb-2 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Add Income</h2>
            <button
              onClick={onClose}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Income Source
              </label>
              <input
                name="source"
                type="text"
                value={form.source}
                onChange={handleChange}
                placeholder="e.g. Salary, Freelance, Business"
                className="w-full p-3 border border-gray-200 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    Rp
                  </span>
                  <input
                    name="amount"
                    type="number"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full pl-10 p-3 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  Date
                </label>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-xl"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-xl bg-white"
              >
                <option value="">Select category</option>
                <option value="1">Salary</option>
                <option value="2">Freelance</option>
                <option value="3">Business</option>
                <option value="4">Investment</option>
                <option value="5">Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Payment Method
              </label>
              <select
                name="payment"
                value={form.payment}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-xl bg-white"
              >
                <option value="">Select payment</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cash">Cash</option>
                <option value="Digital Wallet">Digital Wallet</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
          <p className="text-sm text-gray-600">{msg}</p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-gray-600 hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Income"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}