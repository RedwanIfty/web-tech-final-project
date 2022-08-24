import {useState,useEffect,useRef} from 'react';
import axiosConfig from './axiosConfig';
import {Link} from 'react-router-dom';
import { useDownloadExcel } from 'react-export-table-to-excel';
import _ from 'lodash';

const ViewDrugs=()=>
{
    var index=1;
    const tableRef = useRef(null);
    const[view,setView]=useState([]);
    const[cl,setCl]=useState(false);
    const[data,setData]=useState([]);
    const[msg,setMsg]=useState("");
    var total=0;
    useEffect(()=>{
        axiosConfig.get("drugs").then((rsp)=>{
        setView(rsp.data);
        setCl(true);
        console.log(rsp.data);
        },(er)=>{

        })

    },[]); 
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Drugs table',
        sheet: 'Users'
    })
    const search=(key)=>{
        if(key===''){
            //debugger
            setCl(true)
        }
        else{
            axiosConfig.get('drugs-search/'+key).then((res)=>{
            //debugger
                setCl(false)
            if(key==='')
            {
                setCl(true)
            }
            else
                setData(res.data);
                setCl(false)
          console.log(res.data);  
        },
        (err)=>{
            console.log(err.response.data)
        })
        }
    }
    const deleteDrugs=(event,id)=>{
        event.preventDefault();

        const thisClick=event.currentTarget;

        axiosConfig.post("drugs/delete/"+id).then((rsp)=>{
            setMsg(rsp.data.msg)
            thisClick.closest("tr").remove();
        },(err)=>{})
    }
    return(
        <div>
            <button className='btn btn-primary' style={{float:'right'}} onClick={onDownload}> Export excel </button>
            <div className='d-flex justify-content-center'>
                <p className={msg?'alert alert-danger':''}>{msg}</p>
            </div>
            <br></br>
            <div className="form-group">
                <input type="text" placeholder='Search drugs by name' className="form-control" onChange={(e)=>search(e.target.value)}/><br/><br/> 
            </div>
             {
                cl===true &&
            <table className='table table-striped' ref={tableRef}>
               <thead>
                <tr>
                    <th>SL</th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Formula</th>
                    <th>Price</th>
                    <th>Available</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
               </thead> 
               <tbody>
                    {view.map(v=>(
                <tr key={index++}>
                    <td>{index}</td>
                    <td >{v.id}</td>
                    <td ><Link to={`/drugs/pharmacy/${v.id}`}>{v.name}</Link></td>
                    <td >{v.formula}</td>
                    <td >{v.price}</td>
                    <td >{v.available}</td>
                    <td>{v.price*v.available}</td>
                    <td><Link className='btn btn-primary' to={`/drugs/update/${v.id}/${v.name}` }>Update</Link>
                    <button type='button' onClick={(e)=>deleteDrugs(e,v.id)} className='btn btn-danger'>Delete</button></td>
                </tr>
                    ))}
                    <tr>
                        <th colSpan={6}>Total</th>
                        {view.map( v=>{
                            total=total+(v.price*v.available)
                        })} 
                        <td>{total}</td>
                    </tr>
                </tbody>
            </table>
            }
             {
                cl===false &&
                <table className='table table-striped'>
               <thead>
                <tr>
                    <th>SL</th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Formula</th>
                    <th>Price</th>
                    <th>Available</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
               </thead> 
               <tbody>
                    {data.map(v=>(
                <tr key={index++}>
                    <td>{index}</td>
                    <td >{v.id}</td>
                    <td ><Link to={`/drugs/pharmacy/${v.id}`}>{v.name}</Link></td>
                    <td >{v.formula}</td>
                    <td >{v.price}</td>
                    <td >{v.available}</td>
                    <td>{v.price*v.available}</td>
                    <td><Link className='btn btn-primary' to={`/drugs/update/${v.id}/${v.name}` }>Update</Link>
                    <button type='button' onClick={(e)=>deleteDrugs(e,v.id)} className='btn btn-danger'>Delete</button></td>
                </tr>
                    ))}
                    <tr>
                        <th colSpan={6}>Total</th>
                        {data.map( v=>{
                            total=total+(v.price*v.available)
                        })} 
                        <td>{total}</td>
                    </tr>
                </tbody>
            </table>}
        </div>
    )
}
export default ViewDrugs;