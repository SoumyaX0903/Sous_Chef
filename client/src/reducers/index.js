//reducer-it is function the changes state of app
import { combineReducers } from 'redux';//combines output of all reducers into one object
import posts from './posts.js';
import auth from './auth.js';

export default combineReducers({ posts,auth });