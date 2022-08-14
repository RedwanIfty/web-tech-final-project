import MenuItem from "./MenuItem"

const HomeMenu=()=>{
    return(
        <div>
            <MenuItem url="/login" value="Login" />
            <MenuItem url="/register" value="Register"/>
        </div>
    )
}
export default HomeMenu;