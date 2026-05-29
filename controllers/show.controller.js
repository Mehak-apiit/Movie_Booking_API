import { updateShowService, createShow,getShowsService,deleteShow} from '../services/show.service.js';
import { successResponseBody, errorResponseBody } from '../utils/responsebody.js';
import { STATUS_CODES } from '../utils/constants.js';
const create = async (req, res) => {
    try {
        const response = await createShow(req.body);
        successResponseBody.message = "Successfully created the show";
        successResponseBody.data = response;
        return res.status(STATUS_CODES.CREATED).json(successResponseBody);
    } catch (error) {
        console.log(error);
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.OK).json(errorResponseBody);
    }
};
const getShows = async (req, res) => {
    try {
        const response = await getShowsService(req.query);
        successResponseBody.message = "Successfully fetched the movie shows";
        successResponseBody.data = response;
        return res.status(STATUS_CODES.OK).json(successResponseBody);
    } catch (error) {
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
    }

};
const destroy = async (req, res) => {
    try {
        
        const response = await deleteShow(req.params.id);
        console.log(response);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully deleted the show";
        return res.status(STATUS_CODES.OK).json(successResponseBody);
    } catch (error) {
        console.log(error);
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};
const update = async (req, res) => {
    try {
        const response = await updateShowService(req.params.id, req.body);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully updated the show";
        return res.status(STATUS_CODES.OK).json(successResponseBody);
    } catch (error) {
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }

}
export { create, getShows, destroy, update };