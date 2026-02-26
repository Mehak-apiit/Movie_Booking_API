import ticketNotificationModel from '../models/ticketNotification.js';
import { STATUS_CODES } from '../utils/constants.js';
const create = async (data) => {
    try {
        const ticket = await create(data);
        return ticket;
    } catch (error) {
        if(error.name == 'ValidationError') {
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

const getAll = async () => {
    try {
        const response = await find();
        return response;
    } catch (error) {
        throw error;
    }
}

const getById = async (id) => {
    try {
        const response = await findById(id);
        if(!response) {
            throw {
                err: 'No ticket details found',
                code: STATUS_CODES.NOT_FOUND
            };
        }
        return response;
    } catch (error) {
        throw error;
    }
}

export {
    create,
    getAll,
    getById
}