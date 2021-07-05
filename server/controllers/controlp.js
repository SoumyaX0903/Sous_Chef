import postRecipe from "../models/Posts.js" // importing the data model for our posts
import mongoose from "mongoose";

export const searchedposts= async function(req,res){
    try {
        const {searchQuery,tags}=req.query; // in our query we have searched paramters that are either titles or tags
        const title=new RegExp(searchQuery,"i"); //we set a regular expression so that we can match our title
        
        const posts=await postRecipe.find({$or:[{title},{tags:{$in:tags.split(',')}}]}) //finding if in our model there exists post with the title or if the tags match with the tags of the other posts
        res.json({data:posts}); //as data we send the posts that we get from the search
        }
    catch (err){
        console.log("hello");
        res.status(404).json({message:err.message});
        }
}
export const getpost= async function(req,res){
    try {
        const {page}=req.query; // we display the posts depending on what page the user is in
        const lim=9;// maximum 9 posts are displayed on the page 
        const pageno=Number(page);
        const startvalue=pageno*lim-lim; //start value of the no of posts that to be rendered is calculated 
        const totalposts=await postRecipe.countDocuments({}); // we count all the posts that we have  so that we can calc how many pages would be req to render them
        
        const recipes= await postRecipe.find().sort({_id:-1}).limit(lim).skip(startvalue); // we sort our posts acc to the id keeping the newest ones at thetop
        res.status(200).json({data:recipes,currpage:pageno,totalpages:Math.ceil(totalposts/lim)});
        //we send back the data for a single page that is asked by the user , current page he is in and total no of pages req to render all the posts
        }
    catch (err){
        res.status(404).json({message:err.message});
        }
}
export const createpost= async function(req,res){
   const obj=req.body; //inserting the new post
   const newRecipe= postRecipe({...obj,creator:req.userId,postdate:new Date().toISOString()}) //when we create a post we set that posts creator field  to be the id of the currently logged in useer
    try{await newRecipe.save();
        res.status(201).json(newRecipe); //we send the created posts data
    }
    catch (err){res.status(409).json({message:err.message});}
}
export const updatepost= async function(req,res){
    const _id=req.params.id;
    const givenpost=req.body; //by id we find the post and set is prev content to new content that is sent from the client side
    if(!mongoose.Types.ObjectId.isValid(_id)){return res.status(404).send("No post with this id!");}
    const updatedpost= await postRecipe.findByIdAndUpdate(_id,givenpost,{new:true});
    res.json(updatedpost);// we send the updated post
}
export const deletepost= async function(req,res){
    const _id=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(_id)){return res.status(404).send("No post with this id!");}
    //we find whether the id is valid and then we delete the post form the DB for that id 
    const x=await postRecipe.findByIdAndDelete(_id,(err,doc)=>{
        if(!err)
        console.log(`Deleted ${doc}`);
        else
        console.log(err.message);
    });
    res.json({message:'Post has been deleted'});// we just send a message to the client side saying the post has been deleted 
}
export const likepost= async function(req,res){
    const _id=req.params.id;
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });  // if a user is logged in we would have his id so if he is not then we cant use like functionality
      }
    
    if(!mongoose.Types.ObjectId.isValid(_id)){return res.status(404).send("No post with this id!");}
    const post= await postRecipe.findById(_id)//now we find the post which has the id of the id sent from client side
    const index = post.likes.findIndex((id) => id ===String(req.userId));//as a user can only like a post once we store the userids in the likes array so if it is already present we remove it else we add it
    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const x=await postRecipe.findByIdAndUpdate(_id,post,{new:true})
    res.json(x);
}
export const getpostdetailsbyid=async(req,res)=>{
    try {
        const id=req.params.id;
        const post=await postRecipe.findById(id);//we find the post for this id
        res.status(200).json(post);//we send the post which has the id same as the id sent from client side
        
    } catch (error) {
        res.status(404).json({message:error.message})
    }

}
export const postcomment=async(req,res)=>{
    try{
        const id=req.params.id;//we set comments for a particular post id 
        const {commentdata}=req.body; //we get the comment sent to us by the client side 
        const post=await postRecipe.findById(id); //now we find a post that matches the id  
        post.comments.push(commentdata);//and push the comment to it
        const updatedpost= await postRecipe.findByIdAndUpdate(id,post,{new:true})//updated the post  after adding the comment
        res.status(200).json(updatedpost);// finally we return the updated post

    }
    catch(err)
    {
        res.status(404).json({message:err.message})
    }
}