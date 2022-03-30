import React, { useEffect,useState } from 'react';
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
import {signup} from '../../actions/auth'
import {useSelector} from 'react-redux';

const initialState = {firstName: '', lastName: '', email: '', password: ''}
const Signup = () => {

    const theme = createTheme();
    const dispatch = useDispatch();
    const [formData, SetformData] = useState(initialState);
    const [formErrors, SetformErrors] = useState({});
    const [isSubmit, SetisSubmit] = useState(false);
    const navigate = useNavigate();
    const checksignup = useSelector((state) => state.auth);
    const [checksignupemail, Setchecksignupemail] = useState(false);
    const [load, Setload] = useState(false);
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
       //show load message if submit
       Setload(true);
       //check form validation
       SetformErrors(validate(formData));
       //set the submit to true
       SetisSubmit(true);
       //set the same email checker to false
       Setchecksignupemail(false);
       
       
      };

      /**
       * if email is already used show error message
       */
      useEffect(() =>{
        if(checksignup.authData){
          Setchecksignupemail(true);
          Setload(false);
        }
  
      },[checksignup.authData])

    /**
     * add for value to usestate
     */
    const handleChange = (e) =>{
      SetformData({...formData, [e.target.name]: e.target.value});
    }

    /**
     * dispatch form to signup if no error validation and submit is true
     */
    useEffect(() =>{
      console.log(formErrors);
      if(Object.keys(formErrors).length === 0 && isSubmit){
        dispatch(signup(formData,navigate));
      }

    },[formErrors])


    /**
     * 
     * @param {get objects of values to validate} values 
     * @returns 
     */
    const validate = (values) => {
      const errors = {}
      const regex= /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
      if (!values.firstName){
        errors.firstName = "First Name is required";
      }

      if (!values.lastName){
        errors.lastName = "Last Name is required";
      }

      if (!values.email){
        errors.email = "Email is required";
      }else if(!regex.test(values.email)){
        errors.email = "Email is invalid";
      }
      if (!values.password){
        errors.password = "password is required";
      }else if(values.password.length < 4 ){
        errors.password = "Password must be greater than 4";
      }else if(values.password.length > 10 ){
        errors.password = "Password must not exceed 10 character";
      }
      Setload(false);
      return errors;
    }

    /**
     * reset same email validation
     */
    useEffect(() =>{
      
      if (location.pathname == '/Login/Signup'){
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                />
                <p style={{color: "red"}}>{formErrors.firstName}</p>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
                <p style={{color: "red"}}> {formErrors.lastName}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
                <p style={{color: "red"}}>{formErrors.email}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
                <p style={{color: "red"}}>{formErrors.password}</p>
              </Grid>
              
            </Grid>
            {checksignupemail ?<p style={{color: "red"}}>Email Already Used</p>:(<></>)}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {!load ? <>Sign Up</> : <>Loading...</>}
              
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/Login" variant="body2">
                  Already have an account? Sign in
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

export default Signup