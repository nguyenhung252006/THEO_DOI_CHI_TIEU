import classNames from "classnames/bind";
import style from './TextProfile.module.scss'



const cx = classNames.bind(style)
function TextProfile({name, email, soDu, daSuDung}) {
    return ( 
        <div className={cx('wrapper')}>
            <h1 className={cx('text-name')}>Nguyen Van A</h1>   {/* ten */}
            <div className={cx('wrapper-info')}>
                <p className={cx('text-email')}>Email: nguyenvana@gmail.com</p>
                <p className={cx('text-sodu')}>Số dư: 100000</p>
                <p className={cx('text-dasudung')}>Đã sử dụng: 100000</p>
            </div>
        </div>
     );
}

export default TextProfile;