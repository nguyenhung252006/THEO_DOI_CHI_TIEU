import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./Button.module.scss";

const cx = classNames.bind(style);

function Button({ children, to, onClick, className }) {
    return (
        <Link to={to}>
                <button onClick={onClick} className={cx("btn", className)}>
                    {children}
                </button>
        </Link>
    );
}

export default Button;
