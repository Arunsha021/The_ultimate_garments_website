import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import  FormGroup  from '@mui/material/FormGroup';
import  FormControlLabel  from '@mui/material/FormControlLabel';
import  Checkbox from '@mui/material/Checkbox';
import  Accordion from '@mui/material/Accordion';
import  AccordionSummary from '@mui/material/AccordionSummary';
import  AccordionDetails from '@mui/material/AccordionDetails';
import  ExpandMoreIcon from '@mui/icons-material/ExpandMore' 
import { Button } from '@material-ui/core';

  const AccordionStyle={
   '&:before':{
   backgroundColor:'transparent !important',
   border:'none',
   },
  };

   export default function FilterComponent(){
    return(
        <Box
         sx={{
          display:'flex',
          flexWrap:'wrap',
          '&>:not(style)':{
          m:1,
          width:500,
          height:600,
          },
        }}
         > 
          <Paper elevation={1}>
      
      <div style={{fontSize:'18px',letterSpacing:'1px',fontWeight:600,color:'#434343',textTransform: 'uppercase',marginLeft:'3%'}}>
       <p>FILTER</p>
      </div>
              
              
    <Accordion sx={AccordionStyle} elevation={0}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div style={{fontSize:'14px',fontWeight:600,letterSpacing:'1px',color:'#434343',textTransform: 'uppercase'}}>
        <p>SIZE</p>
        </div>

      </AccordionSummary>
      <AccordionDetails>
      
       
      <div >
      <Button style={{textDecoration:'none',color:'inherit',right:'15px',color:'#434343',fontWeight:400}}>S</Button>
      </div>

      <div >
      <Button style={{textDecoration:'none',color:'inherit',right:'15px',color:'#434343',fontWeight:400}}>M</Button>
      </div>
        

      <div >
      <Button style={{textDecoration:'none',color:'inherit',right:'15px',color:'#434343',fontWeight:400}}>L</Button>
      </div>
       
        
      <div >
      <Button style={{textDecoration:'none',color:'inherit',right:'15px',color:'#434343',fontWeight:400}}>XL</Button>
      </div>
        
      
      <div >
      <Button style={{textDecoration:'none',color:'inherit',right:'15px',color:'#434343',fontWeight:400}}>XXL</Button>
      </div>
      
     
      </AccordionDetails>
    </Accordion>

    <Accordion sx={AccordionStyle} elevation={0}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >

        <div style={{fontSize:'14px',fontWeight:600,letterSpacing:'1px',color:'#434343',textTransform: 'uppercase'}}>
        <p>SORT BY</p>
        </div>

      </AccordionSummary>
      <AccordionDetails>        
      <div>
      <FormGroup>
      <FormControlLabel control={<Checkbox />} label="What's New" />
      <FormControlLabel control={<Checkbox />} label="Popularity" />
      <FormControlLabel control={<Checkbox />} label="Price-Low to High" />
      <FormControlLabel control={<Checkbox />} label="Price-High to Low" />
      </FormGroup>
      </div>
      </AccordionDetails>
    </Accordion>
   
    </Paper>
  </Box>
);
}
       
     

          



         

    




    
   



  