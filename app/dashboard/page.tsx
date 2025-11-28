export default function Dashbaord() {
  return (
    <div className="flex-1">
      {/* TOP CARDS */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-gray-500 text-sm">Balance</h2>
          <p className="text-3xl font-bold">$27,632</p>
          <p className="text-sm text-green-500">+2.5% ↑</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-gray-500 text-sm">Income</h2>
          <p className="text-3xl font-bold">$20,199</p>
          <p className="text-sm text-green-500">+0.5% ↑</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-gray-500 text-sm">Savings</h2>
          <p className="text-3xl font-bold">$110</p>
          <p className="text-sm text-red-500">-1.5% ↓</p>
        </div>
      </div>

      {/* CHART + PIE */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm h-64">
          <h2 className="text-sm mb-4">Revenue</h2>
          <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
            Chart Placeholder
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-sm mb-4">Efficiency</h2>
          <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
            Pie Chart
          </div>
        </div>
      </div>

      {/* SAVINGS + TRANSACTIONS */}
      <div className="grid grid-cols-3 gap-6">
        {/* Savings */}
        <div className="col-span-1 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-sm mb-4">Your Savings</h2>

          <div className="mb-6">
            <p className="font-semibold">Deposito</p>
            <p className="text-sm text-gray-500">$10,000 / $20,000</p>
            <div className="w-full h-2 bg-gray-200 rounded mt-2">
              <div className="w-1/2 h-full bg-blue-500 rounded"></div>
            </div>
          </div>

          <div>
            <p className="font-semibold">Deposito</p>
            <p className="text-sm text-gray-500">$8,000 / $12,000</p>
            <div className="w-full h-2 bg-gray-200 rounded mt-2">
              <div className="w-2/3 h-full bg-blue-500 rounded"></div>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-sm mb-4">Transactions</h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-2">Company</th>
                <th>Client</th>
                <th>Amount</th>
                <th>Rank</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Google</td>
                <td>Jeremy Rice</td>
                <td>$744</td>
                <td>4.2</td>
              </tr>

              <tr className="border-b">
                <td className="py-2">Facebook</td>
                <td>Antonio Greene</td>
                <td>$900</td>
                <td>4.6</td>
              </tr>

              <tr>
                <td className="py-2">YouTube</td>
                <td>Clarence Díaz</td>
                <td>$560</td>
                <td>2.8</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
