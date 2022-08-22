import {useParams} from 'react-router-dom';
import {useState,useEffect}  from 'react';
import axiosConfig from './axiosConfig';
const PharmacyDrugs=()=>{
    const [name,setName] = useState("");
    const [formula,setFormula] = useState("");
    const [price,setPrice] = useState("");
    const [available,setAvailable] = useState("");
    const[errs,setErrs]=useState({});
    const [msg,setMsg] = useState("");
    const{id}=useParams();
    const [data,setData]=useState([]);
    const [check,setCheck]=useState(false);
    useEffect(()=>{
        axiosConfig.get('/pharmacy/drugs/'+id).then((rsp)=>{

        setData(rsp.data);
        setCheck(true);
        debugger
        console.log(rsp.data);
        },(er)=>{

        })

    },[]); 
    const handleSubmit=(event)=>{
        event.preventDefault();
        const data={name:name,formula:formula,price:price,available:available};
        axiosConfig.post('/pharmacy/drugs/'+id,data).
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
       <form onSubmit={handleSubmit}>
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
        <h5>{msg}</h5>
   
        {
            check===true  ?
            <table className='table table-striped'>
               <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Formula</th>
                    <th scope="col">Price</th>
                    <th scope="col">Available</th>
                </tr>
               </thead> 
            {
             data.map(
                 d=>(
                    <tbody key={d.id}>
                        <tr>
                            <td>{d.name}</td>
                            <td>{d.formula}</td>
                            <td>{d.price}</td>
                            <td>{d.available}</td>
                        </tr>
                    </tbody>
                 )
             )
            }</table>:"No drugs available"
        }
   
    </div>
    )
}
export default PharmacyDrugs;