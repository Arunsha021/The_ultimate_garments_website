import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import React,{createRef} from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ServerURL } from "../../Services/NodeServices";


export default function SliderComponent(props){
    var mySlider=createRef()
    var theme=useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'));    
    const setImageInSlider=()=>{
    return props.images.map((item)=>{
     return(<div>
      <img src={`${ServerURL}/images/${item}`} width="100%"/>
     </div>)
    })


}
const handleBack=()=>{
mySlider.current.slickNext()
}

const handleForward=()=>{
    mySlider.current.slickPrev()
    
  }
 return(<div>
       <div style={{width:'100%'}}>
       {matches?<></>:  
        <div style={{ display:'flex',justifyContent:'space-around',alignItems:'center', position:'absolute',left:'2%',top:'46%',zIndex:1,background:'#000',width:40,height:40,borderRadius:20}}>
      
       <ArrowBackIosNewIcon style={{color:'#fff'}} onMouseEnter={()=>handleBack()} />
       </div>}
        <Slider {...props.bannersettings} ref={mySlider}>
            {setImageInSlider()}

        </Slider>
        {matches?<></>:
        <div style={{ display:'flex',justifyContent:'space-around',alignItems:'center', position:'absolute',left:'95%',top:'46%',zIndex:1,background:'#000',width:40,height:40,borderRadius:20}}>
       
        <ArrowForwardIosIcon style={{color:'#fff'}} onMouseEnter={()=>handleForward()} />

        </div>}
       </div>

    </div>)



}