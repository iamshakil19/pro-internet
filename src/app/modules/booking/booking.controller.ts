import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { FeedbackService } from "../feedback/feedback.service";
import { Request, Response } from "express";
import { BookingService } from "./booking.service";

const createBooking = catchAsync(async (req: Request, res: Response) => {
    console.log('ghhgjkh');

    const result = await BookingService.createBooking(req.user, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking created successfully',
        data: result,
    });
});

export const BookingController = {
    createBooking
}