import create from "../controllers/theatre.controller.js";
import theatreController  from "../controllers/theatre.controller.js";
import validateTheatreCreateRequest from "../middlewares/theatre.middleware.js";
const theatreRoutes = (app) =>{
    app.post('/mba/api/vi/theatres',validateTheatreCreateRequest,create);
}
export default theatreRoutes;