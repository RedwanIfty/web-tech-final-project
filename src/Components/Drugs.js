import { useState } from "react";
import axiosConfig from './axiosConfig';

const Drugs=()=>{
    const [name,setName] = useState("");
    const [formula,setFormula] = useState("");
    const [price,setPrice] = useState("");
    const [available,setAvailable] = useState("");
    const[errs,setErrs]=useState({});
    const [msg,setMsg] = useState("");
    const handleSubmit=(event)=>{
        event.preventDefault();
        const data={name:name,formula:formula,price:price,available:available};
        axiosConfig.post("add/drugs",data).
        then((succ)=>{
           // debugger
            setMsg(succ.data.msg);

           // window.location.href="/list";
        },(err)=>{
           // debugger;
            setErrs(err.response.data);
        })
    }
    return(
        <div>
            <h1>Add Drugs</h1>
        <form onSubmit={handleSubmit}>
            Name:<input value={name} onChange={(e)=>{setName(e.target.value)}} type="text"/><span>{errs.name? errs.name[0]:''}</span><br></br><br></br>
            Formula: <input value={formula} onChange={(e)=>{setFormula(e.target.value)}} type="text"/><span>{errs.formula? errs.formula[0]:''}</span><br/><br></br>
            Price: <input value={price} onChange={(e)=>{setPrice(e.target.value)}} type="text"/><span>{errs.price? errs.price[0]:''}</span><br></br><br/>
            Add: <input value={available} onChange={(e)=>{setAvailable(e.target.value)}} type="text"/><span>{errs.available? errs.available[0]:''}</span><br></br><br/>
            
            <input type="submit" value="Submit" className="btn btn-success"/> 
        </form>
        <br></br>
        <h5>{msg}</h5>
        </div>
    )
}
export default Drugs;