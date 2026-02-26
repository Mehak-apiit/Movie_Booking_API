import nodemailer from 'nodemailer';

const mailer = (userId, password, mailData) => {
    return nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: userId,
            pass: password
        }
    });
}

export default mailer;