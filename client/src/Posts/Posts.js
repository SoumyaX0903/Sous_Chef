import React from 'react';
import Post from './Post/Post.js';
import {Grid, CircularProgress,Typography } from '@material-ui/core'
import { useSelector } from 'react-redux';
import useStyles from './styles'
import image from '../images/puppy.jpg'
const Posts=({setcurrID})=>{
    
    const {posts,isLoading}=useSelector((state)=>state.posts)//takes stae as input returns array of posts and isloading property
    const classes=useStyles();
   if(!posts.length&&!isLoading)
   return (
       <>
   <Typography variant="h4" style={{color:"white",fontFamily:"serif",fontWeight:"bold"}}>Uh-oh! Could'nt find any relevant post for your search :(</Typography>
   <img src={image} alt="puppy" className={classes.image}/>
   </>
   );
return (
    isLoading?<CircularProgress />:(
      <Grid className={classes.container} container alignItems="stretch" spacing={3} >
       {
           posts.map((post)=>(
              <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                  <Post post={post} setcurrID={setcurrID}/>{/* One by one we map through the posts and render them */}
              </Grid>
           ))
       }
      </Grid>
    )
    )
}
export default Posts;