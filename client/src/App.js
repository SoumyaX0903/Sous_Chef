import React from 'react';
import { Container } from '@material-ui/core';
import Home from './Homepage/Home.js'
import Navigationbar from './Navigationbar/navigation.js'
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import Auth from './Authentication/Auth.js';
import Postinfo from './PostDetails/postinfo.jsx'

const App =()=>{
  const userpresent=JSON.parse(localStorage.getItem('profile'));
    return(
        <BrowserRouter>
        <Container maxWidth="xl">
         <Navigationbar />
         <Switch>
           <Route path="/" exact component={()=><Redirect to="/posts" />}/>
           <Route path="/posts" exact component={Home}/>
           <Route path="/posts/search" exact component={Home}/>
           <Route path="/posts/:id" exact component={Postinfo}/>
           <Route path="/auth" exact component={()=>!userpresent?<Auth/>:<Redirect to="/posts"/>}/>
         </Switch>
         
         </Container>
        </BrowserRouter>
        )
}
export default App;