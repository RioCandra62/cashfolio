import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// #region Sample data
function generateWeeklyData(startBudget: number) {
  const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
  ];

  let remaining = startBudget;

  return days.map((day) => {
    // Random expense: 100k – 500k
    const randomExpense = Math.floor(Math.random() * (500000 - 100000 + 1)) + 100000;

    // Jangan sampai minus
    const expanse = Math.min(randomExpense, remaining);

    remaining -= expanse;

    return {
      name: day,        // sesuai format kamu
      expanse,          // sesuai format kamu
      remaining,        // sesuai format kamu
    };
  });
}

export const data = generateWeeklyData(2_000_000);

// #endregion

export default function weekly() {
  return (
    <LineChart
      style={{ width: '100%', height: '100%', aspectRatio: 2 }}
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
      <Line type="monotone" dataKey="expanse" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="remaining" stroke="#82ca9d" />
    </LineChart>
  );
}