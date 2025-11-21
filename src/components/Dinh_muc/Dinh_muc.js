import classNames from "classnames/bind";
import style from './Dinh_muc.module.scss'

//import component
import Card from "../../cong_cu/Card/Card";
import { Them_sua_xoa_dinh_muc as ThemSuaXoa } from "../../Tro_nang";
import { Thanh_cong as ThanhCong, Xac_nhan as XacNhan } from "../../alert";

// import dowload
import { LoadingHook } from "../../hook";

//import API_BASE_URL
import { API_BASE_URL, API_ENDPOINTS } from "../../config";

//import axios
import axios from "axios";

// import Hook
import { useState, useEffect } from "react";

//import ho tro 
import chuyenDinhDangTien from "../../ho_tro/chuyen_dinh_dang_tien";
import chuyenNgay from "../../ho_tro/chuyen_ngay";

//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";


const cx = classNames.bind(style)
function Dinh_muc() {

    //lay id cua nguoi dung
    const UserId = localStorage.getItem('id')

    //state lay thong tin dinh muc
    const [lichSu, setLichSu] = useState([])

    //state tinh so tien da dung va so tien dinh muc ban dau
    const [tienDinhMuc, setTienDinhMuc] = useState([])
    const [tienDaDung, setTienDaDung] = useState([])

    //state tinh so ngay
    const [soNgay, setSoNgay] = useState([])

    // state tinh ti le so ngay va tien dinh muc
    const [tiLeChiTieu, setTiLeChiTieu] = useState([])

    // state so tien con lai
    const [tienConLai, setTienConLai] = useState([])

    //state canh bao
    const [canhBao, setCanhBao] = useState([])
    //state set goi y
    const [goiY, setGoiY] = useState([])

    //state lay id
    const [id, setId] = useState('')

    //state set chinh Them_sua_xoa
    const [isChinhSua, setIsChinhSua] = useState(false)

    //state post
    const [soTienDinhMuc, setSoTienDinhMuc] = useState([])
    const [ngayDinhMuc, setNgayDinhMuc] = useState([])

    //state check da sua va da ThemSuaXoa
    const [isPost, setisPost] = useState(false)

    //function lay id
    const handleGetId = (id) => {
        setId(id)
    }

    // function check Them_sua_xoa
    function handleCheckChinhSua() {
        setIsChinhSua(true)
    }

    //post axios
    const PostDinhMuc = async (dataPost) => {
        try {
            await axios.post(`${API_ENDPOINTS.DINHMUC}/${UserId}`, dataPost, { withCredentials: true })
            setSoTienDinhMuc('')
            setNgayDinhMuc('')
            setisPost(true)
            dataDinhMuc()
        } catch (err) {
            console.error('Error: ' + err)
        }
    }

    // function handle

    const handleChangeSoTienDinhMuc = (e) => {
        const value = e.target.value
        const soTienChuaDinhDang = value.replace(/\./g, '')
        if (isNaN(soTienChuaDinhDang)) {
            setSoTienDinhMuc('')
            return
        }
        setSoTienDinhMuc(chuyenDinhDangTien(soTienChuaDinhDang))
    }

    const handleChangeSoNgay = (e) => {
        setNgayDinhMuc(e.target.value)
    }

    const handleSubmit = () => {

        const soTienPost = soTienDinhMuc.toString().replace(/\./g, '')

        const dataPost = {
            soNgay: ngayDinhMuc,
            soTienDinhMuc: Number(soTienPost)
        }

        if (!dataPost.soNgay || dataPost.soNgay === '') return
        if (!dataPost.soTienDinhMuc || dataPost.soTienDinhMuc < 0) return

        PostDinhMuc(dataPost)
    }

    // lay data dinh muc
    const dataDinhMuc = async () => {
        try {
            const res = await axios.get(`${API_ENDPOINTS.USERS}/${UserId}`, { withCredentials: true })
            const dataDinhMuc = res.data.dinh_muc_chi_tieu
            //set lich su
            const dataLichSu = dataDinhMuc.map(item => ({
                id: item.id,
                tien: item.soTienDinhMuc,
                date: item.ngayLuu,
                soNgay: item.soNgay
            }))
            setLichSu(dataLichSu)

            //lay so tien dinh muc
            const tienDinhMuc = dataDinhMuc.map(item => Number(item.soTienDinhMuc))
            const tongTienDinhMuc = tienDinhMuc.reduce((a, b) => a + b, 0)
            setTienDinhMuc(tongTienDinhMuc)

            //lay so ngay
            const ngayDinhMuc = dataDinhMuc.map(item => Number(item.soNgay))
            const tongSoNgay = ngayDinhMuc.reduce((a, b) => a + b, 0)
            setSoNgay(tongSoNgay)

            //lay so tien da su dung

            //trong muc khac
            const dataTienDaDungChiTieuKhac = res.data.chi_tieu_khac
            const soTienDaDungKhac = dataTienDaDungChiTieuKhac.map(item => Number(item.soTien))

            //set lai isPost
            setTimeout(() => {
                setisPost(false)
            }, 1000)

            //trong chi tieu
            const dataTienDaDungChiTieu = res.data.chi_tieu
            const soTienDaDungChiTieu = dataTienDaDungChiTieu.map(item => Number(item.soTien))
            setTienDaDung([...soTienDaDungChiTieu, ...soTienDaDungKhac].reduce((a, b) => a + b, 0))


        } catch (err) {
            console.error("Error: " + err)
        }
    }
    // lay data
    useEffect(() => {
        dataDinhMuc()
    }, [])

    // set ti le
    useEffect(() => {
        setTiLeChiTieu((tienDinhMuc / soNgay).toFixed(0))
    }, [tienDinhMuc, soNgay])

    // tinh so tien con lai
    useEffect(() => {
        setTienConLai((tienDinhMuc - tienDaDung))
    }, [tienDinhMuc, tienDaDung])

    // canh bao
    useEffect(() => {
        if (tienConLai > 0) {
            setCanhBao(
                <div>
                    <span style={{ color: 'green' }}>
                        Số tiền còn lại của bạn là {chuyenDinhDangTien(Math.abs(tienConLai))} VNĐ
                    </span>
                </div>
            );
        } else if (tienConLai < 0) {
            setCanhBao(
                <div>
                    <span style={{ color: 'red' }}>
                        Bạn đã tiêu vượt định mức {chuyenDinhDangTien(Math.abs(tienConLai))} VNĐ
                    </span>
                </div>
            );
        } else {
            setCanhBao(null);
        }
    }, [tienConLai]);

    useEffect(() => {
        if (tienConLai > 0) {
            setGoiY(
                <div>
                    <span style={{ color: 'green' }}>
                        Bạn nên sử dụng {chuyenDinhDangTien(Math.abs(tienConLai))} VNĐ / Ngày
                    </span>
                </div>
            );
        } else {
            setGoiY(null);
        }
    }, [tienConLai]);


    return (
        <>
            <LoadingHook apiUrl={`${API_ENDPOINTS.USERS}/${UserId}`}>
                {(data) => {
                    console.log("API data:", data)
                }}
            </LoadingHook>
            {isPost && <ThanhCong />}
            <h1 className={cx('wrapper-text-content')}>Định mức chi tiêu</h1>
            {isChinhSua && (<ThemSuaXoa
                loaiChiTieu="MUA_SAM"
                id={id}
                onReload={dataDinhMuc}
                onClose={() => setIsChinhSua(false)}
            />)}
            <div className={cx('wrapper')}>
                
                <Card className={'wrapper-content-dinh-muc'}>
                    <div className={cx('content')}>
                        <div className={cx('wrapper-input')}>
                            <label htmlFor="dinh-muc">Thêm định mức: </label>
                            <input className={cx('input-layout')} id="dinh-muc"
                                onChange={handleChangeSoTienDinhMuc}
                                value={soTienDinhMuc}
                            ></input>
                            <label>Số ngày thực hiện:</label>
                            <input className={cx('input-layout')}
                                onChange={handleChangeSoNgay}
                                value={ngayDinhMuc}
                            ></input>
                            <button className={cx('btn')}
                                onClick={handleSubmit}
                            >Xác Nhận</button>

                            <br></br>
                            <br></br>
                            <br></br>
                            <span style={{ color: 'red' }}>* chú ý: Thêm định mức và số ngày thực hiện sẽ được cộng dồn</span>
                            <br></br>
                            <span style={{ color: 'orange' }}>* ví dụ:</span>
                            <span style={{ color: 'orange' }}>- định mức nhập lần đầu: 10.000 VNĐ, số ngày 20</span>
                            <span style={{ color: 'orange' }}>- định mức nhập lần đầu: 20.000 VNĐ, số ngày 30</span>
                            <span style={{ color: 'orange' }}>- tổng định mức là: 30.000 VNĐ trong 50 ngày</span>
                        </div>
                        <div className={cx('body-thong-bao')}>
                            <div className={cx('thong-bao')}>
                                <h1>gợi ý và cảnh báo</h1>
                                <div className={cx('content-warning')}>
                                    <Card className={'wrapper-content-text'}>
                                        <div className={cx('text-content')}>
                                            <h3>Gợi ý</h3>
                                            <div className={cx('text-content')}>
                                                <span style={{ color: "green", fontWeight: "600" }}>{goiY}</span>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className={'wrapper-content-text'}>
                                        <div className={cx('text-content')}>
                                            <h3>Cảnh báo</h3>
                                            <div className={cx('text-content')}>
                                                <span style={{ color: "red", fontWeight: "600" }}>{canhBao}</span>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                            <div className={cx('lich-su')}>
                                <h1>Lịch sử thêm</h1>
                                <div className={cx('text-lich-su')}>
                                    {lichSu.map(item => (
                                        <div className={cx('margin-content')}>
                                            <div className={cx('card')}>
                                                <Card className={'wrapper-content-lich-su-big'}>
                                                    <div className={cx('wrapper-content')}>
                                                        <span
                                                            onClick={() => {
                                                                handleGetId(item.id)
                                                                handleCheckChinhSua();
                                                            }}
                                                        ><FontAwesomeIcon icon={faPenToSquare} /> {chuyenDinhDangTien(item.tien)} VNĐ</span>
                                                        <span>{chuyenNgay(item.date)}</span>
                                                        <span>{item.soNgay}</span>
                                                    </div>
                                                </Card>
                                            </div>
                                        </div>
                                    ))}
                                    {!lichSu.length &&
                                        <span style={{
                                            display: "block",
                                            textAlign: "center",
                                            marginTop: "12px",
                                            color: "#888",
                                            fontStyle: "italic",
                                            fontSize: "14px",
                                        }}>*Chưa có lịch sử</span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
}

export default Dinh_muc;