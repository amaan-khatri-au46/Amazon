// inside this we are going to define a schema 

// first we have to import mongoose

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // first parameter for schema is a bunch of user 
    //  for saving the user if the name of the user is empty it will throw error to user
    //  because we are reuired this fied is true .. 
    name:{type: String, required:true},
    email: {
        type: String, 
        required:true, 
        index:true, 
        unique: true,
    },
        password: {type:String, required:true},
        isAdmin: {type: Boolean, required:true, default:false},
});
//  i create a user schema and not its time to create a model
// we are asking monog db to create a collection inside Amazon Db 
const User = mongoose.model("User",userSchema);
// exporting the user model... 
export default User;
