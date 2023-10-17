import { z } from "zod";

const createFeedbackZodSchema = z.object({
    body: z.object({
        desc: z.string({
            required_error: 'Description is required',
        }),
    }),
});


export const FeedbackValidation = {
    createFeedbackZodSchema
};