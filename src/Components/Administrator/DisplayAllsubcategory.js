import { TextField,Button,Grid,Avatar } from "@material-ui/core";
import { useStyles } from "./DisplayAllSubcategoryCss";
import { useEffect,useState } from "react";
import { getData,postData, ServerURL } from "../Services/NodeServices";
import MaterialTable from "@material-table/core"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from "sweetalert2";

export default function DisplayAllSubCategory(){
    // Style
    var classes=useStyles()
    // State
    const [subCategories,setSubCategories]=useState([])
    const [subCategoryId,setSubCategoryId]=useState()
    const [categoryId,setCategoryId]=useState()
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryName,setSubCategoryName]=useState()
    const [subCategoryIcon,setSubCategoryIcon]=useState({url:'/icon.png',bytes:''})
    const [open,setOpen]=useState(false)
    const [btnStatus,setBtnStatus]=useState(false)
    const [uploadBtn,setUploadBtn]=useState(false)
    const [oldIcon,setOldIcon]=useState('')
    const[bannerpriority,setbannerpriority]=useState('')
    const fetchAllCategory=async()=>{
        var data=await getData('category/display_all_category')
        
        setCategoryList(data.data)
    } 
    
    const handleIcon=(event)=>{
        setSubCategoryIcon({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setBtnStatus(true)
        setUploadBtn(true)
    }
    
    const fetchAllSubCategory=async()=>{
        var result=await getData('subcategory/display_all_subcategory')
        setSubCategories(result.data)
    }
  
    const handleEditSubCategory=async()=>{
        setOpen(false)
        var body={categoryid:categoryId,subcategoryid:subCategoryId,subcategoryname:subCategoryName,bannerpriority:bannerpriority}
        var result=await postData('subcategory/edit_subcategory_data',body)
        if(result.status)
        
        {
            Swal.fire({
              icon: 'success',
              title: 'Record Updated Successfully',
                 
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
        
        fetchAllSubCategory()
    }
    
    const handleDeleteSubCategory=async()=>{
        setOpen(false)
        Swal.fire({
            title: 'Do you want to Delete the category?',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Cancel`,
          }).then (async(res) =>{
            /* Read more about isConfirmed, isDenied below */
            if (res.isConfirmed) {
               setOpen(false) 
             var body={subcategoryid:subCategoryId}
             var result=await postData('subcategory/delete_subcategory_data',body)
             
              if(result.status)
              Swal.fire('Deleted!', '', 'success')
              else
              Swal.fire('Server Error!','','error')
            } else if (res.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })       
        fetchAllSubCategory()
    } 
    
    const handleOpen=(rowData)=>{
        fetchAllCategory()
        setSubCategoryId(rowData.subcategoryid)
        setCategoryId(rowData.categoryid)
        setSubCategoryName(rowData.subcategoryname)
        setbannerpriority(rowData.bannerpriority)

        setSubCategoryIcon({url:`${ServerURL}/images/${rowData.subcategoryicon}`,bytes:''})
        setOldIcon(`${ServerURL}/images/${rowData.subcategoryicon}`)
        setOpen(true)
    }
    //close Dialog
    const handleClose=()=>{
        setOpen(false)
    }

    const fillCategories=()=>{
        return categoryList.map((item)=>{
           return(
            <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
           )
        })
      }

    const handleChange=(event)=>{
        setCategoryId(event.target.value)
       }


    const handleBanner=async(event)=>{
        setbannerpriority(event.target.value)
       }
       
    const handleCancel=()=>{
        setSubCategoryIcon({url:oldIcon,bytes:''})
        setBtnStatus(false)
        setUploadBtn(false)
    }
      // create a dynamic Button
    const saveAndCancelButton=()=>{
        return(
            <div>
                {btnStatus?<div style={{display:'flex',justifyContent:'space-between',width:'110%'}} ><Button onClick={handleSavePicture} color="primary" variant="contained">Save</Button><Button onClick={handleCancel} color="secondary" variant="contained">Cancel</Button></div>:<></>}
            </div>
        )
    }
    
    const handleSavePicture=async()=>{
        setOpen(false)
        var formData=new FormData()
        formData.append('subcategoryid',subCategoryId)
        formData.append('icon',subCategoryIcon.bytes)
        var result=await postData('subcategory/update_icon',formData,true)
        if(result.status)
        {
            Swal.fire({
              icon: 'success',
              title: 'Picture Updated Successfully',
                 
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
        setUploadBtn(false)
        setBtnStatus(false)
        setOldIcon('')
        fetchAllSubCategory()
    }


    useEffect(function(){
        fetchAllSubCategory()
    },[])
    
    
    const showSubCategory=()=>{
        return(
         <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <DialogContent>
                <Grid container spacing={2} className={classes.gridStyle}>
                    <Grid item xs={12} className={classes.headingText}>
                        Edit SubCategory
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
      </FormControl>        </Grid>
                    <Grid item xs={12}>
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
              {/* {fillbannerpriority()} */}
            </Select>
          </FormControl>

        </Grid>



                    <Grid item xs={6}>
                        <Button onClick={handleEditSubCategory}  fullWidth variant="contained"  color="primary">Edit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleDeleteSubCategory} fullWidth variant="contained"  color="primary">Delete</Button>
                    </Grid>
                    <Grid item xs={4} className={classes.center}>
                        <Button disabled={uploadBtn} color="primary" variant="contained" component="label" fullWidth onChange={handleIcon}>
                            Upload
                            <input hidden accept="image/*" multiple type="file" />
                        </Button>
                    </Grid>
                    <Grid item xs={4} className={classes.center}>
                        <Avatar
                            alt="SubCategory Icon"
                            src={subCategoryIcon.url}
                            sx={{ width: 70, height: 70 }}
                            variant="square"
                        />
                    </Grid>
                    <Grid item xs={4} className={classes.center}>
                        {saveAndCancelButton()}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
         </Dialog>
        )
    }
    function displayAllSubCategory(){
        return(
            <MaterialTable
            title="List of Sub Categories"
            columns={[
                { title: 'SubCategoryid', field: 'subcategoryid' },
                { title: 'CategoryName', field:'cn' },
                { title: 'SubCategoryName', field:'subcategoryname' },
                { title: 'Icon',render: (rowData) => <img src={`${ServerURL}/images/${rowData.icon}`} width='50' style={{borderRadius: 5}}/>},
                {title:'Banner Priority',field:'bannerpriority'}
            ]}
            data={subCategories}        
            actions={[
                {
                icon: 'edit',
                tooltip: 'Edit SubCategory',
                onClick: (event,rowData) =>handleOpen(rowData)
                },
                {
                    icon: 'add',
                    tooltip: 'Add User',
                    isFreeAction: true,
                    onClick: (event) => alert("You want to add a new row")
                }
             ]}
            />
        )
    }

    return(
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                {displayAllSubCategory()}
            </div>
                {showSubCategory()}
        </div>
    )
}

  
