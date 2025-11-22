//import style
import classNames from "classnames/bind";
import style from './Them_sua_xoa_khac.module.scss'

//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

//import API
import { API_BASE_URL, API_ENDPOINTS } from '../../config.js'

//import ho tro 
import chuyenDinhDangTien from "../../ho_tro/chuyen_dinh_dang_tien";
import chuyenNgay from "../../ho_tro/chuyen_ngay";


//import component
import { Thanh_cong as ThanhCong, Xac_nhan as XacNhan, Xac_nhan_xoa as XacNhanXoa } from "../../alert";


//import axios
import axios from "axios";
//import state
import { useState, useEffect, useRef } from "react";


const cx = classNames.bind(style)
function Them_sua_xoa({ id, onReload, onClose }) {

    //lay id nguoi dung
    const UserId = localStorage.getItem('id')

    const [value1, setValue1] = useState(null)
    const [value2, setValue2] = useState(null)
    const [value3, setValue3] = useState(null)
    const [value3prev, setValue3prev] = useState(null)

    //state check out side 
    const wrapperRef = useRef(null);


    //state check hien bang theo doi
    const [isCheck, setIsCheck] = useState(false)

    //check thanh cong 
    const [isThanhCong, setIsThanhCong] = useState(false)

    // check Xoa 
    const [isDelete, setIsDelete] = useState(false)

    //DELETE data 
    const DeleteData = async () => {
        try {
            await axios.delete(`${API_ENDPOINTS.CHITIEUKHAC}/${id}`, { withCredentials: true })
            if (onReload) onReload();
            setIsThanhCong(true)
            setTimeout(() => {
                setIsThanhCong(false)
                if (onClose) onClose()
            }, 1000)
        } catch (err) {
            console.error(err)
        }
    }

    //PUT data
    const PutData = async (dataPut) => {
        try {
            await axios.put(`${API_ENDPOINTS.CHITIEUKHAC}/${id}`, dataPut, { withCredentials: true })

            setIsThanhCong(true)
            if (onReload) onReload()
        } catch (err) {
            console.error(err)
        }
    }


    //lay data
    const GetData = async () => {
        try {
            const res = await axios.get(`${API_ENDPOINTS.USERS}/${UserId}`, { withCredentials: true })
            const data = res.data.chi_tieu_khac

            // //lay du lieu cho input
            const inputData = data.filter(item => item.id === id)

            // //set value1 la so tien, value2 la ghi chu 

            setValue1(inputData[0].soTien)
            setValue2(inputData[0].tenKhoan)
            setValue3(inputData[0].ngayTao)
            setValue3prev(inputData[0].ngayTao)
            // check
            console.log(inputData)
        } catch (err) {
            console.error(err)
        }
    }

    //handle xu li
    const handleChangeValue1 = (e) => {
        const value = e.target.value
        setValue1(value)
    }

    const handleChangeValue2 = (e) => {
        const value = e.target.value
        setValue2(value)
    }

    const handleChangeValue3 = (e) => {
        const value = e.target.value
        if (!value) {
            setValue3(value3prev)
        }
        else {
            setValue3(value)
        }
    }

    //handle PUT API
    const handleSubmit = () => {
        const soTienPut = value1.toString().replace(/\./g, '')

        const dataPut = {
            soTien: Number(soTienPut),
            tenKhoan: value2,
            ngayTao: chuyenNgay(value3)
        }
        PutData(dataPut)
        setIsThanhCong(true)
        setTimeout(() => {
            setIsThanhCong(false)
            if (onClose) onClose()
        }, 1000)
    }

    //handle hien thi bang xac nhan
    const handleIsCheck = () => {
        setIsCheck(true)
    }

    const handleNotIsCheck = () => {
        setIsCheck(false)
    }

    //handle hien thi bang Xoa
    const handleIsDelete = () => {
        setIsDelete(true)
    }
    const handleNotIsDelete = () => {
        setIsDelete(false)
    }

    // nhan data
    useEffect(() => {
        GetData()
    }, [])

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
            {isDelete && <XacNhanXoa
                isNotDelete={handleNotIsDelete}
                handleSubmit={DeleteData}
            />}
            {isThanhCong && <ThanhCong />}
            {isCheck && <XacNhan
                khac
                soTien={value1}
                ghiChu={value2}
                ngayTao={value3}
                notSubmit={handleNotIsCheck}
                Submit={handleSubmit} />}
            {!isCheck && !! !isDelete && <div className={cx('wrapper')} ref={wrapperRef}>
                <p>*Nhấn ra ngoài để thoát</p>
                <h1>Lựa chọn-tùy chỉnh </h1>
                <div className={cx('wrapper-input')}>
                    <div className={cx('input-content')}>
                        <label>Sửa số tiền: </label>
                        <input className={cx('input-layout')}
                            value={chuyenDinhDangTien(value1)}
                            onChange={(e) => { handleChangeValue1(e) }}
                        ></input>
                        <label>Sửa tên khoản:</label>
                        <input className={cx('input-layout')}
                            value={value2}
                            onChange={(e) => { handleChangeValue2(e) }}
                        ></input>
                        <label>Sửa Ngày tạo:</label>
                        <input type="date" className={cx('input-layout')}
                            value={value3}
                            onChange={(e) => { handleChangeValue3(e) }}
                        ></input>
                        <button
                            onClick={handleIsCheck}
                        >Xác Nhận</button>
                    </div>
                    <div>
                        <button
                            onClick={() => { handleIsDelete() }}
                        >Xóa khoản chi <FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                </div>
            </div>}
        </>
    );
}

export default Them_sua_xoa;