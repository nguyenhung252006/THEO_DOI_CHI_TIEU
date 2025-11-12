function chuyenNgay(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);
  const options = {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  };
  return date.toLocaleString('vi-VN', options);
}

export default chuyenNgay