import express from 'express';
import { login } from '../../controller/login.controller';
import { LOGIN_ROUTE } from '../../shared/constants';

export const router = express.Router();

router.route(`/${LOGIN_ROUTE}`).post(login);
