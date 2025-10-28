import { useState } from "react";

//import css
import classNames from "classnames/bind";
import style from "./MenuItems.scss";

//import component
import Button from "../Button/Button";


const cx = classNames.bind(style)
function MenuItem({ item }) {

    const [open, setOpen] = useState(false)

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
                    {item.title}
                    {item.children && (<span>...</span>)}
                </Button>}
            </div>

            <div className={cx('menu-more-items', {open})}>
                {open && item.children && item.children?.map((items, index) => {
                    return (<Button key={index} to={items.path}>{items.title}</Button>)
                })}
            </div>
        </div>
    );
}

export default MenuItem;