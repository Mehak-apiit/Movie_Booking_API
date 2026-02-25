import payment from '../models/payment.model.js'
import Booking from '../models/booking.model.js';
import showSchema from '../models/show.model.js';
import User from '../models/user.model.js';

import { STATUS_CODES, BOOKING_STATUS, PAYMENT_STATUS, USER_ROLE } from '../utils/constants.js';

const createPayment = async (data) => {
    try {
        const booking = await findById(data.bookingId);
        const show = await findOne({
            movieId: booking.movieId,
            theatreId: booking.theatreId,
            showId: data.showId
        });
        if(booking.status == BOOKING_STATUS.successfull) {
            throw {
                err: 'Booking already done, cannot make a new payment against it',
                code: STATUS.FORBIDDEN
            }
        }
        if(!booking) {
            throw {
                err: 'No booking found',
                code: STATUS.NOT_FOUND
            }
        }
        let bookingTime = booking.createdAt;
        let currentTime = Date.now();

        // calculate how many minutes are remaining
        let minutes = Math.floor(((currentTime - bookingTime) / 1000) / 60);
        if(minutes > 5) {
            booking.status = BOOKING_STATUS.expired;
            await booking.save();
            return booking;
        }

        const payment = await create({
            booking: data.bookingId,
            amount: data.amount
        });
        if(payment.amount != booking.totalCost) {
            payment.status = PAYMENT_STATUS.failed;
        }
        if(!payment || payment.status == PAYMENT_STATUS.failed) {
            booking.status = BOOKING_STATUS.cancelled;
            await booking.save();
            await payment.save();
            return booking;
        }
        payment.status = PAYMENT_STATUS.success;
        booking.status = BOOKING_STATUS.successfull;
        console.log(show, booking)
        show.noOfSeats -= booking.noOfSeats;

        if(show.seatConfiguration) {
            const showSeatConfig = JSON.parse(show.seatConfiguration.replaceAll("'", '"'));
            const bookedSeats = JSON.parse(booking.seat.replaceAll("'", '"'));
            const bookedSeatsMap = {};
            bookedSeats.forEach((seats) => {
                if(!bookedSeatsMap[seats.rowNumber]) {
                    bookedSeatsMap[seats.rowNumber] = new Set();
                }
                bookedSeatsMap[seats.rowNumber].add(seats.seatNumber);
            });
            showSeatConfig.rows.forEach((row) => {
                if(bookedSeatsMap[row.number]) {
                    row.seats = row.seats.map((seat) => {
                        if(bookedSeatsMap[row.number].has(seat.number)) {
                            seat.status = 2;
                        }
                        return seat;
                    })
                }
            });
            show.seatConfiguration = JSON.stringify(showSeatConfig).replaceAll('"', "'");
        }

        await show.save();
        await booking.save();
        await payment.save();
        return booking;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const getPaymentById = async (id) => {
    try {
        const response = await Payment.findById(id).populate('booking');
        if(!response) {
            throw {
                err: 'No payment record found',
                code: STATUS.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getAllPaymentsService = async (userId) => {
    try {
        const user = await indById(userId);
        let filter = {};
        if(user.userRole != USER_ROLE.admin) {
            filter.userId = user.id;
        }
        const bookings = await find(filter, 'id');

        const payments = await find({booking: {$in: bookings}});
        return payments;
    } catch (error) {
        throw error;
    }
}


export {
    createPayment,
    getPaymentById,
    getAllPaymentsService
};