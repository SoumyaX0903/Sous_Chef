import express from 'express';
import {signin,signup} from '../controllers/controlu.js'
const r=express.Router();
r.post("/signin",signin); // callback to our signin functionality
r.post("/signup",signup); // callback to our signup functionality
export default r;