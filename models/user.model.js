import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minLength: 6
    },
    userRole:{
        type:String,
        required:true,
        default:"CUSTOMER"
    },
    userStatus:{
        type:String,
        required: true,
        default:"APPROVED"
    }
},{timestamps:true});
userSchema.pre('save',async function (next){
    // a trigger to encrypt the plain password before saving it
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();

});

const User = mongoose.model('User',userSchema);
export default User;