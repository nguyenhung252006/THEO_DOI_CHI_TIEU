import { Dang_xuat, Dinh_muc, Muc_chi_tieu, Thong_tin, Tong_quan,Trang_chu } from "../components";


const publicRoutes = [
    { path: "/Dang_xuat", component: Dang_xuat },
    { path: "/Dinh_muc", component: Dinh_muc },
    { path: "/Muc_chi_tieu", component: Muc_chi_tieu },
    { path: "/Thong_tin", component: Thong_tin },
    { path: "/Tong_quan", component: Tong_quan },
    { path: "/", component: Trang_chu },
];

export {publicRoutes}
