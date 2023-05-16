import React, { useState, useEffect } from "react";
import { Button, Grid } from '@mui/material';
import FavouriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import SizeChart from "./SizeChart";
import { useStyles } from "./ProductDetailFillingCss";
import { postData } from "../../Services/NodeServices";
import PlusMinusComponent from "./PlusMinusComponent";
import ColorComponent from "./ColorComponent";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import DeliveryOptions from "./DeliveryOptions";
import { useNavigate } from "react-router";
// import SizeComponent from "./SizeComponent";

export default function ProductDetailFilling(props) {
  var product = JSON.parse(props.productInfo)
  var navigate=useNavigate()
  var classes = useStyles()

  var cart=useSelector(state=>state.cart)
  var selectedProduct=cart[product.productid]
  var keys=Object.keys(cart)
  var selectedQty=null
   

  if(keys?.length>0)
  {
   selectedQty=selectedProduct?.qty
    product['size']=selectedProduct?.size
    product['color']=selectedProduct?.color
    product['qty']=selectedProduct?.qty

  }

   
  const [size, setSize] = useState([]);
  const [selectedColor,setSelectedColor]=useState(null);
  const [selectedSize,setselectedSize]=useState(null);
  const [qty, setQty] = useState(selectedQty);
  const [msg,setmsg]=useState('');
  
  const [colors, setColors] = useState(null)

  var dispatch = useDispatch()

  const handleSize = (index) => {
     setSelectedColor(null)

     setQty(null)
    var temp =size.map((item) => {
      return { 'sizeid': item.sizeid, 'status': false }
    })

    temp[index].status = true
    setselectedSize(temp[index].sizeid)
    console.log("TEMP", temp)
    setSize([...temp])
    fetchAllColors(temp[index].sizeid)
     product['size']=temp[index].sizeid 
     if(selectedSize!=null && selectedColor!=null)
      dispatch({type:'ADD_CART',payload:[product.productid,product]})

  }
  const fetchAllColors = async(sizeid) => {

    var result = await postData('userinterface/display_all_color_by_size', { productid: product.productid, sizeid: sizeid })

    var pcolor = JSON.parse(result.data[0].color)

    setColors(pcolor)

  }
  
    useEffect(function () {
    fetchAllSize() 
  }, []) 

  const fetchAllSize = async () => {
    var result = await postData('userinterface/display_all_color_by_productid', { productid: product.productid })
    // var sizes=Object.values(JSON.parse(result.data[0].size))
    var sizes = result.data.map((item)=>{
      if(keys>0 && selectedProduct!='undefined'&& selectedProduct.size==item.sizeid)
     { fetchAllColors(item.sizeid) 
       return { 'sizeid': item.sizeid, 'status': true }}
    else
    { 
        return {'sizeid':item.sizeid,'status':false}}

    })

    setSize(sizes)
    // console.log('XXXXXX',sizesJson)


  }
  const showSize = () => {
    return size.map((item, i) => {
      return (<div onClick={() => handleSize(i)} style={{ border: item.status ? '3px solid #51cccc' : '1px solid #51cccc' }} className={classes.selectionSize} >{item.sizeid}</div>)

    })
  }

  const handleQtyChange = (value) => {
    if(selectedSize!=null && selectedColor!=null)
    {   
     if(value==0)
     {
       dispatch({type:'DELETE_CART',payload:[product.productid,product]})
     }
     else
     {
     product['qty']=value
     product['size']=selectedSize
     product['color']=selectedColor 
     dispatch({type:'ADD_CART',payload:[product.productid,product]})
     setQty(value)
     }
     
   }
    else
     {
        setmsg()
        // alert("pls Select Size & Color Both")
        setQty(null)
     } 
     props.updateCart()
   }
     const handleColor=(value)=>{
     setSelectedColor(value)
      setQty(0)
      product['color']=(value)
      if(selectedSize!=null && selectedColor!=null)
      dispatch({type:'ADD_CART',payload:[product.productid,product]})
     }
     
      return (<div className={classes.container}>
          <div className={classes.box}>
         <Grid container spacing={2}>

        <Grid item xs={5}>
          <div className={classes.heading1}>{product.productname}</div>
        </Grid>

        <Grid item xs={5}>
          <div className={classes.favIcon} ><FavouriteBorderIcon fontSize="medium" /></div>
        </Grid>

        <Grid item xs={10}>
          <div className={classes.price}>

            {product.offerprice > 0 ? <><span style={{ color: '#000' }}>&#8377;{product.offerprice}</span><span style={{ marginLeft: 7, textDecoration: 'line-through', color: 'red' }}>&#8377;{product.price}</span><span style={{ marginLeft: 7, color: 'green' }}>Save &#8377;{product.price - product.offerprice}</span></> : <><span>&#8377; {product.price}</span><span>Fixed Price</span></>}
          </div>

          <div> Inclusive of All Taxes + Free Shipping</div>

        </Grid>

        <Grid item xs={5}>
          <div className={classes.size}>SIZE</div>
        </Grid>

        <Grid item xs={5}>
          <SizeChart />
        </Grid>
        <Grid item xs={10}>
          {showSize()}
          {/* <div style={{display:'flex',fontsize:14,color:'red'}} msg> */}
            {/* Please Select a Size */}
          {/* </div> */}
        </Grid>

        <Grid item xs={10}>
          {<ColorComponent colorlist={colors} onClick={(value) => handleColor(value)}
            colorName={selectedProduct && selectedProduct.color}
          />}
        </Grid>

        <Grid item xs={4}>
          <PlusMinusComponent value={qty} onChange={handleQtyChange} />
        </Grid>
        <Grid item xs={4} >
          <Button variant="contained" fullWidth style={{ background: '#ffff00', color: '#000' }}><ArrowCircleRightOutlinedIcon /> BUY NOW </Button>
        </Grid>

        <Grid item xs={8}>
           <Button variant="contained" onClick={()=>navigate("/home")} fullWidth style={{background:'#2c3e50'}}>
            <ArrowCircleRightOutlinedIcon/>  Continue Shopping </Button>
          

        </Grid>


        <Grid item xs={10}>
        <DeliveryOptions/>  
          
        </Grid>

    </Grid>
    </div>
  </div>)
 }

  










