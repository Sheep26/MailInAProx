import { db, initDB } from './connection.js';
import { BcryptManager, BcryptCache } from './encryption.js';
import { Session } from '../sessions/sessionManager.js';

const hasher = new BcryptManager();

export class DatabaseManager {
    constructor() {
        initDB();
    }

    async addEmail(to, from, name_from, reply_to, bcc, cc, mail_id, message_id, html_format, subject, content) {
        await db.execute('INSERT INTO emails (mail_to, mail_from, name_from, reply_to, bcc, cc, mail_id, message_id, html_format, subject, content, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            to,
            from,
            name_from ?? null,
            reply_to,
            bcc,
            cc,
            mail_id,
            message_id,
            html_format,
            subject,
            content,
            Date.now()
        ]);
    }

    async getUsersEmails(email) {
        const [rows] = await db.query('SELECT * FROM emails WHERE mail_to=?', [email]);

        return rows;
    }

    async getEmail(mail_id, email) {
        const [rows] = await db.query('SELECT * FROM emails WHERE mail_id=? AND mail_to=?', [mail_id, email]);

        if (rows.length > 0)
            return rows[0];

        return null;
    }

    async getUsers() {
        const [rows] = await db.query("SELECT * FROM users");

        return rows;
    }

    async addUser(username, passwd, email) {
        const [rows] = await db.query('SELECT email FROM users WHERE email=?', [email]);

        if (rows[0])
            return false;

        await db.execute('INSERT INTO users (username, passwd, email) VALUES (?, ?, ?)', [username, await hasher.hash(passwd), email]);
        return true;
    }

    async getUserEmail(email) {
        const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email]);

        return rows[0];
    }

    async deleteEmailRespectToUser(mail_id, user_email) {
        await db.execute('DELETE FROM emails WHERE mail_id=? AND mail_to=?', [mail_id, user_email]);
    }

    async login(email, password) {
        const user = await this.getUserEmail(email);

        if (!user || !hasher.compareHashes(password, user.passwd))
            return null;

        const session = new Session(email, 7.884e+9);
        return session;
    }
}