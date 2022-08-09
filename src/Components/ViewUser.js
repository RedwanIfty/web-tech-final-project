import {useState,useEffect} from 'react';
import axiosConfig from './axiosConfig';
import {Link} from 'react-router-dom'
const ViewUser=()=>{
    var index=1;
    const[view,setView]=useState([]);
    useEffect(()=>{
        axiosConfig.get("user").then((rsp)=>{
        setView(rsp.data);
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
                    <th>Email</th>
                    <th>Type</th>
                    <th>Image</th>
                    <th>Action</th>
                </tr>
               </thead> 
                    {view.map(v=>(
                <tbody key={index++}>        
                <tr>
                    <td >{v.id}</td>
                    <td >{v.name}</td>
                    <td >{v.email}</td>
                    <td >{v.type}</td>
                    <td><img src={`http://localhost:8000/storage/pro_pics/${v.pro_pic}`} width={100} height={100}/></td>
                    <td><Link to={`/user/update/${v.id}/${v.name}`}>Update</Link>
                    ||<Link to={`/user/delete/${v.id}`}>Delete</Link></td>
                </tr>
            </tbody>
                    ))}
            </table> 
        </div>
    )
}
export default ViewUser;