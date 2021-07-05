import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import useStyles from './styles';
import { createPost,updatePost } from '../actions/posts';

const Form = ({currID,setcurrID}) => {

  const [postData, setPostData] = useState({ title: '', recipe: '', tags: '', postfile: '' }); //the recipe form use state to store form data
  const dispatch = useDispatch();
  const post= useSelector((state)=>currID?state.posts.posts.find((p)=>p._id===currID):null); //if the edit button is pressend we store the post id for that particular post and from all the posts we can get that particular post's data
  const classes = useStyles();
  const user=JSON.parse(localStorage.getItem('profile'))//find the user that is logged in 
  const history=useHistory();
  const clear = () => {
    setcurrID(0);
    setPostData({ title: '', recipe: '', tags: '', postfile: '' }); //when clear button is pressed the form data is set to blank 
  };
  useEffect(()=>{
  if(post) setPostData(post); //we set our form data to be the  post data whose edit button is pressed
  },[post])

  const handleSubmit = (e) => {
    e.preventDefault();
      if(currID){dispatch(updatePost(currID,{...postData,name:user?.result?.name}));clear();}// if it was an edit operation the id must exist so in that case we dispatch an update action on the post
      else{dispatch(createPost({...postData,name:user?.result?.name})); history.push("/");clear();}// else create post action is dispatched by sending the entered form data and the currently logged in users name
     
    }
  const makechange=(e)=>{
    setPostData({...postData,[e.target.name]:e.target.value});
  }
  
    if (!user?.result?.name) {// if user doesnt exist in that case he is not logged in and he cant post a recipe so we show him a disclaimer
      return (
        <Paper className={classes.paper }>
          <Typography style={{fontFamily:"serif"}} variant="h6" align="center">
            Please Sign In to post your own recipes and like and commment on other's recipes.
          </Typography>
        </Paper>
      );
    }
  return ( // user is logged in so we allow them to post their recipe 
    <Paper className={classes.paper} elevation={6} style={{}}>
      <form  autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography style={{fontFamily:"serif",fontWeight:"bold"}} variant="h6">{currID?'Edit your':'Post a'} Recipe!</Typography>
    
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) =>makechange(e)} />
        <TextField name="recipe" variant="outlined" label="Recipe" fullWidth multiline rows={4} value={postData.recipe} onChange={(e)=>makechange(e)} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, postfile: base64 })} /></div>
        <Button style={{background:"black",color:"white"}} className={classes.buttonSubmit} variant="contained"  size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" style={{background:"black",color:"white"}} size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;