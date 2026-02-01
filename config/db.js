import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully connected to mongo");
    }catch(err){
        console.log("Not able to connect mongo",err);
    }
}
    
export default connectDB;