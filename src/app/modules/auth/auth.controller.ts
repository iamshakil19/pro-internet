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
    console.log(req.body);

    const { ...loginData } = req.body;
    const result = await AuthService.login(loginData);

    sendResponse<ILoginResponse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully',
        data: result,
    });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const { ...passwordData } = req.body;
    await AuthService.changePassword(user, passwordData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password changed successfully',
    });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const result = await AuthService.getMe(user);
    const { password, ...others } = result
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User fetched successfully',
        data: others
    });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await AuthService.updateProfile(id, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Profile updated successfully',
        data: result,
    });
});


export const AuthController = {
    login,
    signup,
    changePassword,
    getMe,
    updateProfile
};