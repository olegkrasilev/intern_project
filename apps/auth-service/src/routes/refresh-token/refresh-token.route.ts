import express from 'express';
import { REFRESH_TOKEN_ROUTE } from '../../shared/constants';
import { refreshToken } from '../../controller/refresh-token.controller';

export const router = express.Router();

router.route(`/${REFRESH_TOKEN_ROUTE}`).post(refreshToken);
