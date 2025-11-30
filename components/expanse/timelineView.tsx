"use client";

import { useState } from "react";
import InvoiceModal from "@/components/expanse/invoiceDetail";
import { 
  Filter,
  QrCode,
  Banknote
} from "lucide-react";

export default function DashboardPage() {
  const [showInvoice, setShowInvoice] = useState(false);

  return (
    <div className="flex h-screen bg-[#f8f9fc]">
      


      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Bar */}
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* A. Stats Cards (Biar Gak Kosong) */}


          {/* B. Wide Timeline Section */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            
            {/* Table Header / Filters */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Recent Transactions</h3>
                <p className="text-sm text-gray-500">Senin, 30 Oktober 2025</p>
              </div>
              <button className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg border border-gray-200 transition">
                <Filter size={16} /> Filter
              </button>
            </div>

            {/* THE LIST (Desktop Style) */}
            <div className="divide-y divide-gray-100">
              
              {/* ITEM 1: QRIS */}
              <div 
                onClick={() => setShowInvoice(true)}
                className="group flex items-center justify-between p-5 hover:bg-gray-50 cursor-pointer transition"
              >
                <div className="flex items-center gap-4 w-1/3">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-100 transition">
                    <QrCode size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition">Jajan Siang (Padang)</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Berkah Idaman</p>
                  </div>
                </div>

                <div className="w-1/4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Makanan
                  </span>
                </div>

                <div className="w-1/4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <p className="text-sm text-gray-600">DANA QRIS</p>
                  </div>
                  <p className="text-xs text-gray-400 ml-4">11:24 AM</p>
                </div>

                <div className="w-1/6 text-right">
                  <p className="font-bold text-gray-900">- Rp 10.500</p>
                  <div className="opacity-0 group-hover:opacity-100 transition text-xs text-blue-600 font-medium mt-1">
                    View Invoice &rarr;
                  </div>
                </div>
              </div>

              {/* ITEM 2: CASH */}
              <div className="group flex items-center justify-between p-5 hover:bg-gray-50 cursor-pointer transition">
                <div className="flex items-center gap-4 w-1/3">
                  <div className="p-3 bg-green-50 text-green-600 rounded-xl group-hover:bg-green-100 transition">
                    <Banknote size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Parkir Indomaret</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Manual Record</p>
                  </div>
                </div>

                <div className="w-1/4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Transport
                  </span>
                </div>

                <div className="w-1/4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <p className="text-sm text-gray-600">Cash / Tunai</p>
                  </div>
                  <p className="text-xs text-gray-400 ml-4">09:00 AM</p>
                </div>

                <div className="w-1/6 text-right">
                  <p className="font-bold text-gray-900">- Rp 2.000</p>
                </div>
              </div>

            </div>
            
            {/* Pagination Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/50 rounded-b-xl flex justify-center">
              <button className="text-sm text-gray-500 font-medium hover:text-blue-600 transition">
                Load more transactions...
              </button>
            </div>

          </div>
        </div>
      </main>

      {/* MODAL INVOICE TETAP SAMA */}
      <InvoiceModal 
        isOpen={showInvoice} 
        onClose={() => setShowInvoice(false)} 
      />
    </div>
  );
}