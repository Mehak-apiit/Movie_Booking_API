import create from "../controllers/theatre.controller.js";
import theatreController  from "../controllers/theatre.controller.js";
const theatreRoutes = (app) =>{
    app.post('/mba/api/vi/theatres',create);
}
export default theatreRoutes;