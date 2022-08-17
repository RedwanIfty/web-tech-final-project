import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import MenuItem from './MenuItem';
const LeftMenu=()=>{
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <div>
                <MenuItem  url="/register" value="Register"/>||
                <MenuItem url="/drugs" value="Drugs"/>||
                <MenuItem url="/pharmacy" value="Pharmacy"/>||
                <MenuItem url="/view/user" value="View User"/>||
                <MenuItem url="/view/pharmacy" value="View Pharmacy"/>||
                <MenuItem url="/view/drugs" value="View Drugs"/>||
                <MenuItem url="/logout" value="Log out"/>           
             </div>       
        </div>
        </nav>
    )
}
export default LeftMenu;