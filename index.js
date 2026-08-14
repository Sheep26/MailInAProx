import express from 'express';
import cookieParser from "cookie-parser";
import morgan from 'morgan';
import config from "./config.json" with { type: "json" };
import { email_types } from './email/types.js';
import { DatabaseManager } from './database/database.js';

const app = express();
const PORT = config.port | 8080;

const database = new DatabaseManager();
const email = new email_types[config.email.type](database, config.email.auth);

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