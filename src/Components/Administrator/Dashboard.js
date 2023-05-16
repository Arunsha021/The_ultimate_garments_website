 import * as React from 'react';
 import AdminAppBar from './AdminAppBar';
 import SideList from './SideList'
 import Category from "./Category";
 import DisplayAllCategory from "./DisplayAllCategory";
 import DisplayAllsubcategory from "./DisplayAllsubcategory";
 import Subcategory from "./Subcategory"
 import Products from "./Products";
 import DisplayAllProducts from "./DisplayAllProducts";
 import Size from "./Size";
 import Color from"./Color";
 import DisplayAllSize from "./DisplayAllSize";
 import DisplayAllColor from "./DisplayAllColor";
 import BannerImages from "./BannerImages";
 import ImageInterface from "./ImageInterface";
 import { Routes,Route } from "react-router-dom";


  export default function Dashboard(props) {
  return(
   <div style={{display:'flex',flexDirection:'column',width:'100%',height:'100%'}}>
   <AdminAppBar postion="static" />

   <div style={{display:'flex'}}>
   <div style={{width:'20%'}}>   
   <SideList/> 
   </div>   
   <div style={{width:'80%'}}>
      
      <Routes>
       
        <Route element={<Category/>} path="/category"/>
        <Route element={<DisplayAllCategory/>} path="/Displayallcategory"/>
        <Route element={<DisplayAllsubcategory/>} path="/Displayallsubcategory"/> 
        <Route element={<Subcategory/>} path="/subcategory"/>
        <Route element={<Products/>} path="/products"/>
         <Route element={<DisplayAllProducts/>} path="/displayallproducts"/> 
        <Route element={<Size/>} path="/size"/>
        <Route element={<Color/>} path="/color"/>
        <Route element={<DisplayAllSize/>} path="/Displayallsize"/>
        <Route element={<DisplayAllColor/>} path="/Displayallcolor"/>
        <Route element={<BannerImages/>} path="/bannerimages"/>
        <Route element={<ImageInterface/>} path="/imageinterface"/>

      </Routes>
   
      </div>
      </div>
       </div>
    
   

  )
}