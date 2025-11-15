import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, LabelList, Cell } from 'recharts';

const COLORS = ['#82ca9d', '#8884d8', '#ffc658', '#ff8042'];

const Bieu_do_cot = ({ anUong, muaSam, giaiTri, khac, dinhMuc }) => {
  
  const data = [
    { name: 'Ăn Uống', money: anUong },
    { name: 'Mua Sắm', money: muaSam },
    { name: 'Giải Trí', money: giaiTri },
    { name: 'Khác', money: khac },
  ];

  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis domain={[0, dinhMuc]} /> {/* Trục Y max là định mức */}
      <Tooltip formatter={(money) => money.toLocaleString()} />
      <Legend />
      <Bar dataKey="money">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        <LabelList dataKey="money" position="top" formatter={(money) => money.toLocaleString()} />
      </Bar>
    </BarChart>
  );
};

export default Bieu_do_cot;
