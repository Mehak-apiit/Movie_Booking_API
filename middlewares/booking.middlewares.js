import mongoose from "mongoose";
const ojectId = mongoose.Types.ObjectId;
import { STATUS_CODES, USER_ROLE, BOOKING_STATUS } from "../utils/constants.js";
import { errorResponseBody } from "../utils/responsebody.js";
import { getUserById } from "../services/user.service.js";
import { getTheatreService } from "../services/theatre.service.js";

const validateBookingCreateRequest = async (req, res, next) => {
    //validate the theatre id presence
    if (!req.body.theatreId) {
        errorResponseBody.err = "No theatre id provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);

    }
    // validate correct theatre id format
    if (!ojectId.isValid(req.body.theatreId)) {
        errorResponseBody.err = "Invalid thertreid provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    const theatre = await getTheatreService(req.body.theatreId);
    if (!theatre) {
        errorResponseBody.err = "No theatre found for the given id";
        return res.status(STATUS_CODES.NOT_FOUND).json(errorResponseBody);
    }
    // validate movie presence
    if (!req.body.movieId) {
        errorResponseBody.err = "No movie id present";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    //validate correct movie if format 
    if (!ojectId.isValid(req.body.movieId)) {
        errorResponseBody.err = "Invalid movie id format";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    //validate if movie is running in the theatre or not
    if (!theatre.movies.indexOf(req.body.movieId) == -1) {
        errorResponseBody.err = "Given movie is not available in the requested theatre";
        return res.status(STATUS_CODES.NOT_FOUND).json(errorResponseBody);
    }
    // validate presence of timings
    if (!req.body.timings) {
        errorResponseBody.err = "No movie timing passed";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    // validate number of seats present
    if (!req.body.noOfSeats) {
        errorResponseBody.err = "No seat provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    // request is correct
    next();
};
const canChangeStatus = async (req, res, next) => {
    const user = await getUserById(req.user);
    if (user.userRole == USER_ROLE.customer && req.body.status && req.body.status != BOOKING_STATUS.cancelled) {
        errorResponseBody.err = "You are not allowed to change the booking status";
        return res.status(STATUS_CODES.UNAUTHORISED).json(errorResponseBody);
    }
    next();
}
export { validateBookingCreateRequest, canChangeStatus };