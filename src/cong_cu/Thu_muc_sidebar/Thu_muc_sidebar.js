import { Dang_xuat, Dinh_muc, Thong_tin, Tong_quan, Trang_chu } from "../../components";
import { Muc_chi_tieu_an_uong } from "../../components/Muc_chi_tieu";

//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faMoneyCheckDollar, faMoneyBillWave, faAddressCard, faSackDollar, faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons";



const Thu_muc_sidebar = [
    {
        title: "  Trang chủ",
        path: "/",
        component: Trang_chu,
        icon: faHome,
    },
    {
        title: "  Định mức",
        path: "/Dinh_muc",
        component: Dinh_muc,
        icon: faSackDollar,
    },
    {
        title: "  Mục chi tiêu",
        path: null,
        icon: faMoneyCheckDollar,
        children: [
            {
                title: ' Ăn Uống ',
                path: "/Muc_chi_tieu/An_uong",
                icon: faMoneyBillWave,
            },
            {
                title: ' Mua sắm ',
                path: "/Muc_chi_tieu/Mua_sam",
                icon: faMoneyBillWave,
            },
            {
                title: ' Giải trí ',
                path: "/Muc_chi_tieu/Giai_tri",
                icon: faMoneyBillWave,
            },
            {
                title: ' Khác ',
                path: "/Muc_chi_tieu/Khac",
                icon: faMoneyBillWave,
            }
        ]
    },
    {
        title: "  Thông tin",
        path: "/Thong_tin",
        component: Thong_tin,
        icon: faAddressCard,
    },
    {
        title: "Tổng quan",
        path: "/Tong_quan",
        component: Tong_quan,
        icon: faMoneyBillTrendUp
    },
]

export { Thu_muc_sidebar }