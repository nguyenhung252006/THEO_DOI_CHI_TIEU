import classNames from "classnames/bind";
import style from './Xac_nhan.module.scss'

//import ho tro
import chuyenDinhDangTien from "../../ho_tro/chuyen_dinh_dang_tien";

const cx = classNames.bind(style)
function Xac_nhan({ soTien, ghiChu, Submit, notSubmit, chiTieu, dinhMuc, khac }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <span>Bạn có muốn thay đổi</span>
                <div className={cx('text-content')}>
                    <div className={cx('tien')}>
                        <span className={cx('key')}>Số tiền : <span className={cx('value')}>{chuyenDinhDangTien(soTien)}</span></span>
                    </div>
                    {chiTieu && <div className={cx('ghi-chu')}>
                        <span className={cx('key')} >Ghi chú : <span className={cx('value')}>{ghiChu}</span> </span>
                    </div>}
                    {dinhMuc && <div className={cx('ghi-chu')}>
                        <span className={cx('key')} >Số Ngày : <span className={cx('value')}>{ghiChu}</span> </span>
                    </div>}
                    {khac && <div className={cx('ghi-chu')}>
                        <span className={cx('key')} >Tên Khoản Chi: <span className={cx('value')}>{ghiChu}</span> </span>
                    </div>}
                    <div className={cx('submit-wrapper')}>
                        <button onClick={notSubmit} className={cx('un-submit')}>Hủy Bỏ</button>
                        <button onClick={Submit} className={cx('submit')}>Xác Nhận</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Xac_nhan;