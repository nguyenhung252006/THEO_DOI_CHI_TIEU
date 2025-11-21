import classNames from "classnames/bind";
import style from './Hang_muc_chi_tieu.module.scss'


// import swiper
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

//import component
import Card from "../../cong_cu/Card/Card";

////import ho tro
import chuyenDinhDangTien from "../../ho_tro/chuyen_dinh_dang_tien";

const cx = classNames.bind(style)
function Hang_muc_chi_tieu({muaSam,anUong,giaiTri,khac}) {
    return (
        <>
            <div className={cx('card')}>
                <Swiper
                    modules={[Navigation]}
                    navigation
                    slidesPerView={4}
                    slidesPerGroup={1}
                    spaceBetween={9}
                    loop={false}
                >
                    <SwiperSlide><Card className={'wrapper-square'}>
                        {muaSam > 0 ? (<div>
                            <div>Mục chi tiêu: Mua Sắm</div>
                            <div>Tổng số tiền: {chuyenDinhDangTien(muaSam)} VNĐ</div>
                        </div>) : (
                            <div>Chưa có thông tin</div>
                        )}
                    </Card></SwiperSlide>
                    <SwiperSlide><Card className={'wrapper-square'}>
                        {anUong > 0 ? (<div>
                            <div>Mục chi tiêu: Ăn Uống</div>
                            <div>Tổng số tiền: {chuyenDinhDangTien(anUong)} VNĐ</div>
                        </div>) : (
                            <div>Chưa có thông tin</div>
                        )}
                    </Card></SwiperSlide>
                    <SwiperSlide><Card className={'wrapper-square'}>
                        {giaiTri > 0 ? (<div>
                            <div>Mục chi tiêu: Giải trí</div>
                            <div>Tổng số tiền: {chuyenDinhDangTien(giaiTri)} VNĐ</div>
                        </div>) : (
                            <div>Chưa có thông tin</div>
                        )}
                    </Card></SwiperSlide>
                    <SwiperSlide><Card className={'wrapper-square'}>
                        {khac > 0 ? (<div>
                            <div>Mục chi tiêu: Khác</div>
                            <div>Tổng số tiền: {chuyenDinhDangTien(khac)} VNĐ</div>
                        </div>) : (
                            <div>Chưa có thông tin</div>
                        )}
                    </Card></SwiperSlide>
                </Swiper>
            </div>
        </>
    );
}

export default Hang_muc_chi_tieu;