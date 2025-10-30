import classNames from "classnames/bind";
import style from './Thong_tin.module.scss'

//import cong_cu
import Card from "../../cong_cu/Card/Card";
import { TextProfile } from "../../cong_cu";
import BieuDo from '../../cong_cu/Bieu_do_cot/Bieu_do_cot';
import ThongBaoTinhTrang from "../../cong_cu/Thong_bao_tinh_trang/Thong_bao_tinh_trang";


const cx = classNames.bind(style)
function Thong_tin() {
    var list = Array.from({ length: 15 }, (_, i) => `Thông báo số dư #${i + 1}: Số dư hiện tại là ${1000 + i * 500} VNĐ`);
    var item = list.map(item =>  {return (
        <p>{item}</p>
    )})
    return (
        <>
            <div className={cx('wrapper')}>

                <Card className={'wrapper-content'}>
                    <TextProfile
                        name={'Nguyen Van A'}
                        email={'Nguyen Van A'}
                    />
                </Card>


                <Card className={'wrapper-content-items-center'}>
                    <TextProfile
                        id={'100'}
                        sdt={'0123456789'}
                        email={'nguyenvana@gmail.com'}
                        soDu={'1000'}
                        daSuDung={'11000'}
                    />
                </Card>

                <div>
                    <Card className={'wrapper-content'}>
                        <BieuDo />
                    </Card>
                </div>
            </div>
            <div className={cx('wrapper')} >
                <Card className={'wrapper-content'}>
                    <ThongBaoTinhTrang className={'good'} sodu={'1000'} daSuDung={'11000'}
                        dauRa={item}
                        dauVao={item}
                    />
                   
                </Card>
            </div>
        </>

    );
}

export default Thong_tin;