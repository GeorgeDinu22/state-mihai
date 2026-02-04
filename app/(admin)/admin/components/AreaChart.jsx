import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SimpleAreaChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
     <AreaChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#009dff" stopOpacity={0.8} />
      <stop offset="95%" stopColor="#009dff" stopOpacity={0.05} />
    </linearGradient>
  </defs>

  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip formatter={(value) => `${value} RON`} />
  <Area
    type="monotone"
    dataKey="Suma Incasata"
    stroke="#009dff"
    fill="url(#colorRevenue)"
    strokeWidth={2}
  />
</AreaChart>

    </ResponsiveContainer>
  );
};

export default SimpleAreaChart;
