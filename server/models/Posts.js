import mongoose from 'mongoose';
const postSchema=mongoose.Schema({  // using mongoose to ceeate our posts schema 
    title:String,
    recipe:String,
    name:String,
    creator:String,
    tags:[String],
    postfile:String,
    comments:{
        type:[String],
        default:[]
    },
    likes:{
        type:[String],
        default:[]
    },
    postdate:{
        type:Date,
        default:new Date()
    }

})
const postRecipe=mongoose.model('postRecipe',postSchema) //exporting the final post model
export default postRecipe;