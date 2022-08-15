import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {useState} from 'react';
import axiosConfig from './axiosConfig';

const Register=()=>{
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[conf_password,setConf_password]=useState("");
    const[mfile,setFile] = useState(null);
    const[type,setType]=useState("");
    const [msg,setMsg] = useState("");
    const [errs,setErrs] = useState([]);
    const PostStyle={
        padding: "10px",
        textalign:"center"
    }
    // useEffect(()=>{
    //     axiosConfig.get("pharmacy").then((rsp)=>{
    //     setView(rsp.data);
    //     console.log(rsp.data);
    //     },(er)=>{

    //     })

    // },[]);
    const upload=(event)=>{
        event.preventDefault();
        var data=new FormData();
        data.append("name",name);
        data.append("email",email);
        data.append("password",password);
        data.append("conf_password",conf_password);
        if(mfile)data.append("file",mfile,mfile.name);
        data.append("type",type);
        axiosConfig.post("user/register",data).then((rsp)=>
        {
         //   debugger;
           setMsg(rsp.data.msg); 
           //console.log(rsp.data.name);
        },
        (er)=>{
            //debugger;
            setErrs(er.response.data);
        });
        //alert("Register");
    }
    return(
    <div>
        <h1 style={PostStyle}>Register</h1>
        <form onSubmit={upload}>
            <fieldset>
                Name:<input value={name} onChange={(e)=>{setName(e.target.value)}} type="text"/><span className="alert alert-danger" role="alert">{errs.name? errs.name[0]:''}</span><br></br><br></br>
                Email:<input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text"/><span>{errs.email? errs.email[0]:''}</span><br></br><br></br>
                Password:<input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password"/><span>{errs.password? errs.password[0]:''}</span><br></br><br></br>
                Confirm Password:<input value={conf_password} onChange={(e)=>{setConf_password(e.target.value)}} type="password"/><span>{errs.conf_password? errs.conf_password[0]:''}</span><br></br><br></br>
                Upload Image:<input type="file" onChange={(e)=>{setFile(e.target.files[0])}} /><span>{errs.file? errs.file[0]:''}</span><br></br><br></br>
                Type: 
                Patient<input type="radio" value="Patient" name={type} onChange={e=>setType(e.target.value)}/>
                Doctor<input type="radio" value="Doctor" name={type} onChange={e=>setType(e.target.value)}/>
                Employee<input type="radio" value="Employee" name={type} onChange={e=>setType(e.target.value)}/> <span>{errs.type? errs.type[0]:''}</span>
                <br/><br></br>
                <input className={'btn btn-success'} type="submit" value="Register"/><br></br>
                
            </fieldset>
        </form>
        {/* <select>
        {view.map(v=>(
                <option value={v.name}>{v.name}</option>            ))}
        </select> */}
        <h4>{msg}</h4>
        {name}
    </div>
    )
}
export default Register;