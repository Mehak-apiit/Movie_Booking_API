import { successResponseBody, errorResponseBody } from "../utils/responsebody.js";
import { updateBooking, getAllBookingsService, getBookingsService, createBookingService } from "../services/booking.service.js";
import { STATUS_CODES } from "../utils/constants.js";

const create = async (req, res) => {
    try {
        let userId = req.user;
        const response = await createBookingService({ ...req.body, userId: userId });
        successResponseBody.message = "Successfully created a booking";
        successResponseBody.data = response;
        return res.status(STATUS_CODES.CREATED).json(successResponseBody);
    } catch (error) {
        console.log(error);
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};
const update = async (req, res) => {
    try {
        const response = await updateBooking(req.body, req.params.id);
        console.log(response);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully updated the booking";
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
};
const getBookings = async (req, res, next) => {
    try {
        const response = await getBookingsService({ userId: req.user });
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the bookings";
        return res.status(STATUS_CODES.OK).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};
const getAllBookings = async (req, res, next) => {
    try {
        const response = await getAllBookingsService();
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the bookings";
        return res.status(STATUS_CODES.OK).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};
const getBookingById = async (req, res, next) => {
    try {
        const response = await getBookingById(req.params.id, req.user);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the booking ";
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
export { create, update, getBookings, getAllBookings, getBookingById };