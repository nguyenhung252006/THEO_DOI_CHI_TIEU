import classNames from "classnames/bind";
import style from './Muc_chi_tieu_an_uong.module.scss'

// import component
import ContentChiTieu from "../../../cong_cu/Text_chi_tieu/Text_chi_tieu";

const cx = classNames.bind(style)
function Muc_chi_tieu_an_uong({ }) {
    return (
        <div className={cx('wrapper')}>
            {<ContentChiTieu
                nhapLieu={'Ghi chú ( nếu có )'}
                tenMuc={'Ăn uống'}
                daSuDung={'10000'}
                PhanTramDaSuDung={'10'}
            />}
        </div>
    );
}

export default Muc_chi_tieu_an_uong;