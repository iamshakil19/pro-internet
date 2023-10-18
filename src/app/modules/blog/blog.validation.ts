import { z } from "zod";

const createBlogZodSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required',
        }),
        desc: z.string({
            required_error: 'Description is required',
        }),
    }),
});
const updateBlogZodSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        desc: z.string().optional(),
    }),
});


export const BlogValidation = {
    createBlogZodSchema,
    updateBlogZodSchema
};