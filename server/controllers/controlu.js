import bcrypt from 'bcryptjs'  // for generating encrypted version of user passwords 
import jwt from 'jsonwebtoken'  //store the token of users
import User from '../models/users.js'
import dotenv from 'dotenv'
dotenv.config()
 
export const signin= async(req,res)=>{
    try{
    const {email,password}=req.body;  // we get data from client side
    const isuserpresent=await User.findOne({email}); //find if the email exists in our DB
    if(!isuserpresent){res.status(404).json({message:"User not present!"})}
    const isValidp = await bcrypt.compare(password, isuserpresent.password);//match the password entered for signin along with what we have 
    if (!isValidp) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ email: isuserpresent.email, id: isuserpresent._id }, process.env.SECRET, { expiresIn: "3h" });

    res.status(200).json({ result: isuserpresent, token });
}
    catch(err){
    res.status(500).json({ message: "Something went wrong" });
    }
}
export const signup= async(req,res)=>{
    const { email, password,confirmpassword, firstName, lastName } = req.body;

  try {
    const isuseralreadypresent = await User.findOne({ email });
    if (isuseralreadypresent) return res.status(400).json({ message: "User already exists" });
    if(password!==confirmpassword)return res.status(400).json({message:"Password and Confirm Password didnt match!"})
    const hashp= await bcrypt.hash(password, 12);//generating the hashed password using 12 salt rounds
    const result = await User.create({ email, password: hashp, name: `${firstName} ${lastName}` });//inserting user data in DB
    const token = jwt.sign( { email: result.email, id: result._id }, process.env.SECRET, { expiresIn: "3h" } );
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }

}