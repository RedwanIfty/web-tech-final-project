import {useState,useEffect} from 'react';
import axiosConfig from './axiosConfig';
import {Link} from 'react-router-dom';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import _ from 'lodash';
const pageSize=10
const ViewPharmacy=()=>{
    const[view,setView]=useState([]);
    const[paginateView,setpaginateView]=useState();
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
    return(
        <div>
             <table className='table table-striped'>
            <tbody>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone no</th>
                    <th>Action</th>
                </tr>
                {
                    view.map((v,index)=>(
            
                <tr key={index}>
                    <td >{v.id}</td>
                    <td ><Link to={`/pharmacy/drugs/${v.id}/${v.name}`}>{v.name}</Link></td>
                    <td >{v.address}</td>
                    <td >{v.phone_no}</td>
                    <td><Link to={`/pharmacy/update/${v.id}`}>Update</Link>
                    ||<Link to={`/pharmacy/delete/${v.id}`}>Delete</Link></td> 
                </tr>

                    ))}
                    </tbody>
            </table> 
            { 
                cl &&
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
            </nav>
            }
        </div>
    )
}
export default ViewPharmacy;