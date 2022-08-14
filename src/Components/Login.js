import {useState} from 'react';
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
                localStorage.setItem('_authToken',succ.data.tkey);
                debugger
                if(succ.data.Role==='Admin')
                   { window.location.href="/view/user";}
                if(succ.data.Role==='User')
                    {alert('user cannot access')}
                
            },
            (err)=>{
                debugger
                setErrs(err.response.data);
            }
        )

    }
    return (
        <div>
            <form onSubmit={handleForm}>
                Email:<input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text"/><br/><spna>{errs.email ? errs.email[0] : " "}</spna><br/>
                Password: <input value={pass} onChange={(e)=>{setPass(e.target.value)}} type="password"/> <br/><spna>{errs.pass ? errs.pass[0] : " "}</spna><br/>
                <input type="submit" value="login"/>
            </form>
            <spna>{errs.msg ? errs.msg:" "}</spna>
        </div>
    )
}
export default Login;