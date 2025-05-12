import express from 'express';
import { VERIFY_ROUTE } from '../../shared/constants';
import { verifyUser } from '../../controller/verify-user.controller';

export const router = express.Router();

router.route(`/${VERIFY_ROUTE}`).post(verifyUser);
