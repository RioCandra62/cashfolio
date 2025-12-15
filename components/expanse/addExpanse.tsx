"use client";

import { X, Upload, FileText, RotateCcw } from "lucide-react";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { createExpense } from "@/lib/Expanse"; // Pastikan path ini benar sesuai struktur projectmu
import { useRouter } from "next/navigation";
import { getCategory } from "@/lib/budget"; // Pastikan path ini benar
import { createWorker } from "tesseract.js";

// --- 1. HELPER: PARSING LOGIC (REGEX) ---
// --- UPDATED HELPER: PARSING LOGIC ---
function parseReceipt(text: string) {
  const lines = text.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);

  let foundItem = lines[0] || ""; // Baris pertama biasanya nama toko (BreadTalk)
  let foundAmount = "";
  let foundDate = "";

  // 1. Regex Tanggal: Support "10 May 19" atau "10 Mei 2019"
  // Mencari pola: (Angka) (Spasi) (Nama Bulan) (Spasi) (Angka Tahun)
  const dateTextRegex = /(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Mei|Jun|Jul|Aug|Agu|Sep|Oct|Okt|Nov|Dec|Des)[a-z]*\s+(\d{2,4})/i;
  // Regex Tanggal Angka: Support 10/05/19 atau 2019-05-10
  const dateNumRegex = /(\d{4}[-/]\d{1,2}[-/]\d{1,2})|(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/;

  // 2. Regex Harga: Mencari angka dengan separator (10.000 atau 10,000)
  const priceRegex = /\b\d{1,3}(?:[.,]\d{3})+(?:[.,]\d{2})?\b/g;

  // Variabel bantu buat logika "Total"
  let totalCandidates: number[] = [];
  let explicitTotal = 0;

  lines.forEach((line) => {
    // --- A. CARI TANGGAL ---
    if (!foundDate) {
      // Cek Format Teks (10 May 19)
      const textMatch = line.match(dateTextRegex);
      if (textMatch) {
        try {
          // textMatch[0] = "10 May 19"
          // Kita ubah "May" jadi index bulan atau biarkan Date() parsing
          const d = new Date(textMatch[0] + " 20" + (textMatch[3].length === 2 ? "" : "")); 
          // Note: "19" sering dibaca tahun 1919 oleh JS, jadi amannya kita assume 20xx kalau cuma 2 digit
          // Tapi coba parsing langsung dulu:
          const parsedDate = new Date(textMatch[0]);
          if (!isNaN(parsedDate.getTime())) {
             foundDate = parsedDate.toISOString().split("T")[0];
          }
        } catch (e) {}
      }
      
      // Cek Format Angka (10/05/2019)
      if (!foundDate) {
        const numMatch = line.match(dateNumRegex);
        if (numMatch) {
           try {
             const d = new Date(numMatch[0].replace(/\//g, "-"));
             if (!isNaN(d.getTime())) foundDate = d.toISOString().split("T")[0];
           } catch(e) {}
        }
      }
    }

    // --- B. CARI HARGA ---
    // Strategi: 
    // 1. Cari angka yang formatnya uang banget (ada titik/koma ribuan)
    // 2. Kalau baris ini ada kata "Total" / "Jumlah", ini prioritas utama!
    
    const isTotalLine = /total|jumlah|bayar|amount/i.test(line);
    const prices = line.match(priceRegex);

    if (prices) {
      prices.forEach((p) => {
        // Bersihkan format: 14,000 -> 14000 | 14.000 -> 14000
        let cleanP = p.replace(/[.]/g, "").replace(/[,]/g, ".");
        // Fix format Indo: 43.500 (dibaca 43500 bukan 43.5)
        if (cleanP.includes(".") && cleanP.split(".")[1].length === 3) {
           cleanP = p.replace(/[,]/g, ""); 
        } else if (!cleanP.includes(".") && p.includes(",")) {
           // case: 43,500 -> 43500
           cleanP = p.replace(/[,]/g, "");
        }
        
        const val = parseFloat(cleanP);
        if (!isNaN(val)) {
          totalCandidates.push(val);
          if (isTotalLine) {
            // Kalau ketemu di baris "Total", simpan sebagai kandidat kuat
            if (val > explicitTotal) explicitTotal = val; 
          }
        }
      });
    }
  });

  // --- C. PENENTUAN HARGA AKHIR ---
  if (explicitTotal > 0) {
    // Priority 1: Angka di baris "Total"
    foundAmount = explicitTotal.toString();
  } else if (totalCandidates.length > 0) {
    // Priority 2: Cari angka terbesar, TAPI filter yang tidak masuk akal (misal ID Member)
    // Anggap belanjaan jarang diatas 10juta untuk struk kasir biasa, atau filter outlier
    // Disini kita ambil Max aja dulu, tapi regex diatas sudah mewajibkan format ribuan (.,)
    // ID Member "1506551" biasanya TIDAK punya separator ribuan di hasil OCR, jadi aman.
    foundAmount = Math.max(...totalCandidates).toString();
  }

  return { item: foundItem, amount: foundAmount, date: foundDate };
}

// --- 2. MAIN COMPONENT ---
export default function AddExpense({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"manual" | "scan">("manual");
  const router = useRouter();

  // Form State
  const [form, setForm] = useState({
    item: "",
    amount: "",
    date: "",
    category: "",
    payment: "",
  });

  // UI States
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [categoryList, setCategoryList] = useState<any[]>([]);

  // OCR States
  const [file, setFile] = useState<File | null>(null);
  const [ocrText, setOcrText] = useState("");
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrStatus, setOcrStatus] = useState(""); // Status detail (Download/Recognize)

  // Load Categories on Mount
  useEffect(() => {
    async function loadCat() {
      const cat = await getCategory();
      setCategoryList(cat);
    }
    loadCat();
  }, []);

  // --- Handlers ---
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
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));

      await createExpense(formData);

      setMsg("Berhasil menambahkan expense!");
      
      // Reset All
      setForm({ item: "", amount: "", date: "", category: "", payment: "" });
      setOcrText("");
      setFile(null);

      setTimeout(() => {
        onClose();
        setActiveTab("manual");
      }, 600);
    } catch (err: any) {
      setMsg(err.message || "Gagal menambahkan expense.");
    } finally {
      setLoading(false);
    }
  }

  // --- OCR PROCESS (CLIENT SIDE) ---
  async function processImage(imageFile: File) {
    setOcrLoading(true);
    setOcrText("");
    setOcrStatus("Persiapan Engine...");
    
    try {
      // FIX: Tesseract v5 syntax
      // 'eng' akan otomatis didownload jika belum ada di cache browser
      const worker = await createWorker('eng'); 
      
      setOcrStatus("Sedang membaca struk...");
      
      const { data: { text } } = await worker.recognize(imageFile);
      
      setOcrText(text);
      await worker.terminate(); // Matikan worker utk hemat memori
      
    } catch (err: any) {
      console.error(err);
      setOcrText(`❌ Error: ${err.message}`);
    } finally {
      setOcrLoading(false);
    }
  }

  // Trigger OCR saat file dipilih
  useEffect(() => {
    if (file) {
      processImage(file);
    }
  }, [file]);

  // Pindahkan hasil OCR ke Form
  function handleUseOcrResult() {
    if (!ocrText) return;
    
    // Parse Text Mentah
    const parsed = parseReceipt(ocrText);

    // Isi Form
    setForm((prev) => ({
      ...prev,
      item: parsed.item || prev.item,
      amount: parsed.amount || prev.amount,
      date: parsed.date || prev.date,
    }));

    // Pindah ke tab manual utk review
    setActiveTab("manual");
  }

  // --- RENDER ---
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col rounded-3xl"
      >
        {/* Header */}
        <div className="p-6 pb-2 border-b border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Add Expense</h2>
            <button
              onClick={onClose}
              type="button"
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

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200">
          
          {/* === MANUAL FORM === */}
          {activeTab === "manual" && (
            <div className="space-y-5">
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
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5"
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
                      className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5"
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
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5"
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
                  className="w-full p-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-black/5"
                >
                  <option value="">Select category</option>
                  {categoryList.map((ct) => (
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
                  className="w-full p-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-black/5"
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

          {/* === SCAN / OCR FORM === */}
          {activeTab === "scan" && (
            <div className="h-full flex flex-col items-center space-y-4 py-4 w-full">
              
              {/* 1. Upload Box (Hanya muncul jika belum ada hasil scan) */}
              {!ocrText && !ocrLoading && (
                <label className="w-full border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 flex flex-col items-center justify-center py-12 px-4 hover:bg-gray-100 transition cursor-pointer group animate-in zoom-in-95">
                  <div className="bg-white p-4 rounded-full shadow-sm mb-3 group-hover:scale-110 transition">
                    <Upload className="text-blue-600" size={24} />
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    Upload Foto Struk
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Pastikan foto jelas & terang
                  </p>
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const selected = e.target.files?.[0];
                      if (selected) setFile(selected);
                    }}
                  />
                </label>
              )}

              {/* 2. Loading State */}
              {ocrLoading && (
                <div className="w-full flex flex-col items-center py-12 space-y-4 animate-in fade-in">
                  <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-700">Processing...</p>
                    <p className="text-xs text-gray-500 mt-1">{ocrStatus}</p>
                  </div>
                </div>
              )}

              {/* 3. Result Preview (Editable) */}
              {!ocrLoading && ocrText && !ocrText.startsWith("❌") && (
                <div className="w-full flex-1 flex flex-col gap-3 animate-in slide-in-from-bottom-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-gray-700">
                      Hasil Scan Mentah
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setOcrText("");
                        setFile(null);
                      }}
                      className="flex items-center gap-1 text-xs text-red-600 hover:bg-red-50 px-2 py-1 rounded transition"
                    >
                      <RotateCcw size={12} /> Reset
                    </button>
                  </div>

                  <div className="relative group">
                    <textarea
                      value={ocrText}
                      onChange={(e) => setOcrText(e.target.value)}
                      className="w-full h-56 p-4 text-xs font-mono bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none text-gray-700 shadow-inner"
                      placeholder="Text hasil scan akan muncul disini..."
                    />
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                       <span className="bg-black/70 text-white text-[10px] px-2 py-1 rounded">Bisa diedit</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex gap-3 items-start">
                    <FileText className="text-blue-600 mt-0.5 shrink-0" size={16} />
                    <p className="text-xs text-blue-700 leading-relaxed">
                      <strong>Tips:</strong> Periksa angka "0" vs huruf "O", atau titik harga. Anda bisa edit text di atas sebelum klik tombol Extract.
                    </p>
                  </div>
                </div>
              )}

              {/* 4. Error State */}
              {ocrText.startsWith("❌") && (
                <div className="w-full bg-red-50 border border-red-200 rounded-xl p-6 flex flex-col items-center gap-2 text-center animate-in zoom-in-95">
                   <p className="text-red-600 font-medium text-sm">{ocrText}</p>
                   <button 
                     type="button"
                     onClick={() => { setOcrText(""); setFile(null); }}
                     className="mt-2 text-xs bg-white border border-red-200 px-4 py-2 rounded-lg shadow-sm text-red-600 hover:bg-red-50 font-medium transition"
                   >
                     Coba Lagi
                   </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
          <p className="text-sm font-medium text-gray-600 truncate max-w-[150px] sm:max-w-xs">
            {msg}
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              type="button"
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-200 transition"
            >
              Cancel
            </button>

            {activeTab === "manual" ? (
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-black text-white hover:bg-gray-800 disabled:opacity-50 transition shadow-lg shadow-black/20"
              >
                {loading ? "Saving..." : "Save Expense"}
              </button>
            ) : (
              <button
                type="button"
                disabled={ocrLoading || !ocrText || ocrText.startsWith("❌")}
                onClick={handleUseOcrResult}
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-blue-600/20"
              >
                Extract Data
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}