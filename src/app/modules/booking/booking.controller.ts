import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { FeedbackService } from "../feedback/feedback.service";
import { Request, Response } from "express";
import { BookingService } from "./booking.service";
import pick from "../../../shared/pick";
import { bookingFilterableFields } from "./booking.constant";

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

const getAllBooking = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, bookingFilterableFields);
    const paginationOptions = pick(req.query, [
        'limit',
        'page',
        'sortBy',
        'sortOrder',
    ]);

    const result = await BookingService.getAllBooking(req.user, filters, paginationOptions);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All booking fetched successfully',
        meta: result.meta,
        data: result.data,
    });
});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookingService.getSingleBooking(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Package fetched successfully',
        data: result,
    });
});

const updateBooking = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await BookingService.updateBooking(id, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Package updated successfully',
        data: result,
    });
});

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookingService.deleteBooking(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Package deleted successfully',
        data: result,
    });
});

export const BookingController = {
    createBooking,
    getAllBooking,
    getSingleBooking,
    updateBooking,
    deleteBooking
}