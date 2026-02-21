import update from '../controllers/user.controller.js';
import {validateUpdateUserRequest} from '../middlewares/user.middleware.js';
const userRoutes = (app) => {
    app.patch(
        '/mba/api/vi/user/:id',
        validateUpdateUserRequest,
        update
    )
}
export default userRoutes;