import classNames from "classnames/bind";
import style from './Header.module.scss'

//import Items
import { Avatar } from "./HeaderItem";

//import API_BASE_URL
import { API_BASE_URL, API_ENDPOINTS } from "../../config";

//import hook
import { useState, useEffect } from "react";

//import axios
import axios from "axios";

const cx = classNames.bind(style)

function Header({ }) {

    //state ten nguoi dung
    const [nameUser, setNameUser] = useState('')

    //lay id nguoi dung
    const UserId = localStorage.getItem('id')

    //lay data
    const GetDataUser = async () => {
        try {
            const res = await axios.get(`${API_ENDPOINTS.USERS}/${UserId}`, { withCredentials: true })
            setNameUser(res.data.nguoi_dung.hoTen)
        } catch (err) {
            console.error(`${API_ENDPOINTS.USERS}/${UserId} error : ` + err)
        }
    }

    // lay data
    useEffect(() => {
        GetDataUser()
    },[nameUser])

    return (
        <div className={cx('wrapper')}>
            <Avatar name={nameUser} className={cx('avatar')} />
        </div>
    );
}

export default Header;