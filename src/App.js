import {BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Adminlogin from "./Components/Administrator/Adminlogin";
import Dashboard from "./Components/Administrator/Dashboard";
import Home from "./Components/UserInterface/Home";
import ProductDetailFilling from "./Components/UserInterface/UserComponents/ProductDetailFilling";
import ProductList  from "./Components/UserInterface/ProductList";
import SetProductDetails from "./Components/UserInterface/SetProductDetails";
import RatingLogo from "./Components/UserInterface/UserComponents/RatingLogo";
import ProductDetailsComponent from "./Components/UserInterface/UserComponents/ProductDetailsComponent";
import Footer from "./Components/UserInterface/UserComponents/Footer";
import DeliveryOptions from "./Components/UserInterface/UserComponents/DeliveryOptions";
import MyCart from "./Components/UserInterface/MyCart";


function App() {

    return (
    <div>
      <div style={{display:'flex',direction:'row'}}>
       <Router>
       <Routes>
      
      
      <Route element={<Dashboard/>}  path="/dashboard/*"/> {/* (*) Represent the Dashboard ke saare routes  */}
      <Route element={<Adminlogin/>} path="/adminlogin"/>
      <Route element={<Home/>} path="/home"/>
      <Route element={<ProductList/>} path="/productlist/:id"/> 
      <Route element={<SetProductDetails/>} path="/setproductdetails"/>
      <Route element={<ProductDetailFilling/>} path="/productdetailfilling"/>
      <Route element={<ProductDetailsComponent/>} path="/productdetailscomponent"/>
      <Route element={<RatingLogo/>} path="/ratinglogo"/>
      <Route element={<Footer/>} path="/footer"/>
      <Route element={<DeliveryOptions/>} path="deliveryOptions"/>
      <Route element={<MyCart/>} path="mycart"/>
    </Routes>
    </Router>
    </div>
    </div>
   );
 } 

export default App;
