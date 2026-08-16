export function parseEmailAddress(value) {
    const match = value.match(/^\s*(.*?)\s*<([^<>]+)>\s*$/);
    let values = {name: null, email: value.trim()};

    if (match) {
        values.name = match[1].trim().replaceAll("\"", "");
        values.email = match[2].trim();
    }

    return values;
};

export class Email {
    constructor (database, auth) {
        this.database = database;
    }

    async send(from, to, reply_to, subject, text) {
        this.database.sendEmail(to, from, reply_to, null, null, subject, text);
    }

    async sendHTML(from, to, reply_to, subject, html) {
        this.database.sendEmail(to, from, reply_to, null, null, subject, html);
    }

    async handle(req) {

    }

    async getAttatchment(email_id, attachment_id) {
        
    }
}