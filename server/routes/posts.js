import express from 'express';
import {getpost,createpost,updatepost,deletepost,likepost,searchedposts,getpostdetailsbyid,postcomment} from '../controllers/controlp.js'
import auth from '../middleware/auth.js' 
//middle ware is req to check whether we have an authenticated user if user is authenticated then only he/she can access a specific set of functionalities
const r=express.Router();
r.get("/",getpost) // no auth req for viewing the posts
r.post("/",auth,createpost) // auth req for creating the posts
r.patch("/:id",auth,updatepost)  // auth req for updating the personal posts
r.delete("/:id",auth,deletepost) // auth req for deleting the personal posts
r.patch("/:id/likedpost",auth,likepost) // auth req for liking  posts
r.get("/search",searchedposts) //no auth req for searching posts
r.get("/:id",getpostdetailsbyid) //no auth req for seeing a post and its similar posts
r.post("/:id/commentPost",auth,postcomment) //auth req for liking  posts
export default r;