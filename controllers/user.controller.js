import {createUser,getUserByEmail,getUserById,resetPasswordService,updateUserRoleorStatus} from '../services/user.service.js'
import { errorResponseBody,successResponseBody } from '../utils/responsebody.js'
const update = async(req,res) =>{
    try{
        const response = await updateUserRoleorStatus(req.body,req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = 'Successfully updated the user';
        return res.status(200).json(successResponseBody);

    }catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}
export default update;