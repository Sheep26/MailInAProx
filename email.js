import { Resend } from 'resend';

export class Email {
    constructor (auth) {
        
    }

    sendEmail(from, to, subject, reply_to, text) {

    }

    handleEmail(req) {

    }
}

export class EmailResend extends Email {
    constructor (auth) {
        super();
        this.resend = new Resend(auth);
    }

    async sendEmail(from, to, reply_to, subject, text) {
        const { data }  = await this.resend.emails.send({
            from: from,
            to: to,
            replyTo: reply_to,
            subject: subject,
            text: text
        });

        console.log(`Email ${data.id} has been sent`);
    }

    handleEmail(req) {
        
    }
}

export const email_types = {
    "resend": EmailResend
};