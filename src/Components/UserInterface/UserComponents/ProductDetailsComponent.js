import React,{useEffect,useState} from "react"
import { ServerURL } from "../../Services/NodeServices"
import { useNavigate } from "react-router"
export default function ProductDetailsComponent(props){
  var navigate=useNavigate()
    const handleProductDetails=(item)=>{
       navigate('/setproductdetails',{state:{product:JSON.stringify(item)}})

    }

       return props.data.map((item)=>{
         
        return(<div onClick={()=>handleProductDetails(item)} style={{ padding:4,margin:3,display:'flex',flexDirection:'column'}}>
              <div style={{position:'relative', width:290,height:340}}>
              <img src={`${ServerURL}/images/${item.picture}`} style={{width:'100%',height:'100%'}}/>
              <div style={{fontSize:20,fontWeight:'bold',position:'absolute',top:'90%',color:'#FFF',zIndex:1,width:270,textAlign:'center'}}>{item.description}</div>
              </div>
               <div style={{marginTop:5,color:'#000',fontWeight:700,letterSpacing:1,fontSize:16}}>
                {item.productname}
               </div>
               <div style={{marginTop:3,fontWeight:600,letterSpacing:1,fontSize:14}}>
                 {item.offerprice>0?<><span style={{color:'#000'}}>&#8377;{item.offerprice}</span><span style={{marginLeft:7,textDecoration:'line-through',color:'red'}}>&#8377;{item.price}</span><span style={{marginLeft:7,color:'green'}}>Save &#8377;{item.price-item.offerprice}</span></>:<><span>&#8377; {item.price}</span><span>Fixed Price</span></>}
               </div>
              </div>
       
        )})
      
       



}