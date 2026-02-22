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
};
const updateBooking = async(data,bookingId) =>{
    try{
        const response = await findByIdAndUpdate(bookingId,data,{
            new: true,runValidators:true
        });
        if(!response){
            throw{
                err:"No booking found for the given id",
                code:STATUS_CODES.NOT_FOUND
            }
        }
        return response;
    }catch(error){
        if(error.name =='ValidatioinError'){
            let err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
            throw {err: err,code: STATUS_CODES.UNPROCESSABLE_ENTITY};
        }
        console.log(error);
        throw error;
    }
};
const getBookings = async(data) =>{
    try{
        const response = await Booking.find(data);
        return response;
    }catch(error){
        throw error;
    }
};
const getAllBookings = async() =>{
    try{
        const response = await Booking.find();
        return response;

    }catch(error){
        throw error;
    }
};
const getBookingByIdService = async(id,userId) =>{
    try{
        const response = await Booking.findById(id);
        if(!response){
            throw{
                err: "No booking records found for the id",
                code: STATUS_CODES.NOT_FOUND
            }
        }
        if(response.userId != userId){
            throw{
                err: 'Not able to access the booking',
                code:STATUS_CODES.UNAUTHORISED
            }
            
        }
        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}
export {createBooking,updateBooking,getBookings,getAllBookings,getBookingByIdService};