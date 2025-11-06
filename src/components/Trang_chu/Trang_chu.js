import Card from "../../cong_cu/Card/Card";
import { TextProfile } from "../../cong_cu";
import BieuDo from '../../cong_cu/Bieu_do_tron/Bieu_do_tron';


import classNames from "classnames/bind";
import style from './Trang_chu.module.scss'

// import swiper
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// import axios
import axios from "axios";
// import Hook React
import { useState, useEffect } from "react";

//import API_BASE_URL
import { API_BASE_URL,API_ENDPOINTS } from "../../config";

const cx = classNames.bind(style)
function Trang_chu() {

    const [profile, setProfile] = useState(null)
    const [soDu, setSoDu] = useState([])
    const [daSuDung, setDaSuDung] = useState([])

    // lay thong tin nguoi dung
    const dataThongTinNguoiDung = async () => {
        try {
            const res = await axios.get(API_ENDPOINTS.USERS, { withCredentials: true })

            const chiTieu = res.data.chi_tieu.map(item => Number(item.soTien));
            const chiTieuKhac = res.data.chi_tieu_khac.map(item => Number(item.soTien));
            const tongDaSuDung = [...chiTieu, ...chiTieuKhac].reduce((a, b) => a + b, 0);

            const soDu = res.data.dinh_muc_chi_tieu.map(item => Number(item.soTienDinhMuc));
            const tongSoDu = soDu.reduce((a, b) => a + b, 0);

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


    return (
        <>
            <div className={cx('wrapper')}>
                <Card className={'wrapper-small'}>
                    <h1>Gioi thieu</h1>
                </Card>
                <Card className={'wrapper-small'}>
                    <h1>Thong bao</h1>
                </Card>
            </div>

            {/* phan nay hien thi cac muc chi tieu gom cac the */}
            <Swiper
                modules={[Navigation]}
                navigation
                slidesPerView={4}
                slidesPerGroup={1}
                spaceBetween={9}
                loop={false}
            >
                <SwiperSlide><Card className={'wrapper-square'}></Card></SwiperSlide>
                <SwiperSlide><Card className={'wrapper-square'}></Card></SwiperSlide>
                <SwiperSlide><Card className={'wrapper-square'}></Card></SwiperSlide>
                <SwiperSlide><Card className={'wrapper-square'}></Card></SwiperSlide>
                <SwiperSlide><Card className={'wrapper-square'}></Card></SwiperSlide>
                <SwiperSlide><Card className={'wrapper-square'}></Card></SwiperSlide>

            </Swiper>

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
                        <Card className={'wrapper-square-big'}>
                            <BieuDo
                                dataCompare={[
                                    { name: 'Chi tiêu', value1: daSuDung, value2: soDu }
                                ]}
                            />
    
                        </Card>
                    </div>
                </Card>
            </div>
        </>
    );
}

export default Trang_chu;