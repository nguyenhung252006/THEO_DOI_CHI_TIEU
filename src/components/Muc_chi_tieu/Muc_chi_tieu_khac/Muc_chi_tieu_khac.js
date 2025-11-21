import classNames from "classnames/bind";
import style from './Muc_chi_tieu_khac.module.scss'

//import component
import ContentChiTieu from "../../../cong_cu/Text_chi_tieu/Text_chi_tieu";
import { Them_sua_xoa_khac as ThemSuaXoa } from "../../../Tro_nang";
import { Thanh_cong as ThanhCong, Xac_nhan as XacNhan } from "../../../alert";
import Card from "../../../cong_cu/Card/Card";

// import axios
import axios from "axios"

// import hook
import { useState, useEffect } from "react";
import { LoadingHook } from "../../../hook";

//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

//import API_BASE_URL
import { API_BASE_URL, API_ENDPOINTS } from "../../../config";

//import ho tro 
import chuyenNgay from "../../../ho_tro/chuyen_ngay";
import chuyenDinhDangTien from "../../../ho_tro/chuyen_dinh_dang_tien";

const cx = classNames.bind(style)
function Muc_chi_tieu_khac() {

    // lay id nguoi dung 
    const UserId = localStorage.getItem('id')

    //khai bao state
    const [soDu, setSoDu] = useState([])
    const [daDung, setDaDung] = useState([])


    //lay phan tram
    const [phanTram, setPhanTram] = useState([])

    // lat thong bao
    const [thongBao, setThongBao] = useState([])

    //state lay id
    const [id, setId] = useState('')

    //state set chinh Them_sua_xoa
    const [isChinhSua, setIsChinhSua] = useState(false)

    // sate quan ly thong tin Post
    const [soTien, setSoTien] = useState([])
    const [tenKhoan, seTenKhoan] = useState(null)

    //state check da sua va da ThemSuaXoa
    const [isPost, setisPost] = useState(false)

    // function handle
    function handleChangeSoTien(e) {
        const inputValue = e.target.value

        const soTienChuaDinhDang = inputValue.replace(/\./g, '')
        if (isNaN(soTienChuaDinhDang)) {
            setSoTien('')
            return
        }
        setSoTien(chuyenDinhDangTien(soTienChuaDinhDang))
    }

    function handleChangeKhac(e) {
        const value = e.target.value
        seTenKhoan(value)
    }

    function handleSubmit() {
        const soTienPost = soTien.toString().replace(/\./g, '')

        const dataPost = {
            soTien: Number(soTienPost),
            tenKhoan: tenKhoan,
        }

        if (!dataPost.soTien || Number(dataPost.soTien < 0)) { return }
        PostChiTieuKhac(dataPost)
    }

    // post du lieu
    const PostChiTieuKhac = async (dataPost) => {
        try {
            await axios.post(` ${API_ENDPOINTS.CHITIEUKHAC}/${UserId}`, dataPost, { withCredentials: true })
            setSoTien('')
            seTenKhoan('')
            setisPost(true)
            dataMucChiTieuKhac()
        } catch (error) {
            console.error("Error : " + error)
        }
    }

    const dataMucChiTieuKhac = async () => {
        try {
            const res = await axios.get(`${API_ENDPOINTS.USERS}/${UserId}`, { withCredentials: true })

            //lay data cua muc chi tieu khac
            const MucChiTieuKhac = res.data.chi_tieu_khac
            const soTienMucChiTieuKhac = MucChiTieuKhac.map(item => item.soTien)
            const daSuDungChiTieuKhac = soTienMucChiTieuKhac.reduce((a, b) => a + b, 0)
            setDaDung(daSuDungChiTieuKhac)



            //lay thong tin tien dinh muc
            const dinhMucData = res.data.dinh_muc_chi_tieu
            const soTienDinhMuc = dinhMucData.map(item => item.soTienDinhMuc)
            const tongSoTienDinhMuc = soTienDinhMuc.reduce((a, b) => a + b, 0)
            setSoDu(tongSoTienDinhMuc)


            //lay thong bao
            const dataThongBao = MucChiTieuKhac.map(item => ({
                id: item.id,
                tien: item.soTien,
                tenKhoan: item.tenKhoan,
                date: item.thoiGianNhap
            }))
            setThongBao(dataThongBao)

            //set lai isPost
            setTimeout(() => {
                setisPost(false)
            }, 1000)

            console.log(MucChiTieuKhac)
        } catch (err) {
            console.error('Error' + err)
        }

    }

    //lay data
    useEffect(() => {
        dataMucChiTieuKhac()
    }, [])

    //function lay id
    const handleGetId = (id) => {
        setId(id)
        console.log(id)
    }

    // function check Them_sua_xoa
    function handleCheckChinhSua() {
        setIsChinhSua(true)
    }

    //tinh phan tram
    useEffect(() => {
        if (soDu > 0) {
            setPhanTram(((daDung / soDu) * 100).toFixed(2))
        } else {
            setPhanTram(0);
        }
    }, [daDung, soDu]);

    return (
        <>
            <LoadingHook apiUrl={`${API_ENDPOINTS.USERS}/${UserId}`}>
                    {(data) => {
                        console.log("API data:", data)
                    }}
                </LoadingHook>
            <div className={cx('wrapper')}>
                
                <>
                    {isPost && <ThanhCong />}
                    
                    {isChinhSua && (<ThemSuaXoa
                        loaiChiTieu="MUA_SAM"
                        id={id}
                        onReload={dataMucChiTieuKhac}
                        onClose={() => setIsChinhSua(false)}
                    />)}
                </>
                {<ContentChiTieu
                    isKhac
                    nhapLieu={'Ghi chú ( nếu có )'}
                    tenMuc={'Mục Khác'}
                    daSuDung={daDung}
                    PhanTramDaSuDung={phanTram}
                    lichSu={
                        thongBao.length > 0 ? (
                            thongBao.map(item => (
                                <Card className={'wrapper-content-lich-su'}>
                                    <div key={item.id} className={cx('wrapper-content')}>
                                        <span
                                            onClick={() => {
                                                handleGetId(item.id)
                                                handleCheckChinhSua();
                                            }}
    
                                        ><FontAwesomeIcon icon={faPenToSquare} /> | {chuyenDinhDangTien(item.tien)} VNĐ</span>
    
                                        <span>{chuyenNgay(item.date)}</span>
    
                                        {item?.tenKhoan && <span>{item.tenKhoan}</span>}
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <span style={{
                                display: "block",
                                textAlign: "center",
                                marginTop: "12px",
                                color: "#888",
                                fontStyle: "italic",
                                fontSize: "14px",
                            }}>*Chưa có lịch sử</span>
                        )
                    }
                    onChangeSoTien={handleChangeSoTien}
                    valueSoTien={soTien}
                    valueKhac={tenKhoan}
                    onSubmit={handleSubmit}
                    onChangeKhac={handleChangeKhac}
                />}
            </div>
        </>
    );
}


export default Muc_chi_tieu_khac