import {
    createTicket,
    getAllTickets,
    getTicket
} from '../controllers/ticket.controller.js';
import verifyTicketNotificationCreateRequest from '../middlewares/ticket.middleware.js'

const routeTicket = (app) => {
    app.post(
        '/notiservice/api/v1/notifications',
        verifyTicketNotificationCreateRequest,
        createTicket
    );

    app.get(
        '/notiservice/api/v1/notifications/:id',
        getTicket
    );

    app.get(
        '/notiservice/api/v1/notifications',
        getAllTickets
    );
}
export default routeTicket;