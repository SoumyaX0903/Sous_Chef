import express from 'express';
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import pr from './routes/posts.js';
import ur from './routes/users.js';
dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: '40mb', extended: true }))// setting a limit for our data 
app.use(bodyParser.urlencoded({ limit: '40mb', extended: true }))
app.use(cors());
//we specifically have 2 groups of routers one on posts route and one on users route
app.use('/posts',pr); //posts deal with all the operations regarding our posts
app.use('/users',ur);// users deal with authentication routes
const CONNECT_URL="mongodb+srv://"+process.env.NAME+":"+process.env.PASSWORD+"@socialmedia.rznlc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT= process.env.PORT || 5000;
mongoose.connect(CONNECT_URL,{useNewUrlParser:true,useUnifiedTopology:true})
  .then(() => app.listen(PORT, () => console.log(`Server started at ${PORT}`)))
  .catch((error) => console.log(`error code:${error}`));

mongoose.set('useFindAndModify', false);
