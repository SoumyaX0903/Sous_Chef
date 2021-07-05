import axios from 'axios'
const API=axios.create({baseURL:'http://localhost:5000'})
API.interceptors.request.use((req) => { //to send our user token to the middleware 
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
  });
export const fetchSearchedposts = (searchval) => 
{
  return API.get(`/posts/search?searchQuery=${searchval.search||'none'}&tags=${searchval.tags}`);//we fetch data from MY server 5000
}
export const fetchPosts = (page) => 
{
  return API.get(`/posts?page=${page}`);
}
export const createPost = (newPost) => 
{
  return API.post('/posts', newPost);
}
export const updatePost = (id, updatedPost) => {
  return API.patch(`/posts/${id}`, updatedPost);
}
export const deletePost = (id) => {
  return API.delete(`/posts/${id}`);
}
export const likePost = (id) => {
  return API.patch(`/posts/${id}/likedpost`);
}
export const signUp = (formData) => {
  return API.post('/users/signup', formData);
}
export const signIn = (formData) =>{ 
  return API.post('/users/signin', formData);
}
export const fetchPost=(id)=>{
  return API.get(`/posts/${id}`);
}
export const postcomment=(commentdata,id)=>
{
return  API.post(`/posts/${id}/commentPost`,{commentdata});
}
