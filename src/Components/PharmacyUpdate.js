import { useState } from "react";
import axiosConfig from './axiosConfig';
import {useParams} from 'react-router-dom';
const PharmacyUpdate=()=>{
    const{id}=useParams();
    const [name,setName] = useState("");
    const [address,setAddress] = useState("");
    const [phone_no,setPhone_no] = useState("");
    const [errs,setErrs] = useState({});
    const [msg,setMsg] = useState("");
    const handleSubmit=(event)=>{
        event.preventDefault();
        const data={name:name,address:address,phone_no:phone_no};
        axiosConfig.post("pharmacy/update/"+id,data).
        then((succ)=>{
            //debugger
            setMsg(succ.data.msg);

           // window.location.href="/list";
        },(err)=>{
          //  debugger;
            setErrs(err.response.data);
        })
    }
    return(
        <div>
            <h1>Update Pharmacy</h1>
        <form onSubmit={handleSubmit}>
            Name:<input value={name} onChange={(e)=>{setName(e.target.value)}} type="text"/><span>{errs.name? errs.name[0]:''}</span><br></br><br></br>
            Address: <input value={address} onChange={(e)=>{setAddress(e.target.value)}} type="text"/><span>{errs.address? errs.address[0]:''}</span><br/><br></br>
            Phone Number: <input value={phone_no} onChange={(e)=>{setPhone_no(e.target.value)}} type="text"/><span>{errs.phone_no? errs.phone_no[0]:''}</span><br></br><br/>
            <input type="submit" value="Update"/> 
        </form>
        <br></br>
        <h5>{msg}</h5>
        </div>
    )
}
export default PharmacyUpdate;