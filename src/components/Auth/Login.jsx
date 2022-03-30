import React,{useState,useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link,useNavigate,useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {signin} from '../../actions/auth';
import {useSelector} from 'react-redux';

const initialState = {email: '', lastName: ''};

const Login = () => {
    const theme = createTheme();
    
    const [formData, SetformData] = useState(initialState);
    //check if credential is correct if not show error message
    const [checkcred, Setcheckcred] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const auth = useSelector((state) => state.auth);
    const [load, Setload] = useState(false);

   
    const handleSubmit = (e) => {

      e.preventDefault();
       //show loading if submitted
       Setload(true);
       //dispatch value to server and route location
       dispatch(signin(formData,navigate));
       
       
       
      };
      /**
       * show error message if user credential is wrong
       */
      useEffect(() =>{
        if (auth.authData == "no"){
          Setcheckcred(false);
          Setload(false);
         }
         
      },[auth])

      /**
       * 
       * @param {get value into formstate} e 
       */
      const handleChange = (e) =>{
        SetformData({...formData, [e.target.name]: e.target.value});
      }

      /**
       * reset validation
       */
      useEffect(() =>{
        
        //check if route is /favourites
        if (location.pathname == '/Login'){
          dispatch({type: 'LOGOUT'});
        }
      
      },[location])

  return (
    <div>
        <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in 
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {checkcred !== true ? (<p style={{color: "red"}}>Incorrect Credential!</p>) : (<></>)}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              defaultValue=""
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              defaultValue=""
              onChange={handleChange}
            />
        
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {!load ? <> Sign In</> : <>Loading...</>}
             
            </Button>
            <Grid container>
              
              <Grid item>
                <Link to="/Login/Signup" variant="body2">
                "Don't have an account? Sign Up"
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
    </div>
  )
}

export default Login