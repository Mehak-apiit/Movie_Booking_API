import {
    create,
    getAllService,
    getByIdService
}  from '../services/notification.service.js';
import  { successResponseBody, errorResponseBody} from '../utils/responsebody.js';
import { STATUS_CODES } from '../utils/constants.js';

const createTicket = async (req, res) => {
    try {
        const response = await create(req.body);
        successResponseBody.data = response;
        successResponseBody.message = 'Successfully created a notification ticket';
        return res.status(STATUS_CODES.CREATED).json(successResponseBody);
    } catch (error) {
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getAllTickets = async (req, res) => {
    try {
        const response = await getAllService();
        successResponseBody.data = response;
        successResponseBody.message = 'Successfully fetched all the tickets';
        return res.status(STATUS_CODES.OK).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error.err;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getTicket = async (req, res) => {
    try {
        const response = await getByIdService(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = 'Successfully fetched details of the given ticket id';
        return res.status(STATUS.OK).json(successResponseBody);

    } catch (error) {
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

export {
    createTicket,
    getAllTickets,
    getTicket
}