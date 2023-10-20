"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageValidation = void 0;
const zod_1 = require("zod");
const createPackageZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        price: zod_1.z.number({
            required_error: 'Price is required',
        }),
        renewsFee: zod_1.z.number({
            required_error: 'Renews Fee is required',
        }),
        category: zod_1.z.string({
            required_error: 'Category is required',
        }),
        storage: zod_1.z.string({
            required_error: 'Storage is required',
        }),
        bandwidth: zod_1.z.string({
            required_error: 'Bandwidth is required',
        }),
        website: zod_1.z.string({
            required_error: 'Website is required',
        }),
        cpu: zod_1.z.string({
            required_error: 'Cpu is required',
        }),
        physicalMemory: zod_1.z.string({
            required_error: 'Physical Memory is required',
        }),
        process: zod_1.z.string({
            required_error: 'Process is required',
        }),
        desc: zod_1.z.string({
            required_error: 'Description is required',
        }),
    }),
});
const updatePackageZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        renewsFee: zod_1.z.number().optional(),
        category: zod_1.z.string().optional(),
        storage: zod_1.z.string().optional(),
        bandwidth: zod_1.z.string().optional(),
        website: zod_1.z.string().optional(),
        cpu: zod_1.z.string().optional(),
        physicalMemory: zod_1.z.string().optional(),
        process: zod_1.z.string().optional(),
        desc: zod_1.z.string().optional(),
    }),
});
exports.PackageValidation = {
    createPackageZodSchema,
    updatePackageZodSchema
};
