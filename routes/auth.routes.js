import signup from '../controllers/auth.controller.js';
import authController from '../controllers/auth.controller.js';
import validateSignupRequest from '../middlewares/auth.middlewares.js';
const authRoutes = (app) => {
    app.post(
        '/mba/api/vi/auth/signup',validateSignupRequest,signup
    );
}
export default authRoutes;