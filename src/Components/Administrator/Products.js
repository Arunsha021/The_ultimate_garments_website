import { useState, useEffect } from "react"
import { useStyles } from "./ProductsCss";
import { Avatar, TextField, Grid, Button, MenuItem, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, } from "@mui/material";
import { getData, postData } from "../Services/NodeServices";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Swal from "sweetalert2";



export default function Products(props) {
  var classes = useStyles()
  const [categoryId, setCategoryId] = useState('')
  const [categoryList, setCategoryList] = useState([])
  const [subcategoryList, setsubCategoryList] = useState([])
  const [subcategoryid, setsubCategoryId] = useState('')
  const [productName, setProductname] = useState('')
  const [price, setPrice] = useState('')
  const [offerPrice, setOfferPrice] = useState('')
  const [stock, setStock] = useState('')
  const [description, setDescription] = useState('')
  const [rating, setRating ]= useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('continue')
  const [salestatus, setSalestatus] = useState('')
  const [picture,setPicture] = useState({ url: '/icon.png', bytes: '' })
  
  const handlePicture = (event) => {
    setPicture({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })

  }
  const fetchAllCategory = async () => {
    var data = await getData('category/display_all_category')
    setCategoryList(data.data)
  }

    const fetchAllSubCategory = async (cid) => {
     var data = await postData('subcategory/display_subcategory_by_category',{categoryid:cid})
      setsubCategoryList(data.data) 
  
  }
  useEffect(function () {
    fetchAllCategory()

  }, [])

  const handleCategoryId = (event) => {
    setCategoryId(event.target.value)
    fetchAllSubCategory(event.target.value)
  }
  const handleSubCategoryId = (event) => {
    setsubCategoryId(event.target.value)
  }

  const fillCategories = () => {
    return categoryList.map((item) => {
        return (
          <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        )
      })
  }
  const fillSubCategories = () => {
    return subcategoryList.map((item) => {
        return (
            <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        )
    })
}


  const handleChange = (event) => {
    setSalestatus(event.target.value)
  }


  const handleSubmit = async () => {
    var formData = new FormData()
    formData.append('categoryid', categoryId)
    formData.append('subcategoryid', subcategoryid)
    formData.append('productname', productName)
    formData.append('price', price)
    formData.append('offerprice', offerPrice)
    formData.append('stock', stock)
    formData.append('description', description)
    formData.append('rating', rating)
    formData.append('status', status)
    formData.append('salestatus', salestatus)
    formData.append('picture',picture.bytes)
    var result = await postData('products/add_new_products', formData, true)
    
    if (result.Status) {
      Swal.fire({
        icon: 'success',
        title: 'Record Submitted Successfully',

      })

    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',

      })
    }
  }
  const handleReset = () => {
    setCategoryId('')
    setsubCategoryId('')
    setProductname('')
    setPrice('')
    setOfferPrice('')
    setStock('')
    setDescription('')
    setRating('')
    setStatus('')
    setSalestatus('')
    setPicture({url: '/icon.png', bytes: ''})
}


  return (<div className={classes.mainContainer}>
    <div className={classes.box}>

      <Grid className={classes.GridStyle} container spacing={3}>
        <Grid item className={classes.headingText} xs={12}>
          Product Name
        </Grid>
        <Grid item xs={6}>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categoryId}
              label="Category Id"
              onChange={handleCategoryId}
            >
              {fillCategories()}

            </Select>
          </FormControl>

        </Grid>
        <Grid item xs={6}>
        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label1">Sub Category Id</InputLabel>
                            <Select
                                labelId="demo-simple-select-label1"
                                id="demo-simple-select1"
                                value={subcategoryid}
                                label="Sub Category Id"
                               onChange={handleSubCategoryId}
                            >
                                <MenuItem >Choose SubCategory</MenuItem>
                                {fillSubCategories()}
                            </Select>
                        </FormControl>
                   
    </Grid>
        <Grid item xs={12}>
          <TextField value={productName} onChange={(event) => setProductname(event.target.value)} fullWidth variant="outlined" label="Product Name" />
        </Grid>
        <Grid item xs={4}>
          <TextField value={price} onChange={(event) => setPrice(event.target.value)} fullWidth variant="outlined" label="Price" />
        </Grid>
        <Grid item xs={4}>
          <TextField value={offerPrice} onChange={(event) => setOfferPrice(event.target.value)} fullWidth variant="outlined" label=" offer Price" />
        </Grid>
        <Grid item xs={4}>
          <TextField value={stock} onChange={(event) => setStock(event.target.value)} fullWidth variant="outlined" label=" stock" />
        </Grid>
        <Grid item xs={12}>
          <TextField value={description} onChange={(event) => setDescription(event.target.value)} fullWidth variant="outlined" label="Description" />
        </Grid>
        <Grid item xs={4}>
          <Typography component="legend"> Product Rating</Typography>
          <Rating
            name="simple-controlled"
            row value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Grid>

        <Grid item xs={4}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
            <RadioGroup
              row value={status}
              name="row-radio-buttons-group"
            >
              <FormControlLabel onChange={(event) => setStatus(event.target.value)} value="continue" control={<Radio />} label="continue " />
              <FormControlLabel onChange={(event) => setStatus(event.target.value)} value="discontinue" control={<Radio />} label="discontinue" />
            </RadioGroup>
          </FormControl>

        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sale Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={salestatus}
              label="Sale Status"
              onChange={handleChange}
            >
              <MenuItem value="Trending">Trending</MenuItem>
              <MenuItem value="Popular">Popular</MenuItem>
              <MenuItem value="Relevance">Relevance</MenuItem>
              <MenuItem value="BottomWear">BottomWear</MenuItem>
            </Select>
          </FormControl>

        </Grid>
        <Grid item xs={6} className={classes.center}>
          <Button onChange={handlePicture} fullWidth variant="contained" component="label">
            Upload Picture
            <input hidden accept="image/*" multiple type="file" />
          </Button>
        </Grid>
        <Grid item xs={6} className={classes.center}>
          <Avatar
            alt="Remy Sharp"
            src={picture.url}
            sx={{ width: 70, height: 70 }}
            variant="Square"
          />
        </Grid>
        <Grid item xs={6}>
          <Button onClick={handleSubmit} fullWidth color="success" variant="contained">Submit</Button>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={handleReset} fullWidth variant="contained">Reset</Button>
        </Grid>





      </Grid>


    </div>
  </div>)

}