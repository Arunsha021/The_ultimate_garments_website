import { createRef } from "react";
import { useRef } from "react";
import React, { useState, useEffect } from "react";
import { Button, Grid } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ServerURL, postData } from "../../Services/NodeServices";
import { color } from "@mui/system";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", marginRight: 30, zIndex: 1 }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", marginLeft: 30, zIndex: 1 }}
      onClick={onClick}
    />
  );
}


var img = ({

  dots: false,
  arrow: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 2000,
  focusOnSelect: true,
  vertical: true,
  centermode: true,
  fade: false,
  padding: '30%',
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />

});
var img1 = ({
  dots: false,
  arrow: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  centermode: true,
  autoplay: false,
  autoplaySpeed: 2000,
  fade:false,
  focusOnSelect: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />
});



export default function ImageSlider(props) {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [images, setImages] = useState([]);

  const fetchAllProductImages = async () => {
    var result = await postData('userinterface/fetchallpictures', { productid: props.productid })
    setImages(JSON.parse(result.data[0].productimages))

  }


  const setImageSlider = () => {
    return images.map((item) => {
      return (
        <img src={`${ServerURL}/images/${item}`} style={{ width: '100%',height:'auto' }} />
      )
    })

  }
  const setImageSlider1 = () => {
    return images.map((item) => {
      return (<div>
        <img src={`${ServerURL}/images/${item}`}  style={{ width:80, height:100}} />
      </div>)
    })

  }
  useEffect(function () {
    fetchAllProductImages()

  }, [])


  return (<div style={{ display: 'flex', justifyContent: 'center', alignItem: 'center',  background: '#fff', }}>
    <div style={{ width: 100,  marginTop: 1, marginLeft: 2 }}>
      <Slider {...img} ref={(slider1) => setNav1(slider1)} asNavFor={nav2} >
        {setImageSlider1()}
      </Slider>
    </div>
    <div style={{ width: 400,  marginTop: 1, marginBottom: 1 }}>
      <Slider {...img1} ref={(slider2) => setNav2(slider2)} asNavFor={nav1}>
        {setImageSlider()}
      </Slider> 
    </div>

  </div>)
}