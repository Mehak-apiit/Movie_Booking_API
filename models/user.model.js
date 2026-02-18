import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {USER_ROLE,USER_STATUS} from '../utils/constants.js';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    userRole: {
        type: String,
        required: true,
        enum: {
            values: [USER_ROLE.customer,USER_ROLE.admin,USER_ROLE.client],
            message:"Invalid user role given"
        },
        default: USER_ROLE.customer
    },
    userStatus: {
        type: String,
        required: true,
        enum: {
            values: [USER_STATUS.approved,USER_STATUS.pending,USER_STATUS.rejected],
            messages:"Invalid status for user given"
        },
        default:USER_STATUS.approved
    }
}, { timestamps: true });

//userSchema.pre('save', async function (next) {
    // a trigger to encrypt the plain password before saving it
  //  try {
    //    if (!this.isModified('password')) {
      //      return next();
        //};
        //const enc = await bcrypt.hash(this.password, 10);
        //this.password = enc;
        //next();

    //}
    //catch (err) {
      // next(err);
    //}

//});
userSchema.methods.isValidPassword = async function (plainPassword){
    const currentUser = this;
    console.log(plainPassword,currentUser.password);
    const compare = await bcrypt.compare(plainPassword,currentUser.password);
    return compare;
}

const User = mongoose.model('User', userSchema);
export default User;