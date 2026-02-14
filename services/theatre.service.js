import Theatre from "../models/theatre.model.js";
const createTheatreService = async (data) => {
    try {
        const response = await Theatre.create(data);
        return response;
    }
    catch (error) {
        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            return { err: err, code: 422 };
        }
        console.log(error);
        throw err;
    }
}
//-----------------------------------------------------------------------------------------------
const getTheatreService = async (id) => {
    try {
        const response = await Theatre.findById(id);
        if (!response) {
            // no record found for the given id
            return {
                err: "No theatre found for the given id",
                code: 404
            }
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
//---------------------------------------------------------------------------------------------------
const getAllTheatresService = async (data) => {
    try {

        let query = {};
        let pagination = {};
        pagination.limit = data?.limit || 3;
        if(data && data.limit){
            pagination.limit = data.limit;
        }
        if(data && data.city){
            // this checks whether city is present in query parameter or not
            query.city = data.city;
        }
        if(data && data.pincode){
            // this checks whether pincode is present in the query parameter or not
            query.pincode = data.pincode;
        }
        if(data && data.name){
            query.name = data.name;
        }
        if(data && data.skip !== undefined){
            let perPage = (data.limit) ? data.limit : 3;
            pagination.skip = (data.skip-1)*perPage;
        }
        const response = await Theatre.find(query,{},pagination);
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