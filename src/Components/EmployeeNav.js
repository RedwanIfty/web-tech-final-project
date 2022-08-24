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
                    <MenuItem url="/logout" value="Log out"/>    
                </li>   
            </ul>
        </div>
    )
}
export default EmployeeNav;