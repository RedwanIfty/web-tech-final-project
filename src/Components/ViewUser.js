import {useState,useEffect} from 'react';
import axiosConfig from './axiosConfig';
import {Link} from 'react-router-dom';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import _ from 'lodash';
const pageSize=5
const ViewUser=()=>{
    var index=1;
    var type="Admin";
    // var ch=true;
    const[view,setView]=useState([]);
    const[paginateView,setpaginateView]=useState();
    const[currentPage,setcurrentPage]=useState(1);
    
    const[data,setData]=useState([]);
    const[cl,setCl]=useState(false);
    useEffect(()=>{
        axiosConfig.get("user").then((rsp)=>{
            setCl(true);
        setView(rsp.data);
        setpaginateView(_(rsp.data).slice(0).take(pageSize).value());
        console.log(rsp.data);
        },(er)=>{

        })

    },[]); 
    const pageCount = view ? Math.ceil(view.length/pageSize) : 0;
    if(pageCount===1)return null;
    const pages = _.range(1,pageCount+1);
    const pagination=(pageNo)=>{
        setcurrentPage(pageNo);
        const startIndex =(pageNo-1)* pageSize;
        const paginateView=_(view).slice(startIndex).take(pageSize).value();
        setpaginateView(paginateView);
    }
    const search=(key)=>{
        if(key===''){
            //debugger
            setCl(true)
        }
        else{
            axiosConfig.get('user-search/'+key).then((res)=>{
            //debugger
            setCl(false)
            if(key===''){setCl(true)}
            else
            setData(res.data);
          console.log(res.data);  
        },
        (err)=>{
            console.log(err.response.data)
        })
        }
    }
    return(
        <div className='container'>
            <br></br>
            <h4>User List</h4><br></br>
            <div className="form-group">
                <input type="text" placeholder='Search by name,id' className="form-control" onChange={(e)=>search(e.target.value)}/><br/><br/> 
            </div>
            {cl ? <table className='table table-striped'>
               <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Type</th>
                    <th scope="col">Profile Picture</th>
                    <th scope="col">Action</th>
                </tr>
               </thead> 
                    {paginateView.map(v=>(
                <tbody key={index++}>        
                <tr>
                    <td >{v.id}</td>
                    <td >{v.name}</td>
                    <td >{v.email}</td>
                    <td >{v.type}</td>
                    <td><img src={`http://localhost:8000/storage/pro_pics/${v.pro_pic}`} className='img-fluid rounded-circle' width={100} height={100} alt='img not found'/></td>
                    <td >{
                        type===v.type ? " ":<Link className='btn btn-primary' to={`/user/update/${v.id}/${v.name}`}>Update</Link>}
                        {type===v.type ? " ":<Link className='btn btn-danger' to={`/user/delete/${v.id}`}>Delete</Link>}
                    </td>
                </tr>
            </tbody>
                    ))}
            </table> : 
            <table className='table table-striped'>
               <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>Profile Picture</th>
                </tr>
               </thead> 
                    {data.map(d=>(
                <tbody key={index++}>        
                <tr>
                    <td >{d.id}</td>
                    <td >{d.name}</td>
                    <td >{d.email}</td>
                    <td >{d.type}</td>
                    <td><img src={`http://localhost:8000/storage/pro_pics/${d.pro_pic}`} className='img-fluid rounded-circle' width={100} height={75} alt='img not found'/></td>
                </tr>
                <tr>{d.name===null ? "no data found" : ""}</tr>
            </tbody>
                    ))}
            </table> }
            {cl?<nav className='d-flex justify-content-center'>
                <ul className='pagination'>
                    {
                        pages.map((page)=>(
                            <li className={
                                page === currentPage? "page-item active" : "page-item"
                            }><p className='page-link' onClick={()=>pagination(page)}>
                                {page}</p>
                            </li>
                        ))
                    }
                </ul>
            </nav>:""}
        </div>
    )
}
export default ViewUser;