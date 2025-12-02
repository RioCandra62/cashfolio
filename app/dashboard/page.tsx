import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  MoreHorizontal, 
  ArrowUpRight, 
  ArrowDownRight,
  Target,
  Coffee,
  ShoppingBag,
  Car,
  Zap
} from "lucide-react";

export default function Dashboard() {
  
  // Helper Format Rupiah
  const formatRp = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="flex-1 bg-[#F8F9FC] min-h-screen p-8">

      {/* 1. HEADER & QUICK ACTION */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Track your spending and stick to your budget.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg shadow-blue-600/20 transition flex items-center gap-2">
           + Add Expense
        </button>
      </div>

      {/* 2. TOP STATS CARDS (Financial Health) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Card 1: Total Balance / Sisa Uang */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
             <Wallet size={64} className="text-blue-600" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Wallet size={20} />
            </div>
            <span className="text-sm font-medium text-gray-500">Safe to Spend</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{formatRp(3500000)}</p>
          <p className="text-sm text-green-600 flex items-center gap-1 font-medium">
            <span className="bg-green-100 px-1.5 py-0.5 rounded text-xs">+12%</span> vs last month
          </p>
        </div>

        {/* Card 2: Income vs Expense */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Cash Flow (Oct)</h3>
              <MoreHorizontal size={16} className="text-gray-400" />
           </div>
           <div className="flex justify-between items-end">
              <div>
                 <p className="text-xs text-gray-400 mb-1 flex items-center gap-1"><ArrowDownRight size={14} className="text-green-500"/> Income</p>
                 <p className="text-xl font-bold text-gray-900">{formatRp(8500000)}</p>
              </div>
              <div className="text-right">
                 <p className="text-xs text-gray-400 mb-1 flex items-center justify-end gap-1"><ArrowUpRight size={14} className="text-red-500"/> Expense</p>
                 <p className="text-xl font-bold text-gray-900">{formatRp(5000000)}</p>
              </div>
           </div>
           {/* Visual Bar */}
           <div className="w-full h-2 bg-gray-100 rounded-full mt-4 overflow-hidden flex">
              <div className="h-full bg-green-500 w-[65%]"></div>
              <div className="h-full bg-red-500 w-[35%]"></div>
           </div>
        </div>

        {/* Card 3: Savings Goal */}
        <a href="/dashboard/saving" className="bg-gradient-to-br from-[#0D1B52] to-[#0D1B52]/90 text-white p-6 rounded-xl shadow-lg shadow-gray-900/10">
           <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-white/10 rounded-lg">
               <Target size={20} className="text-white" />
             </div>
             <span className="text-sm font-medium text-gray-300">Wishlist: MacBook Air</span>
           </div>
           <p className="text-2xl font-bold mb-2">{formatRp(12500000)} <span className="text-sm text-gray-400 font-normal">/ 18jt</span></p>
           <div className="w-full bg-gray-700 h-2 rounded-full mt-4">
             <div className="bg-blue-400 h-full rounded-full w-[70%] animate-pulse"></div>
           </div>
           <p className="text-xs text-gray-400 mt-2 text-right">70% Collected</p>
        </a>
      </div>

      {/* 3. MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN (2/3): RECENT TRANSACTIONS */}
        <div className="lg:col-span-2">
           <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                 <h2 className="font-bold text-gray-800">Recent Transactions</h2>
                 <a href="/dashboard/expanse" className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</a>
              </div>
              
              <div className="divide-y divide-gray-50">
                 {/* Item 1 */}
                 <div className="p-5 flex items-center justify-between hover:bg-gray-50 transition cursor-pointer group">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                          <Coffee size={18} />
                       </div>
                       <div>
                          <p className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition">Kopi Kenangan</p>
                          <p className="text-xs text-gray-500">Makanan & Minuman</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="font-bold text-gray-900 text-sm">- {formatRp(25000)}</p>
                       <p className="text-xs text-gray-400">QRIS (Gopay)</p>
                    </div>
                 </div>

                 {/* Item 2 */}
                 <div className="p-5 flex items-center justify-between hover:bg-gray-50 transition cursor-pointer group">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                          <Car size={18} />
                       </div>
                       <div>
                          <p className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition">Grab Ride</p>
                          <p className="text-xs text-gray-500">Transportasi</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="font-bold text-gray-900 text-sm">- {formatRp(18000)}</p>
                       <p className="text-xs text-gray-400">OVO Cash</p>
                    </div>
                 </div>

                 {/* Item 3 */}
                 <div className="p-5 flex items-center justify-between hover:bg-gray-50 transition cursor-pointer group">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
                          <Zap size={18} />
                       </div>
                       <div>
                          <p className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition">Token Listrik</p>
                          <p className="text-xs text-gray-500">Utilities</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="font-bold text-gray-900 text-sm">- {formatRp(102500)}</p>
                       <p className="text-xs text-gray-400">BCA Virtual Acc</p>
                    </div>
                 </div>

                 {/* Item 4 */}
                 <div className="p-5 flex items-center justify-between hover:bg-gray-50 transition cursor-pointer group">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                          <ShoppingBag size={18} />
                       </div>
                       <div>
                          <p className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition">Uniqlo Store</p>
                          <p className="text-xs text-gray-500">Belanja / Pakaian</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="font-bold text-gray-900 text-sm">- {formatRp(499000)}</p>
                       <p className="text-xs text-gray-400">Kartu Debit</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* RIGHT COLUMN (1/3): BUDGET LIMITS */}
        <div className="lg:col-span-1 space-y-6">
           
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-bold text-gray-800 mb-6">Budget Limits</h2>
              
              {/* Budget Item 1 */}
              <div className="mb-6">
                 <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700 flex items-center gap-2"><Coffee size={14}/> Makanan</span>
                    <span className="text-red-500 font-bold">85%</span>
                 </div>
                 <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full w-[85%]"></div>
                 </div>
                 <p className="text-xs text-gray-400 mt-1">Sisa {formatRp(150000)} dari {formatRp(1000000)}</p>
              </div>

              {/* Budget Item 2 */}
              <div className="mb-6">
                 <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700 flex items-center gap-2"><Car size={14}/> Transport</span>
                    <span className="text-blue-600 font-bold">45%</span>
                 </div>
                 <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-[45%]"></div>
                 </div>
                 <p className="text-xs text-gray-400 mt-1">Sisa {formatRp(275000)} dari {formatRp(500000)}</p>
              </div>

              {/* Budget Item 3 */}
              <div className="mb-2">
                 <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700 flex items-center gap-2"><ShoppingBag size={14}/> Belanja</span>
                    <span className="text-green-600 font-bold">20%</span>
                 </div>
                 <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-[20%]"></div>
                 </div>
                 <p className="text-xs text-gray-400 mt-1">Sisa {formatRp(800000)} dari {formatRp(1000000)}</p>
              </div>
           </div>

           {/* Mini Banner / Tips */}
           <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <h3 className="text-blue-800 font-bold text-sm mb-1">💡 Smart Tip</h3>
              <p className="text-blue-600 text-xs leading-relaxed">
                 Pengeluaran makananmu minggu ini naik 15%. Coba masak sendiri untuk menghemat budget!
              </p>
           </div>

        </div>

      </div>
    </div>
  );
}