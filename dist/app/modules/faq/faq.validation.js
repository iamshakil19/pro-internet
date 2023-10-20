"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqValidation = void 0;
const zod_1 = require("zod");
const createFaqZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        desc: zod_1.z.string({
            required_error: 'Description is required',
        }),
    }),
});
exports.FaqValidation = {
    createFaqZodSchema
};
