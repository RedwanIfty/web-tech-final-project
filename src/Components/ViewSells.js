import {useState,useEffect,useRef} from 'react';
import axiosConfig from './axiosConfig';
import {Link} from 'react-router-dom';
import { useDownloadExcel } from 'react-export-table-to-excel';
import _ from 'lodash';

const ViewSells=()=>{
    var index=1;
    const tableRef = useRef(null);
    const[view,setView]=useState([]);
    const[cl,setCl]=useState(false);
    const[data,setData]=useState([]);
    const[msg,setMsg]=useState("");
    var total=0;
    useEffect(()=>{
        axiosConfig.get("drugs/sells").then((rsp)=>{
        setView(rsp.data);
        setCl(true);
        console.log(rsp.data);
        },(er)=>{

        })

    },[]); 
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Sells table',
        sheet: 'Users'
    })
   
    return(
    <div>
        <button className='btn btn-primary' style={{float:'right'}} onClick={onDownload}> Export excel </button>
         <h4>Sells List</h4>
        <table className='table table-striped' ref={tableRef}>
        <thead>
                <tr>
                    <th>SL</th>
                    <th>Id</th>
                    <th>Drugs Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead> 
                <tbody>
                    {
                        view.map(v=>(
                        <tr>
                            <td>{index++}</td>
                            <td>{v.id}</td>
                            <td>{v.name}</td>
                            <td>{v.quantity}</td>
                            <td>{v.price}</td>
                            <td>{v.price *v.quantity}</td>
                        </tr>
                        ))
                    }
                    <tr>
                        <th colSpan={5}>Total</th>
                        {view.map( v=>{
                            total=total+(v.price*v.quantity)
                        })} 
                        <td>{total}TK</td>
                    
                    </tr>
                    <tr><td>sfasf</td></tr>
                </tbody>
        </table>
    </div>
    )
}
export default ViewSells