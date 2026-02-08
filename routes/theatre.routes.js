import { getTheatre,create } from "../controllers/theatre.controller.js";

import validateTheatreCreateRequest from "../middlewares/theatre.middleware.js";
const theatreRoutes = (app) =>{
    app.post('/mba/api/vi/theatres',validateTheatreCreateRequest,create);
    app.get('/mba/api/vi/theatres/:id',getTheatre);
}
export default theatreRoutes;