import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

router.post(
    '/',
    auth(
        ENUM_USER_ROLE.USER,
    ),
    BookingController.createBooking
);

router.get(
    '/',
    auth(
        ENUM_USER_ROLE.USER,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN,
    ),
    BookingController.getAllBooking
);

router.get(
    '/:id',
    auth(
        ENUM_USER_ROLE.USER,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN,
    ),
    BookingController.getSingleBooking
);
router.patch(
    '/:id',
    validateRequest(BookingValidation.updateBookingZodSchema),
    auth(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.USER,
        ENUM_USER_ROLE.SUPER_ADMIN,
    ),
    BookingController.updateBooking
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN), BookingController.deleteBooking);

export const BookingRoutes = router;