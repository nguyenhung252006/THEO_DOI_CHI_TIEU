import classNames from "classnames/bind";
import style from './Muc_chi_tieu_khac.module.scss'

//import component
import ContentChiTieu from "../../../cong_cu/Text_chi_tieu/Text_chi_tieu";

// import axios
import axios from "axios"

// import hook
import { useState, useEffect } from "react";

//import API_BASE_URL
import { API_BASE_URL, API_ENDPOINTS } from "../../../config";

//import ho tro 
import chuyenNgay from "../../../ho_tro/chuyen_ngay";
import chuyenDinhDangTien from "../../../ho_tro/chuyen_dinh_dang_tien";

const cx = classNames.bind(style)
function Muc_chi_tieu_khac() {

    //khai bao state
    const [soDu, setSoDu] = useState([])
    const [daDung, setDaDung] = useState([])


    //lay phan tram
    const [phanTram, setPhanTram] = useState([])

    // lat thong bao
    const [thongBao, setThongBao] = useState([])

    // sate quan ly thong tin Post
    const [soTien, setSoTien] = useState([])
    const [tenKhoan, seTenKhoan] = useState(null)

    // function handle
    function handleChangeSoTien(e) {
        const inputValue = e.target.value

        const soTienChuaDinhDang = inputValue.replace(/\./g, '')
        if (isNaN(soTienChuaDinhDang)) {
            setSoTien('')
            return
        }
        setSoTien(chuyenDinhDangTien(soTienChuaDinhDang))
    }

    function handleChangeKhac(e) {
        const value = e.target.value
        seTenKhoan(value)
    }

    function handleSubmit() {
        const soTienPost = soTien.toString().replace(/\./g, '')

        const dataPost = {
            soTien: Number(soTienPost),
            tenKhoan: tenKhoan,
        }

        if (!dataPost.soTien || Number(dataPost.soTien < 0)) { return }
        PostChiTieuKhac(dataPost)
    }

    // post du lieu
    const PostChiTieuKhac = async (dataPost) => {
        try {
            await axios.post(` ${API_ENDPOINTS.CHITIEUKHAC}/1`, dataPost, { withCredentials: true })
            setSoTien('')
            seTenKhoan('')
            alert('OK!')
            dataMucChiTieuKhac()
        } catch (error) {
            console.error("Error : " + error)
        }
    }

    const dataMucChiTieuKhac = async () => {
        try {
            const res = await axios.get(API_ENDPOINTS.USERS, { withCredentials: true })

            //lay data cua muc chi tieu khac
            const MucChiTieuKhac = res.data.chi_tieu_khac
            const soTienMucChiTieuKhac = MucChiTieuKhac.map(item => item.soTien)
            const daSuDungChiTieuKhac = soTienMucChiTieuKhac.reduce((a, b) => a + b, 0)
            setDaDung(daSuDungChiTieuKhac)



            //lay thong tin tien dinh muc
            const dinhMucData = res.data.dinh_muc_chi_tieu
            const soTienDinhMuc = dinhMucData.map(item => item.soTienDinhMuc)
            const tongSoTienDinhMuc = soTienDinhMuc.reduce((a, b) => a + b, 0)
            setSoDu(tongSoTienDinhMuc)


            //lay thong bao
            const dataThongBao = MucChiTieuKhac.map(item => ({
                tien: item.soTien,
                tenKhoan: item.tenKhoan,
                date: item.thoiGianNhap
            }))
            setThongBao(dataThongBao)

            console.log(MucChiTieuKhac)
        } catch (err) {
            console.error('Error' + err)
        }

    }

    //lay data
    useEffect(() => {
        dataMucChiTieuKhac()
    }, [])

    //tinh phan tram
    useEffect(() => {
        if (soDu > 0) {
            setPhanTram(((daDung / soDu) * 100).toFixed(2))
        } else {
            setPhanTram(0);
        }
    }, [daDung, soDu]);

    return (
        <div className={cx('wrapper')}>
            {<ContentChiTieu
                isKhac
                nhapLieu={'Ghi chú ( nếu có )'}
                tenMuc={'Mục Khác'}
                daSuDung={daDung}
                PhanTramDaSuDung={phanTram}
                lichSu={thongBao.map(item => (
                    <div className={cx('wrapper-content')}>
                        <span>{chuyenDinhDangTien(item.tien)} VNĐ</span>
                        {' || time: '}
                        <span>{chuyenNgay(item.date)}</span>
                        {' || Tên khoản: '}
                        {item?.tenKhoan && <span>{item.tenKhoan}</span>}
                    </div>
                ))}
                onChangeSoTien={handleChangeSoTien}
                valueSoTien={soTien}
                valueKhac={tenKhoan}
                onSubmit={handleSubmit}
                onChangeKhac={handleChangeKhac}
            />}
        </div>
    );
}


export default Muc_chi_tieu_khac