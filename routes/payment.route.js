import {
    create,
    getPaymentDetailsById,
    getAllPayments
} from '../controllers/payment.controller.js';
import { validateSignupRequest, validateSigninRequest, isAuthenticated, validateResetPasswordRequest, isAdmin, isClient, isAdminorClient } from '../middlewares/auth.middlewares.js';
import verifyPaymentCreateRequest from '../middlewares/payment.middleware.js';
const paymentRoute = (app) => {
    app.post(
        '/mba/api/v1/payments',
        isAuthenticated,
        verifyPaymentCreateRequest,
        create
    );

    app.get(
        '/mba/api/v1/payments/:id',
        isAuthenticated,
        getPaymentDetailsById
    );

    app.get(
        '/mba/api/v1/payments',
        isAuthenticated,
        getAllPayments
    );
}

export default paymentRoute;