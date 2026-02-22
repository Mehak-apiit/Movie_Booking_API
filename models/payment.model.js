import mongoose from "mongoose";
import { PAYMENT_STATUS } from "../utils/constants.js";
const paymentSchema = new mongoose.Schema({
    bookingId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        red: 'Booking'
    },
    amount:{
        type:Number,
        required: true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values: [PAYMENT_STATUS.pending,PAYMENT_STATUS.failed,PAYMENT_STATUS.success],
            message:"Invalid payment status"
        },
        default: PAYMENT_STATUS.pending
    }
},{timestamps:true});
const payment = mongoose.model('Payment',paymentSchema);
export default payment;