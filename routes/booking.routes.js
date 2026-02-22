import create, { update } from '../controllers/booking.controller.js';
import { validateSignupRequest, validateSigninRequest, isAuthenticated, validateResetPasswordRequest, isAdmin, isClient, isAdminorClient } from '../middlewares/auth.middlewares.js';
import validateBookingCreateRequest, { canChangeStatus } from '../middlewares/booking.middlewares.js';

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
    )
}
export default bookingRoutes;