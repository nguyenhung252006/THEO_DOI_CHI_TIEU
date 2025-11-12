import classNames from "classnames/bind";
import style from './Xac_nhan_xoa.module.scss'

//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style)
function Xac_nhan_xoa({ isNotDelete, handleSubmit }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div><FontAwesomeIcon className={cx('icon')} icon={faCircleExclamation} /></div>
                <h1>Xác Nhận Xóa</h1>
            </div>
            <div className={cx('Submit-wrapper')}>
                <button onClick={isNotDelete} className={cx('un-submit')}>Hủy</button>
                <button onClick={handleSubmit} className={cx('submit')}>Xác Nhận</button>
            </div>
        </div>
    );
}

export default Xac_nhan_xoa;