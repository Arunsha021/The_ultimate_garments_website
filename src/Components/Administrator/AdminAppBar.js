import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

export default function AdminAppBar(props) {
    return(
     <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
     <div>
     <AppBar position="static" full>
      <Toolbar>
      <IconButton 
       size="large"
       edge="start"
       color="inherit"
       aria-label="menu"
       sx={{mr:2}}
       >
       
       <img src={'/logo clothing 2'} style={{ width: 60 ,height:60}}>
          </img>
       </IconButton>
       
       <Typography variant="h5" component="div" sx={{flexGrow:1}}>
           The Ultimate Garments
              </Typography> 
      </Toolbar> 
      </AppBar>
      </div>
      </div>) 
     }