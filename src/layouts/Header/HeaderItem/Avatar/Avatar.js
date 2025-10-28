import classNames from "classnames/bind";
import style from '../../Header.scss'

const cx = classNames.bind(style)


function Avatar({ className, icon, name , img, ...props }) {
    return (
        <div className={className} {...props}>
            <div className={cx('avatar-wrapper')}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjSDv8kR5UWOwlBUUxhvg3jYfdY9ugiHfYSg&s" alt="avatar" className={cx('avatar-img')}></img>
                <span className={cx('avatar-name')}>{name}</span>
            </div>
        </div>
    );
}

export default Avatar;