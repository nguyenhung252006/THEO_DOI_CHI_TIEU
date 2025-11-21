import classNames from "classnames/bind";
import style from './Canh_bao.module.scss'
import Card from "../../cong_cu/Card/Card";

//import hook
import { useState, useEffect } from "react";

//import ho tro
import chuyenDinhDangTien from "../../ho_tro/chuyen_dinh_dang_tien";

//import axios
import axios from "axios";

//import API_BASE_URL
import { API_BASE_URL, API_ENDPOINTS } from "../../config";

const cx = classNames.bind(style)
function Canh_bao({ trangChu }) {

    //lay id cua nguoi dung
    const UserId = localStorage.getItem('id')

    //state tinh con lai 
    const [conLai, setConLai] = useState([])

    //state canh bao
    const [canhBao, setCanhBao] = useState([])

    //state tinh so du , da su dung 
    const [soDu, setSoDu] = useState([])
    const [daSuDung, setDaSuDung] = useState([])

    //state tinh so tien cua cac muc
    const [muaSam, setMuaSam] = useState([])
    const [anUong, setAnUong] = useState([])
    const [giaiTri, setGiaiTri] = useState([])
    const [khac, setKhac] = useState([])

    // lay thong tin nguoi dung
    const dataThongTinNguoiDung = async () => {
        try {
            const res = await axios.get(`${API_ENDPOINTS.USERS}/${UserId}`, { withCredentials: true })

            const chiTieuData = res.data.chi_tieu
            const chiTieu = res.data.chi_tieu.map(item => Number(item.soTien));
            const chiTieuKhac = res.data.chi_tieu_khac.map(item => Number(item.soTien));
            const tongDaSuDung = [...chiTieu, ...chiTieuKhac].reduce((a, b) => a + b, 0);

            const soDu = res.data.dinh_muc_chi_tieu.map(item => Number(item.soTienDinhMuc));
            const tongSoDu = soDu.reduce((a, b) => a + b, 0);

            //lay chi tieu an uong
            const chiTieuAnUong = chiTieuData.filter(item => item.loaiChiTieu === "AN_UONG")
            setAnUong(chiTieuAnUong.map(item => Number(item.soTien)).reduce((a, b) => a + b, 0))

            //lay chi tieu mua sam
            const chiTieuMuaSam = chiTieuData.filter(item => item.loaiChiTieu === "MUA_SAM")
            setMuaSam(chiTieuMuaSam.map(item => Number(item.soTien)).reduce((a, b) => a + b, 0))

            //lay chi tieu giai tri
            const chiTieuGiaiTri = chiTieuData.filter(item => item.loaiChiTieu === "GIAI_TRI")
            setGiaiTri(chiTieuGiaiTri.map(item => Number(item.soTien)).reduce((a, b) => a + b, 0))

            //lay chi tieu khac
            setKhac(chiTieuKhac.reduce((a, b) => a + b, 0))

            // lay va tinh toan du kieu
            setDaSuDung(tongDaSuDung);
            setSoDu(tongSoDu);
        } catch (error) {
            console.error("lỗi khi lấy dữ liệu")
        }
    }

    useEffect(() => {
        dataThongTinNguoiDung()
    }, [])

    useEffect(() => {
        setConLai(Number(soDu - daSuDung))
    }, [soDu, daSuDung])

    // canh bao
    useEffect(() => {
        if (conLai > 0) {
            setCanhBao(
                <div>
                    <span style={{ color: 'green' }}>
                        Số tiền còn lại của bạn là {chuyenDinhDangTien(Math.abs(conLai))} VNĐ
                    </span>
                </div>
            );
        } else if (conLai < 0) {
            setCanhBao(
                <div>
                    <span style={{ color: 'red' }}>
                        Bạn đã tiêu vượt định mức {chuyenDinhDangTien(Math.abs(conLai))} VNĐ
                    </span>
                </div>
            );
        } else {
            setCanhBao(null);
        }
    }, [conLai]);

    return (
        <>
            {trangChu &&
                <div className={cx('card')}>
                    <div className={cx('wrapper')}>
                        <Card className={'wrapper-content'}>
                            <div className={cx('wrapper-content')}>
                                <div className={cx('tong-quan-text')}>
                                    <h3>Số dư-Đã sử dụng</h3>
                                    {soDu !== 0 ? (
                                        <div >Số Dư: <span style={{ color: "green" }}>{chuyenDinhDangTien(soDu)} VNĐ</span></div>
                                    ) : (
                                        <div >Số Dư: <span style={{ color: "green" }}>0 VNĐ</span></div>
                                    )}
                                    {daSuDung !== 0 ? (
                                        <div>Đã sử dụng:   <span style={{ color: "red" }}>{chuyenDinhDangTien(daSuDung)} VNĐ</span></div>
                                    ) : (
                                        <div>Đã sử dụng:   <span style={{ color: "red" }}>0 VNĐ</span></div>
                                    )}
                                </div>
                                <div>
                                    <h3>Mức sử dụng của các mục</h3>
                                    {anUong !== 0 ? (
                                        <div>Ăn Uống: <span>{chuyenDinhDangTien(anUong)} VNĐ</span></div>
                                    ) : (
                                        <div>Ăn Uống: <span>0 VNĐ</span></div>
                                    )}
                                    {muaSam !== 0 ? (
                                        <div>Mua Sắm: <span>{chuyenDinhDangTien(muaSam)} VNĐ</span></div>
                                    ) : (
                                        <div>Mua Sắm: <span>0 VNĐ</span></div>
                                    )}{giaiTri !== 0 ? (
                                        <div>Giải Trí: <span>{chuyenDinhDangTien(giaiTri)} VNĐ</span></div>
                                    ) : (
                                        <div>Giải Trí: <span>0 VNĐ</span></div>
                                    )}{khac !== 0 ? (
                                        <div>Mục Khác: <span>{chuyenDinhDangTien(khac)} VNĐ</span></div>
                                    ) : (
                                        <div>Mục Khác: <span>0 VNĐ</span></div>
                                    )}
                                </div>
                                <div>
                                    {canhBao}
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>}
        </>
    );
}

export default Canh_bao;