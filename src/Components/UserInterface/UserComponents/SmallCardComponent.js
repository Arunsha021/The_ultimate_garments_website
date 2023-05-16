import { red } from '@mui/material/colors'
import React, { useState, useEffect } from 'react'
import { ServerURL } from '../../Services/NodeServices'




export default function SmallCardComponent(props) {

    return props.data.map((item)=>{

        return (
            <div style={{padding:15,margin:5,position: 'relative', width:250, height: 300,cursor:'pointer'}}>
                <img title={item.subcategoryname} src= {`${ServerURL}/images/${item.picture}`} style={{ width: '100%', height: '100%' }} />
                <div style={{ fontSize: 22, fontWeight: 'bolder', position: 'absolute', top:'86%', color: '#FFF', zIndex: 1,width:270,textAlign:'center'}}>{item.productname}</div>
            </div>

        )
    }
    )


}
