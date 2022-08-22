import { useParams } from "react-router-dom"
import axiosConfig from "./axiosConfig";
import { useState,useEffect } from "react";
const EmployeeDash=()=>{
    const {id}=useParams();
    const[data,setData]=useState([]);
    const[check,setCheck]=useState(false);
    debugger
    useEffect(()=>{
        if(localStorage.getItem('user_id')!=id){
           alert('Access not allowed')
           setCheck(true);
        }
        else{
            axiosConfig.get("employee/"+id).then((rsp)=>{
            setData(rsp.data);
            console.log(rsp.data);
            },(er)=>{

            })
        }

    },[]); 
    return(
        <div>
            { check===false &&
            <div>
            <img src={`http://localhost:8000/storage/pro_pics/${data.pro_pic}`} className='img-fluid rounded-circle' width={100} height={100} alt='img not found'/>
            <br/>
            Id: {data.id}<br/>
            Name: {data.name}<br/>
            Email: {data.email}<br/>
            
            Type: {data.type}<br/>
            
            </div>
            }
            {
                check && <h5>Not allowed to Access others profile</h5>
            }
        </div>

    )
}
export default EmployeeDash