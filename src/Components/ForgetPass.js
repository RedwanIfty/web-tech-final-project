import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {useState} from 'react';
import axiosConfig from './axiosConfig';
const ForgetPass=()=>{
    const[email,setEmail]=useState("");
    const [errs,setErrs] = useState([]);
    const [msg,setMsg] = useState("");
    const handleSubmit=(event)=>{
        event.preventDefault();
        const data={email:email}
        axiosConfig.post('forgetpass',data).then(
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
            <h2>Forget Password</h2>
        </div>
            <div className='d-flex justify-content-center'>       
                <form onSubmit={handleSubmit}>
                    Email:<input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text"/><span className={errs.email && "alert alert-danger"} role="alert">{errs.email? errs.email[0]:''}</span><br></br><br></br>
                    <input className={'btn btn-success'} type="submit" value="Submit"/><br></br>
                </form>
            </div>
            <div className="d-flex justify-content-center"><h6>{msg}</h6></div>
        </div>
    )
}
export default ForgetPass