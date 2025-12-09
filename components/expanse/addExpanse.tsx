"use client";

import { X, Upload, FileText } from "lucide-react";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { createExpense, numberOfExpanse } from "@/lib/Expanse";
import { useRouter } from "next/navigation";
import { getCategory } from "@/lib/budget";
export default function AddExpense({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"manual" | "scan">("manual");

  const [form, setForm] = useState({
    item: "",
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

  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const formData = new FormData();
      formData.append("item", form.item);
      formData.append("amount", form.amount);
      formData.append("date", form.date);
      formData.append("category", form.category);
      formData.append("payment", form.payment);

      await createExpense(formData);

      setMsg("Berhasil menambahkan expense!");

      // Reset form
      setForm({
        item: "",
        amount: "",
        date: "",
        category: "",
        payment: "",
      });

      // Tutup modal setelah sukses
      setTimeout(() => {
        onClose();
      }, 600);
    } catch (err: any) {
      setMsg(err.message || "Gagal menambahkan expense.");
    } finally {
      setLoading(false);
    }
  }

  const [category, setCategory] = useState<any[]>([]);

  useEffect(() => {
    async function loadCat() {
      const cat = await getCategory();
      setCategory(cat);
    }
    loadCat();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col rounded-3xl">
        {/* Header */}
        <div className="p-6 pb-2 border-b border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Add Expense</h2>
            <button
              onClick={onClose}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex p-1 bg-gray-100 rounded-xl w-full sm:w-fit">
            <button
              type="button"
              onClick={() => setActiveTab("manual")}
              className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex-1 sm:flex-none ${
                activeTab === "manual"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FileText size={16} />
              Manual Input
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("scan")}
              className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex-1 sm:flex-none ${
                activeTab === "scan"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Upload size={16} />
              Upload Receipt
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "manual" && (
            <div id="manualForm" className="space-y-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  Item Name
                </label>
                <input
                  name="item"
                  type="text"
                  value={form.item}
                  onChange={handleChange}
                  placeholder="e.g. Nasi Padang"
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
                  {category.map((ct) => (
                    <option key={ct.id} value={ct.id}>
                      {ct.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  Payment
                </label>
                <select
                  name="payment"
                  value={form.payment}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-xl bg-white"
                >
                  <option value="">Select payment</option>
                  <option value="Cash">Cash</option>
                  <option value="QRIS">Qris</option>
                  <option value="Debit">Debit</option>
                  <option value="Credit">Credit</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === "scan" && (
            <div className="h-full flex flex-col items-center justify-center space-y-4 py-8">
              <label className="w-full border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 flex flex-col items-center justify-center py-12 px-4 hover:bg-gray-100 transition cursor-pointer">
                <Upload className="text-blue-600 mb-4" size={32} />
                <p className="text-sm font-medium text-gray-900">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, or WebP (max. 5MB)
                </p>
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
          )}
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
              className="px-6 py-2.5 rounded-xl bg-black text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Expense"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
