import { makeStyles } from "@mui/styles";
export const useStyles =makeStyles({
    mainContainer: {
        width:'100wh',
        height:'100vh',
        background:'#f5f6fa',
        display:'flex',
        justifyContent:'center',

       },

        box:{
        width:'50%',
        height:'auto',
        background:'#fff',
        borderRadius:10,
        boxShadow:'0px opx 5px 3px grey',
        marginTop:'8%'
        
      },
      headingText:{
        fontSize:28,
        fontWeight:700,
        letterSpacing:0.5,
        display:'flex',
          alignItems:'center',
          justifyContent:'center',
        
      },
      gridStyle:{
        padding:20,
      },
       center:{
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          
       },


        });
