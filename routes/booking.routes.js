import create, { update } from '../controllers/booking.controller.js';
import { validateSignupRequest, validateSigninRequest, isAuthenticated, validateResetPasswordRequest, isAdmin, isClient, isAdminorClient } from '../middlewares/auth.middlewares.js';
import validateBookingCreateRequest, { canChangeStatus } from '../middlewares/booking.middlewares.js';
import { getBookings } from '../services/booking.service.js';

const bookingRoutes = (app) =>{
    app.post(
        '/mba/api/vi/booking',
        isAuthenticated,
        validateBookingCreateRequest,
        create
    );
    app.patch(
        '/mba/api/vi/bookings/:id',
        isAuthenticated,
        canChangeStatus,
        update
    );
    app.get('/mba/api/vi/bookings',
        isAuthenticated,
        getBookings
    );
    app.get('/mba/api/vi/bookings/all',
        isAuthenticated,
        isAdmin,
        getBookings
    );
}
export default bookingRoutes;