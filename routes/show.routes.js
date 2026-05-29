import { destroy, update, create ,getShows} from '../controllers/show.controller.js';
import { validateSignupRequest, validateSigninRequest, isAuthenticated, validateResetPasswordRequest, isAdmin, isClient, isAdminorClient } from '../middlewares/auth.middlewares.js';
import {validateCreateShowRequest} from '../middlewares/show.middlewares.js';


const showRoute = (app) => {
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
    );
    app.delete(
        '/mba/api/vi/show/:id',
        isAuthenticated,
        isAdminorClient,
        destroy
    );
    app.patch(
        '/mba/api/vi/shows/:id',
        isAuthenticated,
        isAdminorClient,
        update
    );
}
export default showRoute;