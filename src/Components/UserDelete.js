
import {useParams} from 'react-router-dom';
import {useState,useEffect}  from 'react';
import axiosConfig from './axiosConfig';
const UserDelete=()=>{
    const{id} = useParams();
    const[msg,setMsg]=useState("")
    useEffect(()=>{
        axiosConfig.post("user/delete/"+id).
        then((succ)=>{
            console.log(succ.data.msg)
            setMsg(succ.data.msg)
            //localStorage.setItem('deletemsg',succ.data.msg)
            debugger
            window.location.href="/view/user";
        },(err)=>{ 
            // window.location.href="/";// setErrs(errs);
            //debugger;
        })
    },[]);
}
export default UserDelete;