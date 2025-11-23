import classNames from "classnames/bind";
import style from './Text_chi_tieu.module.scss'

//import component
import Card from "../Card/Card";
import { Loc } from "../../alert";


// import ho tro  
import chuyenDinhDangTien from "../../ho_tro/chuyen_dinh_dang_tien";

//import hook
import { useState } from "react";

//import icon 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilterCircleDollar } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style)
function Text_chi_tieu({ tenMuc, daSuDung, PhanTramDaSuDung, lichSu, nhapLieu, notKhac, isKhac = false,
    onChangeSoTien, onChangeGhiChu, onChangeKhac, onChangeNgayTao, onSubmit, valueSoTien, valueGhiChu, valueKhac, valueNgayTao, loaiChiTieu
}) {

    //checkFilter
    const [isFilter, setIsFilter] = useState(false)

    //handel check active filter
    const handleFilter = () => {
        setIsFilter(true)
    }

    return (
        <>
            <div className={cx('filter-icon')}>
                <div>
                    <FontAwesomeIcon className="icon-filter" onClick={() => { handleFilter() }} icon={faFilterCircleDollar} />
                </div>
            </div>
            {isFilter && (
                <div className={cx('bang-loc')}>
                    <Loc loaiChiTieu={loaiChiTieu} onClose={() => setIsFilter(false)} />
                </div>
            )}
            <div className={cx('wrapper-page')}>
                <div>
                    <Card className={'wrapper-content'}>
                        <div className={cx('wrapper')}>
                            <h1 className={cx('name-page')}>{tenMuc}</h1>
                            <div className={cx('content')}>
                                {daSuDung !== 0 ? (
                                    <p>Đã sử dụng: <span className={cx('use')}>{chuyenDinhDangTien(daSuDung)} VNĐ</span></p>
                                ) : (
                                    <p>Đã sử dụng: <span className={cx('use')}>0 VNĐ</span></p>
                                )}
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
                                        <label htmlFor="so-tien"> Nhập số tiền: </label>
                                        <input className={cx('input-layout')} id="so-tien"
                                            onChange={onChangeSoTien}
                                            value={valueSoTien}
                                            required
                                        ></input>
                                        {notKhac && <>
                                            <label htmlFor="ghi-chu"> {nhapLieu}: </label>
                                            <input className={cx('input-layout')} id="ghi-chu"
                                                onChange={onChangeGhiChu}
                                                value={valueGhiChu}
                                            ></input>
                                        </>}
                                        {isKhac && (
                                            <>
                                                <label htmlFor="ten-khoan-chi"> Tên khoản chi: </label>
                                                <input className={cx('input-layout')}
                                                    value={valueKhac}
                                                    id="ten-khoan-chi"
                                                    onChange={onChangeKhac}
                                                ></input>
                                            </>
                                        )}
                                        <label htmlFor="ngay-tao"> Ngày Tạo: </label>
                                        <input className={cx('input-layout')} id="ngay-tao"
                                            placeholder="dd/mm/yyyy"
                                            type="date"
                                            onChange={onChangeNgayTao}
                                            value={valueNgayTao}
                                        ></input>
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
                    <div className={cx('thong-bao')}>
                        {lichSu}
                    </div>
                </Card >
            </div >
        </>
    );
}

export default Text_chi_tieu;