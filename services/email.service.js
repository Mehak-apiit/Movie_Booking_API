import axios from 'axios';
import User from '../models/user.model.js';
const sendMail = async (subject, id, content) => {
    const user = await User.findById(id);
    console.log(user);
    axios.post('http://localhost:3000/notiservice/api/v1/notifications', {
        subject: subject,
        recepientEmails: [user.email] ,
        content: content
     });
}

export default sendMail;