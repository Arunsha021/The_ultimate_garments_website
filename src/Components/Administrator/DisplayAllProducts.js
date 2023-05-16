import { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { Button, Grid, Avatar, TextField, Radio, RadioGroup, FormControlLabel, FormLabel } from "@material-ui/core";
import { useStyles } from "./DisplayAllProductsCss";
import { getData, postData, ServerURL } from "../Services/NodeServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from "sweetalert2"
import { useNavigate } from "react-router";

export default function DisplayAllProducts(props) {
  var classes = useStyles()
  var navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [categoryList, setCategoryList] = useState([])
  const [subCategoryList, setSubCategoryList] = useState([])
  const [subCategoryId, setSubCategoryId] = useState('')
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState('')
  const [offerPrice, setOfferPrice] = useState('')
  const [stock, setStock] = useState('')
  const [description, setDescription] = useState('')
  const [rating, setRating] = useState('')
  const [status, setStatus] = useState('continue')
  const [saleStatus, setSaleStatus] = useState('')
  const [open, setOpen] = useState(false)
  const [productId, setProductId] = useState('')
  const [picture, setPicture] = useState({ url: '/icon.png', bytes: '' })
  const [uploadBtn, setUploadBtn] = useState(false)
  const [oldIPicture, setOldIpicture] = useState('')
  const [btnStatus, setBtnStatus] = useState('')

  const handlePicture = (event) => {
    setPicture({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    setBtnStatus(true)
    setUploadBtn(true)
  }

  const handleSavePicture = async () => {
    setOpen(false)
    var formData = new FormData()
    formData.append('productid', productId)
    formData.append('picture', picture.bytes)
    var result = await postData('products/update_picture', formData, true)
    if (result.result) {
      Swal.fire({
        icon: 'success',
        title: 'Picture Edit Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }

    setBtnStatus(false)
    setUploadBtn(false)
    setOldIpicture('')
    fetchAllProducts()
  }

  const handleCancel = () => {
    setBtnStatus(false)
    setPicture({ url: oldIPicture, bytes: '' })
    setUploadBtn(false)
    setOldIpicture('')
  }

  const saveAndCancelButton = () => {
    return (<div>
      {btnStatus ? <div style={{ display: 'flex', width: 250, justifyContent: 'space-evenly' }}><Button onClick={handleSavePicture} color="primary" variant="contained">Save</Button>
        <Button onClick={handleCancel} color="secondary" variant="contained" >Cancel</Button></div> : <></>}
    </div>)
  }


  const fetchAllProducts = async () => {
    var data = await getData('products/display_all_products')
    setProducts(data.data)
  }
  useEffect(function () {
    fetchAllProducts()
  }, [])

  const handleSaleStatus = (event) => {
    setSaleStatus(event.target.value)
  }

  const handleCategoryId = (event) => {
    setCategoryId(event.target.value)
    fetchAllSubCategory(event.target.value)
}

const handleSubCategoryId = (event) => {
    setSubCategoryId(event.target.value)
    
}


  const fetchAllCategory = async () => {
    var data = await getData('category/display_all_category')
    setCategoryList(data.data)
  }

  const fetchAllSubCategory = async (cid) => {
    var data = await postData('subcategory/display_subcategory_by_category',{categoryid:cid})
    setSubCategoryList(data.data)
}


  useEffect(function () {
    fetchAllCategory()
  }, [])
 
const fillSubCategories = () => {
  return subCategoryList.map((item) => {
      return (
          <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      )
  })
}

  const fillCategories = () => {
    return categoryList.map((item) => {
      return (
        <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
      )
    })
  }

  const handleEditSubCaterogy = async () => {
    setOpen(false)
    var body = { categoryid: categoryId, subcategoryid:subCategoryId, productname: productName, price: price, offerprice: offerPrice, stock: stock, description: description, rating: rating, status: status, salestatus: saleStatus, productid: productId }
    var result = await postData('products/edit_products_data', body)
    if (result.status) {
      Swal.fire({
        icon: 'success',
        title: 'Record Edit Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
    fetchAllProducts()
  }

  const handleDeleteSubCategory = async () => {
    setOpen(false)
    Swal.fire({
      title: 'Are you sure?',
      text: "You want able to delete this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (res) => {
      if (res.isConfirmed) {
        var body = { productid: productId }
        var result = await postData('products/delete_products_data', body)
        if (result.status) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          fetchAllProducts()
        } else {
          Swal.fire('Server Error', '', 'error')
        }
      }
    })

  }

  const handleClose = (rowData) => {
    setOpen(false)
  }

  const handleOpen = (rowData) => {
    fetchAllSubCategory(rowData.categoryid)
    setProductId(rowData.productid)
    setCategoryId(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    setProductName(rowData.productname)
    setPrice(rowData.price)
    setOfferPrice(rowData.offerprice)
    setStock(rowData.stock)
    setDescription(rowData.description)
    setRating(rowData.rating)
    setStatus(rowData.status)
    setSaleStatus(rowData.salestatus)
    setOpen(true)
  }



  const showProducts = () => {
    return (<div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Grid className={classes.gridStyle} container spacing={2}>
            <Grid item className={classes.headingText} xs={12}>
              Edit Products Interface
            </Grid>
            <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categoryId}
                            label="Category Id"
                            onChange={handleCategoryId}
                        >
                           <MenuItem>Choose Category</MenuItem>
                            {fillCategories()}
                        </Select>
                    </FormControl>
                </Grid>
            <Grid item xs={4}>
            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label1">Sub Category Id</InputLabel>
                            <Select
                                labelId="demo-simple-select-label1"
                                id="demo-simple-select1"
                                value={subCategoryId}
                                label="Sub Category Id"
                                onChange={handleSubCategoryId}
                            >
                               <MenuItem>Choose Sub Category</MenuItem>
                                {fillSubCategories()}
                            </Select>
                        </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField value={productName} onChange={(event) => setProductName(event.target.value)} fullWidth variant="outlined" label="Product Name" />
            </Grid>
            <Grid item xs={4}>
              <TextField value={price} onChange={(event) => setPrice(event.target.value)} fullWidth variant="outlined" label="Price" />
            </Grid>
            <Grid item xs={4}>
              <TextField value={offerPrice} onChange={(event) => setOfferPrice(event.target.value)} fullWidth variant="outlined" label="Offer Price" />
            </Grid>
            <Grid item xs={4}>
              <TextField value={stock} onChange={(event) => setStock(event.target.value)} fullWidth variant="outlined" label="Stock" />
            </Grid>
            <Grid item xs={8}>
              <TextField value={description} onChange={(event) => setDescription(event.target.value)} fullWidth variant="outlined" label="Description" />
            </Grid>
            <Grid item xs={4}>
              <TextField value={rating} onChange={(event) => setRating(event.target.value)} fullWidth variant="outlined" label="Rating" />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                <RadioGroup
                  row value={status}

                  name="row-radio-buttons-group"
                >
                  <FormControlLabel onChange={(event) => setStatus(event.target.value)} value="continue" control={<Radio />} label="Continue" />
                  <FormControlLabel onChange={(event) => setStatus(event.target.value)} value="discontinue" control={<Radio />} label="Discontinue" />

                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sale Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={saleStatus}
                  label="Sale Status"
                  onChange={handleSaleStatus}
                >
                  <MenuItem value="Trending">Trending</MenuItem>
                  <MenuItem value="Popular">Popular</MenuItem>
                  <MenuItem value="Relevance">Relevance</MenuItem>
                  <MenuItem value="BottomWear">BottomWear</MenuItem>
                  
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={handleEditSubCaterogy} fullWidth color="primary" variant="contained">Edit</Button>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={handleDeleteSubCategory} fullWidth color="primary" variant="contained">Delete</Button>
            </Grid>
            <Grid item xs={3} className={classes.center}>
              <Button disabled={uploadBtn} fullWidth color="primary" variant="contained" component="label">
                Upload
                <input onChange={handlePicture} hidden accept="image/*" multiple type="file" />
              </Button>
            </Grid>
            <Grid item xs={3} className={classes.center}>
              <Avatar
                alt="Remy Sharp"
                src={picture.url}
                sx={{ width: 70, height: 70 }}
                variant="square"
              />
            </Grid>
            <Grid item xs={3} className={classes.center}>
              {saveAndCancelButton()}
            </Grid>


          </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>

        </DialogActions>
      </Dialog>

    </div>)
  }





  function displayProducts() {
    return (<MaterialTable
      title="List of Products"
      columns={[
        { title: 'Id', field: 'productid' },
        { title: 'Category', render:(rowData)=><div style={{display:'flex',flexDirection:'column'}}><div>{rowData.cn}</div><div>{rowData.scn}</div></div> },
        
        { title: 'Name', field: 'productname' },
        { title: 'Price', render:(rowData)=><div style={{display:'flex',flexDirection:'column'}}><div>{rowData.offerprice>0?<><div>Price:<s>{rowData.price}</s></div><div>Offer:{rowData.offerprice}</div></>:rowData.price}</div><div>Stock:{rowData.stock}</div></div> } ,
        { title: 'Description', field: 'description' },
        { title: 'Rating', field: 'rating' },
       
        { title: 'Sale Status',render:(rowData)=><div style={{display:'flex',flexDirection:'column'}}><div>{rowData.status}</div><div>{rowData.salestatus}</div></div> },
        { title: 'Picture', render: (rowData) => <img src={`${ServerURL}/images/${rowData.picture}`} width='60' height='60' style={{ borderRadius: 5 }} /> },
      ]}
      data={products}
      actions={[
        {
          icon: 'edit',
          tooltip: 'Edit SubCategory',
          onClick: (event, rowData) => handleOpen(rowData)
        }, {
          icon: 'add',
          tooltip: 'Add Products',
          isFreeAction: true,
          onClick: (event) => navigate("/products")
        }
      ]}
      options={{
        rowStyle: {
          backgroundColor: '#EEE',
        }
      }}
    />

    )
  }


  return (<div className={classes.mainContainer}>
    <div className={classes.box}>
      {displayProducts()}
    </div>
    {showProducts()}
  </div>)

}