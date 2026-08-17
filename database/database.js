import { db, initDB } from './connection.js';
import { BcryptManager, BcryptCache } from './encryption.js';
import { Session } from '../sessions/sessionManager.js';

const hasher = new BcryptManager();

export class DatabaseManager {
    constructor() {
        initDB();
    }

    async addEmail(to, from, name_from, reply_to, bcc, cc, mail_id, message_id, html_format, subject, content, attachments, references) {
        await db.execute('INSERT INTO emails (mail_to, mail_from, name_from, reply_to, bcc, cc, mail_id, message_id, html_format, subject, content, attachments, email_references, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
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
            attachments,
            references,
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

    async getSentEmail(sent_id, email) {
        const user = await this.getUserEmail(email);
        const [rows] = await db.query('SELECT * FROM sent WHERE sent_id=? AND mail_from=?', [sent_id, `${user.username} <${user.email}>`]);

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

    async sendEmail(mail_to, mail_from, reply_to, bcc, cc, subject, content) {
        await db.execute('INSERT INTO sent (mail_to, mail_from, reply_to, bcc, cc, subject, content, time) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [
            mail_to,
            mail_from,
            reply_to,
            bcc,
            cc,
            subject,
            content,
            Date.now()
        ]);
    }

    async getSent(email) {
        const user = await this.getUserEmail(email);
        const [rows] = await db.query('SELECT * FROM sent WHERE mail_from=?', [`${user.username} <${user.email}>`]);

        return rows;
    }

    async login(email, password) {
        const user = await this.getUserEmail(email);

        if (!user || !hasher.compareHashes(password, user.passwd))
            return null;

        const session = new Session(email, 7.884e+9);
        return session;
    }
}