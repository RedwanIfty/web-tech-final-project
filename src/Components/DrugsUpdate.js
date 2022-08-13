import { useState } from "react";
import axiosConfig from './axiosConfig';
import {useParams} from 'react-router-dom';

const DrugsUpdate=()=>{
    const{id,name}=useParams();
    const [price,setPrice] = useState("");
    const [available,setAvailable] = useState("");
    const [errs,setErrs] = useState({});
    const [msg,setMsg] = useState("");
    const handleSubmit=(event)=>{
        event.preventDefault();
        const data={price:price,available:available};
        axiosConfig.post("drugs/update/"+id,data).
        then((succ)=>{
            //debugger
            setMsg(succ.data.msg);

           // window.location.href="/list";
        },(err)=>{
            //debugger;
            setErrs(err.response.data);
        })
    }
    return(
        <div>
            <h1>Update Drug:{name} </h1>
        <form onSubmit={handleSubmit}>
            Price:<input value={price} onChange={(e)=>{setPrice(e.target.value)}} type="text"/><span>{errs.price? errs.price[0]:''}</span><br></br><br></br>
            Add Number of Drugs: <input value={available} onChange={(e)=>{setAvailable(e.target.value)}} type="text"/><span>{errs.available? errs.available[0]:''}</span><br/><br></br>
            <input type="submit" value="Update"/> 
        </form>
        <br></br>
        <h5>{msg}</h5>
        </div>
    )
}
export default DrugsUpdate;