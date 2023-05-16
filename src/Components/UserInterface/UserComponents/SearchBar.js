import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';


  
  
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch', 
      },
    },
  }));


     export default function SearchBar(props) {
     return (
        <Box sx={{ flexGrow:1}}>
          <AppBar position='static' style={{background:'#2c3e50'}}>
               <Toolbar> 
                <IconButton
                 size="large" 
                 edge="start" 
                 color="inherit" 
                 aria-label="menu" 
                sx={{ mr: 2 }} 
               >
               <MenuIcon /> 
               </IconButton>
              <div style={{fontSize:32,width:'30%',fontWeight:900}} >
                TUG
              </div>

               <Search style={{width:'40%'}}>
               <SearchIconWrapper>
               <SearchIcon/>
               </SearchIconWrapper>
               <StyledInputBase
                placeholder="search for products..."
                inputProps={{'aria-label':'search'}}
               />
              </Search>
             </Toolbar> 
             </AppBar>
             </Box>




)}