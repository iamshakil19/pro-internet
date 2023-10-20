"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const signUpZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        role: zod_1.z.string({
            required_error: 'Role is required',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        phone: zod_1.z.string({
            required_error: 'Phone is required',
        }),
        image: zod_1.z.string().optional(),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const changePasswordZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            required_error: 'Old password is required',
        }),
        newPassword: zod_1.z.string({
            required_error: 'New password is required',
        }),
    }),
});
exports.AuthValidation = {
    loginZodSchema,
    changePasswordZodSchema,
    signUpZodSchema
};
