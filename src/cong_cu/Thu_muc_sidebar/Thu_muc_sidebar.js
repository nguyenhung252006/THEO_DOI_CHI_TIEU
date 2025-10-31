import { Dang_xuat, Dinh_muc, Thong_tin, Tong_quan, Trang_chu } from "../../components";
import { Muc_chi_tieu_an_uong } from "../../components/Muc_chi_tieu";


const Thu_muc_sidebar = [
    {
        title: "Trang chủ",
        path: "/",
        component: Trang_chu,
    },
    {
        title: "Thông tin",
        path: "/Thong_tin",
        component: Thong_tin,
    },
    {
        title: "Mục chi tiêu",
        path: null,
        children: [
            {
                title: '-- Ăn Uống --',
                path: "/Muc_chi_tieu/An_uong",
                component : Muc_chi_tieu_an_uong,
            },
            {
                title: '-- Mua sắm --',
                path: "/Muc_chi_tieu/Mua_sam",
            },
            {
                title: '-- Giải trí --',
                path: "/Muc_chi_tieu/Giai_tri",
            },
            {
                title: '-- Khác --',
                path: "/Muc_chi_tieu/Khac",
            }
        ]
    },
    {
        title: "Định mức",
        path: "/Dinh_muc",
        component: Dinh_muc,
    },
    {
        title: "Tổng quan",
        path: "/Tong_quan",
        component: Tong_quan,
    },
]

export { Thu_muc_sidebar }