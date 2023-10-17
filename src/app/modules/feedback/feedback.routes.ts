
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FeedbackController } from './feedback.controller';
import { FeedbackValidation } from './feedback.validation';

const router = express.Router();

router.post(
    '/',
    validateRequest(FeedbackValidation.createFeedbackZodSchema),
    auth(
        ENUM_USER_ROLE.USER,
    ),
    FeedbackController.createFeedback
);

router.get(
    '/',
    auth(
        ENUM_USER_ROLE.USER,
        ENUM_USER_ROLE.ADMIN
    ),
    FeedbackController.getAllFeedback
);

export const FeedbackRoutes = router;