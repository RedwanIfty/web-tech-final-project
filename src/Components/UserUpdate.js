import {useParams} from 'react-router-dom';
import {useState}  from 'react';
import axiosConfig from './axiosConfig';
const UserUpdate=()=>{
    const{id}=useParams();
    const[name,setName]=useState("");
    const[mfile,setFile] = useState(null);
    const[type,setType]=useState("");
    const [msg,setMsg] = useState("");
    const[errs,setErrs]=useState({});
    const upload=(event)=>{
        event.preventDefault();
        var data=new FormData();
        data.append("name",name);
        if(mfile)data.append("file",mfile,mfile.name);
        data.append("type",type);
        axiosConfig.post("user/update/"+id,data).then((rsp)=>
        {
            //debugger;
           setMsg(rsp.data.msg); 
        },
        (er)=>{
            //debugger;
            setErrs(er.response.data);
        });
        //alert("Register");
    }
    
    return(
        <div>
            <h1>Update id:{id}</h1>
        <form onSubmit={upload}>
            <fieldset>
                Name:<input value={name} onChange={(e)=>{setName(e.target.value)}} type="text"/><span>{errs.name? errs.name[0]:''}</span><br></br><br></br>
                Upload Image:<input type="file" onChange={(e)=>{setFile(e.target.files[0])}} /><span>{errs.file? errs.file[0]:''}</span><br></br><br></br>
                Type: 
                <input type="radio" value="Patient" name={type} onChange={e=>setType(e.target.value)}/>Patient
                <input type="radio" value="Doctor" name={type} onChange={e=>setType(e.target.value)}/>Doctor
                <input type="radio" value="Employee" name={type} onChange={e=>setType(e.target.value)}/>Employee 
                <span>{errs.type? errs.type[0]:''}</span>
                <br/><br></br>
                <input type="submit" value="Update"/><br></br>
                
            </fieldset>
        </form>
        <h1>{msg}</h1>
        </div>
    )
}
export default UserUpdate;