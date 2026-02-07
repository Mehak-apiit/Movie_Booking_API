import Theatre from "../models/theatre.model.js";
const createTheatreService = async(data)=>{
    try{
        const response = await Theatre.create(data);
        return response;
    }
    catch(err){
        if(error.name == 'ValidationError'){
            let err ={};
            Object.keys(error.errors).forEach((key)=>{
                err[key] = error.errors[key].message;
            });
            return {err: err, code: 422};
        }
        console.log(err);
        throw err;
    }
}
export default createTheatreService ;