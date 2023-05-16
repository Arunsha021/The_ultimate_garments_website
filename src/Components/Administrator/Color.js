import { useState, useEffect } from "react";
import { useStyles } from "./ColorCss"
import { Avatar, TextField, Grid, Button, } from "@mui/material";
import { getData, postData } from "../Services/NodeServices";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from "sweetalert2"
import { useNavigate } from "react-router";
import ColorPicker from 'material-ui-color-picker';


export default function Color(props) {
    var classes = useStyles()
    var navigate = useNavigate()

    const [categoryList, setcategoryList] = useState([])
    const [categoryid, setcategoryid] = useState('')
    const [subcategoryid, setsubcategoryid] = useState('')
    const [subcategoryList, setsubcategoryList] = useState([])
    const [productid, setproductid] = useState('')
    const [productList, setproductList] = useState([])
    const [sizeid, setsizeid] = useState('')
    const [sizeList, setsizeList] = useState([])
    const [color, setcolor] = useState('')
    const [colorcode, setcolorcode] = useState('')
    const [colorList, setcolorList] = useState({})
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

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

    const fillSubCategories = () => {
        return subcategoryList.map((item) => {
            return (
                <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
            )
        })
    }

    const fetchAllSubCategory = async (cid) => {
        var data = await postData('subcategory/display_subcategory_by_category', { categoryid: cid })
        setsubcategoryList(data.data)
    }

    const fetchAllProducts = async (scid) => {
        var data = await postData('products/display_products_by_subcategory', { subcategoryid: scid })
        setproductList(data.data)
        alert(JSON.stringify(data))
    }

    const fillProducts = (productList) => {
        return productList.map((item) => {
            return (
                <MenuItem value={item.productid}>{item.productname}</MenuItem>
            )
        })
    }
    const fetchAllSize = async (pid) => {
        alert(JSON.stringify(pid))
        var data = await postData('size/display_size_by_products', { productid: pid })
        alert(JSON.stringify(data.data))
        setsizeList(data.data)

    }

    const fillsize = () => {
        return sizeList.map((item) => {
            return (
                <MenuItem value={item}>{item}</MenuItem>
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

    const handleSubmit = async () => {
        var body = { categoryid: categoryid, subcategoryid: subcategoryid, productid: productid, sizeid: sizeid, color: JSON.stringify(colorList) }
        var result = await postData('color/add_new_color', body)
        if (result.result) {
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
    const handleReset = async () => {
        setcategoryid('')
        setsubcategoryid('')
        setproductid('')
        setsizeid('')
        setcolor('')
    }

    const handleColorChange = (event) => {
        console.log("Color:", event)
        setcolorcode(event)
    }
    const handleAddColor = () => {
        var temp = colorList


        setcolorList({ ...temp, [color]: colorcode })

    }
    return (<div className={classes.mainContainer}>
        <div className={classes.box}>
            <Grid className={classes.gridStyle} container spacing={2}>
                <Grid item xs={12} style={{ display: 'flex' }}>
                    <div className={classes.headingText}>
                        Color Interface
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '42%' }}>
                        <Avatar onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} src={'/report.png'} style={{ width: 42, cursor: 'pointer', backgroundColor: isHovering ? '#3498db' : '', color: isHovering ? 'white' : '', padding: '5px', borderRadius: '15px' }}
                         onClick={() => navigate('/dashboard/displayallcolor')} variant="square" />
                    </div>
                </Grid>

                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categoryid}
                            label="Category"
                            onChange={handleCategoryId}
                        >
                            <MenuItem>Choose Category</MenuItem>
                            {fillCategories()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label1">Sub Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select1"
                            value={subcategoryid}
                            label="Sub Category"
                            onChange={handleSubCategoryId}
                        >
                            <MenuItem>Choose Sub Category</MenuItem>
                            {fillSubCategories()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label2">Products</InputLabel>
                        <Select
                            labelId="demo-simple-select-label2"
                            id="demo-simple-select2"
                            value={productid}
                            label="Products"
                            onChange={handleProductId}
                        >
                            <MenuItem>Choose Products</MenuItem>
                            {fillProducts(productList)}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label3">Sizeid</InputLabel>
                        <Select
                            labelId="demo-simple-select-label3"
                            id="demo-simple-select3"
                            value={sizeid}
                            label="Sizeid"
                            onChange={handleSizeId}
                        >
                            <MenuItem>Choose Size</MenuItem>
                            {fillsize()}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <TextField value={color} onChange={(event) => setcolor(event.target.value)} fullWidth variant="outlined" label="Color" />
                </Grid>
                <Grid item xs={3}>
                    <ColorPicker
                        name='color'
                        variant="outlined"
                        fullWidth
                        value={colorcode}
                        defaultValue="#000"

                        onChange={(code) => handleColorChange(code)}

                    />

                </Grid>
                <Grid item xs={3}>
                    <Button fullWidth onClick={handleAddColor} variant="contained">Set</Button>
                </Grid>

                <Grid item xs={12}>
                    <TextField value={JSON.stringify(colorList)} onChange={(event) => setcolorList(event.target.value)} fullWidth variant="outlined" label="Color List" />
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleSubmit} fullWidth variant="contained">Submit</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button fullWidth onClick={handleReset} variant="contained">Reset</Button>
                </Grid>

            </Grid>
        </div>
    </div>)

}






