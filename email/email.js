export class Email {
    constructor (database, auth) {
        this.database = database;
    }

    async send(from, to, reply_to, subject, text) {

    }

    async sendHTML(from, to, reply_to, subject, html) {

    }

    async handle(req) {

    }
}