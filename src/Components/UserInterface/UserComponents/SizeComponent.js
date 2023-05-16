import React from "react";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { postData } from "../../Services/NodeServices";
import { useStyles } from "./ProductDetailFillingCss";


export default function SizeComponent(props) {
    var product=JSON.parse(props.productInfo) 
    var classes= useStyles()

    const [size, setsize] = useState('')
    const [colors,setColors]=useState(null)


    const handleSize = (index) => {

        var temp = size.map((item) => {
            return { 'sizeid': item.sizeid, 'status': false }

        })
        temp[index].status = true

        console.log("temp", temp)
        setsize([...temp])
        // fetchAllColors(temp[index].sizeid)

    }
    useEffect(function () {
        fetchAllSize()
    }, [])

    const fetchAllSize = async () => {
        var result = await postData('userinterface/display_all_color_by_productid', { productid: product.productid })
        // var sizes=Object.values(JSON.parse(result.data[0].size))
        var sizes = result.data.map((item) => {
            return { 'sizeid': item.sizeid, 'status': false }
        })

        const fetchAllColors=async(sizeid)=>{
  
            var result=await postData('userinterface/display_all_color_by_size',{productid:product.productid,sizeid:sizeid})
            
            var pcolor=JSON.parse(result.data[0].color)
          
            setColors(pcolor)
            
          }
          


        setsize(sizes)
        //console.log('xxxxx',sizesJson)

    }
    const showSize = () => {
        return size.map((item, i) => {
            return (<div onClick={() => handleSize(i)} style={{ border: item.status ? '3px solid #51cccc' : '1px solid #51cccc' }} className={classes.selectionSize} >{item.sizeid}</div>)
        })
    }


    return (<div>
        <Grid item xs={10}>
            {showSize}
        </Grid>
    </div>)



}