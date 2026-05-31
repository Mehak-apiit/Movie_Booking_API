import { getMovieByIdService, createMovieService, deleteMovieService, updateMovieService, fetchMoviesService } from "../services/movie.service.js";
import { makeSuccessResponseBody, makeErrorResponseBody } from '../utils/responsebody.js';
import { STATUS_CODES } from '../utils/constants.js';

const sendSuccess = (res, code, data, message) =>
  res.status(code).json(makeSuccessResponseBody({ data, message }));

const sendError = (res, code, err) =>
  res.status(code ?? STATUS_CODES.INTERNAL_SERVER_ERROR).json(makeErrorResponseBody({ err }));

const createMovie = async (req, res) => {
  try {
    const data = await createMovieService(req.body);
    return sendSuccess(res, STATUS_CODES.CREATED, data, "Successfully created the movie");
  } catch (err) {
    const status = err?.code ?? STATUS_CODES.INTERNAL_SERVER_ERROR;
    return sendError(res, status, err);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const data = await deleteMovieService(req.params.Id);
    return sendSuccess(res, STATUS_CODES.OK, data, "Successfully deleted the movie");
  } catch (err) {
    const status = err?.code ?? STATUS_CODES.INTERNAL_SERVER_ERROR;
    return sendError(res, status, err);
  }
};

const getMovie = async (req, res) => {
  try {
    const data = await getMovieByIdService(req.params.id);
    return sendSuccess(res, STATUS_CODES.OK, data?.data ?? data, "Successfully fetched the movie");
  } catch (err) {
    const status = err?.code ?? STATUS_CODES.INTERNAL_SERVER_ERROR;
    return sendError(res, status, err);
  }
};

const updateMovie = async (req, res) => {
  try {
    const data = await updateMovieService(req.params.id, req.body);
    return sendSuccess(res, STATUS_CODES.OK, data, "Successfully updated the movie");
  } catch (err) {
    const status = err?.code ?? STATUS_CODES.INTERNAL_SERVER_ERROR;
    return sendError(res, status, err);
  }
};

const getMovies = async (req, res) => {
  try {
    const data = await fetchMoviesService(req.query);
    return sendSuccess(res, STATUS_CODES.OK, data, "Successfully fetched movies");
  } catch (err) {
    const status = err?.code ?? STATUS_CODES.INTERNAL_SERVER_ERROR;
    return sendError(res, status, err);
  }
};

export { createMovie, deleteMovie, getMovie, updateMovie, getMovies };

