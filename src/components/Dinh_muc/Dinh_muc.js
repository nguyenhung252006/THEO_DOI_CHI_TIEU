import classNames from "classnames/bind";
import style from './Dinh_muc.module.scss'

//import component
import Card from "../../cong_cu/Card/Card";

const cx = classNames.bind(style)
function Dinh_muc() {
    return (
        <>
            <h1 className={cx('wrapper-text-content')}>Định mức chi tiêu</h1>
            <div className={cx('wrapper')}>
                <Card className={'wrapper-content-dinh-muc'}>
                    <div className={cx('content')}>
                        <div className={cx('wrapper-input')}>
                            <label htmlFor="dinh-muc">Định mức đề ra: </label>
                            <input id="dinh-muc"></input>
                            <label>Số ngày thực hiện:</label>
                            <input></input>
                            <button className={cx('btn')}>Xác Nhận</button>
                        </div>
                        <div className={cx('thong-bao')}>
                            <h1>gợi ý và cảnh báo</h1>
                            <div className={cx('content-warning')}>
                                <Card className={'wrapper-content'}>
                                    <div className={cx('text-content')}>
                                        <h3>Gợi ý</h3>
                                        <div className={cx('text-content')}>
                                            <p style={{color : "green" , fontWeight: "600"}}>bạn nên sử dụng 100 VNĐ mỗi ngày</p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className={'wrapper-content'}>
                                    <div className={cx('text-content')}>
                                        <h3>Cảnh báo</h3>
                                        <div className={cx('text-content')}>
                                            <p style={{color : "red" , fontWeight: "600"}}>bạn nên sử dụng 100 VNĐ mỗi ngày</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
}

export default Dinh_muc;