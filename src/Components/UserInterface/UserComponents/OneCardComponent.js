import React, { useState, useEffect } from "react"
import { ServerURL } from "../../Services/NodeServices"
import {useNavigate } from "react-router"

export default function OneCardComponent(props) {
     var navigate=useNavigate()  
    const handleClick=(scid)=>{
    navigate(`/${props.url}/${scid}`) 
    console.log()

   }
    return props.data.map((item)=>{ 

        return (
               <div onClick={()=>handleClick (item.subcategoryid)} style={{marginBottom:30}}>
            <div style={{padding:10, marginBottom:20, position: 'relative', width:1235, height: 'auto' }}>
                <img src={`${ServerURL}/images/${item.icon}`} style={{ width: '100%', height: '100%' }} />
                <div Style={{ fontsize: 36, fontweight: 'bold', position: 'absolute', left: '50%', top: '80%', color: '#fff', zIndex: 1 }}></div>

            </div>
            </div>
        )

    })
}




