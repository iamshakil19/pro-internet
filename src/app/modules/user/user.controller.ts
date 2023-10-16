import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constant";
import { UserService } from "./user.service";


const getAllUser = catchAsync(async (req: Request, res: Response) => {
    const user = req.user
    const filters = pick(req.query, userFilterableFields);
    const paginationOptions = pick(req.query, [
        'limit',
        'page',
        'sortBy',
        'sortOrder',
    ]);

    const result = await UserService.getAllUser(filters, paginationOptions, user);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All user fetched successfully',
        meta: result.meta,
        data: result.data,
    });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserService.deleteUser(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User deleted successfully',
        data: result,
    });
});

export const UserController = {
    getAllUser,
    deleteUser
}