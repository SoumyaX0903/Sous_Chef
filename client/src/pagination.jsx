import React,{useEffect} from 'react'
import {Pagination,PaginationItem} from '@material-ui/lab'
import usestyles from './stylespage'
import { useDispatch,useSelector } from 'react-redux';
import { getPosts } from './actions/posts';
import {Link} from 'react-router-dom';
const Paginate=({page})=>{
    const classes=usestyles();
    const dispatch = useDispatch();
    const {totalpages}=useSelector((state)=>state.posts)
    useEffect(()=>{
        if(page)dispatch(getPosts(page))
    },[page])//every time a page changes we dispatch an action
    return (
        <Pagination
        classes={{ul:classes.ul}}
        count={totalpages}
        page={Number(page)||1}
        variant="outlined"
        color="primary"
        renderItem={(item)=>{
            return <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>
        }}
        />
    );
}
export default Paginate;