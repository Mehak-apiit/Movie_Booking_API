import jwt from 'jsonwebtoken';
import { errorResponseBody } from '../utils/responsebody.js';
import { getUserById,createUser,getUserByEmail } from '../services/user.service.js';
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
const validateSigninRequest = async (req, res, next) => {
    if (!req.body.email) {
        errorResponseBody.err = "No email provided for sign in";
        return res.status(400).json(errorResponseBody);
    }
    if (!req.body.password) {
        errorResponseBody.err = "No password for sign in";
        return res.status(400).json(errorResponseBody);
    }
    next();
};
const isAuthenticated = async(req,res,next)=>{
    try{
    const token = req.headers["x-access-token"];
    if(!token){
        errorResponseBody.err = "No token provided";
        return res.status(403).json(errorResponseBody);
    }
    const response = jwt.verify(token, process.env.AUTH_KEY);
    if(!response){
        errorResponseBody.err = "Token not verified";
        return res.status(401).json(errorResponseBody);
    }
    const user = await getUserById(response.id);
    req.user = user.id;
    next()
}catch(error){
    if(error.name == 'jsonWebTokenError'){
        errorResponseBody.err = error.message;
        return res.status(401).json(errorResponseBody);
    }
    if(error.code == 404){
        errorResponseBody.err = "User does not exist"
        return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
}

}
export { validateSignupRequest, validateSigninRequest, isAuthenticated };