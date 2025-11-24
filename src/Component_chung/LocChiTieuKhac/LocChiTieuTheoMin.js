import classNames from "classnames/bind";
import style from "./LocChiTieu.module.scss"

//import hook
import { useState, useEffect } from "react";

//import component 
import Card from "../../cong_cu/Card/Card";

//import axios
import axios from "axios";

//import API
import { API_ENDPOINTS } from "../../config";


//import ho tro 
import chuyenNgay from "../../ho_tro/chuyen_ngay";
import chuyenDinhDangTien from "../../ho_tro/chuyen_dinh_dang_tien";

const cx = classNames.bind(style)
function LocChiTieuTheoMin({ loaiChiTieu, Min, isCLose }) {

    //lay id cua nguoi dung
    const UserId = localStorage.getItem('id')

    //state thong bao
    const [lichSu, setLichSu] = useState([])

    //state check open
    const [isOpen, setIsOpen] = useState(false)

    // lay du lieu
    const Data = async () => {
        try {
            const res = await axios.get(`${API_ENDPOINTS.USERS}/${UserId}`, { withCredentials: true })
            const dataChiTieu = res.data.chi_tieu_khac
            const dataMucChiTieu = dataChiTieu.filter(item => item.loaiChiTieu === loaiChiTieu && item.soTien > Min.replace(/\./g, ''))
            const listMucChiTieu = dataMucChiTieu.map(item => ({
                tien: item.soTien,
                ghiChu: item.ghiChu,
                id: item.id,
                ngayTao: item.ngayTao,
                date: item.thoiGianNhap,
            }))
            setLichSu(listMucChiTieu)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (lichSu) {
            setIsOpen(true)
        } else { setIsOpen(false) }
    }, [lichSu])

    useEffect(() => {
        Data()
    }, [Min])

    console.log(lichSu)

    return (
        <>
            {Min !== "" && lichSu.length > 0 && isOpen && !isCLose && <div className={cx('wrapper')}>
                {
                    <>
                        {lichSu.map(item => (
                            <Card className={'wrapper-content-lich-su-filter'}>
                                <div className={cx('content')}>

                                    <span>{chuyenDinhDangTien(item.tien)} VNĐ</span>

                                    <span>{chuyenNgay(item.date)}</span>

                                    {item?.ghiChu && <span>{item.ghiChu}</span>}

                                </div>
                            </Card>
                        ))}
                    </>}
            </div>}
        </>
    );
}

export default LocChiTieuTheoMin;