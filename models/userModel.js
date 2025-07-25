
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// here we create user schema 
// why mongoose.Schema ?? 
const userSchema = new mongoose.Schema({
    name:String,
    email :{
        type :String,
        unique : true
    },
    password:String,
    role:{
        type:String,
        enum : ["user" , "admin"],
        default: "user"

    },

},{

    // what does timestamps do ????
    timestamps:true 

});


// what does this formate mean ? line by line
// mongoose middelware -----------------------
userSchema.pre("save",async function (next) {
    this.password = await bcrypt.hash(this.password,10)
    next() ;

    
});

const UserModel = mongoose.model("User",userSchema)
export default UserModel ;