import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
    '/login',
    validateRequest(AuthValidation.loginZodSchema),
    AuthController.login
);

router.post(
    '/change-password',
    validateRequest(AuthValidation.changePasswordZodSchema),
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.USER
    ),
    // AuthController.changePassword
);

export const AuthRoutes = router;