import express from 'express';
import { router as loginRouter } from './routes/login/login.route';
import { router as verifyUserRouter } from './routes/verify-user/verify-user.route';
import { router as refreshTokenRouter } from './routes/refresh-token/refresh-token.route';
import bodyParser from 'body-parser';
import { API_VERSION_1 } from './shared/constants';

const app = express();

app.disable('x-powered-by');
app.use(bodyParser.json());

app.use(`/${API_VERSION_1}`, loginRouter);
app.use(`/${API_VERSION_1}`, verifyUserRouter);
app.use(`/${API_VERSION_1}`, refreshTokenRouter);

export { app };
