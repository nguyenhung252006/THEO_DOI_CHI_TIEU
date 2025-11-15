import classNames from "classnames/bind";
import style from '../../Header.module.scss'

//import component
import { Dang_xuat as DangXuat } from "../../../../components";

//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSackDollar } from "@fortawesome/free-solid-svg-icons";

//import hook
import { useState, useRef, useEffect } from "react";

//import router
import { useNavigate, Route, Router, Routes } from "react-router-dom";

const cx = classNames.bind(style)


function Avatar({ className, icon, name, img, ...props }) {

    const navigate = useNavigate()

    //check click
    const [isClick, setIsClick] = useState(false)

    // outside cua dang xuat
    const wrapperRef = useRef(null);

    //outside function
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsClick(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    // handle function
    const handleIsClick = () => {
        setIsClick(!isClick)
    }

    const handleLogin = () => {
        localStorage.removeItem('id')
        navigate('/login')
    }

    const handleProfile = () => {
        navigate('/Thong_tin')
    }


    return (
        <div className={className} ref={wrapperRef} {...props}>
            <div>
                <span><FontAwesomeIcon icon={faSackDollar} />SaVeMoNeY</span>
            </div>
            <div className={cx('avatar-wrapper')}>
                <div className={cx('content-avatar')}>
                    <div className={cx('wrapper-logo')}>
                        <span
                            onClick={() => { handleIsClick() }}
                            className={cx('avatar-name')}>  <FontAwesomeIcon icon={faUser} />
                            {name} {isClick && <DangXuat onProfile={() => { handleProfile() }} onLogin={() => { handleLogin() }} className={cx('dang-xuat-layout')} />}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Avatar;