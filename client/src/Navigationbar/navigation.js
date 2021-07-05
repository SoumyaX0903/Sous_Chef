import {  AppBar, Typography,Toolbar,Avatar,Button } from '@material-ui/core';
import useStyles from './styles.js';
import cooking from '../images/cooking.png';
import {Link,useLocation} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router';
import decode from 'jwt-decode';

const Navbar=()=>{
    const classes = useStyles();
    const dispatch=useDispatch();
    const history=useHistory();
    const location=useLocation();
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));//react use state to track which user is present
    const logout = () => {
      dispatch({ type: 'LOGOUT' });
  
      history.push('/auth');
  
      setUser(null);
    };
    useEffect(()=>{
        const token=user?.token;//when a user signs in or is logged in we can store their token using JWT in our localstorage
        
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 2000 < new Date().getTime()) logout();//after logging in if 2hrs passes we dispatch logout functionality where our token gets killed
    }
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location])
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
       <div className={classes.brandContainer}> 
       <Typography  component={Link} to="/" className={classes.heading} variant="h2" align="center" style={{fontFamily:"Brushstroke, fantasy",color:"black"}}>Sous-Chef!</Typography>
        <img className={classes.image} src={cooking} alt="Sous-Chef" height="60"/></div>
        <Toolbar className={classes.toolbar}>
        {user? ( //if our user is currently logged in we display his/her details in our APP BAR
          <div className={classes.profile}>
            <Avatar className={classes.black} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6" style={{fontFamily:"serif",fontWeight:"bold",color:"black",marginRight:"70px"}}>{user.result.name}</Typography>
            <Button variant="contained" className={classes.logout} style={{background:"black",color:"white"}}onClick={()=>{dispatch({type:'LOGOUT'}); history.push("/");setUser(null);}}>Logout</Button> 
          </div>
        ) : ( //on our logout click we clear the local storage and remove the user and on sign in we redirect him/her to Authenticate himself/herself
          <Button component={Link} to="/auth" variant="contained" color="primary" style={{background:"black",color:"white"}}>Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
    )

}
export default Navbar;