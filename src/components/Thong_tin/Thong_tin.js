import classNames from "classnames/bind";
import style from './Thong_tin.module.scss'

//import cong_cu
import Card from "../../cong_cu/Card/Card";
import { TextProfile } from "../../cong_cu";


const cx = classNames.bind(style)
function Thong_tin() {
    return ( 
        <div className={cx('wrapper')}>
            <Card className={'wrapper-content'}>
                <TextProfile/>
            </Card>
        </div>
     );
}

export default Thong_tin;