import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { FaqService } from "./faq.service";
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";

const createFaq = catchAsync(async (req: Request, res: Response) => {
    const result = await FaqService.createFaq(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faq created successfully',
        data: result,
    });
});

const getAllFaq = catchAsync(async (req: Request, res: Response) => {
    const result = await FaqService.getAllFaq();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All faq fetched successfully',
        data: result.data,
    });
});

export const FaqController = {
    createFaq,
    getAllFaq
}