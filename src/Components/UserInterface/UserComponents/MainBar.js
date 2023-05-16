import {useState,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import {Box,Badge }from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import {getData,postData} from "../../Services/NodeServices"
import { styled } from '@mui/material/styles';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PopCart  from './PopCart';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';



export default function MainBar(props) {
  const [category,setcategory]=useState([])
  const [categoryid,setcategoryid]=useState('')
  const [subcategory,setsubcategory]=useState([])
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [open,setOpen]=useState(false)
  const [refresh,setRefresh]=useState(false)

    const navigate = useNavigate();
   var cart=useSelector(state=>state.cart)
   var keys=Object.keys(cart)
   console.log("Header keys:",keys)

   const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
    setRefresh(!refresh);
  };
  const handlePopoverClose = (event) => {
    setAnchorEl(null);
    setOpen(false);
    setRefresh(!refresh);
  };


   
   const handleClick1=(event)=>{
        setAnchorEl(event.currentTarget)
        setOpen(true) 
        setRefresh(!refresh)
   
      }

   

  const handleover=(event)=>{
    event.target.style.background='#f1c40f'
  }
  const handleout=(event)=>{
    event.target.style.background="#fff"
  } 

  const handleClick= (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true)
    setcategoryid(event.currentTarget.value)
    fetchAllSubCategories(event.currentTarget.value)
    

  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false)
  };

const fetchAllCategories=async()=>{
   var result=await getData('userinterface/display_all_category')
   setcategory(result.data)
  
}

const fetchAllSubCategories=async(categoryid)=>{
  var result=await postData('userinterface/display_all_subcategory',{categoryid:categoryid})
  setsubcategory(result.data)
 
}


const showCategoryMenu=()=>{
    return  category.map((item)=>{
          
       return(<Button onMouseOver={handleover} onMouseOut={handleout} onClick={handleClick} value={item.categoryid} style={{color:'#000',fontWeight:'700', fontSize:17,margin:'8px'}} id="basic-button">{item.categoryname}</Button>)

    })
  }

  const showSubCategoryMenu=()=>{
    return  subcategory.map((item)=>{
          
       return(<MenuItem>{item.subcategoryname}</MenuItem>)

    })
  }

     useEffect(function(){
     fetchAllCategories()

     },[])

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"  style={{background:'#fff'}}>
        <Toolbar>
          <div  style={{display:'flex',justifyContent:'center', width:'100%' }}>
          {showCategoryMenu()}
          
          
          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {showSubCategoryMenu()}
        </Menu>
        </div>
      
         <div onClick={()=>navigate("/mycart")}
         
         style={{display:'flex',width:'20%',justifyContent:'right',color:'#000'}}>
          <Badge badgeContent={keys.length} color="error">
          <ShoppingCart 
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          
          />
          </Badge>
         </div> 
        </Toolbar>
         </AppBar>
    </Box>
    <PopCart anchorEl={anchorEl} open ={open}/>
    </>
  );
}
