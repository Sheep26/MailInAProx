import express from 'express';
import cookieParser from "cookie-parser";
import morgan from 'morgan';
import config from "./config.json" with { type: "json" };
import { email_types } from './email/types.js';
import { DatabaseManager } from './database/database.js';
import { SessionManager } from './sessions/sessionManager.js';

const app = express();
const PORT = config.port | 8080;

const database = new DatabaseManager();
const email = new email_types[config.email.type](database, config.email.auth);
const sessionManager = new SessionManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './templates');
app.use('/static', express.static('static'));
app.use(cookieParser());
app.use(morgan('combined'));

app.post('/recieve', (req, res) => {
    email.handle(req.body);

    res.sendStatus(200);
});

app.post("/send", async (req, res) => {
    const session = sessionManager.getSession(req.cookies.session);

    if (!session)
        return res.sendStatus(401);

    const user = await database.getUserEmail(session.email);
    await email.send(`${user.username} <${session.user_id}>`, req.body.to, session.user_id, req.body.subject, req.body.content);
});

app.post('/login', async (req, res) => {
    const session = database.login(req.body.email, req.body.password);

    if (!session)
        return res.sendStatus(401);

    sessionManager.addSession(session);
    res.cookie('session', session.session, { maxAge: 7.884e+9, httpOnly: true, secure: config.cookies_secure, sameSite: 'strict' });
    res.redirect("/");
});

app.get("/", (req, res) => {
    res.sendStatus(200);
});

app.listen(PORT, '0.0.0.0', function (err) {
    if (err) {
        console.log(err);

        process.exit(1);
    }

    console.log(`Server running on http://localhost:${PORT}`);
});