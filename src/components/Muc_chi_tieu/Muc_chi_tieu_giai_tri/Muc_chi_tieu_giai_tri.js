import classNames from "classnames/bind";
import style from './Muc_chi_tieu_giai_tri.module.scss'


// import component
import ContentChiTieu from "../../../cong_cu/Text_chi_tieu/Text_chi_tieu";
import { Them_sua_xoa as ThemSuaXoa } from "../../../Tro_nang";
import { Thanh_cong as ThanhCong, Xac_nhan as XacNhan } from "../../../alert";
import Card from "../../../cong_cu/Card/Card";

// import axios
import axios from "axios"

// import hook
import { useState, useEffect } from "react";
import { LoadingHook } from "../../../hook";

//import API_BASE_URL
import { API_BASE_URL, API_ENDPOINTS } from "../../../config";

//import ho tro 
import chuyenNgay from "../../../ho_tro/chuyen_ngay";
import chuyenDinhDangTien from "../../../ho_tro/chuyen_dinh_dang_tien";

//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style)
function Muc_chi_tieu_giai_tri({ }) {

    //lay id nguoi dung
    const UserId = localStorage.getItem("id")

    const [soDu, setSoDu] = useState([])
    const [daDung, setDaDung] = useState([])
    const [phanTram, setPhanTram] = useState([])

    // state lay thong bao
    const [thongBao, setThongBao] = useState([])

    // sate quan ly thong tin Post
    const [soTien, setSoTien] = useState([])
    const [ghiChu, setGhiChu] = useState(null)

    //state lay id
    const [id, setId] = useState('')

    //state set chinh Them_sua_xoa
    const [isChinhSua, setIsChinhSua] = useState(false)

    //state check da sua va da ThemSuaXoa
    const [isPost, setisPost] = useState(false)

    // Post du lieu giai tri
    const PostGiaiTri = async (dataToPost) => {
        try {
            await axios.post(`${API_ENDPOINTS.CHITIEU}/${UserId}`, dataToPost, { withCredentials: true })
            setSoTien('')
            setGhiChu('')
            setisPost(true)

            //set lai state
            dataGiaiTri()
        } catch (error) { console.error('Post Error' + error) }
    }

    //function handle
    function handleChangeSoTien(e) {
        const inputValue = e.target.value

        const soTienChuaDinhDang = inputValue.replace(/\./g, '')
        if (isNaN(soTienChuaDinhDang)) {
            setSoTien('')
            return
        }
        setSoTien(chuyenDinhDangTien(soTienChuaDinhDang))
    }

    function handleChangeGhiChu(e) {
        setGhiChu(e.target.value)
    }

    function handleSubmit() {

        const soTienPost = soTien.toString().replace(/\./g, '')

        const dataPost = {
            loaiChiTieu: "GIAI_TRI",
            soTien: Number(soTienPost),
            ghiChu: ghiChu,
        }

        if (!dataPost.soTien || Number(dataPost.soTien < 0)) { return }
        if (!dataPost.ghiChu || dataPost.ghiChu === '') { dataPost.ghiChu = "Không có ghi chú" }

        PostGiaiTri(dataPost);

    }

    //function lay id
    const handleGetId = (id) => {
        setId(id)
    }

    // function check Them_sua_xoa
    function handleCheckChinhSua() {
        setIsChinhSua(true)
    }

    //lay du lieu
    const dataGiaiTri = async () => {
        try {
            const res = await axios.get(`${API_ENDPOINTS.USERS}/${UserId}`, { withCredentials: true })

            // lay tong so tien an uong
            const dataGiaiTri = res.data.chi_tieu
            const chiTieuGiaiTri = dataGiaiTri.filter(item => item.loaiChiTieu === "GIAI_TRI")
            const soTienDuGiaiTri = chiTieuGiaiTri.map(item => Number(item.soTien))
            const daDungGiaiTri = soTienDuGiaiTri.reduce((a, b) => a + b, 0)
            setDaDung(daDungGiaiTri)

            //lay thong tin tien dinh muc
            const dinhMucData = res.data.dinh_muc_chi_tieu
            const soTienDinhMuc = dinhMucData.map(item => item.soTienDinhMuc)
            const tongSoTienDinhMuc = soTienDinhMuc.reduce((a, b) => a + b, 0)
            setSoDu(tongSoTienDinhMuc)

            // lay thong tin da them thong bao
            const dataThongBao = chiTieuGiaiTri.map(item => ({
                tien: item.soTien,
                ghiChu: item.ghiChu,
                id: item.id,
                date: item.thoiGianNhap,
            }))
            //set lai isPost
            setTimeout(() => {
                setisPost(false)
            }, 1000)
            setThongBao(dataThongBao)
        } catch (error) { console.error('Loi khi lay API' + error) }
    }

    console.log(thongBao)

    // lay data
    useEffect(() => {
        dataGiaiTri();
    }, [])

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
                        loaiChiTieu="GIAI_TRI"
                        id={id}
                        onReload={dataGiaiTri}
                        onClose={() => setIsChinhSua(false)}
                    />)}
                </>
                {<ContentChiTieu
                    notKhac
                    nhapLieu={'Ghi chú ( nếu có )'}
                    tenMuc={'Giải trí'}
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
    
                                        {item?.ghiChu && <span>{item.ghiChu}</span>}
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
                    onChangeGhiChu={handleChangeGhiChu}
                    onChangeSoTien={handleChangeSoTien}
                    onSubmit={handleSubmit}
                    valueGhiChu={ghiChu}
                    valueSoTien={soTien}
                />}
            </div>
        </>
    );
}

export default Muc_chi_tieu_giai_tri;