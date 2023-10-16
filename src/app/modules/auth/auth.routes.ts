import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/signup', validateRequest(AuthValidation.signUpZodSchema), AuthController.signup);

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
    AuthController.changePassword
);

router.get('/get-me', auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.USER
), AuthController.getMe)

router.patch('/update-profile', auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.USER
), AuthController.updateProfile)

export const AuthRoutes = router;