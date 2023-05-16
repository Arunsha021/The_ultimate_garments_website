import { useState, useEffect } from "react";
import { useStyles } from "./ColorCss"
import { TextField, Grid, Button } from "@mui/material";
import { getData, postData } from "../Services/NodeServices";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from "sweetalert2";
import MaterialTable from "material-table";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useNavigate } from "react-router";

export default function DisplayAllColor(props) {
    var classes = useStyles()
    var navigate= useNavigate()

    const [colors, setColors] = useState([])
    const [open, setOpen] = useState(false)
    const [categoryList, setcategoryList] = useState([])
    const [categoryid, setcategoryid] = useState('')
    const [subcategoryid, setsubcategoryid] = useState('')
    const [subcategoryList, setsubcategoryList] = useState([])
    const [productid, setproductid] = useState('')
    const [productList, setproductList] = useState([])
    const [sizeid, setsizeid] = useState('')
    const [sizeList, setsizeList] = useState([])
    const [color, setcolor] = useState('')
    const [colorId, setcolorId] = useState([])


    const fetchAllColors = async () => {
        var data = await getData('color/display_all_color')
        setColors(data.data)

    }
    
    useEffect(function () {
        fetchAllColors()
    }, [])

    const fetchAllCategory = async () => {
        var data = await getData('category/display_all_category')
        setcategoryList(data.data)

    }
    useEffect(function () {
        fetchAllCategory()
    }, [])
    
    const fillCategories = () => {
        return categoryList.map((item) => {
            return (
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )

        })
    }

    const fetchAllSubCategory = async (cid) => {
        var data = await postData('subcategory/display_subcategory_by_category', { categoryid: cid })
        setsubcategoryList(data.data)
    }

    const fillSubCategories = () => {
        return subcategoryList.map((item) => {
            return (
                <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>

            )
        })
    }

    const fetchAllProducts = async (scid) => {
        var data = await postData('products/display_products_by_subcategory', { subcategoryid: scid })
        setproductList(data.data)

    }

    const fillProducts = () => {
        return productList.map((item) => {
            return (
                <menuItem value={item.productid}>{item.productname}</menuItem>
            )
        })
    }

    const fetchAllSize = async (pid) => {
        var data = await postData('size/display_size_by_products', { productid: pid })
        setsizeList(data.data)
    }


    const fillsize = () => {
        return sizeList.map((item) => {
            return (
                <menuItem value={item.sizeid}>{item.size} </menuItem>
            )
        })

    }

    const handleCategoryId = (event) => {
        setcategoryid(event.target.value)
        fetchAllSubCategory(event.target.value)
    }

    const handleSubCategoryId = (event) => {
        setsubcategoryid(event.target.value)
        fetchAllProducts(event.target.value)
    }

    const handleProductId = (event) => {
        setproductid(event.target.value)
        fetchAllSize(event.target.value)
    }

    const handleSizeId = (event) => {
        setsizeid(event.target.value)
    }
    const handleClose = (rowData) => {
        setOpen(false)
    }
    const handleOpen = (rowData) => {
        fetchAllSubCategory(rowData.categoryid)
        fetchAllProducts(rowData.subcategoryid)
        fetchAllSize(rowData.productid)
        setcolorId(rowData.colorid)
        setcategoryid(rowData.categoryid)
        setsubcategoryid(rowData.subcategoryid)
        setproductid(rowData.productid)
        setsizeid(rowData.sizeid)
        setcolor(rowData.color)
        setOpen(true)
    }

    const handleEditColor = async () => {
        setOpen(false)
        var body = { categoryid: categoryid, subcategoryid: subcategoryid, productid: productid, sizeid: sizeid, color: color, colorid: colorId }
        var result = await postData('color/edit_color_data', body)
        if (result.status) {
            Swal.fire({
                icon: 'success',
                title: 'Record Edit Successfully',
                showConfirmButton: false,
                timer: 1500
            })
        }
        else
            Swal.fire({
                icon: 'error',
                title: 'Oops....',
                text: 'something went wrong!',
            })
    }
    fetchAllColors()
 

const handleDeleteColor = async () => {
    setOpen(false)
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (res) => {
        if (res.isConfirmed) {
            var body = { colorid: colorId }
            var result = await postData('color/delete_color_data', body)
            if (result.status) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                fetchAllColors()
            } else {
                Swal.fire('Server Error', '', 'error')
            }
        }
    })
}

const showColor = () => {
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
                        <div style={{ backgroundColor: '#01579b', padding: '3%', color: '#fff', display: 'flex', justifyContent: 'center', borderRadius: '2px', fontFamily: 'Georgia' }}>
                            Edit Color Interface
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category Name</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoryid}
                                label="Category Name"
                                onChange={handleCategoryId}
                            >
                                {fillCategories()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label1">Sub Category Name</InputLabel>
                            <Select
                                labelId="demo-simple-select-label1"
                                id="demo-simple-select1"
                                value={subcategoryid}
                                label="Sub Category Name"
                                onChange={handleSubCategoryId}
                            >
                                <MenuItem>Choose Sub Category</MenuItem>
                                {fillSubCategories()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label2">Product</InputLabel>
                            <Select
                                labelId="demo-simple-select-label2"
                                id="demo-simple-select2"
                                value={productid}
                                label="Product"
                                onChange={handleProductId}
                            >
                                <MenuItem>Choose Products</MenuItem>
                                {fillProducts()}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label3">Size</InputLabel>
                            <Select
                                labelId="demo-simple-select-label3"
                                id="demo-simple-select3"
                                value={sizeid}
                                label="Size"
                                onChange={handleSizeId}
                            >
                                <MenuItem>Choose Size</MenuItem>
                                {fillsize()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField value={color} onChange={(event) => setcolor(event.target.value)} fullWidth variant="outlined" label="Color" />
                    </Grid>
                    <Grid item xs={6}>
                        <Button style={{ backgroundColor: 'green' }} onClick={handleEditColor} fullWidth color="primary" variant="contained">Edit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button style={{ backgroundColor: 'red' }} onClick={handleDeleteColor} fullWidth color="primary" variant="contained">Delete</Button>
                    </Grid>



                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>

            </DialogActions>
        </Dialog>

    </div>)
}

function displayColor() {
    return (
        <MaterialTable
            title="List of Color"
            columns={[
                { title: 'Id', field: 'colorid' },
                { title: 'Category', field: 'cn' },
                { title: 'SubCategory', field: 'scn' },
                { title: 'Product', field: 'pn' },
                { title: 'Size', field: 'sz' },
                { title: 'Color', field: 'color' },

            ]}
            data={colors}
            actions={[
                {
                    icon: 'edit',
                    tooltip: 'Edit Color',
                    onClick: (event, rowData) => handleOpen(rowData)
                }, {
                    icon: 'add',
                    tooltip: 'Add Color',
                    isFreeAction: true,
                    onClick: (event) => navigate("/color")
                }
            ]}
            options={{
                rowStyle: {

                }, headerStyle: {
                    backgroundColor: '#01579b',
                    color: '#FFF'
                },

            }}
        />
    )

}

return (<div className={classes.mainContainer}>
    <div className={classes.box}>
        {displayColor()}
    </div>
    {showColor()}
</div>)

}



















