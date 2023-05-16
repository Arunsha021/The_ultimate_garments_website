import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton  from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon  from '@mui/icons-material/Inventory';
import  InvertColorsIcon  from '@material-ui/icons/InvertColors';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import AddchartIcon from '@mui/icons-material/Addchart';
import {Link,useNavigate} from "react-router-dom";
import  Divider  from '@mui/material/Divider';


export default function Dashboard(props) {
    return(
      <div style={{display:'flex',flexDirection:'row'}}>
      <div>
      <divider/> 
      <List component="nav">
       <React.Fragment>

      
      <ListItemButton  style={{textDecoration:'none'}} component={Link} to="/dashboard/category">
      <ListItemIcon>
      <CategoryIcon/>
      </ListItemIcon>
      <ListItemText primary ="Categories"/>
      </ListItemButton>
      

      {/* <Link to ='/dashboard/subcategory'> */}
      <ListItemButton component={Link} to ="/dashboard/subcategory">
      <ListItemIcon>
      <InventoryIcon/> 
      </ListItemIcon>
      <ListItemText primary="SubCategories"/>
      </ListItemButton>
      {/* </Link> */}
  
       {/* <Link to ='/dashboard/products'>  */}
      <ListItemButton component={Link} to = "/dashboard/products">
      <ListItemIcon>
      <AutoAwesomeMosaicIcon/>
      </ListItemIcon>
      <ListItemText primary="Products"/>
      </ListItemButton>
      {/* </Link>  */}
  
      {/* <Link to ='/dashboard/size'> */}
      <ListItemButton  component={Link} to = "/dashboard/size" >
      <ListItemIcon>
      <AddchartIcon/>
      </ListItemIcon>
      <ListItemText primary="Size"/>
      </ListItemButton>
      {/* </Link> */}
      
      {/* <Link to ='/dashboard/color'> */}
      <ListItemButton component={Link} to = "/dashboard/color">
      <ListItemIcon>
      <InvertColorsIcon/>
      </ListItemIcon>
      <ListItemText primary="Color"/>
      </ListItemButton>
      {/* </Link> */}

      <ListItemButton component={Link} to = "/dashboard/bannerimages">
      <ListItemIcon>
      <InventoryIcon/>
      </ListItemIcon>
      <ListItemText primary="Banner Images"/>
      </ListItemButton>
      
      <ListItemButton component={Link} to = "/dashboard/imageinterface">
      <ListItemIcon>
      <InventoryIcon/>
      </ListItemIcon>
      <ListItemText primary="Image Interface"/>
      </ListItemButton>
      

      </React.Fragment>
      <Divider sx={{ my:1}}/>

      <React.Fragment>

      <ListItemButton component={Link} to = "/dashboard/displayallcategory">
      <ListItemIcon>
      <CategoryIcon/>
      </ListItemIcon>
      <ListItemText primary="DisplayAllCategory"/>
      </ListItemButton>
      

      {/* <Link to ='/dashboard/Displayallsubcategory'> */}
      <ListItemButton component={Link} to = "/dashboard/displayallsubcategory" >
      <ListItemIcon>
      <InventoryIcon/>
      </ListItemIcon>
      <ListItemText primary="DisplayAllSubCategory"/>
      </ListItemButton>
      {/* </Link> */}
        
      
      <ListItemButton component={Link} to="/dashboard/displayallproducts">
      <ListItemIcon>
      <AutoAwesomeMosaicIcon/>
      </ListItemIcon>
      <ListItemText primary="DisplayallProducts"/>
      </ListItemButton>
      
  
  
      </React.Fragment>
      </List>      
      </div>  
  
      </div>
      

  
    )
  }