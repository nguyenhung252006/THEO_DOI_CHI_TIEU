import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d'] 

const Bieu_do_tron = ({ dataCompare }) => {

  const item = dataCompare[0] || { value1: 0, value2: 0 };


  const data = [
    { name: 'Đã sử dụng', value: item.value1 },
    { name: 'Còn lại', value: item.value2 },
  ];

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        cx="50%" // Tâm trục x
        cy="50%" // Tâm trục y
        innerRadius={60} // Bán kính trong (nếu muốn tạo donut)
        outerRadius={100} // Bán kính ngoài
        fill="#8884d8"
        paddingAngle={5} // Khoảng cách giữa các phần
        dataKey="value"
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`} 
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => value.toLocaleString()} />
      <Legend />
    </PieChart>
  );
};

export default Bieu_do_tron;
