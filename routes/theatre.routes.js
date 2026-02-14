import { getTheatre, create, getTheatres, destroy, updateMovies } from "../controllers/theatre.controller.js";
import { validateTheatreCreateRequest, validateUpdateMoviesRequest } from "../middlewares/theatre.middleware.js";
const theatreRoutes = (app) => {
    app.post('/mba/api/vi/theatres', validateTheatreCreateRequest, create);
    app.get('/mba/api/vi/theatres/:id', getTheatre);
    app.get('/mba/api/vi/theatres', getTheatres);
    app.delete('/mba/api/vi/theatres/:id', destroy);
    app.patch('/mba/api/vi/theatres/:id/movies',validateUpdateMoviesRequest,updateMovies);
    app.put('/mba/api/vi/theatres/:id',updateMovies);
}
export default theatreRoutes;