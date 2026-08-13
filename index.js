import express from 'express';
import cookieParser from "cookie-parser";
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT | 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './templates');
app.use('/static', express.static('static'));
app.use(cookieParser());
app.use(morgan('combined'));

app.post('/recieve', (req, res) => {
    console.log(req.json);
    res.sendStatus(200);
});

app.listen(PORT, '0.0.0.0', function (err) {
    if (err) {
        console.log(err);

        process.exit(1);
    }

    console.log(`Server running on http://localhost:${PORT}`);
});