
import {useState,useEffect}  from 'react';
import axiosConfig from './axiosConfig';
const Logout=()=>{
    useEffect(()=>{
    if(localStorage.getItem('user')!=null){
            var token=localStorage.getItem('user'); 
            var data={token:token}
            axiosConfig.post("logout",data).
            then((succ)=>{
                if(localStorage.getItem('user')){
                debugger
                
                localStorage.removeItem('user');
                    window.location.href="/login";
                }
            },(err)=>{ 
               
            }) 
            
    }
    debugger
    if(localStorage.getItem('_authToken')!=null){
        var token=localStorage.getItem('_authToken'); 
        var data={token:token}   
        axiosConfig.post("logout",data).
        then((succ)=>{
            if(localStorage.getItem('_authToken')){
            debugger
            
            localStorage.removeItem('_authToken');
                window.location.href="/login";
            }
        },(err)=>{ 
           
        }) 
    }
    },[]);
    return(<h6>logging out</h6>
    )

}
export default Logout;