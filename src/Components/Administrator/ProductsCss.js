import { makeStyles } from '@mui/styles';
import { padding } from '@mui/system';
export const useStyles = makeStyles({

    mainContainer: {
        width:'100wh',
        height:'100vh',
        display:'flex',
        justifyContent:'center',

      },
    box:{
        width:'50%',
        height:'auto',
        background:'#fff',
        borderRadius:10,
        padding:10,
        marginTop:'2%'
        
      },
      headingText:{
        fontSize:24,
        fontWeight:700,
        padding:3,
        margin:4,
        color:'fff',
        display:'flex',
          alignItems:'center',
          justifyContent:'center',
        
      },
      gridStyle:{
        padding:15,
      },
       center:{
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          
       }


        });
