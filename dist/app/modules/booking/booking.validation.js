"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const createBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        startDate: zod_1.z.string({
            required_error: 'Start date is required',
        }),
        preRequisiteCourses: zod_1.z
            .array(zod_1.z.string({
            required_error: 'Booking id is required',
        }))
    }),
});
const updateBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        startDate: zod_1.z.string().optional(),
        status: zod_1.z.string().optional(),
    }),
});
exports.BookingValidation = {
    createBookingZodSchema,
    updateBookingZodSchema
};
