import MovieController from "../controllers/movie.controller.js";
import MovieMiddlewares from "../middlewares/movie.middlewares.js"

const routes =(app) =>{
    app.post('/mba/api/vi/movies',MovieMiddlewares,MovieController);
};
export default routes