import { useParams } from "react-router-dom"
import axiosConfig from "./axiosConfig";
import { useState,useEffect } from "react";
import EmployeeNav from "./EmployeeNav";
const EmployeeDash=()=>{
    var id=localStorage.getItem('user_id');
    const[data,setData]=useState([]);
    const[check,setCheck]=useState(false);
    debugger
    useEffect(()=>{
            axiosConfig.get("employee/"+id).then((rsp)=>{
            setData(rsp.data);
            console.log(rsp.data);
            },(er)=>{

            })

    },[]); 
    return(
        <div>
            <EmployeeNav/>
            { check===false &&
            <div className="d-flex justify-content-center">
            <img src={`http://localhost:8000/storage/pro_pics/${data.pro_pic}`} className='img-fluid rounded-circle' width={100} height={100} alt='img not found'/>
            <br/>
            <b className="d-flex justify-content-center">
            </b>
            </div>
            }
            {
                check && <h5>Not allowed to Access others profile</h5>
            }
            <div className="d-flex justify-content-center">Id: {data.id}<br/>
            Name: {data.name}<br/>
            Email: {data.email}<br/>
            
            Type: {data.type}<br/></div>
        </div>

    )
}
export default EmployeeDash