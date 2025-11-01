import classNames from "classnames/bind";
import style from './Tong_quan.module.scss'

//import component
import Card from "../../cong_cu/Card/Card";

const cx = classNames.bind(style)
function Tong_quan() {
    return ( 
        <div className={cx('wrapper')}>
            <h1>Đánh giá tổng quan</h1>
            <Card className={'wrapper-content'}>
                <div>

                </div>
            </Card>
            <br></br>
            <h1>Biểu đồ</h1>
            <div className={cx('wrapper-bieu-do')}>
                <Card className={'wrapper-content'}></Card>
                <Card className={'wrapper-content'}></Card>
            </div>
            <div className={cx('wrapper-bieu-do')}>
                <Card className={'wrapper-content'}></Card>
                <Card className={'wrapper-content'}></Card>
            </div>
        </div>
     );
}

export default Tong_quan;