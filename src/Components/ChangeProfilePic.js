import {useState,useEffect} from 'react';
import axiosConfig from './axiosConfig';
const ChangeProfilePic=()=>{
    const[mfile,setFile] = useState(null);
    const [msg,setMsg] = useState("");
    const [errs,setErrs] = useState([]);
    const[data,setData]=useState([]);
    var id=localStorage.getItem('admin_id');
    useEffect(()=>{
        
        axiosConfig.get("user/details/"+id).then((rsp)=>{
        setData(rsp.data);
        console.log(rsp.data);
        },(er)=>{

        })
    

},[]); 
    const upload=(event)=>{
        event.preventDefault();
        var data = new FormData();
        data.append("file",mfile);
        debugger;
        axiosConfig.post("changeProfilePic/"+id,data).then((rsp)=>{
            setMsg(rsp.data.msg);
        },(er)=>{
            setErrs(er.response.data);
        });
        //alert("clicked");
    }
    return(
        <div>
            <div className='d-flex justify-content-center'>
            <img src={`http://localhost:8000/storage/pro_pics/${data.pro_pic}`} className='img-fluid rounded-circle' width={150} height={100} alt='img not found'/>
            <br/>
            </div >
            <form className='d-flex justify-content-center' onSubmit={upload}>
                <input className='btn btn-primary' type="file" onChange={(e)=>{setFile(e.target.files[0])}}/><span className={errs.file && "alert alert-danger"} role="alert">{errs.file? errs.file[0]:''}</span><br></br><br></br>
                <input className='btn btn-primary' type="submit"/>
            </form>
            <h6>{msg}</h6>
        </div>
    )
}
export default ChangeProfilePic;