import Theatre from "../models/theatre.model.js";
const createTheatreService = async(data)=>{
    try{
        const response = await Theatre.create(data);
        return response;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}
export default createTheatreService ;