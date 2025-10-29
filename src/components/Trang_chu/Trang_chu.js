import Card from "../../cong_cu/Card/Card";
import { TextProfile } from "../../cong_cu";
import Bieu_do_cot from "../../cong_cu/Bieu_do_cot/Bieu_do_cot";

import classNames from "classnames/bind";
import style from './Trang_chu.module.scss'

// import swiper
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';


const cx = classNames.bind(style)
function Trang_chu() {
    return (
        <>
            <div className={cx('wrapper')}>
                <Card className={'wrapper-small'}>
                    <h1>Gioi thieu</h1>
                </Card>
                <Card className={'wrapper-small-long'}>
                    <h1>Content</h1>
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
                    <Card>
                        <TextProfile />
                    </Card>
                    <Card className={'wrapper-small'}>
                        <Bieu_do_cot/>
                    </Card>
                </Card>
            </div>
        </>
    );
}

export default Trang_chu;