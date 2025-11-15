import { useState } from "react";
import { useLocation } from "react-router-dom";

//import css
import classNames from "classnames/bind";
import style from "./MenuItems.module.scss";

//import component
import Button from "../Button/Button";


// import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";


const cx = classNames.bind(style)
function MenuItem({ item }) {

    const [open, setOpen] = useState(false)

    // check co dang o component do khong
    const location = useLocation()
    const isActive = location.pathname === item.path;

    const handleOpen = () => {
        if (item.children) {
            setOpen((prev) => !prev)
        }
    }


    return (
        <div>
            <div className={cx('menu-items')}>
                {<Button
                    onClick={handleOpen}
                    to={item.path}
                >
                    <FontAwesomeIcon icon={item.icon}
                        className={cx({ active: isActive })}
                    />
                    {item.title}
                    {item.children && (
                        <span>
                            <FontAwesomeIcon className={cx('close', { rotate: open })}
                                icon={faCaretDown}
                            />
                        </span>
                    )}

                </Button>}
            </div>

            <div className={cx('menu-more-items', { open })}>
                {open && item.children && item.children?.map((items, index) => {
                    return (<Button key={index} to={items.path}><FontAwesomeIcon className={cx({ active: isActive })} icon={item.icon} />{items.title}</Button>)
                })}
            </div>
        </div>
    );
}

export default MenuItem;