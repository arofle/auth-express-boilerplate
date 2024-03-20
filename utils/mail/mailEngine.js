import nodemailer from 'nodemailer'
import EmailNotSentError from '../../exceptions/EmailNotSentError.js'
import MailConnectionRefusedError from '../../exceptions/MailConnectionRefusedError.js'
import dotenv from 'dotenv'
import { auth_router_slug, email_verification_slug } from '../../routes/allRoutes.js'

//IMPORTANT: dont delete dotenv here, otherwise global mailTransporter will be instantiated with undefined fields
dotenv.config()

const mailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_USE_TLS == 'true',
    auth: {
        user: process.env.EMAIL_SMTP_USER,
        pass: process.env.EMAIL_SMTP_PASSWORD
    }
})

export async function sendRegistrationVerificationEmail(email, stringForRegistrationConfirmation) {
    try {

        let protocol = 'https://'
        if (process.env.SERVER_STAGE == 'development') {
            protocol = 'http://'
        }

        const email_verification_link = protocol + process.env.HOST + ":" + process.env.PORT
            + auth_router_slug + email_verification_slug + "/" + stringForRegistrationConfirmation
        await mailTransporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Registration Confirmation',
            html: `<p>Hello from ${process.env.WEBSITE_DOMAIN_FOR_EMAIL_MESSAGES}</p>
                   <p>Your confirmation link: <a href="${email_verification_link}">${email_verification_link}</a><p>
            `
        })
    } catch (error) {
        console.log(error);
        if (error.message.indexOf('ECONNREFUSED') != -1) {
            throw new MailConnectionRefusedError("Mail transporter is not configured properly. Couldn't connect to smtp, while sending an email")
        } else {

            throw new EmailNotSentError("Email wasn't properly sent")
        }
    }
}

