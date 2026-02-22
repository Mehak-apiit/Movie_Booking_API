import { response } from 'express';
import Movie from '../models/movie.model.js'
import { getMovieByIdService, createMovieService, deleteMovieService, updateMovieService, fetchMoviesService } from "../services/movie.service.js";
import { successResponseBody, errorResponseBody } from '../utils/responsebody.js';
import { STATUS_CODES } from '../utils/constants.js';
const createMovie = async (req, res) => {
    try {
        const response = await createMovieService(req.body)
        successResponseBody.data = response;
        successResponseBody.message = "Successfully created the movie";
        return res.status(STATUS_CODES.CREATED).json(successResponseBody);
    } catch (err) {
        if (error.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody)
        }
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
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
        if (err) {
            errorResponseBody.err = err;
            return res.status(err.code).json(errorResponseBody);
        }
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
        successResponseBody.data = response;
        return res.status(STATUS_CODES.OK).json(successResponseBody);
    } catch (err) {
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = err;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}
const getMovies = async (req, res) => {
    try {
        const response = await fetchMoviesService(req.query);
        successResponseBody.data = response;
        return res.status(STATUS_CODES.OK).json(successResponseBody);
    } catch (error) {
        if (response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);

        }
        errorResponseBody.err = err;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}
export { createMovie, deleteMovie, getMovie, updateMovie, getMovies };
