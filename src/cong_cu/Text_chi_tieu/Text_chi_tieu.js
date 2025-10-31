import classNames from "classnames/bind";
import style from './Text_chi_tieu.module.scss'

//import component
import Card from "../Card/Card";

const cx = classNames.bind(style)
function Text_chi_tieu({ tenMuc, daSuDung, PhanTramDaSuDung }) {
    return (
        <>
            <Card className={'wrapper-content'}>
                <div className={cx('wrapper')}>
                    <h1 className={cx('name-page')}>{tenMuc}</h1>
                    <div className={cx('content')}>
                        <p>Đã sử dụng: <span className={cx('use')}>{daSuDung}</span></p>
                        <p>Số phần trăm đã sử dụng so với định mức (%): <span className={cx('phan-tram')}>{PhanTramDaSuDung}%</span></p>
                    </div>
                </div>
            </Card>
            <Card className={'wrapper-content'}>
                <div className={'wrapper-content'}>
                    <h1 className={cx('input-page')}>Thêm khoản chi</h1>
                    <div className={cx('content')}>
                        <div className={cx('input-submit')}>
                            <div>
                                <label htmlFor="so-tien"> nhập số tiền: </label>
                                <input id="so-tien"></input>
                                <button className={cx('btn-submit')}>Xác Nhận</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    );
}

export default Text_chi_tieu;