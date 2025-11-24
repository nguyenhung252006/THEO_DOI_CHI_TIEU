import classNames from "classnames/bind";
import style from './TextProfile.module.scss'

// import ho tro

const cx = classNames.bind(style)
function TextProfile({ name, email, soDu, sdt, daSuDung, id }) {
    return (
        <>
            <div className={cx('wrapper')}>
                <h1 className={cx('text-name')}>{name}</h1>   {/* ten */}
                <div className={cx('wrapper-info')}>

                    {id &&
                        <>
                            <p className={cx('text-id')}>ID: {id}</p>
                        </>
                    }
                    {email &&
                        <>
                            <p className={cx('text-email')}>Email: {email}</p>
                        </>
                    }
                    {sdt &&
                        <>
                            <p className={cx('text-sdt')}>Số điện thoại: {sdt}</p>
                        </>
                    }
                </div>
            </div>
        </>
    );
}

export default TextProfile;