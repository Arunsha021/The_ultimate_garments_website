import {TextField,Button,Grid} from "@mui/material";
import {useState,useEffect} from "react";
import Avatar from '@mui/material/Avatar';
import { useStyles } from "./SubcategoryCss";
import { getData, postData } from "../Services/NodeServices";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router";


export default function SubCategory(props)
{   var classes=useStyles() 
    var navigate=useNavigate()
    const [categoryList,setCategoryList]=useState([])
    const [categoryId,setCategoryId]=useState()
    const [bannerpriority,setbannerpriority]=useState()
    const [subCategoryName,setSubCategoryName]=useState()
    const [subCategoryIcon,setSubCategoryIcon]=useState({url:'/icon.png',bytes:''})
    const fetchAllCategory=async()=>{
        var data=await getData('category/display_all_category')
        
        setCategoryList(data.data)
    }
    useEffect(function(){
     fetchAllCategory() 

    },[])
  
    const fillCategories=()=>{
    return categoryList.map((item)=>{
       return(
        <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
       )
    })
  }
    const handleIcon=(event)=>{
        setSubCategoryIcon({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }
    
    const handleSubmit=async()=>{
        var formData=new FormData()
        formData.append('categoryid',categoryId)
        formData.append('subcategoryname',subCategoryName)
        formData.append('icon',subCategoryIcon.bytes)
        setSubCategoryName('')
        setbannerpriority('')
        setSubCategoryIcon({url:'/icon.png',bytes:''})
  
        var result=await postData('subcategory/add_new_subcategory',formData,true)
        if(result.result)
        {
            Swal.fire({
              icon: 'success',
              title: 'Record Submitted Successfully',
                 
            })
          }

          else

          {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              
            })
          }
        
    
          }
    const handleReset=()=>{
        setCategoryId('')
        setSubCategoryName('')
        setSubCategoryIcon({url:'/icon.png',bytes:''})
    }
   const handleChange=(event)=>{
    setCategoryId(event.target.value)

   }
   const handleBanner=async(event)=>{
    setbannerpriority(event.target.value)

   }

    return(
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                <Grid container spacing={2} className={classes.gridStyle}>
                    <Grid item xs={12} className={classes.headingText}>
                        SubCategory Interface
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoryId}
          label="Category Id"
          onChange={handleChange}
        >
        {fillCategories()}
          
        </Select>
      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField value={subCategoryName} onChange={(event)=>setSubCategoryName(event.target.value)} variant="outlined" fullWidth  label="SubCategory Name" />
                    </Grid>
                    <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Banner Priority</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={bannerpriority}
              label="bannerpriority"
              onChange={handleBanner}
            >
              <MenuItem value= {'1'}>1</MenuItem>
              <MenuItem value={'2'}>2</MenuItem>
              <MenuItem value={'3'}>3</MenuItem>
              <MenuItem value={'4'}>4</MenuItem>
               
            </Select>
          </FormControl>

        </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Button variant="contained" color="secondary" component="label" fullWidth onChange={handleIcon}>
                            Upload SubCategory Icon
                            <input hidden accept="image/*" multiple type="file" />
                        </Button>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Avatar
                            alt="SubCategory Icon"
                            src={subCategoryIcon.url}
                            sx={{ width: 70, height: 70 }}
                            variant="circle"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleSubmit} fullWidth variant="contained"  color="success">Submit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleReset} fullWidth variant="contained"  color="primary">Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )


}




