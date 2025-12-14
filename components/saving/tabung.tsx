"use client";

import { X } from "lucide-react";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { tabungById } from "@/lib/saving";

export default function Tabung({
  savingId,
  onClose,
}: {
  savingId: string;
  onClose: () => void;
}) {
  const router = useRouter();

  const [tabung, setTabung] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTabung(e.target.value);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const formData = new FormData();
      formData.append("id", savingId);      // ✅ WAJIB
      formData.append("tabung", tabung);    // ✅ WAJIB

      await tabungById(formData);

      setMsg("Berhasil menabung 💰");

      setTabung("");

      setTimeout(() => {
        onClose();
        router.refresh(); // refresh progress bar
      }, 600);
    } catch (err: any) {
      setMsg(err.message || "Gagal menabung.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg shadow-2xl flex flex-col rounded-3xl"
      >
        {/* HEADER */}
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Tabung Saving</h2>
            <p className="text-sm text-gray-500">
              Masukkan nominal tabungan
            </p>
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
        <div className="p-6 space-y-5">
          <div>
            <label className="text-sm font-semibold">Nominal</label>
            <input
              type="number"
              min={1}
              value={tabung}
              onChange={handleChange}
              placeholder="e.g. 100000"
              className="mt-2 w-full p-3 border rounded-xl"
              required
            />
          </div>

          {msg && <p className="text-sm text-center">{msg}</p>}
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
            className="px-6 py-2 rounded-xl bg-[#0D1B52] text-white disabled:opacity-50"
          >
            {loading ? "Saving..." : "Tabung"}
          </button>
        </div>
      </form>
    </div>
  );
}
