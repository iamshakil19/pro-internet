import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PackageValidation } from './package.validation';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { PackageController } from './package.controller';


const router = express.Router();

router.post(
    '/',
    validateRequest(PackageValidation.createPackageZodSchema),
    auth(
        ENUM_USER_ROLE.ADMIN,
    ),
    PackageController.createPackage
);
router.get(
    '/',
    PackageController.getAllBook
);
router.get(
    '/:id',
    PackageController.getSinglePackage
);


export const PackageRoutes = router;