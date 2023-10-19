import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FaqController } from './faq.controller';
import { FaqValidation } from './faq.validation';

const router = express.Router();

router.post(
    '/',
    validateRequest(FaqValidation.createFaqZodSchema),
    auth(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN,
    ),
    FaqController.createFaq
);

router.get(
    '/',
    FaqController.getAllFaq
);

export const FaqRoutes = router;