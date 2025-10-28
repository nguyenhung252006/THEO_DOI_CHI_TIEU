import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import style from "./Loading.scss";

const cx = classNames.bind(style)
function Loading() {
    return ( 
        <div className={cx('wrapper-loading')}>
            <FontAwesomeIcon icon={faSpinner}/>
        </div>
     );
}

export default Loading;