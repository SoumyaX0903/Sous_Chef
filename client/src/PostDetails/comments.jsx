import React,{useState,useRef} from 'react'
import {useDispatch} from 'react-redux';
import {Typography,Button,TextField} from '@material-ui/core';
import {postcomment} from '../actions/posts'
import useStyles from './styles'
const Comment=({post})=>{
    const classes=useStyles();
    const user=JSON.parse(localStorage.getItem("profile"))
    const [comments,setcomments]=useState(post?.comments);
    const [comment,setcomment]=useState("")// our use state to store what user is typing as a comment

    const dispatch = useDispatch()
    const submitcomment=async()=>{ // when user presses the comment button we dispatch a comment action for a particular post by passing tthe comment alomg with the id 
        const commentdata=`${user?.result.name}:${comment}` //our comment will have username who commented : comment that he did
       const comm= await dispatch(postcomment(commentdata,post._id))
       setcomments(comm);// instantly he store the comments in setcomments
       setcomment('');
    }
    return (
        <div>
         <div className={classes.commentsOuterContainer}>
         <div className={classes.commentsInnerContainer}>
         <Typography style={{fontFamily:"serif",fontWeight:"bold"}} gutterBottom variant="h6">Comments</Typography>
            {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
               <strong>{c.split(':')[0]}</strong><br/>
              {c.split(':')[1]}
              </Typography>))}
        </div>
        {user?.result.name&&(// if and only if user is currently logged in we allow him to comment 
        <div style={{ width: '70%' }}>
          <Typography gutterBottom style={{fontFamily:"serif",fontWeight:"bold"}}variant="h6">Write a comment</Typography>
          <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setcomment(e.target.value)} />
          <br />
          <Button style={{ marginTop: '10px',background:"black",color:"white" }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={submitcomment}>
            Comment
          </Button>
        </div>)}
        </div>
        </div>
    )
}
export default Comment;