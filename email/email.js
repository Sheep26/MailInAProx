export function parseEmailAddress(value) {
    const match = value.match(/^\s*(.*?)\s*<([^<>]+)>\s*$/);
    let values = {name: null, email: value.trim()};

    if (match) {
        values.name = match[1].trim();
        values.email = match[2].trim();
    }

    return values;
};

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