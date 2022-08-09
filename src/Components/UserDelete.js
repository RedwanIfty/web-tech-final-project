
import {useParams} from 'react-router-dom';
import {useState,useEffect}  from 'react';
import axiosConfig from './axiosConfig';
const UserDelete=()=>{
    const{id} = useParams();
    useEffect(()=>{
        axiosConfig.post("user/delete/"+id).
        then((succ)=>{
            window.location.href="/view/user";
        },(err)=>{ 
            // window.location.href="/";// setErrs(errs);
            //debugger;
        })
    },[]);
}
export default UserDelete;