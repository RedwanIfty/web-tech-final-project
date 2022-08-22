import { useParams } from "react-router-dom"
import axiosConfig from "./axiosConfig";
import { useState,useEffect } from "react";
const UserDetails=()=>{
    const {id}=useParams();
    const[data,setData]=useState([]);
    debugger
    useEffect(()=>{
        
            axiosConfig.get("user/details/"+id).then((rsp)=>{
            setData(rsp.data);
            console.log(rsp.data);
            },(er)=>{

            })
        

    },[]); 
    return(
        <div>
            <div className='d-flex justify-content-center'>
            <img src={`http://localhost:8000/storage/pro_pics/${data.pro_pic}`} className='img-fluid rounded-circle' width={350} height={100} alt='img not found'/>
            <br/>
            </div>
            <div className='d-flex justify-content-center'>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <td>{data.id}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td>{data.name}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{data.email}</td>
                    </tr>
                    <tr>
                        <th>Type</th>
                        <td>{data.type}</td>
                    </tr>

                </thead>
             </table>
            </div>
        </div>

    )
}
export default UserDetails