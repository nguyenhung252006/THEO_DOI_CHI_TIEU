import classNames from "classnames/bind";
import style from './Thong_tin.module.scss'

//import cong_cu
import Card from "../../cong_cu/Card/Card";
import { TextProfile } from "../../cong_cu";
import ThongBaoTinhTrang from "../../cong_cu/Thong_bao_tinh_trang/Thong_bao_tinh_trang";

import { LoadingHook } from "../../hook";

// import hook
import { useState, useEffect } from "react";


//import axios
import axios from "axios";

//import API_BASE_URL
import { API_BASE_URL, API_ENDPOINTS } from "../../config";

// ho tro
import chuyenNgay from "../../ho_tro/chuyen_ngay";
import chuyenLoaiChiTieu from "../../ho_tro/chuyen_loai_chi_tieu";
import chuyenDinhDangTien from "../../ho_tro/chuyen_dinh_dang_tien";

const cx = classNames.bind(style)
function Thong_tin() {

    //lay id nguoi dung
    const UserId = localStorage.getItem('id')

    // state lay du lieu
    const [profile, setProfile] = useState(null)
    const [soDu, setSoDu] = useState([])
    const [daSuDung, setDaSuDung] = useState([])
    //bien dong so du
    const [tienVao, setTienVao] = useState([])
    const [tienRa, setTienRa] = useState([])

    const dataThongTinNguoiDung = async () => {

        try {
            const res = await axios.get(`${API_ENDPOINTS.USERS}/${UserId}`, { withCredentials: true })
            const chiTieu = res.data.chi_tieu.map(item => Number(item.soTien));
            const chiTieuKhac = res.data.chi_tieu_khac.map(item => Number(item.soTien));
            const tongDaSuDung = [...chiTieu, ...chiTieuKhac].reduce((a, b) => a + b, 0);

            const soDu = res.data.dinh_muc_chi_tieu.map(item => Number(item.soTienDinhMuc));
            const tongSoDu = soDu.reduce((a, b) => a + b, 0);
            //lay dau vao va thong bao
            const mucChiTieuDauVao = res.data.dinh_muc_chi_tieu.map(item => {
                return {
                    tien: Number(item.soTienDinhMuc),
                    date: item.ngayLuu
                };
            });
            setTienVao([...mucChiTieuDauVao])
            // lay dau ra luc thong bao
            const mucChiTieuDauRa = res.data.chi_tieu.map(item => {
                return {
                    loaiChiTieu: item.loaiChiTieu,
                    tien: Number(item.soTien),
                    date: item.thoiGianNhap,
                }
            })

            const mucChiTieuDauRaKhac = res.data.chi_tieu_khac.map(item => {
                return {
                    tien: item.soTien,
                    date: item.thoiGianNhap,
                    loaiChiTieu: item.tenKhoan,
                }
            })

            setTienRa([...mucChiTieuDauRa, ...mucChiTieuDauRaKhac])


            // set thong tin nguoi dung
            setProfile(res.data.nguoi_dung);
            setDaSuDung(tongDaSuDung);
            setSoDu(tongSoDu);
        } catch (error) {
            console.log("khong lay duoc API")
        }
    }

    useEffect(() => {
        if (UserId) {
            dataThongTinNguoiDung();
            console.log(localStorage.getItem('id'))
        }
    }, [UserId]);



    return (
        <>
            <LoadingHook apiUrl={`${API_ENDPOINTS.USERS}/${UserId}`}>
                {(data) => {
                    console.log("API data:", data)
                }}
            </LoadingHook>
            <div className={cx('wrapper')}>

                <Card className={'wrapper-content-items-center'}>
                    <div>
                        <>
                            {profile?.hoTen && profile?.email && <TextProfile
                                name={profile.hoTen}
                                email={profile.email}
                                soDu={soDu}
                                daSuDung={daSuDung}
                            />}
                        </>
                    </div>
                </Card>


                <Card className={'wrapper-content-items-center'}>
                    <div>
                        {profile?.hoTen && profile?.email && profile?.soDienThoai && <TextProfile
                            id={profile.id}
                            sdt={profile.soDienThoai}
                            email={profile.email}
                            soDu={soDu}
                            daSuDung={daSuDung}
                        />}
                    </div>
                </Card>

            </div>
            <div className={cx('wrapper')} >
                <Card className={'wrapper-content'}>
                    <ThongBaoTinhTrang className={''} sodu={soDu} daSuDung={daSuDung}
                        dauVao={tienVao.map((item, index) => (
                            <div key={index}>
                                <Card className={'wrapper-content-lich-su-big-thong-tin'}>
                                    <div className={cx('text-content-dau-vao')}>
                                        <span>{chuyenDinhDangTien(item.tien)} VNĐ</span>
                                        <span>{chuyenNgay(item.date)}</span>
                                    </div>
                                </Card>
                            </div>
                        ))}

                        dauRa={tienRa.map((item, index) => (
                            <div key={index}>
                                <Card className={'wrapper-content-lich-su-big-thong-tin'}>
                                    <div className={cx('text-content-dau-ra')}>
                                        <span>{chuyenDinhDangTien(item.tien)} VNĐ</span>
                                        <span>{chuyenNgay(item.date)}</span>
                                        <span>{chuyenLoaiChiTieu(item.loaiChiTieu)}</span>
                                    </div>
                                </Card>
                            </div>
                        ))}

                    />

                </Card>
            </div>
        </>

    );
}

export default Thong_tin;