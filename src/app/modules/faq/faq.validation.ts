import { z } from "zod";

const createFaqZodSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required',
        }),
        desc: z.string({
            required_error: 'Description is required',
        }),
    }),
});


export const FaqValidation = {
    createFaqZodSchema
};