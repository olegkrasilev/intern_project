import express from 'express';
import { router as loginRouter } from './routes/login/login.route';
import bodyParser from 'body-parser';

const app = express();

app.disable('x-powered-by');
app.use(bodyParser.json());

app.use('/api/v1', loginRouter);

export { app };
