import classNames from "classnames/bind";
import style from './Muc_chi_tieu_mua_sam.module.scss'

// import component
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
function Muc_chi_tieu_mua_sam({ children }) {

    // state quan ly thong tin
    const [soDu, setSoDu] = useState([])
    const [daDung, setDaDung] = useState([])
    const [phanTram, setPhanTram] = useState([])
    // state lay thong bao
    const [thongBao, setThongBao] = useState([])
    // sate quan ly thong tin Post
    const [soTien, setSoTien] = useState([])
    const [ghiChu, setGhiChu] = useState(null)

    // Post du lieu mua sam
    const PostMuaSam = async (dataToPost) => {
        try {
            await axios.post(`${API_ENDPOINTS.CHITIEU}/1`, dataToPost, { withCredentials: true })
            setSoTien('')
            setGhiChu('')
            alert('OK!')

            //set lai state
            dataMuaSam()
        } catch (error) { console.error('Post Error' + error) }
    }

    //function handle
    function handleChangeSoTien(e) {
        const inputValue = e.target.value

        const soTienChuaDinhDang = inputValue.replace(/\./g, '')
        if (isNaN(soTienChuaDinhDang)) {
            setSoTien('')
            return
        }
        setSoTien(chuyenDinhDangTien(soTienChuaDinhDang))
    }

    function handleChangeGhiChu(e) {
        setGhiChu(e.target.value)
    }

    function handleSubmit() {

        const soTienPost = soTien.toString().replace(/\./g, '')

        const dataPost = {
            loaiChiTieu: "MUA_SAM",
            soTien: Number(soTienPost),
            ghiChu: ghiChu,
        }

        if (!dataPost.soTien || Number(dataPost.soTien < 0)) { return }
        if (!dataPost.ghiChu || dataPost.ghiChu === '') { dataPost.ghiChu = "Không có ghi chú" }

        PostMuaSam(dataPost);

    }

    //lay du lieu
    const dataMuaSam = async () => {
        try {
            const res = await axios.get(API_ENDPOINTS.USERS, { withCredentials: true })
            console.log(res.data.chi_tieu)

            // lay tong so tien mua sam
            const muaSamData = res.data.chi_tieu
            const chiTieuMuaSam = muaSamData.filter(item => item.loaiChiTieu === "MUA_SAM")
            const soTienDuMuaSam = chiTieuMuaSam.map(item => Number(item.soTien))
            const daDungMuaSam = soTienDuMuaSam.reduce((a, b) => a + b, 0)
            setDaDung(daDungMuaSam)

            //lay thong tin tien dinh muc
            const dinhMucData = res.data.dinh_muc_chi_tieu
            const soTienDinhMuc = dinhMucData.map(item => item.soTienDinhMuc)
            const tongSoTienDinhMuc = soTienDinhMuc.reduce((a, b) => a + b, 0)
            setSoDu(tongSoTienDinhMuc)

            // lay thong tin da them thong bao
            const dataThongBao = chiTieuMuaSam.map(item => ({
                tien: item.soTien,
                ghiChu: item.ghiChu,
                id: item.id,
                date: item.thoiGianNhap,
            }))
            setThongBao(dataThongBao)
        } catch (error) { console.error('Loi khi lay API' + error) }
    }




    // lay data
    useEffect(() => {
        dataMuaSam();
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
                notKhac
                nhapLieu={'Ghi chú ( nếu có )'}
                tenMuc={'Mua Sắm'}
                daSuDung={daDung}
                PhanTramDaSuDung={phanTram}
                lichSu={thongBao.map(item => (
                    <div className={cx('wrapper-content')}>
                        <span>{chuyenDinhDangTien(item.tien)} VNĐ</span>
                        {' || time: '}
                        <span>{chuyenNgay(item.date)}</span>
                        {' || ghi chú: '}
                        {item?.ghiChu && <span>{item.ghiChu}</span>}
                    </div>
                ))}
                onChangeGhiChu={handleChangeGhiChu}
                onChangeSoTien={handleChangeSoTien}
                onSubmit={handleSubmit}
                valueGhiChu={ghiChu}
                valueSoTien={soTien}
            />}
        </div>
    );
}

export default Muc_chi_tieu_mua_sam;

