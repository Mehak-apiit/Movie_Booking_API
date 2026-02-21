import { signup, signin, resetPassword } from '../controllers/auth.controller.js';
import { isAuthenticated, validateResetPasswordRequest, validateSigninRequest, validateSignupRequest } from '../middlewares/auth.middlewares.js';
const authRoutes = (app) => {
    app.post(
        '/mba/api/vi/auth/signup',validateSignupRequest,signup
    );
    app.post(
        '/mba/api/vi/auth/signin',validateSigninRequest,signin
    );
    app.patch(
        '/mba/api/vi/auth/reset',isAuthenticated,
        validateResetPasswordRequest,
        resetPassword
    )
}
export default authRoutes;