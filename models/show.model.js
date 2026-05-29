import mongoose from "mongoose";
const showSchema = new mongoose.Schema({
    theatreId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true
    },
    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    timing:{
        type:String,
        unique:true,
        required:true
    },
    noOfSeats:{
        type:Number,
        required: true
    },
    price:{
        type:Number
    },
    format:{
        type:String
    }
},{timestamps: true});
const Show = mongoose.model('Show',showSchema);
export default Show;