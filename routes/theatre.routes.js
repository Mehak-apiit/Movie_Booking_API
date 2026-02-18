import { getTheatre, create, getTheatres, destroy, updateMovies,getMovies,checkMovie } from "../controllers/theatre.controller.js";
import { validateTheatreCreateRequest, validateUpdateMoviesRequest } from "../middlewares/theatre.middleware.js";
import {isAuthenticated} from '../middlewares/auth.middlewares.js';
const theatreRoutes = (app) => {
    app.post('/mba/api/vi/theatres', validateTheatreCreateRequest, create);
    app.get('/mba/api/vi/theatres/:id', getTheatre);
    app.get('/mba/api/vi/theatres', getTheatres);
    app.delete('/mba/api/vi/theatres/:id',isAuthenticated,destroy);
    app.patch('/mba/api/vi/theatres/:id/movies',validateUpdateMoviesRequest,updateMovies);
    app.put('/mba/api/vi/theatres/:id',updateMovies);
    app.get('/mba/api/vi/theatres/:id/movies',getMovies);
    app.get('/mba/api/vi/theatres/:theatreId/movies/:movieId',checkMovie);
}
export default theatreRoutes;