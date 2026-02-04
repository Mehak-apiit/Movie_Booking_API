import Movie from '../models/movie.model.js'
import {getMovieById} from "../services/movie.service.js";
const errorResponseBody = {
    err:{},
    data:{},
    message:'Something went wrong, cannot process the routes',
    success: false
}
const successResponseBody = {
    err:{},
    data:{},
    message:'Successfully processed the request',
    success: true
}
const createMovie = async(req,res) =>{
    try{//********DOUBT*****************/
        const movie = await Movie.create(req.body);
        return res.status(201).json({
            success:true,
            error:{},
            data: movie,
            message: 'Successfully created a new movie',
        })
    } catch(err){
        console.log(err);
        return res.status(500).json({
            success: true,
            error: err,
            data:{},
            message: 'Something went wrong'
        });
    }

};
//----------------------------------------------------------------------------------------------------
const deleteMovie = async(req,res) =>{
    try{
        const response = await Movie.deleteOne({
            _id: req.params.Id
        });
        return res.status(200).json({
            success:true,
            error: {},
            message:'Successfully deleted the movie',
            data: response
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            error:err,
            message:'Something went wrong',
            data:{}
        });
    }
}
//--------------------------------------------------------------------------------------------------
const getMovie = async (req,res) =>{
    try{
        const response = await getMovieById(req.params.id)
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
            
        }
        successResponseBody.data = response.data;
        return res.status(response.code).json(successResponseBody);

    }catch(err){
        console.log(err);
        return res.status(500).json(errorResponseBody);
    }
}
export {createMovie,deleteMovie,getMovie};
