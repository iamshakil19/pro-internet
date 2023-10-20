"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const createBlogZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        desc: zod_1.z.string({
            required_error: 'Description is required',
        }),
    }),
});
const updateBlogZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        desc: zod_1.z.string().optional(),
    }),
});
exports.BlogValidation = {
    createBlogZodSchema,
    updateBlogZodSchema
};
