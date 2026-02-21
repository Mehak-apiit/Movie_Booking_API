import {errorResponseBody} from  "../utils/responsebody.js"
const validateUpdateUserRequest = (req,res,next) =>{
    //validate the presence of atleast one of the two i.e userRole or userStatus
    if(!(req.body.userRole || req.body.userStatus)){
        errorResponseBody.err = 'Malformed request, please send alteast one paramerter either userRole or userStatus';
        return res.status(400).json(errorResponseBody);
    }
    next();
}
export default validateUpdateUserRequest;