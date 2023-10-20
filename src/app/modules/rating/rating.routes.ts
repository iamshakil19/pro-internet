
import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { RatingController } from './rating.controller';

const router = express.Router();

router.post(
    '/',
    auth(
        ENUM_USER_ROLE.USER
    ),
    RatingController.createRating
);

router.get(
    '/',
    RatingController.getAllRating
);

export const RatingRoutes = router;