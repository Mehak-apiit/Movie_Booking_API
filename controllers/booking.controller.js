import { successResponseBody,errorResponseBody } from "../utils/responsebody.js";
import createBooking from "../services/booking.service.js";
import { STATUS_CODES } from "../utils/constants.js";

const create = async(req,res) =>{
    try{
        let userId = req.user;
        const response = await createBooking({...req.body,userId: userId});
        successResponseBody.message = "Successfully created a booking";
        successResponseBody.data = response;
        return res.status(STATUS_CODES.CREATED).json(successResponseBody);
    }catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}
export default create;