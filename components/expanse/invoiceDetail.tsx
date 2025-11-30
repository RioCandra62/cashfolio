"use client";
import { X, Share2, Printer, Download, MapPin, Calendar, CreditCard } from "lucide-react";

export default function InvoiceModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    // 1. Overlay Backdrop (Gelap & Blur biar fokus)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 backdrop-blur-sm p-4 animate-in fade-in duration-200 rounded-lg">
      
      {/* 2. Container Modal (Hampir Full Screen, Style Kertas A4) */}
      <div className="bg-white w-full max-w-[70%] h-auto max-h-[95vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col rounded-4xl">
        
        {/* Decorative Top Bar */}
        <div className="h-2 w-full bg-linear-to-r from-blue-600 to-blue-400"></div>

        {/* Tombol Close (Floating di luar kertas atau di pojok) */}
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-500 transition"
        >
            <X size={24} />
        </button>

        {/* === ISI KERTAS INVOICE === */}
        <div className="p-10 md:p-14 flex-1">
          
          {/* A. HEADER SECTION */}
          <div className="flex justify-between items-start mb-12 border-b border-gray-100 pb-8">
            <div>
               {/* Logo Brand */}
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                Cash<span className="text-blue-600">folio.</span>
              </h1>
              <p className="text-gray-500 mt-2 text-sm">Professional Expense Tracker</p>
            </div>
            <div className="text-right">
              <h2 className="text-4xl font-light text-gray-300 uppercase tracking-widest">Invoice</h2>
              <div className="mt-4 space-y-1">
                <div className="flex justify-end gap-4 text-sm">
                  <span className="text-gray-500 font-medium">Invoice No:</span>
                  <span className="font-mono font-bold text-gray-900">#INV-2025-001</span>
                </div>
                <div className="flex justify-end gap-4 text-sm">
                  <span className="text-gray-500 font-medium">Date:</span>
                  <span className="font-bold text-gray-900">30 October 2025</span>
                </div>
                <div className="flex justify-end gap-4 text-sm">
                   <span className="text-gray-500 font-medium">Ref ID:</span>
                   <span className="font-mono text-gray-600">112424383984</span>
                </div>
              </div>
            </div>
          </div>

          {/* B. INFO GRID (Merchant vs User) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            
            {/* Kolom Kiri: Merchant */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Payee / Merchant</h3>
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                <p className="font-bold text-xl text-gray-900 mb-1">Berkah Idaman</p>
                <div className="flex items-start gap-2 text-gray-500 text-sm mt-2">
                    <MapPin size={16} className="mt-0.5 shrink-0" />
                    <span>Jl. Raya Bojongsoang No. 123,<br/>Kab. Bandung, 40211, ID</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600 text-xs font-medium mt-3 bg-blue-50 w-fit px-2 py-1 rounded">
                    <CreditCard size={14} /> Verified Merchant
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Detail Pembayaran */}
            <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Payment Details</h3>
                <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600 text-sm">Method</span>
                        <span className="font-bold text-gray-900">QRIS (Instant)</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600 text-sm">Provider</span>
                        <span className="font-bold text-gray-900">DANA Indonesia</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600 text-sm">Source Account</span>
                        <span className="font-mono text-gray-900">**** 8952</span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                        <span className="text-gray-600 text-sm">Status</span>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                            Success
                        </span>
                    </div>
                </div>
            </div>
          </div>

          {/* C. TABLE ITEM (Full Width) */}
          <div className="mb-10">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b-2 border-gray-100">
                        <th className="py-3 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/2">Description</th>
                        <th className="py-3 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Category</th>
                        <th className="py-3 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Amount</th>
                    </tr>
                </thead>
                <tbody className="text-gray-800">
                    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                        <td className="py-5 pr-4">
                            <p className="font-bold text-lg">Nasi Padang Komplit</p>
                            <p className="text-sm text-gray-500 mt-1">Include: Rendang, Sayur Nangka, Es Teh Manis</p>
                        </td>
                        <td className="py-5 text-right">
                            <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                                Makanan
                            </span>
                        </td>
                        <td className="py-5 text-right font-mono font-medium text-lg">
                            Rp 10.500
                        </td>
                    </tr>
                    {/* Spacer row buat visualisasi kalau itemnya banyak */}
                    <tr><td colSpan={3} className="py-4"></td></tr>
                </tbody>
            </table>
          </div>

          {/* D. TOTAL SECTION (Bottom Right) */}
          <div className="flex justify-end">
             <div className="w-full md:w-1/3 space-y-3">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>Rp 10.500</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Tax / Admin Fee</span>
                    <span>Rp 0</span>
                </div>
                <div className="h-px bg-gray-200 my-2"></div>
                <div className="flex justify-between items-center">
                    <span className="font-bold text-xl text-gray-900">Total</span>
                    <span className="font-black text-3xl text-blue-600">Rp 10.500</span>
                </div>
             </div>
          </div>

          {/* E. FOOTER / BARCODE (Hiasan) */}
          <div className="mt-16 pt-8 border-t border-dashed border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex flex-col gap-1">
                 {/* Barcode Visual (Pure CSS Lines) */}
                 <div className="h-8 flex items-end gap-[2px] opacity-60">
                    <div className="w-1 h-full bg-black"></div>
                    <div className="w-2 h-3/4 bg-black"></div>
                    <div className="w-1 h-full bg-black"></div>
                    <div className="w-3 h-1/2 bg-black"></div>
                    <div className="w-1 h-full bg-black"></div>
                    <div className="w-2 h-3/4 bg-black"></div>
                    <div className="w-4 h-full bg-black"></div>
                    <div className="w-1 h-1/2 bg-black"></div>
                    <div className="w-2 h-full bg-black"></div>
                 </div>
                 <span className="text-[10px] font-mono text-gray-400 tracking-[0.3em]">1124-2438-3984</span>
             </div>
             <p className="text-xs text-gray-400 text-center md:text-right">
                Thank you for using Cashfolio.<br/>
                This is a computer-generated receipt.
             </p>
          </div>

        </div>

        {/* F. BOTTOM ACTION BAR (Sticky at Bottom) */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-between items-center px-10">
            <button className="text-red-500 text-sm font-medium hover:text-red-600 transition">
                Delete Record
            </button>
            <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
                    <Share2 size={16} /> Share
                </button>
                <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-md">
                    <Printer size={16} /> Print Invoice
                </button>
            </div>
        </div>

      </div>
    </div>
  );
}