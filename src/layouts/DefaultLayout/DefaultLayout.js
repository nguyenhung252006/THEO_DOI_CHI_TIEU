 import classNames from "classnames/bind";
import style from './DefaultLayout.module.scss'

//import component
import Header from "../Header/Header";
import SideBar from "../Sidebar/Sidebar";


const cx = classNames.bind(style)
function DefaultLayout({children}) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <SideBar className={cx('sidebar')}/>
                <div className={cx('content')}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;