import Theatre from "../models/theatre.model.js";
import Movie from "../models/movie.model.js";
import {STATUS_CODES} from '../utils/constants.js';
import { errorResponseBody, successResponseBody } from "../utils/responsebody.js";
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
            return { err: err, code: STATUS_CODES.UNPROCESSABLE_ENTITY };
        }
        console.log(error);
        throw err;
    }
}
//-----------------------------------------------------------------------------------------------
const getTheatreService = async (id) => {
    try {
        const response = await Theatre.findById(id);
        return response;
    } catch (error) {
        throw error;
    }
}
//---------------------------------------------------------------------------------------------------
const getAllTheatresService = async (data) => {
    try {
        let query = {};
        let pagination = {};
        if (data && data.city) {
            // this checks whether city is present in query parameter or not
            query.city = data.city;
        }
        if (data && data.pincode) {
            // this checks whether pincode is present in the query parameter or not
            query.pincode = data.pincode;
        }
        if (data && data.name) {
            query.name = data.name;
        }
        if (data && data.movieId) {
            query.movies = { $all: data.movieId };
        }
        if (data && data.limit) {
            pagination.limit = data.limit;
        }
        if (data && data.skip) {
            let perPage = (data.limit) ? data.limit : 3;
            pagination.skip = data.skip * perPage;
        }
        const response = await Theatre.find(query, {}, pagination);
        return response;
    } catch (errror) {
        console.log(error);
        throw error;
    }
}
//--------------------------------------------------------------------------------------------------
const deleteTheatreService = async (id) => {
    try {

        const response = await Theatre.findByIdAndDelete(id);
        if (!response) {
            throw {
                err: "No record of a theatre found for the given id",
                code: STATUS_CODES.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
const updateMoviesInTheatres = async (theatreId, movieIds, insert) => {
    try {
        let theatre;
        if (insert) {
            // we need to add movies
            theatre = await Theatre.findByIdAndUpdate(
                { _id: theatreId },
                { $addToSet: { movies: { $each: movieIds } } },
                { new: true }
            );
        } else {
            // we need to remove movies
            theatre = await Theatre.findByIdAndUpdate(
                { _id: theatreId },
                { $pull: { movies: { $in: movieIds } } },
                { new: true }

            );
        }
        return theatre.populate('movies');
    } catch (error) {
        if (error.name == 'TypeError') {
            return {
                code: STATUS_CODES.NOT_FOUND,
                err: 'No theatre found for the given id'
            }
        }
        console.log("Error is", error);
        throw error;
    }
}
//--------------------------------------------------------------------------------------------
const getMoviesInATheatre = async (id) => {
    try {
        const theatre = await Theatre.findById(id, { name: 1, movies: 1, address: 1 });
        if (!theatre) {
            return {
                err: 'No theatre with the given id found',
                code: 404
            }
        }
        return theatre;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
//----------------------------------------------------------------------------------------------------
const checkMovieInATheatreService = async(theatreId,movieId) => {
    try{
        let response = await Theatre.findById(theatreId);
        if(!response){
            return{
                err: "No such theatre found for the given id",
                code: STATUS_CODES.NOT_FOUND
            }
        }
        return response.movies.indexOf(movieId) != -1;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export { createTheatreService, getTheatreService, getAllTheatresService, deleteTheatreService, updateMoviesInTheatres, getMoviesInATheatre,checkMovieInATheatreService};