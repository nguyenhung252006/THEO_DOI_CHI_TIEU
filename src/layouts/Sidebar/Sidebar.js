import { Thu_muc_sidebar as list } from "../../cong_cu/Thu_muc_sidebar/Thu_muc_sidebar";
import MenuItem from "../../cong_cu/MenuItem/MenuItem";

function SideBar({className}) {
    console.log(list)
    return(
        <div className={className}>
            {list.map((items,index) => <MenuItem key={index} item={items}/>)}
        </div>
    )
}

export default SideBar;