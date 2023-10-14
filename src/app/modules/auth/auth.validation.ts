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

const loginZodSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: 'Email is required',
        }),
        password: z.string({
            required_error: 'Password is required',
        }),
    }),
});

const changePasswordZodSchema = z.object({
    body: z.object({
        oldPassword: z.string({
            required_error: 'Old password is required',
        }),
        newPassword: z.string({
            required_error: 'New password is required',
        }),
    }),
});

export const AuthValidation = {
    loginZodSchema,
    changePasswordZodSchema,
    signUpZodSchema
};