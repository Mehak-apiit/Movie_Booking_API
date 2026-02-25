import { STATUS_CODES } from "../utils/constants.js";
import { errorResponseBody } from "../utils/responsebody.js";
import mongoose from "mongoose";
const ojectId = mongoose.Types.OjectId;



const verifyPaymentCreateRequest = async (req, res, next) => {
    // validate booking id presence
    if(!req.body.bookingId) {
        errorResponseBody.err = 'No booking id received';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    // validate correct bookingid
    if(!ObjectId.isValid(req.body.bookingId)) {
        errorResponseBody.err = 'Invalid booking id';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    // validate amount presence
    if(!req.body.amount) {
        errorResponseBody.err = 'No amount sent';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    // everything is fine
    next();

}

export default verifyPaymentCreateRequest;
