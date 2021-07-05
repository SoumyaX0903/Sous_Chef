import React,{useEffect} from 'react'
import {Paper,Typography,CircularProgress,Divider} from '@material-ui/core';
import { useDispatch,useSelector } from 'react-redux';
import moment from 'moment';
import { useParams,useHistory } from 'react-router-dom';
import { getPost, getSearchedposts } from '../actions/posts';
import Comment from './comments'
import useStyles from './styles'
const Postinfo = () => 
{
    const classes=useStyles();
    const dispatch=useDispatch();
    const { id }=useParams(); // we have the url which contains an id as a param so we get that id 
    const history=useHistory();
    const {post,posts,isLoading}=useSelector((state)=>state.posts)
    useEffect(()=>{
        dispatch(getPost(id))// using this id we dispatch a func that gets us the post corressponding to this id 
    },[id])

    useEffect(()=>{
      if(post)dispatch(getSearchedposts({search:'none',tags:post?.tags.join(',')}))//to add recommendation to our post we search for all the posts that have the same hashtags
    },[post])

    if(!post) return null;
    if(isLoading){// if the page is still loading that is, the post is being fetched then we render buffering 
        return ( 
        <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em"/>
        </Paper>)
    }
    const similarposts=posts.filter((p)=>{return p._id!==post._id})// we exclude this post from the list
    let arr=[];
    if(similarposts.length<4) // we dont wanna show all the similar posts so we show 4 of them maximum 
    arr=similarposts;
    else
    {
      for(let i=0;i<4;i++)
      {
        arr[i]=similarposts[i];
      }
    }
    
    
    return ( // the detail of a specific post is displayed in the full screen
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
        <div className={classes.card}>
        <div className={classes.section}>
          <Typography style={{fontFamily:"serif"}} variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.recipe}</Typography>
          <Typography style={{fontFamily:"serif",fontWeight:"bold"}} variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.postdate).fromNow()}</Typography>
          <Divider style={{margin:"20px 0"}}/>
          <Comment post={post}/>  {/* for this particular id we fetch and display the comments  */}
        </div>
        <div className={classes.imageSection}>
          <img style={{height:"30rem",width:"40rem"}} className={classes.media} src={post.postfile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {!!similarposts.length&&( // if there are similar posts we render them 
        <div className={classes.section}>
        <Typography style={{fontFamily:"serif",fontWeight:"bold"}} gutterbottom variant="h5">You may also like:</Typography>
        <Divider/>
        <div className={classes.recommendedPosts}>
        {
          arr.map(({title,name,likes,postfile,recipe,_id})=>(
            <div style={{margin:"20px",cursor:"pointer"}} onClick={()=>history.push(`/posts/${_id}`)}>
            <Typography style={{fontFamily:"serif",fontWeight:"bold"}}  gutterbottom variant="h6">{title}</Typography>
            <Typography style={{fontFamily:"serif",fontWeight:"bold"}}  gutterbottom variant="subtitle2">{name}</Typography>
            <Typography gutterbottom variant="subtitle2">{recipe.length>150?recipe.substring(0,150)+"...":recipe}</Typography>
            <Typography style={{fontFamily:"serif",fontWeight:"bold"}}  gutterbottom variant="subtitle1">Likes: {likes.length}</Typography>
            <img src={postfile} style={{width:"8rem"}} alt={title}/>
            </div>
          ))
          
        }
        </div>
        </div>
      )}
      </Paper>
    )
}

export default Postinfo;
