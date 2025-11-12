//import style
import classNames from "classnames/bind";
import style from './Them_sua_xoa.module.scss'

//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

//import API
import { API_BASE_URL, API_ENDPOINTS } from '../../config.js'

//import ho tro 
import chuyenDinhDangTien from "../../ho_tro/chuyen_dinh_dang_tien";

//import axios
import axios from "axios";

//import component
import { Thanh_cong as ThanhCong, Xac_nhan as XacNhan, Xac_nhan_xoa as XacNhanXoa } from "../../alert";

//import state
import { useState, useEffect, useRef } from "react";

const cx = classNames.bind(style)
function Them_sua_xoa({ id, loaiChiTieu, onReload, onClose }) {

    //lay id nguoi dung 
    const UserId = localStorage.getItem('id')

    const [value1, setValue1] = useState(null)
    const [value2, setValue2] = useState(null)

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
            await axios.delete(`${API_ENDPOINTS.CHITIEU}/${id}`, { withCredentials: true })
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
            await axios.put(`${API_ENDPOINTS.CHITIEU}/${id}`, dataPut, { withCredentials: true })
            setIsThanhCong(true)
            setTimeout(() => {
                setIsThanhCong(false)
                if (onClose) onClose()
            }, 1000)
            if(onReload) onReload()
        } catch (err) {
            console.error(err)
        }
    }


    //lay data
    const GetData = async () => {
        try {
            const res = await axios.get(`${API_ENDPOINTS.USERS}/${UserId}`, { withCredentials: true })
            const data = res.data.chi_tieu

            //lay du lieu
            const filterData = data.filter(item => item.loaiChiTieu === loaiChiTieu)

            //lay du lieu cho input
            const inputData = filterData.filter(item => item.id === id)

            //set value1 la so tien, value2 la ghi chu 

            setValue1(inputData[0].soTien)
            setValue2(inputData[0].ghiChu)

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

    //handle PUT API
    const handleSubmit = () => {
        const soTienPut = value1.toString().replace(/\./g, '')

        const dataPut = {
            loaiChiTieu: loaiChiTieu,
            soTien: Number(soTienPut),
            ghiChu: value2,
        }
        PutData(dataPut)
        setIsThanhCong(true)
        setTimeout(() => {
            setIsThanhCong(false)
            if (onClose) onClose()
        }, 1000)
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

    console.log(value1)
    console.log(value2)

    return (
        <>
            {isDelete && <XacNhanXoa
                isNotDelete={handleNotIsDelete}
                handleSubmit={DeleteData}
            />}
            {isThanhCong && <ThanhCong />}
            {isCheck && <XacNhan
                chiTieu
                soTien={value1}
                ghiChu={value2}
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
                        <label>Sửa ghi chú:</label>
                        <input className={cx('input-layout')}
                            value={value2}
                            onChange={(e) => { handleChangeValue2(e) }}
                        ></input>
                        <button
                            onClick={() => { handleIsCheck() }}
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