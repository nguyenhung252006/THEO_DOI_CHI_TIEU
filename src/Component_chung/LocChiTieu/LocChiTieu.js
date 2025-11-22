import classNames from "classnames/bind";
import style from "./LocChiTieu.module.scss"

//import hook
import { useState, useEffect } from "react";

//import component 
import Card from "../../cong_cu/Card/Card";

//import axios
import axios from "axios";

//import API
import { API_ENDPOINTS } from "~/config";

//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

//import ho tro 
import chuyenNgay from "../../ho_tro/chuyen_ngay";
import chuyenDinhDangTien from "../../ho_tro/chuyen_dinh_dang_tien";

const cx = classNames.bind(style)
function LocChiTieu({ loaiChiTieu, ngayTao }) {

    //lay id cua nguoi dung
    const UserId = localStorage.getItem('id')

    //state thong bao
    const [lichSu, setLichSu] = useState([])

    // lay du lieu
    const Data = async () => {
        try {
            const res = await axios.get(`${API_ENDPOINTS.USERS}/${UserId}`, { withCredentials: true })
            const dataChiTieu = res.data.chi_tieu
            const dataMucChiTieu = dataChiTieu.filter(item => item.loaiChiTieu === loaiChiTieu && item.ngayTao === ngayTao)
            const listMucChiTieu = dataMucChiTieu.map(item => ({
                tien: item.soTien,
                ghiChu: item.ghiChu,
                id: item.id,
                ngayTao: item.ngayTao,
                date: item.thoiGianNhap,
            }))
            setLichSu(listMucChiTieu)

        } catch (err) { console.log(err) }
    }

    useEffect(() => {
        Data()
    },[])

    return (
        <div>
            {lichSu.map(item => (
                <Card className={'wrapper-content-lich-su'}>
                    <div key={item.id} className={cx('wrapper-content')}>
                        <span
                        ><FontAwesomeIcon icon={faPenToSquare} /> | {chuyenDinhDangTien(item.tien)} VNĐ</span>

                        <span>{chuyenNgay(item.ngayTao ? item.ngayTao : "@")}</span>

                        {item?.ghiChu && <span>{item.ghiChu}</span>}

                        <span>{chuyenNgay(item.date)}</span>
                    </div>
                </Card>
            ))}
        </div>
    );
}

export default LocChiTieu;