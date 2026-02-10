import { response } from 'express';
import Movie from '../models/movie.model.js'
import {getMovieById} from "../services/movie.service.js";
import {successResponseBody,errorResponseBody} from '../utils/responsebody.js';

const createMovie = async(req,res) =>{
    try{
        const movie = await movieService.createMovie(req.body);
        successResponseBody.data = movie;
        successResponseBody.message = "Successfully created the movie";
        return res.status(201).json(successResponseBody);
    } catch(err){
        console.log(err);
        return res.status(500).json(errorResponseBody);
    }

};
//----------------------------------------------------------------------------------------------------
const deleteMovie = async(req,res) =>{
    try{
        const response = await movieService.deleteMovie(req.params.Id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully deleted the movie";
        return res.status(200).json(successResponseBody);
    }catch(err){
        console.log(err);
        return res.status(500).json(errorResponseBody);
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
