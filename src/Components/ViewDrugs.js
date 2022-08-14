import {useState,useEffect,useRef} from 'react';
import axiosConfig from './axiosConfig';
import {Link} from 'react-router-dom';
import { useDownloadExcel } from 'react-export-table-to-excel';
const ViewDrugs=()=>
{
    var index=1;
    const tableRef = useRef(null);
    const[view,setView]=useState([]);
    var total=0;
    useEffect(()=>{
        axiosConfig.get("drugs").then((rsp)=>{
        setView(rsp.data);
        console.log(rsp.data);
        },(er)=>{

        })

    },[]); 
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Users table',
        sheet: 'Users'
    })

    return(
        <div>
            <button onClick={onDownload}> Export excel </button>
             <table border="1" ref={tableRef}>
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
                    <td >{v.name}</td>
                    <td >{v.formula}</td>
                    <td >{v.price}</td>
                    <td >{v.available}</td>
                    <td>{v.price*v.available}</td>
                    <td><Link to={`/drugs/update/${v.id}/${v.name}`}>Update</Link>
                    ||<Link to={`/drugs/delete/${v.id}`}>Delete</Link></td>
                </tr>
                    ))}
                    <tr>
                        <th colSpan={6}>Total</th>
                        {view.map(
                v=>{
                    total=total+(v.price*v.available)
                })} 
                        <td>{total}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default ViewDrugs;