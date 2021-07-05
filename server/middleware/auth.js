import jwt,{decode} from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const auth = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // from the front end we have sent the users token here 
        const manualauth = token.length < 500; //google sign in's token has more than 500 chars length so less that 500 means it is a manual signed up user
    
        let decodeD;
    
        if (token && manualauth) {      //if the token exists and it is a manual signed up user
            decodeD = jwt.verify(token, process.env.SECRET); //we decode the token
    
          req.userId = decodeD?.id; //and set userId to be the tokens id 
          
        } else {
            decodeD = jwt.decode(token);
    
          req.userId = decodeD?.sub; //google tokens id
        }    
    
        next();
      } catch (error) {
        console.log(error);
      }
}

export default auth
