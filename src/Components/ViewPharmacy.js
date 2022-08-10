import {useState,useEffect} from 'react';
import axiosConfig from './axiosConfig';
import {Link} from 'react-router-dom';
const ViewPharmacy=()=>{
    var index=1;
    const[view,setView]=useState([]);
    useEffect(()=>{
        axiosConfig.get("pharmacy").then((rsp)=>{
        setView(rsp.data);
        console.log(rsp.data);
        },(er)=>{

        })

    },[]); 
    return(
        <div>
             <table style={{border: "3px solid rgb(0, 0, 0)"}}>
               <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone no</th>
                    <th>Action</th>
                </tr>
               </thead> 
                    {view.map(v=>(
                <tbody key={index++}>        
                <tr>
                    <td >{v.id}</td>
                    <td >{v.name}</td>
                    <td >{v.address}</td>
                    <td >{v.phone_no}</td>
                    <td><Link to={`/pharmacy/update/${v.id}`}>Update</Link>
                    ||<Link to={`/pharmacy/delete/${v.id}`}>Delete</Link></td> 
                </tr>
            </tbody>
                    ))}
            </table> 
        </div>
    )
}
export default ViewPharmacy;