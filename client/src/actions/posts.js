import * as api from '../api';//exporting api

export const getPosts=(page)=>async(dispatch)=>{
try{
dispatch({type:'START_LOADING'}) // when ever we dispatch an action we show a loading wait
const {data}=await api.fetchPosts(page);//makes a call to api/api.js/fetchposts func meaning axios.get(URL)// this data is stored in destructed data
dispatch({type:'FETCH_ALL',payload:data})//if dispatch is of type fetchall,its sending all data
dispatch({type:'END_LOADING'}) // when we have received the data we stop the loading wait

}
catch(err){
console.log(err.message);
}
}
export const createPost=(post)=>async(dispatch)=>{
    try{
      dispatch({type:'START_LOADING'})
    const {data}=await api.createPost(post);//we get the data after creation of a post is completed in the back end 
    dispatch({type:'CREATE',payload:data})
    dispatch({type:'END_LOADING'})
    }
    catch(err){
    console.log(err.message);
    }
 }
 export const updatePost=(id,post)=>async(dispatch)=>{
    try{
    const {data}=await api.updatePost(id,post); //getting data after updating the post details
    dispatch({type:'UPDATE',payload:data})
    }
    catch(err){
    console.log(err.message);
    }
 }
 export const deletePost=(id)=>async(dispatch)=>{
   try{
   await api.deletePost(id); 
   dispatch({type:'DELETE',payload:id}) //we deleted the post data  for this id
   }
   catch(err){
   console.log(err.message);
   }
}
export const likePost=(id)=>async(dispatch)=>{
   try{
   const {data}=await api.likePost(id);
   dispatch({type:'UPDATE',payload:data}) //getting data after updating the post details by modifying their like count
   }
   catch(err){
   console.log(err.message);
   }
}
export const getSearchedposts=(searchval)=>async(dispatch)=>{
   try{
      dispatch({type:'START_LOADING'})
   const {data:{data}}=await api.fetchSearchedposts(searchval); //getting the gata of  our searched value from the backedn
   dispatch({type:'FETCH_SEARCH',payload:data})
   
   dispatch({type:'END_LOADING'})
   }
   catch(err){
   console.log(err.message);
   }
   }
export const getPost=(id)=>async (dispatch)=>{
   try {
      dispatch({type:'START_LOADING'})
      const {data}=await api.fetchPost(id);// getting data for a specific post from the backend
      dispatch({type:'FETCH_POST',payload:data})
      dispatch({type:'END_LOADING'})
   } catch (error) {
      
   }

}
export const postcomment=(commentdata,id)=>async(dispatch)=>{
   try{
      const {data}=await api.postcomment(commentdata,id);
      dispatch({type:'COMMENT',payload:{data}})  // updating the comments attribute for a post and then returning the updated post data 
      return data.comments;
   }
   catch(err)
   {
      console.log(err);
   }
}