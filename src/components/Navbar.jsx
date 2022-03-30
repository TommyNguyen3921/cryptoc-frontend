import {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const Navbar = () => {
  //get user from local storage once logged in
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * set user value from localstorage when route changes
   */
  useEffect(() =>{
    
    setUser(JSON.parse(localStorage.getItem('profile')));
  },[location]);

  /**
   * dispatch logout and go back to login
   */
  const logout = () => {
    dispatch({type: 'LOGOUT'});

    navigate('/login');
    setUser(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
       
        <Typography variant="h6" component="div" sx={{ flexGrow: 0.01 }}>
        <Link to="/">
        <Button style={{color: "white"}}>Home</Button>
        </Link>
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {user ? (
        <Link to="/Favourites">
        <Button style={{color: "white"}}>Favourite</Button>
        </Link>
        ) :(
          <></>
        )}
        </Typography>
        {user ? (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <div style={{color: "black"}}>{user.result.name}</div>
          </Typography>
        ):(
          <></>
        )}

        {!user ? (
        <Link to="/Login">
        <Button style={{color: "white"}}>Login</Button>
        </Link>
        ) :(
          
        <Button style={{color: "white"}} onClick={logout}>Log out</Button>
        
        )
        }
        
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Navbar