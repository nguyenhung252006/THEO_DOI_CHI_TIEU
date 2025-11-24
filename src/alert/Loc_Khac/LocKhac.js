import classNames from "classnames/bind";
import style from './Loc.module.scss'

//import hook
import { useState, useEffect, useRef } from "react";

//import component
import LocChiTieuTheoNgay from "../../Component_chung/LocChiTieuKhac/LocChiTieuTheoNgay";
import LocChiTieuTheoNam from "../../Component_chung/LocChiTieuKhac/LocChiTieuTheoNam";
import LocChiTieuTheoMin from "../../Component_chung/LocChiTieuKhac/LocChiTieuTheoMin";
import LocChiTieuTheoMax from "../../Component_chung/LocChiTieuKhac/LocChiTieuTheoMax";
import LocChiTieuTheoGhiChu from "../../Component_chung/LocChiTieuKhac/LocChiTieuTheoGhiChu";

//import ho tro
import chuyenNgay from "../../ho_tro/chuyen_ngay";
import chuyenDinhDangTien from "../../ho_tro/chuyen_dinh_dang_tien";

//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faAngleLeft } from "@fortawesome/free-solid-svg-icons";


const cx = classNames.bind(style)
function Loc({ onClose, loaiChiTieu }) {

    //state check out side 
    const wrapperRef = useRef(null);

    //sate luu gia tri
    const [day, setDay] = useState("")
    const [year, setYear] = useState("")
    const [moneyMin, setMoneyMin] = useState("")
    const [moneyMax, setMoneyMax] = useState("")
    const [ghiChu, setGhiChu] = useState("")

    //state check hoat dong
    const [isInputDay, setIsInputDay] = useState(false)
    const [isInputYear, setIsInputYear] = useState(false)
    const [isInputMoneyMin, setInputMoneyMin] = useState(false)
    const [isInputMoneyMax, setInputMoneyMax] = useState(false)
    const [isGhiChu, setIsGhiChu] = useState(false)

    //state check selecvt
    const [isSelect, setIsSelect] = useState(true)

    //state check out
    const [isClose, setIsClose] = useState(false)

    //handle back
    const handleBack = () => {
        setInputMoneyMax(false)
        setIsInputYear(false)
        setIsInputDay(false)
        setInputMoneyMin(false)
        setIsGhiChu(false)
        setIsSelect(true)
        setIsClose(true)
        setDay("")
        setYear('')
        setMoneyMin('')
        setMoneyMax('')
        setGhiChu('')
    }

    //handle check active
    const handleDay = () => {
        setIsSelect(false)
        setIsInputDay(true)
        setIsClose(false)
    }

    const handleYear = () => {
        setIsSelect(false)
        setIsInputYear(true)
        setIsClose(false)
    }

    const handleMoneyMax = () => {
        setIsSelect(false)
        setInputMoneyMax(true)
    }

    const handleMoneyMin = () => {
        setIsSelect(false)
        setInputMoneyMin(true)
        setIsClose(false)
    }

    const handleGhiChu = () => {
        setIsSelect(false)
        setIsGhiChu(true)
        setIsClose(false)
    }

    //handle change value
    const handleChangeDay = (e) => {
        const value = e.target.value
        setDay(chuyenNgay(value))
    }
    const handleChangeYear = (e) => {
        const value = e.target.value
        setYear(value)
    }
    const handleChangeMoneyMin = (e) => {
        const value = e.target.value
        setMoneyMin(value)
    }
    const handleChangeMoneyMax = (e) => {
        const value = e.target.value
        setMoneyMax(value)
    }
    const handleChangeGhiChu = (e) => {
        const value = e.target.value
        setGhiChu(value)
    }

    // xu li out side
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                if (onClose) onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <>
            <div className={cx('wrapper')} ref={wrapperRef}>
                {isSelect && <div className={cx('wrapper-select')}>
                    <p onClick={() => { handleDay() }}>Theo ngày</p>
                    <p onClick={() => { handleYear() }}>Theo năm</p>
                    <p onClick={() => { handleMoneyMax() }}>Số tiền lớn nhất</p>
                    <p onClick={() => { handleMoneyMin() }}>Số tiền bé nhất</p>
                    <p onClick={() => { handleGhiChu() }}>Tên khoản chi</p>
                </div>}
                <div className={cx('wrapper-input')}>
                    {(isInputDay || isInputYear || isInputMoneyMax || isInputMoneyMin || isGhiChu) &&
                        (<FontAwesomeIcon onClick={() => { handleBack() }} className={cx('icon-back')} icon={faAngleLeft} />)}
                    {isInputDay && <>
                        <label>Ngày/ tháng/ năm</label>
                        <input onChange={(e) => { handleChangeDay(e) }} value={day} type="date"></input>
                    </>}
                    {isInputYear && <>
                        <label>Năm</label>
                        <input onChange={(e) => { handleChangeYear(e) }} value={year}></input>
                    </>}
                    {isInputMoneyMax && <>
                        <label>Số tiền lớn nhất</label>
                        <input onChange={(e) => { handleChangeMoneyMax(e) }} value={chuyenDinhDangTien(moneyMax)}></input>
                    </>}
                    {isInputMoneyMin && <>
                        <label>Số tiền bé nhất</label>
                        <input onChange={(e) => { handleChangeMoneyMin(e) }} value={chuyenDinhDangTien(moneyMin)}></input>
                    </>}
                    {isGhiChu && <>
                        <label>Tên khoản chi</label>
                        <input onChange={(e) => { handleChangeGhiChu(e) }} value={ghiChu}></input>
                    </>}
                </div>
            </div>
            <div className={cx('loc-chi-tieu')}>
                <LocChiTieuTheoNgay isCLose={isClose} loaiChiTieu={loaiChiTieu} ngayTao={day} />
            </div>
            <div className={cx('loc-chi-tieu')}>
                <LocChiTieuTheoNam isCLose={isClose} loaiChiTieu={loaiChiTieu} year={year} />
            </div>
            <div className={cx('loc-chi-tieu')}>
                <LocChiTieuTheoMin isCLose={isClose} loaiChiTieu={loaiChiTieu} Min={moneyMin} />
            </div>
            <div className={cx('loc-chi-tieu')}>
                <LocChiTieuTheoMax isCLose={isClose} loaiChiTieu={loaiChiTieu} Max={moneyMax} />
            </div>
            <div className={cx('loc-chi-tieu')}>
                <LocChiTieuTheoGhiChu isCLose={isClose} loaiChiTieu={loaiChiTieu} GhiChu={ghiChu} />
            </div>
        </>
    );
}

export default Loc;