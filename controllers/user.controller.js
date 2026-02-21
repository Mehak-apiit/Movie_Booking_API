import {createUser,getUserByEmail,getUserById,resetPasswordService,updateUserRoleorStatus} from '../services/user.service.js'
import { errorResponseBody,successResponseBody } from '../utils/responsebody.js'
import { STATUS_CODES } from '../utils/constants.js';
const update = async(req,res) =>{
    try{
        const response = await updateUserRoleorStatus(req.body,req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = 'Successfully updated the user';
        return res.status(STATUS_CODES.OK).json(successResponseBody);

    }catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}
export default update;