import {useState,useEffect} from 'react';
import axiosConfig from './axiosConfig';
import {Link} from 'react-router-dom';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import _ from 'lodash';

const pageSize=10
const ViewPharmacy=()=>{
    const[view,setView]=useState([]);
    const[paginateView,setpaginateView]=useState([]);
    const[data,setData]=useState([]);
    const[currentPage,setcurrentPage]=useState(1);
    const[cl,setCl]=useState(false);
    debugger
    
    useEffect(()=>{
        axiosConfig.get('pharmacy').then((rsp)=>{
        setCl(true);
        setView(rsp.data);
        debugger
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
            axiosConfig.get('pharmacy-search/'+key).then((res)=>{
            //debugger
                setCl(false)
            if(key==='')
            {
                setCl(true)
            }
            else
                setData(res.data);
                setpaginateView(_(res.data).slice(0).take(pageSize).value());
                setCl(false)
          console.log(res.data);  
        },
        (err)=>{
            console.log(err.response.data)
        })
        }
    }

    return(
        <div>
            <div className="form-group">
                <br></br>
                <input type="text" placeholder='Search drugs by name' className="form-control" onChange={(e)=>search(e.target.value)}/><br/><br/> 
            </div>
            { cl===true &&
            <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone no</th>
                    <th>Action</th>
                </tr>
            </thead>
                {
                  paginateView.map((v,index)=>(
            <tbody key={index}>
                <tr>
                    <td >{v.id}</td>
                    <td ><Link to={`/pharmacy/drugs/${v.id}/${v.name}`}>{v.name}</Link></td>
                    <td >{v.address}</td>
                    <td >{v.phone_no}</td>
                    <td><Link className='btn btn-primary' to={`/pharmacy/update/${v.id}`}>Update</Link>
                    <Link className='btn btn-danger' to={`/pharmacy/delete/${v.id}`}>Delete</Link></td> 
                </tr>
            </tbody>
                    ))}
                    
            </table>  
}
{
    cl===false &&
    <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone no</th>
                    <th>Action</th>
                </tr>
            </thead>
                {
                  paginateView.map((v,index)=>(
            <tbody key={index}>
                <tr>
                    <td >{v.id}</td>
                    <td ><Link to={`/pharmacy/drugs/${v.id}/${v.name}`}>{v.name}</Link></td>
                    <td >{v.address}</td>
                    <td >{v.phone_no}</td>
                    <td><Link className='btn btn-primary' to={`/pharmacy/update/${v.id}`}>Update</Link>
                    <Link className='btn btn-danger' to={`/pharmacy/delete/${v.id}`}>Delete</Link></td> 
                </tr>
            </tbody>
                    ))}
                    
            </table>  

}
{ cl===true &&
            <nav className='d-flex justify-content-center'>
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
            </nav>}
            
        </div>
    )
}
export default ViewPharmacy;