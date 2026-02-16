import userService from '../services/user.service.js';
import { successResponseBody, errorResponseBody } from '../utils/responsebody.js';
const signup = async (req,res) =>{
    try{
        const response = await createUser(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully registration a user";
        return res.status(201).json(successResponseBody);
    }catch(error){
        errorResponseBody.err = error;
        return res.status(500).json(successResponseBody);
    }
}
export default signup;