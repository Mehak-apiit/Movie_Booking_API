import signup from '../controllers/auth.controller.js';
import authController from '../controllers/auth.controller.js';
const authRoutes = (app) =>{
    app.post(
        '/mba/api/vi/auth/signup',signup
    );
}
export default authRoutes;