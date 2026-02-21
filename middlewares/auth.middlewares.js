import jwt from 'jsonwebtoken';
import { errorResponseBody } from '../utils/responsebody.js';
import { USER_ROLE,STATUS_CODES } from '../utils/constants.js';
import { getUserById,createUser,getUserByEmail } from '../services/user.service.js';
const validateSignupRequest = async (req, res, next) => {
    //validate name of the user
    if (!req.body.name) {
        errorResponseBody.err = "Name of the user not present in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    // validate email of the user
    if (!req.body.email) {
        errorResponseBody.err = "Email of the user not present in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    if (!req.body.password) {
        errorResponseBody.err = "Password of the user not present in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);

    }
    next();
};
const validateSigninRequest = async (req, res, next) => {
    
    if (!req.body.email) {
        errorResponseBody.err = "No email provided for sign in";
        return res.status( STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    if (!req.body.password) {
        errorResponseBody.err = "No password for sign in";
        return res.status( STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    next();
};
const isAuthenticated = async(req,res,next)=>{
    try{
    const token = req.headers["x-access-token"];
    if(!token){
        errorResponseBody.err = "No token provided";
        return res.status(STATUS_CODES.FORBIDDEN).json(errorResponseBody);
    }
    const response = jwt.verify(token, process.env.AUTH_KEY);
    if(!response){
        errorResponseBody.err = "Token not verified";
        return res.status(STATUS_CODES.UNAUTHORISED).json(errorResponseBody);
    }
    const user = await getUserById(response.id);
    req.user = user.id;
    next()
}catch(error){
    if(error.name == 'jsonWebTokenError'){
        errorResponseBody.err = error.message;
        return res.status(STATUS_CODES.UNAUTHORISED).json(errorResponseBody);
    }
    if(error.code == STATUS_CODES.NOT_FOUND){
        errorResponseBody.err = "User does not exist"
        return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
}

};
const validateResetPasswordRequest = async(req,res,next) => {
    if(!req.body.oldPassword){
        errorResponseBody.err = 'Missing the old password in the request';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    if(!req.body.newPassword) {
        errorResponseBody.err = 'Missing the new password in the request';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    next();
};
const isAdmin = async(req,res,next) => {
    const user = await getUserById(req.user);
    if(user.userRole != USER_ROLE.admin){
        errorResponseBody.err = "User is not an admin, can not proceed with the request";
        return res.status(STATUS_CODES.UNAUTHORISED).json(errorResponseBody);
    }
    next();
};
const isClient = async(req,res,next) =>{
    const user = await getUserById(req.user);
    if(user.userRole != USER_ROLE.client){
        errorResponseBody.err = "User is not client,can not proceed with the request";
        return res.status(STATUS_CODES.UNAUTHORISED).json(errorResponseBody);
    }
    next();
};
const isAdminorClient = async (req,res,next) =>{
    const user = await getUserById(req.user);
    if(user.userRole != USER_ROLE.admin && user.userRole != USER_ROLE.client){
        errorResponseBody.err = "User is neither a client not an admin, can not proceed with request";
        return res.status(STATUS_CODES.UNAUTHORISED).json(errorResponseBody);
    }
    next();
}

export { validateSignupRequest,validateSigninRequest, isAuthenticated,validateResetPasswordRequest,isAdmin,isClient,isAdminorClient};