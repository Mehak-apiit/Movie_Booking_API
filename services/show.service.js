import Show from '../models/show.model.js';
import Theatre from '../models/theatre.model.js';
import { STATUS_CODES } from '../utils/constants.js';
const createShow = async (data) => {
    try {
        const theatre = await Theatre.findById(data.theatreId);
        console.log(theatre);
        if (!theatre) {
            throw {
                err: 'No theatre found',
                code: STATUS_CODES.NOT_FOUND
            }
        }
        if (theatre.movies.indexOf(data.movieId) == -1) {
            throw {
                err: 'Movie is actually not avaiable in the theatre',
                code: STATUS_CODES.NOT_FOUND
            }
        }
        const response = await Show.create(data);
        return response;
    } catch (error) {
        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
            throw {
                err,
                code: STATUS_CODES.UNPROCESSABLE_ENTITY
            }
        }
        throw error;
    }
};
const getShowsService = async (data) => {
    try {
        let filter = {};
        if (data.theatreId) {
            filter.theatreId = data.theatreId;
        }
        if (data.movieId) {
            filter.movieId = data.movieId;
        }
        const response = await Show.find(filter);
        if (!response) {
            throw {
                err: 'No shows found',
                code: STATUS_CODES.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        throw error;
    }
};
const deleteShow = async (id) => {
    try {
        const response = await Show.findByIdAndDelete(id);
        if (!response) {
            throw {
                err: 'No show found',
                code: STATUS_CODES.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        throw error;
    }
};
const updateShowService = async (id, data) => {
    try {
        const response = await Show.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });
        if (!response) {
            throw {
                err: 'No show found for the given id',
                code: STATUS_CODES.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
            throw {
                err,
                code: STATUS_CODES.UNPROCESSABLE_ENTITY
            }
        }
        throw error;
    }
}
export { createShow, getShowsService, updateShowService,deleteShow };