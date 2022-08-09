import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import MenuItem from './MenuItem';
const LeftMenu=()=>{
    return (
        <div>
             <MenuItem url="/register" value="Register"/>
             <MenuItem url="/drugs" value="Drugs"/>
             <MenuItem url="/pharmacy" value="Pharmacy"/>
             <MenuItem url="/view/user" value="ViewUser"/>
        </div>
    )
}
export default LeftMenu;