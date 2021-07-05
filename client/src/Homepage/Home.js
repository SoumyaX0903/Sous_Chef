import React,{useState,useEffect} from 'react';
import { Container, Grow, Grid,Paper,AppBar,TextField,Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import Posts from '../Posts/Posts.js'
import Form from '../Form/form.js'
import {useHistory,useLocation} from 'react-router-dom';
import useStyles from './styles.js';
import { useDispatch } from 'react-redux';//lets us use dispatch
import { getSearchedposts} from '../actions/posts.js';//loads the data for fetchall
import Pagination from '../pagination';
function useQuery(){
  return new URLSearchParams(useLocation().search);
}
const Home=()=>{
    const classes = useStyles();
    const [currID,setcurrID]=useState(null);//checking if user has pressend edit button in posting a recipe form
    const [search,setsearch]=useState("");
    const [searchbytags,setsearchbytags]=useState([]);
    const dispatch = useDispatch();
    const query=useQuery();
    const history=useHistory();
    const page=query.get('page')||1;// from the url we get what page user wants
    const searchquery=query.get('searchQuery'); //wat is the searchquery
   

   
    const searchposts=()=>{
      if(search.trim()||searchbytags)
      {
        dispatch(getSearchedposts({search:search,tags:searchbytags.join(',')}))
        history.push(`/posts/search?searchQuery=${search||'none'}&tags=${searchbytags.join(',')}`)
      }
      else
      {
        history.push("/");
      }
    }
    return(
        <Grow in>
          <Container maxwidth="xl">
            <Grid container justify="space-between" className={classes.gridContainer} alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
            <Posts setcurrID={setcurrID}/> {/* Rendering all the posts component */}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
            <TextField
              name="search"
              variant="outlined"
              label="Search Recipes"
              fullWidth
              value={search}
              onChange={(e)=>setsearch(e.target.value)}
            />
            <ChipInput
            style={{margin:"10px 0"}}
            value={searchbytags}
            onAdd={(tag)=>setsearchbytags([...searchbytags,tag])}
            onDelete={(deltag)=>setsearchbytags(searchbytags.filter((tag)=>tag!==deltag))}
            label="Search By Tags"
            variant="outlined"
            />
            <Button style={{background:"black",color:"white"}} onClick={()=>searchposts()}>Search</Button>
            </AppBar>
            <Form  currID={currID} setcurrID={setcurrID}/> {/* Posting a recipe component */}
            
            {(!searchquery&&!searchbytags.length)&&(//if user  has not  searched anything we dont show pagination
               <Paper elevation={1} className={classes.pagination}>
               <Pagination page={page}/>
             </Paper>
            )}
            </Grid>
           
            </Grid>
          </Container>
        </Grow>
        
        )
}
export default Home;