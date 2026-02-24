import mongoose from "mongoose";
const ojectId = mongoose.Types.OjectId;
import { STATUS_CODES } from "../utils/constants.js";
import { errorResponseBody } from "../utils/responsebody.js";
const validateCreateShowRequest = async(req,res,next) =>{
    //validate theatre id
    if(!req.body.theatreId){
        errorResponseBody.err = "No theatre provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    if(!OjectId.isValid(req.body.theatreId)){
        errorResponseBody.err = "No theatre provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    //validate movie presence
    if(!req.body.movieId){
        errorResponseBody.err = "No movie provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    if(!OjectId.isValid(req.body.movieId)){
        errorResponseBody.err = "Invalid movie id";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    //validate timing presence
    if(!req.body.noOfSeats){
        errorResponseBody.err = "No seat info provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    // validate price presence
    if(!req.body.price){
        errorResponseBody.err = "No price information provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    next();
}
const validateShowUpdateRequest = async(req,res,next) =>{
    if(req.body.theatreId || req.body.movieId){
        errorResponseBody.err = "We can not update theatre or movie";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    next()
}
export {validateCreateShowRequest,validateShowUpdateRequest};