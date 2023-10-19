import { z } from 'zod';

const createBookingZodSchema = z.object({
    body: z.object({
        startDate: z.string({
            required_error: 'Start date is required',
        }),
        preRequisiteCourses: z
            .array(z.string({
                required_error: 'Booking id is required',
            }))
    }),
});

const updateBookingZodSchema = z.object({
    body: z.object({
        startDate: z.string().optional(),
        status: z.string().optional(),
    }),
});

export const BookingValidation = {
    createBookingZodSchema,
    updateBookingZodSchema
};
