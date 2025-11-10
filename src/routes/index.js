import { Dang_xuat, Dinh_muc, Thong_tin, Tong_quan, Trang_chu } from "../components";
import {
    Muc_chi_tieu_an_uong,
    Muc_chi_tieu_mua_sam,
    Muc_chi_tieu_giai_tri,
    Muc_chi_tieu_khac,
} from "../components/Muc_chi_tieu";



const publicRoutes = [
    { path: "/Dang_xuat", component: Dang_xuat },
    { path: "/Dinh_muc", component: Dinh_muc },
    { path: "/Thong_tin", component: Thong_tin },
    { path: "/Tong_quan", component: Tong_quan },
    { path: "/Muc_chi_tieu/An_uong", component: Muc_chi_tieu_an_uong },
    { path: "/Muc_chi_tieu/Mua_sam", component: Muc_chi_tieu_mua_sam },
    { path: "/Muc_chi_tieu/Giai_tri", component: Muc_chi_tieu_giai_tri },
    { path: "/Muc_chi_tieu/Khac", component: Muc_chi_tieu_khac },
    { path: "/", component: Trang_chu },

];

export { publicRoutes }
