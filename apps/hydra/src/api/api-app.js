import express from 'express';
import {expressErrorLogger, expressLogger} from '../core/logging';

export const app = express();
app.use(expressLogger);

app.get('/', (req, res) => {
    res.status(200)
        .json({text: 'hello'})
        .end();
});

app.use(expressErrorLogger);


