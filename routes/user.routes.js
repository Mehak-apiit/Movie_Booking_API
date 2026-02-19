import update from '../controllers/user.controller.js';
const userRoutes = (app) => {
    app.patch(
        '/mba/api/vi/user/:id',
        update
    )
}
export default userRoutes;