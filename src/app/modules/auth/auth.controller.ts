import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ILoginResponse } from "./auth.interface";
import httpStatus from "http-status";
import { AuthService } from "./auth.service";

const signup = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.signup(req.body);
    const { password, ...others } = result;
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User created successfully',
        data: others,
    });
});

const login = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await AuthService.login(loginData);

    sendResponse<ILoginResponse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully',
        data: result,
    });
});


export const AuthController = {
    login,
    signup
};