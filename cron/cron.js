import cron from 'node-cron';
import Ticket from '../models/ticketNotification.js';
import Mailer from '../config/mail.config.js'

const mailerCron = () => {
    const mailer = Mailer(process.env.EMAIL_USER, process.env.EMAIL_PASSWORD);
    cron.schedule('*/1 * * * *', async () => {
        console.log("Executing Cron Again");
        const notificationsToBeSent = await Ticket.find({
            status: 'PENDING'
        });
    
        notificationsToBeSent.forEach(notification => {
            const mailData = {
                from: process.env.EMAIL_USER,
                to: notification.recepientEmails,
                subject: notification.subject,
                text: notification.content
            };
            mailer.sendMail(mailData, async (err, data) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log(data);
                    const savedNotification = await Ticket.findOne({_id: notification._id});
                    savedNotification.status = "SUCCESS";
                    await savedNotification.save();
                }
            });
        });
    });    
}

export default mailerCron;
