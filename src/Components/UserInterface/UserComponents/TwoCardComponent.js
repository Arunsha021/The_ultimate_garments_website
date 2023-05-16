import React, { useEffect, useState } from "react"
import { ServerURL } from "../../Services/NodeServices"
import { Button } from "@mui/material"

export default function TwoCardComponent(props) {

    return props.data.map((item) => {

        return (
            <div style={{ padding: 20, margin: 5, position: 'relative', width:420, height:'auto',cursor:'pointer',textAlign:'center'}}>
            <img src={`${ServerURL}/images/${item.picture}`} style={{width:'100%',height:'100%'}}/>
            <div style={{Display:'flex',fontSize:24, fontWeight:'bolder',position:'absolute',left:'20%',top:'60%',zIndex:1,color:'#fff',width:'auto',textAlign:'center',}}> <Button variant="contained" color="warning">  Shop Now </Button>  </div>
            </div>



        )
    })
}