import classNames from "classnames/bind";
import style from './Header.module.scss'

//import Items
import { Avatar } from "./HeaderItem";

const cx = classNames.bind(style)

function Header({}) {
    return ( 
        <div className={cx('wrapper')}>
            <Avatar name="Nguyen Van A" className={cx('avatar')}/>
        </div>
     );
}

export default Header;