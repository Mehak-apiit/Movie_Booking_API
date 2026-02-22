import create from "../controllers/booking.controller.js";
import Booking from "../models/booking.model.js";
import { STATUS_CODES } from "../utils/constants.js";
const createBooking = async(data) =>{
    try{
        const response = await create(data);
        return response;
    }catch(error){
        console.log(error);
        if(error.name == 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach(key =>{
                err[key] = error.errors[key].message;
            });
            throw {err: err,code: STATUS_CODES.UNPROCESSABLE_ENTITY};
        }
        throw error;
    }
}
export default createBooking;