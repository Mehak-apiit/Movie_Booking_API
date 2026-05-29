import { createTheatreService, getAllTheatresService, getTheatreService, deleteTheatreService, updateMoviesInTheatres, getMoviesInATheatre, checkMovieInATheatreService } from "../services/theatre.service.js";
import { successResponseBody, errorResponseBody } from '../utils/responsebody.js';
import { STATUS_CODES } from '../utils/constants.js';
const create = async (req, res) => {
    try {
        const response = await createTheatreService(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully created the theatre";
        return res.status(STATUS_CODES.CREATED).json(successResponseBody);
    } catch (error) {
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody)
        }
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}
//--------------------------------------------------------------------------------------------------
const getTheatre = async (req, res) => {
    try {
        const response = await getTheatreService(req.params.id);
        
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the data of the theatre";
        return res.status(STATUS_CODES.OK).json(successResponseBody);
    } catch (error) {
        if (response.err) {
            errorResponseBody.err = response.err;
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
        }
    }

}
//----------------------------------------------------------------------------------------------
const getTheatres = async (req, res) => {
    try {
        const response = await getAllTheatresService(req.query);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched all the theartres";
        return res.status(200).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}
//-------------------------------------------------------------------------------------------------
const destroy = async (req, res) => {
    try {
        const response = await deleteTheatreService(req.params.id);

        successResponseBody.data = response;
        successResponseBody.message = "Successfully deleted the given theatre";
        return res.status(STATUS_CODES.OK).json(successResponseBody);
    } catch (error) {
        if (response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}
//------------------------------------------------------------------------------------------------------
const updateMovies = async (req, res) => {
    try {
        console.log(req.body);
        const response = await updateMoviesInTheatres(
            req.params.id,
            req.body.movieIds,
            req.body.insert
        );
        if (response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);

        }
        
        successResponseBody.data = response;
        successResponseBody.message = "successfully updated movies in the theatre";
        return res.status(STATUS_CODES.OK).json(successResponseBody);
    } catch (error) {
        console.log(error);
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};
//--------------------------------------------------------------------------------------------------
const getMovies = async (req, res) => {
    try {
        const response = await getMoviesInATheatre(req.params.id);
        if (response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the movies for the theatre";
        return res.status(200).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
};
//-----------------------------------------------------------------------------------------------
const checkMovie = async (req, res) => {
    try {
        const response = await checkMovieInATheatreService(req.params.theatreId, req.params.movieId);
        if (response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.status).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully checked if movie is present in the theatre";
        return res.status(200).json(successResponseBody);//THIS ONE

    } catch (error) {
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}


export { create, getTheatre, getTheatres, destroy, updateMovies, getMovies, checkMovie };