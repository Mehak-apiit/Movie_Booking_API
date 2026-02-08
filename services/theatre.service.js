import Theatre from "../models/theatre.model.js";
const createTheatreService = async(data)=>{
    try{
        const response = await Theatre.create(data);
        return response;
    }
    catch(error){
        if(error.name == 'ValidationError'){
            let err ={};
            Object.keys(error.errors).forEach((key)=>{
                err[key] = error.errors[key].message;
            });
            return {err: err, code: 422};
        }
        console.log(error);
        throw err;
    }
}
//-----------------------------------------------------------------------------------------------
const getTheatreService = async (id)=>{
    try{
        const response = await Theatre.findById(id);
        if(!response){
            // no record found for the given id
            return {
                err: "No theatre found for the given id",
                code: 404
            }
        }
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}
//---------------------------------------------------------------------------------------------------
const getAllTheatresService = async()=>{
    try{
        const response = await Theatre.find({});
        return response;
    }catch(errror){
        console.log(error);
        throw error;
    }
}
//--------------------------------------------------------------------------------------------------
const deleteTheatreService = async(id) =>{
    try{
        const response = await Theatre.findByIdAndDelete(id);
        if(!response){
            return {
                err: "No record of a theatre found for the given id",
                code: 404
            }
        }
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}
export {createTheatreService, getTheatreService,getAllTheatresService,deleteTheatreService};