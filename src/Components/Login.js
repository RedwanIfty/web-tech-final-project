import {useState} from 'react';
import { Link } from 'react-router-dom';
import axiosConfig from './axiosConfig';
const Login =()=>{
    const[email,setEmail] = useState("");
    const[pass,setPass] = useState("");
    const[errs,setErrs]=useState({});
    const handleForm=(event)=>{
        event.preventDefault();
        var data={email:email,pass:pass};
        debugger
        axiosConfig.post('login',data).then(
            (succ)=>{
                debugger
                if(succ.data.Role==='Admin'){
                    localStorage.setItem('_authToken',succ.data.tkey);
                    window.location.href="/view/user";
                }
                if(succ.data.Role==='Employee')
                    {
                        localStorage.setItem('user',succ.data.tkey);
                        localStorage.setItem('user_id',succ.data.user_id);
                        var id=succ.data.user_id;
                        window.location.href=`/employee/${id}`
                    }
                
            },
            (err)=>{
                debugger
                setErrs(err.response.data);
            }
        )

    }
    return (
        <div>
            <div><h1 className='d-flex justify-content-center'>Login</h1></div>
        <div className='d-flex justify-content-center'>
            <form onSubmit={handleForm}>
                <br/>
                Email:<input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text"/><span className={errs.email && 'alert alert-danger'}>{errs.email ? errs.email[0] : " "}</span><br/><br/>
                Password: <input value={pass} onChange={(e)=>{setPass(e.target.value)}} type="password"/><span className={errs.pass && 'alert alert-danger'}>{errs.pass ? errs.pass[0] : " "}</span><br/><br/>
                <input className='btn btn-success' type="submit" value="login"/>
            </form>
            <span>{errs.msg ? errs.msg:" "}</span>
        </div>
        <div className='d-flex justify-content-center'>
                <b style={{color:'red'}}>Forget Password?</b>
                <Link to='/forgetpass'>Click Here</Link>
            </div>
        </div>
    )
}
export default Login;