import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { RatingService } from "./rating.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";

const createRating = catchAsync(async (req: Request, res: Response) => {
    const result = await RatingService.createRating(req.user, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rating created successfully',
        data: result,
    });
});

const getAllRating = catchAsync(async (req: Request, res: Response) => {
    console.log('sdfsdf');
    
    const filters = pick(req.query, ['packageId']);
    const paginationOptions = pick(req.query, [
        'limit',
        'page',
        'sortBy',
        'sortOrder',
    ]);

    const result = await RatingService.getAllRating(filters, paginationOptions);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All rating fetched successfully',
        meta: result.meta,
        data: result.data,
    });
});

export const RatingController = {
    createRating,
    getAllRating
}