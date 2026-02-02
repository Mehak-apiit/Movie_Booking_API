import MovieController from "../controllers/movie.controller.js";

const routes =(app) =>{
    app.post('/mba/api/vi/movies',MovieController);
};
export default routes