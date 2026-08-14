import { Resend } from 'resend';
import { Email } from './email.js';

export class EmailResend extends Email {
    constructor (auth) {
        super();
        this.resend = new Resend(auth);
    }

    async send(from, to, reply_to, subject, text) {
        const { data }  = await this.resend.emails.send({
            from: from,
            to: to,
            replyTo: reply_to,
            subject: subject,
            text: text
        });

        console.log(`Email ${data.id} has been sent`);
    }

    async sendHTML(from, to, reply_to, subject, html) {
        const { data }  = await this.resend.emails.send({
            from: from,
            to: to,
            replyTo: reply_to,
            subject: subject,
            html: html
        });

        console.log(`Email ${data.id} has been sent`);
    }

    async handle(body) {
        console.log(body.email_id);
        const { data } = await this.resend.emails.receiving.get(body.email_id);
        console.log(data);
    }
}