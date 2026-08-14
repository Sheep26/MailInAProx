import { db, initDB } from './connection.js';
import { BcryptManager, BcryptCache } from './encryption.js';

const encryption = new BcryptManager();

export class DatabaseManager {
    constructor() {
        initDB();
    }

    async addEmail(to, from, reply_to, bcc, cc, mail_id, message_id, html_format, subject, content) {
        await db.execute('INSERT INTO emails (mail_to, mail_from, reply_to, bcc, cc, mail_id, message_id, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
            to,
            from,
            reply_to,
            bcc,
            cc,
            mail_id,
            message_id,
            html_format,
            subject,
            content
        ]);
    }

    async getUsers() {
        return await db.query("SELECT * FROM users");
    }

    async addUser() {

    }
}