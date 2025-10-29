import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Dữ liệu mẫu
const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

// Hàm mô tả từng cột
const getIntroOfPage = (label) => {
  switch (label) {
    case 'Page A':
      return "Page A is about men's clothing";
    case 'Page B':
      return "Page B is about women's dress";
    case 'Page C':
      return "Page C is about women's bag";
    case 'Page D':
      return 'Page D is about household goods';
    case 'Page E':
      return 'Page E is about food';
    case 'Page F':
      return 'Page F is about baby food';
    default:
      return '';
  }
};

// Custom tooltip (hiển thị thông tin khi hover)
const CustomTooltip = ({ active, payload, label }) => {
  const isVisible = active && payload && payload.length;

  if (!isVisible) return null;

  return (
    <div
      className="custom-tooltip"
      style={{
        background: 'white',
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '5px',
      }}
    >
      <p className="label">{`${label} : ${payload[0].value}`}</p>
      <p className="intro">{getIntroOfPage(label)}</p>
      <p className="desc">Anything you want can be displayed here.</p>
    </div>
  );
};

// Component chính
const Bieu_do_cot = ({ isAnimationActive = true }) => {
  return (
    <div style={{ width: '100%', maxWidth: '500px', height: '300px' }}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" isAnimationActive={isAnimationActive} />
      </BarChart>
    </div>
  );
};

export default Bieu_do_cot;
