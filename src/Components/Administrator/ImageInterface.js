import { useStyles } from "./ImageInterfaceCss";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { DropzoneArea } from "material-ui-dropzone";
import { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import { getData, postData } from "../Services/NodeServices";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ProductImages(props) {
  var classes = useStyles();
  var navigate = useNavigate();

  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [productId, setProductId] = useState("");
  const [productList, setProductList] = useState([]);

  const [getFiles, setFiles] = useState([]);

  const fetchAllCategory = async () => {
    var data = await getData("category/display_all_category");
    setCategoryList(data.data);
  };
  useEffect(function () {
    fetchAllCategory();
  }, []);

  const fillCategories = () => {
    return categoryList.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };

  const fetchAllSubCategory = async (cid) => {
    var data = await postData("subcategory/display_subcategory_by_category", {
      categoryid: cid,
    });
    setSubCategoryList(data.data);
  };

  const fillSubCategories = () => {
    return subCategoryList.map((item) => {
      return (
        <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      );
    });
  };

  const fetchAllProducts = async (scid) => {
    var data = await postData("products/display_products_by_subcategory", {
      subcategoryid: scid,
    });
    setProductList(data.data);
  };
  const fillproducts = () => {
    return productList.map((item) => {
      return <MenuItem value={item.productid}>{item.productname}</MenuItem>;
    });
  };

  const handleCategoryId = (event) => {
    setCategoryId(event.target.value);
    fetchAllSubCategory(event.target.value);
  };

  const handleSubCategoryId = (event) => {
    setSubCategoryId(event.target.value);
    fetchAllProducts(event.target.value);
  };

  const handleProductId = (event) => {
    setProductId(event.target.value);
  };

  const handleSubmit = async () => {
    var formData = new FormData();
    formData.append("categoryid", categoryId);
    formData.append("subcategoryid", subCategoryId);
    formData.append("productid", productId);
    
    getFiles.map((item, index) => {
        
      formData.append("picture" + index, item);
    });
    var result = await postData("products/add_product_images", formData, true);
    if (result.result) {
      Swal.fire({
        icon: "success",
        title: "Record Submitted Successfully",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleSave = (files) => {
    //Saving files to state for further use and closing Modal.
    setFiles(files);
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>
        <Grid className={classes.gridStyle} container spacing={2}>
          <Grid item xs={12} style={{ display: "flex" }}>
            <div className={classes.headingText}>Product Images Interface</div>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryId}
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
              <InputLabel id="demo-simple-select-label1">
                Sub Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label1"
                id="demo-simple-select1"
                value={subCategoryId}
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
                value={productId}
                label="Products"
                onChange={handleProductId}
              >
                <MenuItem>Choose Products</MenuItem>
                {fillproducts()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <DropzoneArea
              onChange={handleSave}
              acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
              filesLimit={6}
              maxFileSize={5000000}
            />
          </Grid>

          <Grid item xs={6}>
            <Button onClick={handleSubmit} fullWidth variant="contained">
              Submit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained">
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
