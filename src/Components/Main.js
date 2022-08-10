import {BrowserRouter,Routes,Route} from 'react-router-dom';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Drugs from './Drugs';
import DrugsDelete from './DrugsDelete';
import DrugsUpdate from './DrugsUpdate';
import LeftMenu from './LeftMenu';
import Pharmacy from './Pharmacy';
import PharmacyDelete from './PharmacyDelete';
import PharmacyUpdate from './PharmacyUpdate';
import Register from './Register';
import UserDelete from './UserDelete';
import UserUpdate from './UserUpdate';
import ViewDrugs from './ViewDrugs';
import ViewPharmacy from './ViewPharmacy';
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
                    <Route path='/user/update/:id/:name' element={<UserUpdate/>}/>
                    <Route path='/user/delete/:id' element={<UserDelete/>}/>
                    <Route path="/view/pharmacy" element={<ViewPharmacy/>}/>
                    <Route path='/pharmacy/delete/:id' element={<PharmacyDelete/>}/>
                    <Route path='/pharmacy/update/:id' element={<PharmacyUpdate/>}/>
                    <Route path="/view/drugs" element={<ViewDrugs/>}/>
                    <Route path='/drugs/delete/:id' element={<DrugsDelete/>}/>
                    <Route path='/drugs/update/:id/:name' element={<DrugsUpdate/>}/>
                        
                </Routes>
            </BrowserRouter> 
            
            
        </div>
    )
}
export default Main;