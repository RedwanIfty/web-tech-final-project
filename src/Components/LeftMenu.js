import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import MenuItem from './MenuItem';
const LeftMenu=()=>{
    var id=localStorage.getItem('admin_id');
    return (
        <div>
            <ul>
                <li className='MenuItem'>
                    <MenuItem className='nav-link' url="/register" value="Register"/>
                </li>
                <li className='MenuItem'>
                    <MenuItem url="/drugs" value="Drugs"/>
                </li>
                <li className='MenuItem'>
                    <MenuItem url="/pharmacy" value="Pharmacy"/>
                </li>
                <li className='MenuItem'>
                    <MenuItem url="/view/user" value="View User"/>
                </li>
                <li className='MenuItem'>
                    <MenuItem url="/view/pharmacy" value="View Pharmacy"/>
                </li>
                <li className='MenuItem'>
                    <MenuItem url="/view/drugs" value="View Drugs"/>
                </li>
                <li className='MenuItem'>
                    <MenuItem url="/changepass" value="Change Password"/>    
                </li>    
                <li className='MenuItem'>
                    <MenuItem url={`changeProfilePic/${id}`} value="Change Picture"/>    
                </li>    
                <li className='MenuItem'>
                    <MenuItem url="/logout" value="Log out"/>    
                </li>       
            </ul>
        </div>       
        

    )
}
export default LeftMenu;