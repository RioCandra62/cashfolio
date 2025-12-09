"use client";
import { X } from "lucide-react";
import { useState, FormEvent } from "react";
import { SaveBudget } from "@/lib/budget";

export default function AddBudget({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [periode, setPeriode] = useState("");
  const [countInput, setCountInput] = useState("1");
  const [count, setCount] = useState(1);
  const [budgets, setBudgets] = useState([{ category: "", amount: "" }]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  function applyCountNumber(newCount: number) {
    setCount(newCount);
    setBudgets((prev) => {
      if (newCount > prev.length) {
        const diff = newCount - prev.length;
        return [...prev, ...Array(diff).fill({ category: "", amount: "" })];
      } else {
        return prev.slice(0, newCount);
      }
    });
  }

  function handleCountInputChange(v: string) {
    setCountInput(v);
    const parsed = parseInt(v, 10);
    if (!Number.isNaN(parsed) && parsed >= 1) {
      applyCountNumber(parsed);
    }
  }

  function handleCountBlur() {
    if (countInput.trim() === "") {
      setCountInput("1");
      applyCountNumber(1);
    }
  }

  function handleBudgetChange(i: number, field: string, value: string) {
    setBudgets((prev) => {
      const copy = [...prev];
      copy[i] = { ...copy[i], [field]: value };
      return copy;
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const formData = new FormData();
      formData.append("periode", periode);
      formData.append("count", String(count));

      budgets.forEach((b, i) => {
        formData.append(`category_${i}`, b.category);
        formData.append(`amount_${i}`, b.amount);
      });

      await SaveBudget(formData);

      setMsg("Successfully Add budget");

      setTimeout(() => {
        onClose();
      }, 600);

      setPeriode("");
      setCount(1);
      setCountInput("1");
      setBudgets([{ category: "", amount: "" }]);
    } catch (err: any) {
      setMsg(err.message || "Failed to add budget");
    }

    setLoading(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] shadow-2xl rounded-3xl flex flex-col">

        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Add Expense</h2>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <form id="budgetForm" className="space-y-5" onSubmit={handleSubmit}>
            {/* Periode */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Select Periode</label>
              <select
                value={periode}
                onChange={(e) => setPeriode(e.target.value)}
                className="w-full p-3 border rounded-xl"
              >
                <option value="">-- select --</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            {/* Number of budgets */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Number of Budget</label>
              <input
                type="number"
                value={countInput}
                min={1}
                onChange={(e) => handleCountInputChange(e.target.value)}
                onBlur={handleCountBlur}
                className="w-full p-3 border rounded-xl"
              />
            </div>

            {/* Dynamic inputs */}
            {budgets.map((b, i) => (
              <div key={i} className="flex flex-row gap-6">
                <div className="flex flex-col gap-2 w-1/2">
                  <label className="text-sm font-semibold text-gray-700">
                    Category Name #{i + 1}
                  </label>
                  <input
                    type="text"
                    value={b.category}
                    onChange={(e) => handleBudgetChange(i, "category", e.target.value)}
                    className="w-full p-3 border rounded-xl"
                    placeholder="e.g. Food & Drink"
                  />
                </div>

                <div className="flex flex-col gap-2 w-1/2">
                  <label className="text-sm font-semibold text-gray-700">
                    Amount #{i + 1}
                  </label>
                  <input
                    type="text"
                    value={b.amount}
                    onChange={(e) => handleBudgetChange(i, "amount", e.target.value)}
                    className="w-full p-3 border rounded-xl"
                    placeholder="e.g. 10000"
                  />
                </div>
              </div>
            ))}
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-gray-600 hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              form="budgetForm"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-black text-white disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Budget"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
