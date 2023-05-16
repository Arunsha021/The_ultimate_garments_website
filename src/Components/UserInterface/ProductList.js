import React ,{useState,useEffect} from "react"
import { postData } from "../Services/NodeServices"
import { useParams } from "react-router";
import { Grid } from "@material-ui/core";
import ProductDetailsComponent from "./UserComponents/ProductDetailsComponent";
import MainBar from "./UserComponents/MainBar";
import SearchBar from "./UserComponents/SearchBar";
import Footer from "./UserComponents/Footer";
import FilterComponent from "./UserComponents/FilterComponent";
import { ServerURL } from "../Services/NodeServices";


export default function ProductList(props){
 
     const[ProductList,setProductList]=useState([]);
     const {id,icon}=useParams()
     
     const fetchAllproductsBysubcategory=async()=>{
          
     var body={subcategoryid:id}
     const result=await postData("userinterface/fetch_all_products_by_subcategory",body);       
    
    setProductList(result.data)
     };

    useEffect(function (){
    fetchAllproductsBysubcategory()

    },[]); 
     return (<div>
          <SearchBar/>
          <MainBar/>
          <div style={{
           display:"flex",
           flexDirection:"column",
           justifyContent:"center",
           alignItems:"center",
           paddingLeft:100,
           paddingRight:100,
          }}
          >
          <div style={{width:'100%',height:'auto',marginBottom:20,marginTop:10}}>
          <img src={`${ServerURL}/images/${icon}`} style={{width:'100%',height:250}}/>
 
          </div>
          </div>

          <Grid container spacing={2}>
          <Grid item xs={3}>
           <FilterComponent/>  
          </Grid>
          <Grid item xs={9}>    
          <div
          style={{ display: 'flex',
          padding:2,
          margin:3,
          flexWrap: 'wrap',
          justifyContent: 'center', 
          alignItems: 'center', 
          paddingLeft:100,
          paddingRight:100,
         }}
         >

         <ProductDetailsComponent data={ProductList}/>

     </div>
     </Grid>
     
     </Grid>
     <Footer/>
     </div>);

     }



