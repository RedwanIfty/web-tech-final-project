import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {useState} from 'react';
import axiosConfig from './axiosConfig';
import HomeMenu from "./HomeMenu";
const Changepass=()=>{
    const[email,setEmail]=useState("");
    const[current_password,setCurrentPassword]=useState("");
    const[password,setPassword]=useState("");
    const[conf_password,setConf_password]=useState("");
    const [errs,setErrs] = useState([]);
    const [msg,setMsg] = useState("");
    const handleSubmit=(event)=>{
        event.preventDefault();
        const data={email:email,current_password:current_password,password:password,conf_password:conf_password};
        axiosConfig.post('changepass',data).then(
            (succ)=>{
                setMsg(succ.data.msg);
            },
            (err)=>{
                setErrs(err.response.data);

            }
        )
    }
    return(
        <div>
        <div className='d-flex justify-content-center'>
            <h2>Change Password</h2>
        </div>

            <div className='d-flex justify-content-center'>       
                <form onSubmit={handleSubmit}>
                    Email:<input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text"/><span className={errs.email && "alert alert-danger"} role="alert">{errs.email? errs.email[0]:''}</span><br></br><br></br>
                    Current-Password:<input value={current_password} onChange={(e)=>{setCurrentPassword(e.target.value)}} type="password"/><span className={errs.current_password && "alert alert-danger"} role="alert"> {errs.current_password? errs.current_password[0]:''}</span><br></br><br></br>
                    New-Password:<input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password"/><span className={errs.password && "alert alert-danger"} role="alert"> {errs.password? errs.password[0]:''}</span><br></br><br></br>
                    Confirm Password:<input value={conf_password} onChange={(e)=>{setConf_password(e.target.value)}} type="password"/><span className={errs.conf_password && "alert alert-danger"} role="alert">{errs.conf_password? errs.conf_password[0]:''}</span><br></br><br></br>
                    <input className={'btn btn-success'} type="submit" value="Submit"/><br></br>
                </form>
            </div>
            <div className="d-flex justify-content-center"><h6>{msg}</h6></div>
        </div>
    )
}
export default Changepass