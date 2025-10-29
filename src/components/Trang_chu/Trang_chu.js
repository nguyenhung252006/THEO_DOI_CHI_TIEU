import Card from "../../cong_cu/Card/Card";

import classNames from "classnames/bind";
import style from './Trang_chu.module.scss'


const cx = classNames.bind(style)
function Trang_chu() {
    return ( 
        <>
            <div className={cx('wrapper')}>
                <Card className={'wrapper-small'}>
                    <h1>Gioi thieu</h1>
                </Card>
                <Card className={'wrapper-small-long'}>
                    <h1>Content</h1>
                </Card>
            </div>
            <div className={cx('wrapper')}>
                <Card className={'wrapper-content'}>
                    <Card className={'wrapper-small'}>

                    </Card>
                    <Card className={'wrapper-small'}>

                    </Card>
                </Card>
            </div>
        </>
     );
}

export default Trang_chu;