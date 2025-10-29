import classNames from "classnames/bind";
import style from './Card.module.scss'

const cx = classNames.bind(style)
function Card({children, className}) {
    return ( 
        <div className={cx(className)}>
            {children}
        </div>
     );
}

export default Card;