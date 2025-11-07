import classNames from "classnames/bind";
import style from './Text_chi_tieu.module.scss'

//import component
import Card from "../Card/Card";

// import ho tro  
import chuyenDinhDangTien from "../../ho_tro/chuyen_dinh_dang_tien";

const cx = classNames.bind(style)
function Text_chi_tieu({ tenMuc, daSuDung, PhanTramDaSuDung, lichSu, nhapLieu, isKhac = false,
    onChangeSoTien, onChangeGhiChu, onSubmit, valueSoTien, valueGhiChu
}) {
    return (
        <>
            <div className={cx('wrapper-page')}>
                <div>
                    <Card className={'wrapper-content'}>
                        <div className={cx('wrapper')}>
                            <h1 className={cx('name-page')}>{tenMuc}</h1>
                            <div className={cx('content')}>
                                <p>Đã sử dụng: <span className={cx('use')}>{chuyenDinhDangTien(daSuDung)} VNĐ</span></p>
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
                                        <input id="so-tien"
                                            onChange={onChangeSoTien}
                                            value={valueSoTien}
                                            required
                                        ></input>
                                        <label htmlFor="ghi-chu"> {nhapLieu}: </label>
                                        <input id="ghi-chu"
                                            onChange={onChangeGhiChu}
                                            value={valueGhiChu}
                                        ></input>
                                        {isKhac && (
                                            <>
                                                <label htmlFor="ten-khoan-chi"> Tên khoản chi: </label>
                                                <input id="ten-khoan-chi"></input>
                                            </>
                                        )}
                                        <button className={cx('btn-submit')}
                                            onClick={onSubmit}
                                        >Xác Nhận</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <Card className={'wrapper-content'}>
                    <div className={cx('wrapper-history')}>
                        <h1 style={{
                            'margin': '12px 12px',
                            'fontWeight': '600',
                        }}>Lịch sử đã thêm</h1>
                        <div
                            style={{
                                margin: '12px 12px',
                                fontWeight: 600,
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                            }}
                        >
                            <div
                                style={{
                                    minWidth: '400px',
                                    maxWidth: '100%',
                                    color: 'green',
                                    minHeight: '100px',
                                    maxHeight: '400px',
                                    overflowY: 'auto',
                                    border: '1px solid wheat',
                                    borderRadius: '10px',
                                    padding: '12px 12px',
                                    boxShadow: '0 0 12px rgb(253, 247, 247)',
                                }}
                            >
                                {lichSu}
                            </div>
                        </div>
                    </div>
                </Card >
            </div >
        </>
    );
}

export default Text_chi_tieu;