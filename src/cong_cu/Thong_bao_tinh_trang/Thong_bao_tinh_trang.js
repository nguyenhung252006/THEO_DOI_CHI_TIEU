import classNames from "classnames/bind";
import style from './Thong_bao_tinh_trang.module.scss'



const cx = classNames.bind(style)
function Thong_bao_tinh_trang({ sodu, daSuDung, className, dauRa, dauVao, dateVao, dateRa }) {
    return (
        <div className={cx('wrapper')}>
            <h1 style={{ 'margin': '12px' }}>Thông tin</h1>
            <div className={cx('wrapper-content')}>
                <>
                    {sodu !== 0 ? (
                        <p>Số dư: <span className={cx(className)}>{sodu} VNĐ</span></p>
                    ) : (
                        <>
                            <p>Số dư: <span className={cx(className)}>{sodu} VNĐ</span></p>
                        </>
                    )}
                </>
                <>
                    {daSuDung && (
                        <p>Đã sử dụng: <span className={cx(className)}>{daSuDung} VNĐ</span></p>
                    )}
                </>
            </div>
            <div className={cx('wrapper-content-bien-dong')}>
                <div className={cx('margin-content')}>
                    <h1 className={cx('good')}>Biến động đầu vào</h1>
                    <div className={cx('wrapper-content')}>
                        {dauVao && dauVao.length > 0 ? (
                            <>{dauVao}</>
                        ) : (
                            <p className={cx('none')}>Không có biến động gần đây</p>
                        )}
                    </div>

                </div>
                <div className={cx('margin-content')}>
                    <h1 className={cx('primary')}>Biến động đầu ra</h1>
                    <div className={cx('wrapper-content')}>
                        {dauRa && dauRa.length > 0 ? (
                            <>{dauRa}</>
                        ) : (
                            <p className={cx('none')}>Không có biến động gần đây</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Thong_bao_tinh_trang;