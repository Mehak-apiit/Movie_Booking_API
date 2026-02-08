import { getTheatre,create, getTheatres, destroy } from "../controllers/theatre.controller.js";

import validateTheatreCreateRequest from "../middlewares/theatre.middleware.js";
const theatreRoutes = (app) =>{
    app.post('/mba/api/vi/theatres',validateTheatreCreateRequest,create);
    app.get('/mba/api/vi/theatres/:id',getTheatre);
    app.get('/mba/api/vi/theatres',getTheatres);
    app.delete('/mba/api/vi/theatres/:id',destroy);
}
export default theatreRoutes;