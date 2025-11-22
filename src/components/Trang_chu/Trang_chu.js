/* eslint-disable react/jsx-pascal-case */
import Card from "../../cong_cu/Card/Card";
import { TextProfile } from "../../cong_cu";
import BieuDo from '../../cong_cu/Bieu_do_tron/Bieu_do_tron';
import Bieu_do_cot from "../../cong_cu/Bieu_do_cot/Bieu_do_cot";


import classNames from "classnames/bind";
import style from './Trang_chu.module.scss'

// import dowload
import { LoadingHook } from "../../hook";

//import component
import { Canh_bao as CanhBao, Hang_muc_chi_tieu as HangMucChiTieu } from "../../alert";

// import axios
import axios from "axios";

// import Hook React
import { useState, useEffect } from "react";

//import API_BASE_URL
import { API_BASE_URL, API_ENDPOINTS } from "../../config";

//import ho tro
import chuyenDinhDangTien from "../../ho_tro/chuyen_dinh_dang_tien";

//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheck, faBell } from "@fortawesome/free-solid-svg-icons";


const cx = classNames.bind(style)
function Trang_chu() {

    //lay id cua nguoi dung
    const UserId = localStorage.getItem('id')

    const [profile, setProfile] = useState(null)
    const [soDu, setSoDu] = useState([])
    const [daSuDung, setDaSuDung] = useState([])

    //state tinh so tien cua cac muc
    const [muaSam, setMuaSam] = useState([])
    const [anUong, setAnUong] = useState([])
    const [giaiTri, setGiaiTri] = useState([])
    const [khac, setKhac] = useState([])

    //state check active cua nut more-select
    const [active, setActive] = useState(false)

    //state check active cua canh bao
    const [isActiveCanhBao, setIsActiveCanhBao] = useState(false)

    //state tinh con lai 
    const [conLai, setConLai] = useState([])

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
            setProfile(res.data.nguoi_dung);
            setDaSuDung(tongDaSuDung);
            setSoDu(tongSoDu);
        } catch (error) {
            console.error("lỗi khi lấy dữ liệu")
        }
    }


    useEffect(() => {
        dataThongTinNguoiDung()
    }, [])

    // tinh so du
    useEffect(() => {
        setConLai(Number(soDu - daSuDung))
    }, [soDu, daSuDung])


    //handle active
    const handleActive = () => {
        setActive(prev => !prev)
        setIsActiveCanhBao(prev => {
            if (prev === true) {
                prev = false
            }
        })
    }

    //handle active canh bao
    const handleActiveCanhBao = () => {
        setIsActiveCanhBao(prev => !prev)
        setActive(prev => {
            if (prev === true) {
                prev = false
            }
        })
    }

    return (
        <>
            <LoadingHook apiUrl={`${API_ENDPOINTS.USERS}/${UserId}`}>
                {(data) => {
                    console.log("API data:", data)
                }}
            </LoadingHook>
            <div className={cx('wrapper')}>
                <Card className={'wrapper-content'}>
                    <div className={cx('gioi-thieu-wrapper')}>
                        <h1>Giới Thiệu</h1>
                        <div>
                            <div>Chào mừng bạn đến mới SaveMoney</div>
                            <div>Ở đây bạn có thể xem lại các hoạt động chi tiêu của mình trong từng hạng mục riêng</div>
                            <div>Tôi rất mong các bạn sẽ có một trải nghiệm tốt ở đây!</div>
                            <div>Xin trân thành cảm ơn!</div>
                            <div>Kí tên: </div>
                            <div>SaveMoney</div>
                        </div>
                    </div>
                </Card>
                <Card className={'wrapper-content'}>
                    {profile?.hoTen && <div className={cx('xin-chao')}>
                        <h1>Xin chào bạn!</h1>
                        <div>
                            <h3>{profile.hoTen}</h3>
                        </div>
                    </div>}
                </Card>
            </div>


            {/* option */}
            <div className={cx('option')}>
                <div className={cx('more-select')}>
                    <button onClick={() => { handleActive() }}><FontAwesomeIcon className={cx({ rotate: active })} icon={faMoneyCheck} /></button>
                </div>
                <div className={cx('more-select')}>
                    <button onClick={() => { handleActiveCanhBao() }}><FontAwesomeIcon icon={faBell} /></button>
                </div>
            </div>

            {/* phan nay hien thi cac muc chi tieu gom cac the */}
            {active && <HangMucChiTieu
                muaSam={muaSam}
                anUong={anUong}
                giaiTri={giaiTri}
                khac={khac}
            />}
            {/* canh bao cua trang chu */}
            {isActiveCanhBao && <CanhBao trangChu />}

            <div className={cx('wrapper')}>
                <Card className={'wrapper-content'}>
                    <div className={cx('wrapper-content')}>
                        <Card>
                            {profile?.hoTen && profile?.email && <TextProfile
                                name={profile.hoTen}
                                email={profile.email}
                                soDu={soDu}
                                daSuDung={daSuDung}
                            />}
                        </Card>
                        <Card className={'wrapper-content'}>
                            {conLai > 0 && (<BieuDo
                                dataCompare={[
                                    { name: 'Chi tiêu', value1: daSuDung, value2: (conLai) }
                                ]}
                            />)}

                            {conLai < 0 && (
                                <>
                                    <div className={cx('warning')}>
                                        <span>Bạn đã tiêu vượt mức {chuyenDinhDangTien(Math.abs(conLai))} VNĐ</span>
                                    </div>
                                </>
                            )}

                            {(!conLai && !soDu && !daSuDung) && (
                                <span style={{
                                    display: "block",
                                    textAlign: "center",
                                    marginTop: "12px",
                                    color: "#888",
                                    fontStyle: "italic",
                                    fontSize: "14px",
                                }}>*Chưa có dữ liệu</span>
                            )}

                        </Card>
                        <Card className={'wrapper-content-lich-su-big'}>
                            {conLai > 0 && (<Bieu_do_cot
                                anUong={Number(anUong) || 0}
                                muaSam={Number(muaSam) || 0}
                                giaiTri={Number(giaiTri) || 0}
                                khac={Number(khac) || 0}
                                dinhMuc={Number(soDu) || 0}
                            />)}

                            {conLai < 0 && (
                                <>
                                    <div className={cx('warning')}>
                                        <span>Bạn đã tiêu vượt mức {chuyenDinhDangTien(Math.abs(conLai))} VNĐ</span>
                                    </div>
                                </>
                            )}

                            {(!conLai && !soDu && !daSuDung) && (
                                <span style={{
                                    display: "block",
                                    textAlign: "center",
                                    marginTop: "12px",
                                    color: "#888",
                                    fontStyle: "italic",
                                    fontSize: "14px",
                                }}>*Chưa có dữ liệu</span>
                            )}

                        </Card>
                    </div>
                </Card>
            </div>
        </>
    );
}

export default Trang_chu;