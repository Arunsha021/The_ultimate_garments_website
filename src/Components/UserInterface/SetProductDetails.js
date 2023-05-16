import React from "react";
import { useState } from "react";
import ImageSlider from "./UserComponents/ImageSlider";
import ProductInformation from "./UserComponents/ProductInformation";
import ProductDetailFilling from "./UserComponents/ProductDetailFilling";
import MainBar from "./UserComponents/MainBar";
import SearchBar from "./UserComponents/SearchBar";
import Footer from "./UserComponents/Footer";
import { useLocation } from "react-router";
import { Grid } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/styles";


export default function SetProductDetails(props) {
  const [refresh, setRefresh] = useState(false)
  var location = useLocation()
  var product = location.state.product
  var productid = JSON.parse(product).productid
  // alert(productid)
  console.log('PROOOOOPS:', location)



  const updateCart = () => {
    setRefresh(!refresh)

  }

  return (<div style={{ width: '100%' }}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItem: 'center', textAlign: 'center', letterSpacing: '2px', background: 'Yellow' }}>
      FREE SHIPPING ON All ORDERS| Get Extra ₹100 OFF on spent of ₹999 Use Code: TUG100
    </div>

    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SearchBar />
        <MainBar />
      </Grid>

      <Grid item xs={6}>
        <ImageSlider productid={productid} />
      </Grid>

      <Grid item xs={6}>
        <ProductDetailFilling updateCart={updateCart} productInfo={product} />
      </Grid>
      <Grid xs={12}>
        <ProductInformation />
      </Grid>

      <Grid xs={12}>
        <Footer />
      </Grid>

    </Grid>

  </div>)
}
