import create from '../controllers/booking.controller.js';
import { validateSignupRequest, validateSigninRequest, isAuthenticated, validateResetPasswordRequest, isAdmin, isClient, isAdminorClient } from '../middlewares/auth.middlewares.js';
import validateBookingCreateRequest from '../middlewares/booking.middlewares.js';

const bookingRoutes = (app) =>{
    app.post(
        '/mba/api/vi/booking',
        isAuthenticated,
        validateBookingCreateRequest,
        create
    )
}
export default bookingRoutes;