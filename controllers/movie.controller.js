import { response } from 'express';
import Movie from '../models/movie.model.js'
import { getMovieByIdService, createMovieService, deleteMovieService, updateMovieService, fetchMoviesService } from "../services/movie.service.js";
import { successResponseBody, errorResponseBody } from '../utils/responsebody.js';

const createMovie = async (req, res) => {
    try {
        const response = await createMovieService(req.body)
        if (response.err) {
            errorResponseBody.err = response.err;
            errorResponseBody.message = "Validation failed on few parameters of the request body";
            return res.status(response.code).json(errorResponseBody)
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully created the movie";
        return res.status(201).json(successResponseBody);
    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponseBody);
    }

};
//----------------------------------------------------------------------------------------------------
const deleteMovie = async (req, res) => {
    try {
        const response = await deleteMovieService(req.params.Id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully deleted the movie";
        return res.status(200).json(successResponseBody);
    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponseBody);
    }
}
//--------------------------------------------------------------------------------------------------
const getMovie = async (req, res) => {
    try {
        const response = await getMovieByIdService(req.params.id)
        if (response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);

        }
        successResponseBody.data = response.data;
        return res.status(response.code).json(successResponseBody);

    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponseBody);
    }
}
const updateMovie = async (req, res) => {
    try {
        const response = await updateMovieService(req.params.id, req.body);
        console.log(req.params.id, req.body);

        if (response.err) {
            errorResponseBody.err = response.err;
            errorResponseBody.message = "The updates that we are trying to apply does not validate the schema";
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        return res.status(200).json(successResponseBody);
    } catch (err) {
        console.log(err);
        errorResponseBody.err = err;
        return res.status(500).json(errorResponseBody);
    }
}
const getMovies = async (req, res) => {
    try {
        const response = await fetchMoviesService(req.query);
        if (response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        
        }
        successResponseBody.data = response;
        return res.status(200).json(successResponseBody);
    }catch(error){
        console.log(error);
        return res.status(500).json(errorResponseBody);
    }
}
export { createMovie, deleteMovie, getMovie, updateMovie ,getMovies};
