
import mongoose from "mongoose";

const userSchema = mongoose.Schema({ // using mongoose to ceeate our users schema 
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

export default mongoose.model("User", userSchema);