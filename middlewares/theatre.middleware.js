import { errorResponseBody } from '../utils/responsebody.js';
const validateTheatreCreateRequest = async (req, res, next) => {
    if (!req.body.name) {
        errorResponseBody.message = "The name of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody);
    }
    if (!req.body.pincode) {
        errorResponseBody.message = "The pincode of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody);
    }
    if (!req.body.city) {
        errorResponseBody.message = "The city of the theatre is not present";
        return res.status(400).json(errorResponseBody);
    }
    next();
}
const validateUpdateMoviesRequest = async(req,res,next) =>{
    if(!req.body.insert){
        errorResponseBody.message="The insert parameter is missing in the request";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.movieIds){
        errorResponseBody.message="No movies present in the request to be updated";
        return res.status(400).json(errorResponseBody);
    }
    if(!(req.body.movieIds instanceof Array)){
        errorResponseBody.message="Expected array of movies but found something else";
        return res.status(400).json(errorResponseBody);
    }
    if(req.body.movieIds.length == 0){
        errorResponseBody.message="No movies present in the array provided ";
        return res.status(400).json(errorResponseBody);
    }
    next();
}
export { validateTheatreCreateRequest, validateUpdateMoviesRequest } 
