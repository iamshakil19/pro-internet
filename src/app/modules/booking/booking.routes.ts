import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { BookingController } from './booking.controller';
const router = express.Router();

router.post(
    '/',
    // validateRequest(FeedbackValidation.createFeedbackZodSchema),
    auth(
        ENUM_USER_ROLE.USER,
    ),
    BookingController.createBooking
);

// router.get(
//     '/',
//     auth(
//         ENUM_USER_ROLE.USER,
//         ENUM_USER_ROLE.ADMIN
//     ),
//     FeedbackController.getAllFeedback
// );

export const BookingRoutes = router;