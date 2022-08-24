import {useParams} from 'react-router-dom';
import {useState,useEffect}  from 'react';
import axiosConfig from './axiosConfig';
import {Link} from 'react-router-dom';
const DrugsPharmacy=()=>{
    const [name,setName] = useState("");
    const [address,setAddress] = useState("");
    const [phone_no,setPhone_no] = useState("");
    const [errs,setErrs] = useState({});
    const [msg,setMsg] = useState("");
    const{id}=useParams();
    const [data,setData]=useState([]);
    const [check,setCheck]=useState(false);
    useEffect(()=>{
        axiosConfig.get('/drugs/pharmacy/'+id).then((rsp)=>{

        setData(rsp.data);
        setCheck(true);
        debugger
        console.log(rsp.data);
        },(er)=>{

        })

    },[]); 
    const handleSubmit=(event)=>{
        event.preventDefault();
        axiosConfig.post('drugs/pharmacy/'+id,data).
        then((succ)=>{
           // debugger
            setMsg(succ.data.msg);
            setCheck(true);
           // window.location.href="/list";
        },(err)=>{
           // debugger;
            setErrs(err.response.data);
        })
        
    }
    return(
    <div>
       {/* <form onSubmit={handleSubmit}>
            Name:<input value={name} onChange={(e)=>{setName(e.target.value)}} type="text"/>
            Formula: <input value={formula} onChange={(e)=>{setFormula(e.target.value)}} type="text"/>
            Price: <input value={price} onChange={(e)=>{setPrice(e.target.value)}} type="text"/>
            Available: <input value={available} onChange={(e)=>{setAvailable(e.target.value)}} type="text"/>           
            <input type="submit" value="Add" className="btn btn-success"/> 
        </form>
        <span>{errs.name? errs.name[0]:''}</span>
        <span>{errs.formula? errs.formula[0]:''}</span>
        <span>{errs.price? errs.price[0]:''}</span>
        <span>{errs.available? errs.available[0]:''}</span> 
        <br></br>
        <h5>{msg}</h5> */}
     <form onSubmit={handleSubmit}>
            Name:<input value={name} onChange={(e)=>{setName(e.target.value)}} type="text"/><span>{errs.name? errs.name[0]:''}</span>
            Address: <input value={address} onChange={(e)=>{setAddress(e.target.value)}} type="text"/><span>{errs.address? errs.address[0]:''}</span>
            Phone Number: <input value={phone_no} onChange={(e)=>{setPhone_no(e.target.value)}} type="text"/><span>{errs.phone_no? errs.phone_no[0]:''}</span>
            <input type="submit" value="Submit"/> 
        </form>
        <br></br>
        <h5>{msg}</h5>
        {
            check===true  ?
            <table className='table table-striped'>
               <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone no</th>
                </tr>
               </thead> 
            {
             data.map(
                 d=>(
                    <tbody key={d.id}>
                        <tr>
                            <td>{d.id}</td>
                            <td>{d.name}</td>
                            <td>{d.address}</td>
                            <td>{d.phone_no}</td>
                        </tr>
                    </tbody>
                 )
             )
            }</table>:"No Pharmacy available"
        }
   
    </div>
    )
}
export default DrugsPharmacy;