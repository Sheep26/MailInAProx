import { Resend } from 'resend';
import { Email, parseEmailAddress } from './email.js';

export class EmailResend extends Email {
    constructor (database, auth) {
        super(database, auth);
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
        super.send(from, to, reply_to, subject, text);
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
        super.sendHTML(from, to, reply_to, subject, html);
    }

    async handle(body) {
        const { data } = await this.resend.emails.receiving.get(body.data.email_id);
        const user = await this.database.getUserEmail(data.to[0]);

        if (!user)
            return;

        let parsed = parseEmailAddress(data.headers.from);

        this.database.addEmail(data.to[0], parsed.email, parsed.name, data.headers['return-path'], JSON.stringify(data.bcc), JSON.stringify(data.cc), data.id, data.message_id, data.html_format, data.subject, data.html, data.attachments);
        console.log(`Email ${data.id} has been recieved from ${data.headers.from}`);
    }

    async getAttatchment(email_id, attachment_id) {
        return await this.resend.emails.receiving.attachments.get({email_id, id: attachment_id});
    }
}