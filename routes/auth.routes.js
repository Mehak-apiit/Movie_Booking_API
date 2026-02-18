import {signup,signin} from '../controllers/auth.controller.js';
import validateSignupRequest from '../middlewares/auth.middlewares.js';
const authRoutes = (app) => {
    app.post(
        '/mba/api/vi/auth/signup',validateSignupRequest,signup
    );
    app.post(
        '/mba/api/vi/auth/signin',signin
    )
}
export default authRoutes;