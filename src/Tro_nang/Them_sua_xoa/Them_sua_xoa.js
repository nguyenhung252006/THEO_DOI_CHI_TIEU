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
//import state
import { useState, useEffect, useRef } from "react";

const cx = classNames.bind(style)
function Them_sua_xoa({ id, loaiChiTieu, onReload, onClose }) {

    const [value1, setValue1] = useState(null)
    const [value2, setValue2] = useState(null)

    //state check out side 
    const wrapperRef = useRef(null);

    //DELETE data 
    const DeleteData = async () => {
        try {
            await axios.delete(`${API_ENDPOINTS.CHITIEU}/${id}`, { withCredentials: true })
            if (onReload) onReload();
            if (onClose) onClose();
        } catch (err) {
            console.error(err)
        }
    }

    //PUT data
    const PutData = async (dataPut) => {
        try {
            await axios.put(`${API_ENDPOINTS.CHITIEU}/${id}`, dataPut, { withCredentials: true })

            if (onReload) { onReload() }
        } catch (err) {
            console.error(err)
        }
    }


    //lay data
    const GetData = async () => {
        try {
            const res = await axios.get(API_ENDPOINTS.USERS, { withCredentials: true })
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

    //handle PUT API
    const handleSubmit = () => {
        const soTienPut = value1.toString().replace(/\./g, '')

        const dataPut = {
            loaiChiTieu: loaiChiTieu,
            soTien: Number(soTienPut),
            ghiChu: value2,
        }
        PutData(dataPut)
        onClose()
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
            <div className={cx('wrapper')} ref={wrapperRef}>
                <p>*Nhấn ra ngoài để thoát</p>
                <h1>Lựa chọn-tùy chỉnh </h1>
                <div className={cx('wrapper-input')}>
                    <div className={cx('input-content')}>
                        <label>Sửa số tiền: </label>
                        <input
                            value={chuyenDinhDangTien(value1)}
                            onChange={(e) => { handleChangeValue1(e) }}
                        ></input>
                        <label>Sửa ghi chú:</label>
                        <input
                            value={value2}
                            onChange={(e) => { handleChangeValue2(e) }}
                        ></input>
                        <button
                            onClick={handleSubmit}
                        >Xác Nhận</button>
                    </div>
                    <div>
                        <button
                            onClick={() => { DeleteData() }}
                        >Xóa khoản chi <FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Them_sua_xoa;