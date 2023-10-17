import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { FeedbackService } from "./feedback.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { feedbackFilterableFields } from "./feedback.constant";


const createFeedback = catchAsync(async (req: Request, res: Response) => {
    const result = await FeedbackService.createFeedback(req.user, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Feedback created successfully',
        data: result,
    });
});

const getAllFeedback = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, feedbackFilterableFields);
    const paginationOptions = pick(req.query, [
        'limit',
        'page',
        'sortBy',
        'sortOrder',
    ]);

    const result = await FeedbackService.getAllFeedback(filters, paginationOptions);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All feedback fetched successfully',
        meta: result.meta,
        data: result.data,
    });
});

export const FeedbackController = {
    createFeedback,
    getAllFeedback
}