import {
    createPayment,
    getPaymentById,
    getAllPaymentsService
} from '../services/payment.service.js';
import { BOOKING_STATUS, STATUS_CODES } from '../utils/constants.js';
import { errorResponseBody, successResponseBody } from '../utils/responsebody.js';
//import User from '../models/user.model.js';
//import Movie from '../models/movie.model.js';
//import Theatre from '../models/theatre.model.js';
//const sendMail = require('../services/email.service');

const create = async (req, res) => {
    try {
        const response = await createPayment(req.body);
        if (response.status == BOOKING_STATUS.expired) {
            errorResponseBody.err = 'The payment took more than 5 minutes to get processed, hence you booking got expired, please try again';
            errorResponseBody.data = response;
            return res.status(STATUS_CODES.GONE).json(errorResponseBody);
        }
        if (response.status == BOOKING_STATUS.cancelled) {
            errorResponseBody.err = 'The payment failed due to some reason, booking was not successfull, please try again';
            errorResponseBody.data = response;
            return res.status(STATUS_CODES.PAYMENT_REQUIRED).json(errorResponseBody);
        }
        const user = await findById(response.userId);
        const movie = await findById(response.movieId);
        const theatre = await findById(response.theatreId);
        successResponseBody.data = response;
        successResponseBody.message = 'Booking completed successfully';
        console.log(response, process.env.NOTI_SERVICE);
        // sendMail(
        //     'Your booking is Successfull', 
        //     response.userId,
        //     `Your booking for ${movie.name} in ${theatre.name} for ${response.noOfSeats} seats on ${response.timing} is successfull. Your booking id is ${response.id}`
        // );

        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getPaymentDetailsById = async (req, res) => {
    try {
        const response = await paymentService.getPaymentById(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the booking and payment details";
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getAllPayments = async (req, res) => {
    try {
        const response = await paymentService.getAllPayments(req.user);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched all the payments";
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

export {
    create,
    getPaymentDetailsById,
    getAllPayments
}