import express from 'express';
import { router as loginRouter } from './routes/login/login.route';
import bodyParser from 'body-parser';
import { API_VERSION_1 } from './shared/constants';

const app = express();

app.disable('x-powered-by');
app.use(bodyParser.json());

app.use(`/${API_VERSION_1}`, loginRouter);

export { app };
