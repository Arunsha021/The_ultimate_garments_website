import Category from "./Category";
import DisplayAllCategory from "./DisplayAllCategory";
import {BrowserRouter as Router,Route,Routes } from "react-router-dom";
import DisplayAllsubcategory from "./DisplayAllsubcategory";
import Subcategory from "./Subcategory"
import Products from "./Products";
import DisplayAllProducts from "./DisplayAllProducts";
import Size from "./Size";
import Color from"./Color";
import DisplayAllSize from "./DisplayAllSize";
import DisplayAllColor from "./DisplayAllColor";
import Dashboard from "./Dashboard";
function App() {

  return (
    <div>
       <Router>
       <Routes>
      <Route element={<Category/>} path="/category"/>
      <Route element={<DisplayAllCategory/>} path="/displayallcategory"/>
      <Route element={<Subcategory/>} path="/subcategory"/>
      <Route element={<DisplayAllsubcategory/>} path="/displayallsubcategory"/>
      <Route element={<Products/>} path="/products"/>
      <Route element={<DisplayAllProducts/>} path="/displayallproducts"/>
      <Route element={<Size/>} path="/size"/>
      <Route element={<DisplayAllSize/>} path="/displayallsize"/>
      <Route element={<Color/>} path="/color"/>
      <Route element={<DisplayAllColor/>} path="/displayallcolor"/>
      <Route element={<Dashboard/>} path="/dashboard"/> 

            </Routes>
       </Router>
   </div>
  );
}

export default App;
