import axios from 'axios';
const instance = axios.create({
    baseURL : 'http://localhost:8000/api/'
});

instance.interceptors.request.use((config)=>{
    config.headers.common["AuthorizationAdmin"] = localStorage.getItem('_authToken');
    debugger
    config.headers.common["Authorization"]=localStorage.getItem('user');
    debugger
    return config;
},(err)=>{});

instance.interceptors.response.use((rsp)=>{
    return rsp;
},(err)=>{
    if(err.response.status == 401){
        window.location.href="/login";
    }
    return Promise.reject(err);
});
export default instance;