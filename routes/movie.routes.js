import {createMovie,deleteMovie,getMovie} from "../controllers/movie.controller.js";
import MovieMiddlewares from "../middlewares/movie.middlewares.js"

const routes =(app) =>{
    app.post('/mba/api/vi/movies',MovieMiddlewares,createMovie);
    app.delete('/mba/api/vi/movies/:Id',deleteMovie)
    app.get('/mba/api/vi/movies/:id',getMovie)
};
export default routes