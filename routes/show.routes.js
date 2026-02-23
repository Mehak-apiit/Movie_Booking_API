import create from '../controllers/show.controller.js';
import { validateSignupRequest, validateSigninRequest, isAuthenticated, validateResetPasswordRequest, isAdmin, isClient, isAdminorClient } from '../middlewares/auth.middlewares.js';
import validateCreateShowRequest from '../middlewares/show.middlewares.js';
import { getShows } from '../services/show.service.js';
const showRoute = (app) =>{
    app.post(
        '/mba/api/vi/shows',
        isAuthenticated,
        isAdminorClient,
        validateCreateShowRequest,
        create
    );
    app.get(
        '/mba/api/vi/shows',
        getShows
    )
}
export default showRoute