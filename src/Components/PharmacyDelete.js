
import {useParams} from 'react-router-dom';
import {useState,useEffect}  from 'react';
import axiosConfig from './axiosConfig';
const PharmacyDelete=()=>{
    const{id}=useParams()
    const[errs,setErrs]=useState("");
    useEffect(()=>{
        axiosConfig.post("pharmacy/delete/"+id).
        then((succ)=>{
            //setMsg(succ.data.msg);
            window.location.href="/view/pharmacy";
        },(err)=>{ 
            window.location.href="/";// setErrs(errs);
            //debugger;
        })
    },[]);
}
export default PharmacyDelete;