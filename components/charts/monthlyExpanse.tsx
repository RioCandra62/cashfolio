import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// #region Sample data
const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
const randomExpense =
  Math.floor(Math.random() * (500000 - 100000 + 1)) + 100000;
function generateWeeklyData(startBudget: number) {
  let remaining = startBudget;

  return weeks.map((weeks) => {
    // Random expense: 100k – 500k

    // Jangan sampai minus
    const expanse = Math.min(randomExpense, remaining);

    remaining -= expanse;

    return {
      name: weeks, // sesuai format kamu
      expanse, // sesuai format kamu
      remaining, // sesuai format kamu
    };
  });
}

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const rand = randomInt(10);

const formatNumber = (num: number) =>
  new Intl.NumberFormat("id-ID").format(num);

export const data = generateWeeklyData(2_000_000);

const totalExpanse = data.reduce((s, i) => s + i.expanse, 0);

const totalRemaining = data[data.length - 1]?.remaining || 0;

const totalRatio = (
  (totalExpanse / (totalExpanse + totalRemaining)) *
  100
).toFixed(1);

// #endregion

export default function monthlyExpanse() {
  return (
    <>
      <LineChart
        style={{ width: "100%", height: "100%", aspectRatio: 2.5 }}
        responsive
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis width="auto" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="expanse"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="remaining" stroke="#82ca9d" />
      </LineChart>
      <div className="w-full mt-8">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-[#0D1B52]/90 text-white">
              <th className="py-3 w-[10%] text-left px-2">No</th>
              <th className="py-3 w-[30%] text-left px-2">Item Name</th>
              <th className="py-3 w-[20%] text-left px-2">Amount</th>
              <th className="py-3 w-[20%] text-left px-2">Remaining</th>
              <th className="py-3 w-[20%] text-left px-2">Ratio</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => {
              const ratio = (
                (item.expanse / (item.expanse + item.remaining)) *
                100
              ).toFixed(1);

              return (
                <tr key={index} className="border-b">
                  <td className="py-3 px-2">{index + 1}</td>
                  <td className="py-3 px-2">{item.name}</td>
                  <td className="py-3 px-2">IDR {formatNumber(item.expanse)}</td>
                  <td className="py-3 px-2">IDR {formatNumber(item.remaining)}</td>
                  <td className="py-3 px-2">{ratio}%</td>
                </tr>
              );
            })}

            {/* GRAND TOTAL */}
            <tr className="bg-gray-100 font-semibold">
              <td className="py-3 px-2" colSpan={2}>
                Grand Total
              </td>
              <td className="py-3 px-2 text-blue-700">
                IDR {formatNumber(totalExpanse)}
              </td>
              <td className="py-3 px-2 text-green-700">
                IDR {formatNumber(totalRemaining)}
              </td>
              <td className="py-3 px-2 text-purple-700">{totalRatio}%</td>
            </tr>

            {/* EXTRA SUMMARY ROW */}
 
          </tbody>
        </table>
      </div>
    </>
  );
}
