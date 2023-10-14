import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { PackageService } from "./package.service";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { packageFilterableFields } from "./package.constant";

const createPackage = catchAsync(async (req: Request, res: Response) => {
    const result = await PackageService.createPackage(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Package created successfully',
        data: result,
    });
});

const getAllBook = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, packageFilterableFields);
    const paginationOptions = pick(req.query, [
        'limit',
        'page',
        'sortBy',
        'sortOrder',
    ]);

    const result = await PackageService.getAllPackage(filters, paginationOptions);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All package fetched successfully',
        meta: result.meta,
        data: result.data,
    });
});

const getSinglePackage = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await PackageService.getSinglePackage(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Package fetched successfully',
        data: result,
    });
});

const updatePackage = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await PackageService.updatePackage(id, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Package updated successfully',
        data: result,
    });
});


export const PackageController = {
    createPackage,
    getAllBook,
    getSinglePackage,
    updatePackage
};