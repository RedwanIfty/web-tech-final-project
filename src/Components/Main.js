import {BrowserRouter,Routes,Route} from 'react-router-dom';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Drugs from './Drugs';
import LeftMenu from './LeftMenu';
import Pharmacy from './Pharmacy';
import Register from './Register';
import UserDelete from './UserDelete';
import UserUpadate from './UserUpdate';
import ViewUser from './ViewUser';
const Main = ()=>{
    return (
        <div>
             <BrowserRouter>
               <LeftMenu/>
             
                <Routes>
                    <Route path="/register" element={<Register/>} />
                    <Route path="/drugs" element={<Drugs/>} />
                    <Route path="/pharmacy" element={<Pharmacy/>} />
                    <Route path="/view/user" element={<ViewUser/>}/>
                    <Route path='/user/update/:id/:name' element={<UserUpadate/>}/>
                    <Route path='/user/delete/:id' element={<UserDelete/>}/>
                </Routes>
            </BrowserRouter> 
            
            
        </div>
    )
}
export default Main;