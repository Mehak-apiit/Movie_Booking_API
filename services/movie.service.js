import { response } from 'express';
import Movie from '../models/movie.model.js';
import {STATUS_CODES} from '../utils/constants.js'
const createMovieService = async (data) => {
    try {
        const movie = await Movie.create(data);
        return movie;
    } catch (error) {
        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            console.log(err);
            throw { err: err, code: STATUS_CODES.UNPROCESSABLE_ENTITY };
        } else {
            throw error;
        }
    }
}
const deleteMovieService = async (id) => {
    try{
        const checkMovie =  await Movie.findOne({id});
        if(!checkMovie){
              throw {
                err: "No movie record found for the id provided",
                code: STATUS_CODES.NOT_FOUND
            }
         }
        return response
    }catch(error){
        console.log(error);
        throw error;
    }
}
const getMovieByIdService = async (id) => {
    const movie = await Movie.findById(id);
    if (!movie) {
        return {
            err: "No movie found for the corresponding id provided",
            code: 404
        };
    }
    return {
        data: movie,
        code: STATUS_CODES.OK
    };
};
//----------------------------------------------------------------------------------------------
const updateMovieService = async (id, data) => {
    try {
        const movie = await Movie.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        return movie;
    } catch (error) {
        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            console.log(err);
            return { err: err, code: STATUS_CODES.UNPROCESSABLE_ENTITY };
        } else {
            throw error;
        }

    }

}
//----------------------------------------------------------------------------------------------------
const fetchMoviesService = async (filter)=>{
    let query ={};
    if(filter.name){
        query.name = filter.name;
    }
    let movies = await Movie.find(query);
    if(!movies){
        return {
            err:"Not able to find the queries movies",
            code: STATUS_CODES.NOT_FOUND
        }
    }
    return movies;
}
export { getMovieByIdService, createMovieService, deleteMovieService, updateMovieService,fetchMoviesService }