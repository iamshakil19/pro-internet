import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BlogService } from "./blog.service";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { blogFilterableFields } from "./blog.constant";


const createBlog = catchAsync(async (req: Request, res: Response) => {
    const result = await BlogService.createBlog(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog created successfully',
        data: result,
    });
});

const getAllBlog = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, blogFilterableFields);
    const paginationOptions = pick(req.query, [
        'limit',
        'page',
        'sortBy',
        'sortOrder',
    ]);

    const result = await BlogService.getAllBlog(filters, paginationOptions);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All blog fetched successfully',
        meta: result.meta,
        data: result.data,
    });
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BlogService.getSingleBlog(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog fetched successfully',
        data: result,
    });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await BlogService.updateBlog(id, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog updated successfully',
        data: result,
    });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BlogService.deleteBlog(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog deleted successfully',
        data: result,
    });
});


export const BlogController = {
    createBlog,
    getAllBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog
}