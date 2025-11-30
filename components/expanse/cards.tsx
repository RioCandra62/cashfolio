
import { ArrowUpRight, CreditCard, Wallet } from "lucide-react";

export default function Cards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-red-50 text-red-600 rounded-lg">
            <ArrowUpRight size={20} />
          </div>
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
            +2.5%
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-1">Total Expense</p>
        <h3 className="text-2xl font-bold text-gray-900">Rp 3.500.200</h3>
      </div>
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <CreditCard size={20} />
          </div>
          <span className="text-xs font-medium text-gray-500">Oct 2025</span>
        </div>
        <p className="text-sm text-gray-500 mb-1">QRIS Transactions</p>
        <h3 className="text-2xl font-bold text-gray-900">24 Trx</h3>
      </div>
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-green-50 text-green-600 rounded-lg">
            <Wallet size={20} />
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-1">Cash Spending</p>
        <h3 className="text-2xl font-bold text-gray-900">Rp 450.000</h3>
      </div>
    </div>
  );
}
