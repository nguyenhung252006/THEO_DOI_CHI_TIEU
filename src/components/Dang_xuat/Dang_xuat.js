//import scss
import classNames from "classnames/bind";
import style from './Dang_xuat.module.scss'

//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faAddressCard } from "@fortawesome/free-solid-svg-icons";



const cx = classNames.bind(style)
function Dang_xuat({className, onLogin, onProfile}) {
    return ( 
        <div className={className}>
            <div className={cx('wrapper')}>
                <div className={cx('select')}> 
                    <span onClick={onProfile}><FontAwesomeIcon icon={faAddressCard}/> Thông tin</span>
                    <span onClick={onLogin} className={cx('login')}><FontAwesomeIcon icon={faRightToBracket}/> Đăng xuất</span>
                </div>
            </div>
        </div>
     );
}

export default Dang_xuat;