import { makeStyles } from "@material-ui/core";
 export default makeStyles((theme)=>({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(126, 202, 156, 1)',
      },
      heading: {
        color: 'rgba(64, 57, 74, 1)',
      },
      image: {
        marginLeft: '50px',
      },
      [theme.breakpoints.down('sm')]:{
      mainContainer:{
        flexDirection:"column-reverse"
      }}

    }));