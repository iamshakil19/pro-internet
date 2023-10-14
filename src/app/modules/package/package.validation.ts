import { z } from "zod";

const createPackageZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }),
        price: z.number({
            required_error: 'Price is required',
        }),
        renewsFee: z.number({
            required_error: 'Renews Fee is required',
        }),
        storage: z.string({
            required_error: 'Storage is required',
        }),
        bandwidth: z.string({
            required_error: 'Bandwidth is required',
        }),
        website: z.string({
            required_error: 'Website is required',
        }),
        cpu: z.string({
            required_error: 'Cpu is required',
        }),
        physicalMemory: z.string({
            required_error: 'Physical Memory is required',
        }),
        process: z.string({
            required_error: 'Process is required',
        }),
        desc: z.string({
            required_error: 'Description is required',
        }),
    }),
});
const updatePackageZodSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        price: z.number().optional(),
        renewsFee: z.number().optional(),
        storage: z.string().optional(),
        bandwidth: z.string().optional(),
        website: z.string().optional(),
        cpu: z.string().optional(),
        physicalMemory: z.string().optional(),
        process: z.string().optional(),
        desc: z.string().optional(),
    }),
});


export const PackageValidation = {
    createPackageZodSchema,
    updatePackageZodSchema
};