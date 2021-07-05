//changing the state of my app looking at my current state
const reducer= (currstate={posts:[],isLoading:true},action)=>{//posts is the current state of app
switch(action.type){
    case 'FETCH_ALL': // here we are fetching all the posts according to the page limit for each page 
       return {...currstate,posts:action.payload.data,currentpage:action.payload.currpage,totalpages:action.payload.totalpages}
    case 'START_LOADING':
        return {...currstate,isLoading:true} // if start loading is dispatched we set isloading to be true so we can render a buffer depending on it 

    case 'END_LOADING':
        return {...currstate,isLoading:false} // if end loading is dispatched we set isloading to be false so we can stop rendering a buffer depending on it 

    case 'CREATE':
        return {...currstate,posts:[...currstate.posts,action.payload]} // we have all the posts that we had along with the new created post data
    case 'UPDATE':
        return {...currstate,posts:currstate.posts.map((post)=>post._id===action.payload._id?action.payload:post)};// we map through the posts and as we did update by id we know the id of the post that has been updated so depending on that we render the updated post instead of the old one 
    case 'DELETE':
        return {...currstate,posts:currstate.posts.filter((post)=>post._id!==action.payload)} // we do delete by id so depending on that we show all the posts that do not have the delete id
    case 'FETCH_SEARCH':
        return {...currstate,posts:action.payload} //our posts  now become only the searched posts that we get from the backend
    case 'FETCH_POST':
        return {...currstate,post:action.payload}; // only 1 post is send from the backend
    case 'COMMENT':
        return {...currstate,posts:currstate.posts.map((post)=>{
            if(post._id===action.payload._id)return action.payload;  // for a particular post as we do comment by id  so if the id of a post matches we that we show the updated post will comments attribute
            else
            return post;//if not matched send the post as it was before 
        })}
    default:
        return currstate;
}
}
export default reducer;