import { z } from 'zod';

const signUpZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }),
        role: z.string({
            required_error: 'Role is required',
        }),
        email: z.string({
            required_error: 'Email is required',
        }),
        phone: z.string({
            required_error: 'Phone is required',
        }),
        image: z.string().optional(),
        password: z.string({
            required_error: 'Password is required',
        }),
    }),
});

export const UserValidation = {
    signUpZodSchema
};