import { errorResponseBody } from '../utils/responsebody.js';
const validateSignupRequest = async (req, res, next) => {
    //validate name of the user
    if (!req.body.name) {
        errorResponseBody.err = "Name of the user not present in the request";
        return res.status(400).json(errorResponseBody);
    }
    // validate email of the user
    if (!req.body.email) {
        errorResponseBody.err = "Email of the user not present in the request";
        return res.status(400).json(errorResponseBody);
    }
    if (!req.body.password) {
        errorResponseBody.err = "Password of the user not present in the request";
        return res.status(400).json(errorResponseBody);

    }
    next();
};
const validateSigninRequest = async(req,res,next) => {
    if(!req.body.email){
        errorResponseBody.err = "No email provided for sign in";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.password){
        errorResponseBody.err = "No password for sign in";
        return res.status(400).json(errorResponseBody);
    }
    next();
}
export {validateSignupRequest,validateSigninRequest};