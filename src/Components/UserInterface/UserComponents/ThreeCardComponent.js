import { style } from "@mui/system"
import React, { useState, useEffect } from "react"
import { ServerURL } from "../../Services/NodeServices"

export default function ThreeCardComponent(props) {

    return props.data.map((item)=>{
 
        return(
        <div style={{padding:15,margin:5,position:'relative',width:320,height:'auto',cursor:'pointer'}}>
       <img src={`${ServerURL}/images/${item.picture}`} style={{width:'100%',height:'100%'}}/> 
       <div style={{fontSize:24,fontWeight:'bolder',position:'absolute',top:'80%',color:'#fff',zIndex:1,width:350,textAlign:'center'}}>{item.productname}</div>


        </div>     
     

        
        )



    })





}