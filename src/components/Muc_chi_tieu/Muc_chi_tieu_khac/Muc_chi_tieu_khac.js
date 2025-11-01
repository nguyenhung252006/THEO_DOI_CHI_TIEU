import classNames from "classnames/bind";
import style from './Muc_chi_tieu_khac.module.scss'

//import component
import ContentChiTieu from "../../../cong_cu/Text_chi_tieu/Text_chi_tieu";

const cx = classNames.bind(style)
function Muc_chi_tieu_khac({}) {
    return ( 
        <div className={cx('wrapper')}>
            {<ContentChiTieu
                nhapLieu={'Ghi chú ( nếu có )'}
                tenMuc={'Khác'}
                daSuDung={'10000'}
                PhanTramDaSuDung={'10'}
                daThem={'1000'}
                ghiChu={'helo kiti'}
            />}
        </div>
     );
}

export default Muc_chi_tieu_khac;