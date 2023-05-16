import React, { useState, useEffect } from 'react'
import MainBar from './UserComponents/MainBar'
import SearchBar from './UserComponents/SearchBar'
import { postData, ServerURL } from '../Services/NodeServices';
import SliderComponent from './UserComponents/SliderComponent';
import { getData } from '../Services/NodeServices';
import SmallCardComponent from './UserComponents/SmallCardComponent';
import TwoCardComponent from './UserComponents/TwoCardComponent';
import OneCardComponent from './UserComponents/OneCardComponent';
import ThreeCardComponent from './UserComponents/ThreeCardComponent';
import Footer from './UserComponents/Footer';
import SignupDialog from './UserComponents/SignupDialog';


var bannersettings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 1500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true ,
  autoplaySpeed:2000,
};

export default function Home(props) {

  const [banners, setbanners] = useState([])
  const [productsBysalestatus, setProductBysalestatus] = useState([])
  const [productsBysalestatusPopular, setProductBysalestatusPopular] = useState([])
  const [productsBysalestatusBottomWear, setProductBysalestatusBottomWear] = useState([])
  const [productsBysalestatusRelevance,setProductBysalestatusRelevance] = useState([])
  const [BigImages,setBigImages]= useState([])

  const fetchProducts = async (status)=>{
    var body = { 'salestatus': status }
    var result = await postData('userinterface/display_all_products_salestatus', body)
    setProductBysalestatus(result.data)
  }
  
  const fetchProductsPopular = async (status) => {
    var body = { 'salestatus': status }
    var result = await postData('userinterface/display_all_products_salestatus', body)
    setProductBysalestatusPopular(result.data)
  }
  
  const fetchBigImagesForSubcategory=async(priority)=>{
    var body={priority:priority}
    var result=await postData('userinterface/display_all_subcategory_by_priority',body)
    setBigImages(result.data)
    }

  const fetchProductsBottomWear = async(status)=>{
    var body = { 'salestatus': status }
    var result = await postData('userinterface/display_all_products_salestatus', body)
    setProductBysalestatusBottomWear(result.data)
  }

 
  const fetchProductsRelevance=async(status)=>{
     var body ={'salestatus':status}
     var result = await postData('userinterface/display_all_products_salestatus',body)
      setProductBysalestatusRelevance(result.data)
      
  }
  
  useEffect(function () {
    fetchProducts('Trending')
    fetchProductsPopular('Popular')
    fetchProductsRelevance('Relevance')
    fetchBigImagesForSubcategory(1)
    fetchProductsBottomWear('BottomWear')

  }, [])


  const Heading = (props) => {
    return (<div style={{fontFamily:'Oswald', width: '100wh', textAlign: 'center', fontSize: 28, letterSpacing: 1, fontWeight: 'bolder', margin: 5, color: props.color }}>
      {props.heading}

    </div>)
  }

  const fetchbanners = async () => {
    var result = await getData('userinterface/display_all_banners')
    var temp = JSON.parse(result.data.bannerpictures)

    setbanners(temp)
  }

  useEffect(function () { fetchbanners() }, [])

  return (<div style={{ width: '100%' }} >
    <SearchBar />
    <MainBar />
    <div style={{marginBottom:55 }}>
      <SliderComponent images={banners} bannersettings={bannersettings} />
    </div>

    <Heading heading="TRENDING" color="#343434" />
    <div style={{ display: 'flex', width: '100%', marginBottom:20 }}>
      <div 
      style={{ display: 'flex',
      width: '100%',
      flexWrap: 'wrap',
      justifyContent: 'center', 
      alignItems: 'center', 
      marginBottom:25,
      }}>
        
        <SmallCardComponent data={productsBysalestatus} />
      </div>
    </div>

    <Heading heading="POPULAR" color="#343434" />
    <div style={{ display: 'flex', width: '100%', marginBottom: 30}}>
      <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginBottom:25}}>
        <TwoCardComponent data={productsBysalestatusPopular} />
      </div>
    </div>

    <Heading heading="SHOP FOR KIDS" color="#343434" fontfamily="oswald"/>
    <div style={{ display: 'flex', width: '100%',marginBottom: 30}}>
      <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginBottom: 25}}>
        <ThreeCardComponent data={productsBysalestatusBottomWear} />
      </div>
    </div>
      
    <Heading heading="NEW ARRIVALS" color="#343434" />
    <div style={{ display: 'flex', width: '100%',marginBottom: 30 }}>
      <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginBottom: 25 }}>
        <OneCardComponent data={BigImages} url={'ProductList'}/>
      </div>
    </div>
    <div>
     <Footer/>     
     </div>
     <div>
      <SignupDialog/>
     </div>
  </div>
  )
}