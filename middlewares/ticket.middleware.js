import { STATUS_CODES } from '../utils/constants.js';
import { successResponseBody, errorResponseBody} from '../utils/responsebody.js';
const verifyTicketNotificationCreateRequest = async (req, res, next) =>{
    if(!req.body.subject) {
        errorResponseBody.err = 'No subject given for the email';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    if(!req.body.content) {
        errorResponseBody.err = 'No content given for the email'
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    const emails = req.body.recepientEmails ?? req.body.recipientEmails;
    if(!emails || !(emails instanceof Array) || emails.length <= 0) {
        errorResponseBody.err = 'No recepitent emails given';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    // normalize field name for downstream notification service/mailer code
    req.body.recepientEmails = emails;
    next();
}

export default verifyTicketNotificationCreateRequest;
