import nodemailer from 'nodemailer';

const mailer = async (userId, password, mailData) => {
    const mail = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        service: 'gmail',
        auth: {
            user: userId,
            pass: password
        }

    });mail.verify();
    console.log("SMTP server connected");
    return mail;
}



export default mailer;