
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  image:{
    height:"300px",
    width:"500px",
    border:"2px solid white",
    borderRadius:"30px",
    marginTop:"80px",
    marginLeft:"40px"
  }
}));