import {
    createPayment,
    getPaymentById,
    getAllPaymentsService
} from '../services/payment.service.js';
import { BOOKING_STATUS, STATUS_CODES } from '../utils/constants.js';
import { errorResponseBody, successResponseBody } from '../utils/responsebody.js';
import User from '../models/user.model.js';
import Movie from '../models/movie.model.js';
import Theatre from '../models/theatre.model.js';
import sendMail from '../services/email.service.js';

const create = async (req, res) => {
    try {
        const response = await createPayment(req.body);
        console.log(response);
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
        const user = await User.findById(response.userId);
        const movie = await Movie.findById(response.movieId);
        const theatre = await Theatre.findById(response.theatreId);
        successResponseBody.data = response;
        successResponseBody.message = 'Booking completed successfully';
        console.log(response, process.env.NOTI_SERVICE);
        await sendMail(
            'Your booking is Successfull',
            response.userId,
            `Your booking for in for  seats on  is successfull. Your booking id is `
        );
        

        return res.status(STATUS_CODES.OK).json(successResponseBody);
    } catch (error) {
        console.log(error);
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getPaymentDetailsById = async (req, res) => {
    try {
        const response = await getPaymentById(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the booking and payment details";
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

const getAllPayments = async (req, res) => {
    try {
        const response = await getAllPaymentsService(req.user);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched all the payments";
        return res.status(STATUS_CODES.OK).json(successResponseBody);
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