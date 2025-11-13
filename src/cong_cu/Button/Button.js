import { Link } from "react-router-dom";

//
import classNames from "classnames/bind";
import style from './Button.scss'


const cx = classNames.bind(style)
function Button({ children, to, key, onClick, className }) {
    return (
        <Link to={to}>
            <button onClick={onClick} key={key} className={cx('btn')}>{children}</button>
        </Link>
    );
}

export default Button;