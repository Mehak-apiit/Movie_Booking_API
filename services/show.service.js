import showSchema from '../models/show.model.js';
import Theatre from '../models/theatre.model.js';
import {STATUS_CODES} from '../utils/constants.js';
const createShow = async(data) =>{
    try{
        const theatre = await findById(data.theatreId);
        if(!theatre){
            throw{
                err: 'No theatre found',
                code:STATUS_CODES.NOT_FOUND
            }
        }
        if(theatre.movies.indexOf(data.movieId)== -1){
            throw{
                err: 'Movie is actually not avaiable in the theatre',
                code: STATUS_CODES.NOT_FOUND
            }
        }
        const response = await create(data);
        return response;
    }catch(error){
        if(error.name == 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach(key =>{
                err[key] = error.errors[key].message;
            });
            throw{
                err,
                code:STATUS_CODES.UNPROCESSABLE_ENTITY
            }
        }
        throw error;
    }
};
const getShows = async(data) =>{
    try{
        let filter = {};
        if(data.theatreId){
            filter.theatreId = data.theatreId;
        }
        if(data.movieId){
            filter.movieId = data.movieId;
        }
        const response = await Show.find(filter);
        if(!response){
            throw{
                err: 'No shows found',
                code:STATUS_CODES.NOT_FOUND
            }
        }
        return response;
    }catch(error){
        throw error;
    }
}
export {createShow,getShows};