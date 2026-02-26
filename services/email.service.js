import axios from 'axios';
import User from '../models/user.model.js';
const sendMailService = async (subject, id, content) => {
    const user = await findById(id);
    axios.post(process.env.NOTI_SERVICE + '/notiservice/api/v1/notifications', {
        subject: subject,
        recepientEmails: [user.email] ,
        content: content
     });
}

export default sendMailService;