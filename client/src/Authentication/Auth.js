import React,{useState} from 'react'
import { Avatar,Button,Paper,Grid,Typography,Container } from '@material-ui/core';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import {GoogleLogin} from 'react-google-login'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Icon from './icon';
import Setfield from './field.js'
import useStyles from './styles.js'
import dotenv from 'dotenv'
import {signin,signup} from '../actions/auth.js' 
dotenv.config();
const Auth = () => {
    const classes=useStyles();
    const dispatch=useDispatch();
    const [wantstoSignup, setwantstoSignup] = useState(false);
    const [formdata,setformdata]=useState({firstName:'',lastName:'',email:'',password:'',confirmpassword:''})
    const history=useHistory();
    const handleSubmit=(e)=>{
      e.preventDefault(); // on the form submission we dont refresh our page and  dispatch signup/signin accordingly
      if(wantstoSignup){
        dispatch(signup(formdata,history))
      }
      else{
        dispatch(signin(formdata,history))
      }
      
    }
    const makeChange=(e)=>{
    setformdata({...formdata,[e.target.name]:e.target.value})
    // console.log(formdata);
    }
    const googleSuccess=async (res)=>{
        const result = res?.profileObj;// we get user profile's data such as name add google id etc
        const token = res?.tokenId; //we get the token for the sign in action
    
        try {
          dispatch({ type: 'AUTH', payload: { result, token } }); //now we dispatch an action of type authenticate for usersign in
          history.push("/")//then we render user to our home page using Reacts' client side routing
        }
        catch (error) {
            console.log(error);
          }  
    }
    const googleError=()=>{

        console.log('Unsuccessful login with google.Try later!');
    }
    const [viewPassword, setviewPassword] = useState(false);
    const switchMode = () => {
        setwantstoSignup((prev) => !prev);
        setviewPassword(false);
      };
   
    const handleShowPassword = () => setviewPassword((prev)=>!prev);
    return (
       <Container component="main" maxWidth="xs">
           <Paper className={classes.paper}>
            <Avatar className={classes.avatar} style={{background:"black",color:"white"}}>
                <LockRoundedIcon/>
            </Avatar>
            <Typography variant="h5">{wantstoSignup?'Sign Up':'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                { wantstoSignup && ( //if user has come to sign up we show a form with some extra fields 
             <>
              <Setfield name="firstName" label="First Name" makeChange={makeChange} autoFocus half />
              <Setfield name="lastName" label="Last Name" makeChange={makeChange} half />
             </>
            )}
            <Setfield name="email" label="Email Address" makeChange={makeChange} type="email" />
            <Setfield name="password" label="Password" makeChange={makeChange} type={viewPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { wantstoSignup && <Setfield name="confirmpassword" label="Repeat Password" makeChange={makeChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" style={{background:"black",color:"white"}} className={classes.submit}>
            { wantstoSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            render={(renderProps) => (
              <Button style={{background:"black",color:"white"}} className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
            Sign In With Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="center">
            <Grid item>
              <Button onClick={switchMode}>
                { wantstoSignup ? 'Have an existing account? Sign in' : "Don't have an account? Sign Up" }
              </Button>

            </Grid>
          </Grid>
            </form>
           </Paper>
       </Container>
    )
}

export default Auth;
