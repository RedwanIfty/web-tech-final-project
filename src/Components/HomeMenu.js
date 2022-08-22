import MenuItem from "./MenuItem"
import '../css/nav.css'
const HomeMenu=()=>{
    return(
        <div>
            <ul>
                <li className="MenuItem"><MenuItem url="/login" value="Login" /></li>
                <li className="MenuItem" id='active'><MenuItem url="/register" value="Register"/></li>
            </ul>
        </div>
    )
}
export default HomeMenu;