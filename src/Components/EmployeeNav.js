import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import MenuItem from './MenuItem';
const EmployeeNav=()=>{
    return(
        <div>
            <ul>
                <li className='MenuItem'>
                    <MenuItem url='/employee' value="Home"/>    
                </li>  
                <li className='MenuItem'>
                    <MenuItem className='nav-link' url="/register" value="Register"/>
                </li>
                <li className='MenuItem'>
                    <MenuItem className='nav-link' url="/employee/changepass" value="Change Password"/>
                </li>
                <li className='MenuItem'>
                    <MenuItem className='nav-link' url="/employee/changeProfilePic" value="Change Profile Picture"/>
                </li>
                
                <li className='MenuItem'>
                    <MenuItem url="/logout" value="Log out"/>    
                </li>   
            </ul>
        </div>
    )
}
export default EmployeeNav;