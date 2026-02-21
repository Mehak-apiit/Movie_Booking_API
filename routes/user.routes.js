import update from '../controllers/user.controller.js';
import {validateUpdateUserRequest} from '../middlewares/user.middleware.js';
import { validateSignupRequest,validateSigninRequest, isAuthenticated,validateResetPasswordRequest,isAdmin,isClient,isAdminorClient} from '..middlewares/auth.middlewares.js';
const userRoutes = (app) => {
    app.patch(
        '/mba/api/vi/user/:id',
        isAuthenticated,
        validateUpdateUserRequest,
        isAdmin,
        update
    )
}
export default userRoutes;