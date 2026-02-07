import {createMovie,deleteMovie,getMovie, getMovies, updateMovie} from "../controllers/movie.controller.js";
import MovieMiddlewares from "../middlewares/movie.middlewares.js"

const routes =(app) =>{
    app.post('/mba/api/vi/movies',MovieMiddlewares,createMovie);
    app.delete('/mba/api/vi/movies/:Id',deleteMovie);
    app.get('/mba/api/vi/movies/:id',getMovie);
    app.put('/mba/api/vi/movies/:id',updateMovie);
    app.patch('/mba/api/vi/movies/:id',updateMovie);
    app.get('/mba/api/vi/movies',getMovies);

};
export default routes;