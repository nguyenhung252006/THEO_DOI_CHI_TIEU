import classNames from "classnames/bind";
import style from './Muc_chi_tieu_mua_sam.module.scss'

// import component
import ContentChiTieu from "../../../cong_cu/Text_chi_tieu/Text_chi_tieu";

const cx = classNames.bind(style)
function Muc_chi_tieu_mua_sam({ children }) {
    var list = Array.from({ length: 100 }, (_, i) => `Thông báo số dư #${i + 1}: Số dư hiện tại là ${1000 + i * 500} VNĐ`);
    var item = list.map(item => {
        return (
            <p>{item}</p>
        )
    })
    return (
        <div className={cx('wrapper')}>
            {<ContentChiTieu
                nhapLieu={'Ghi chú ( nếu có )'}
                tenMuc={'Mua Sắm'}
                daSuDung={'10000'}
                PhanTramDaSuDung={'10'}
                daThem={'1000'}
                ghiChu={'helo kiti'}
            />}
        </div>
    );
}

export default Muc_chi_tieu_mua_sam;