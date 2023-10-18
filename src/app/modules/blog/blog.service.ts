import { Blog, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { blogSearchableFields } from "./blog.constant";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";


const createBlog = async (data: any): Promise<Blog> => {
    const result = await prisma.blog.create({ data })
    return result;
};

const getAllBlog = async (filters: any, paginationOptions: any) => {
    const { limit, page, skip } =
        paginationHelpers.calculatePagination(paginationOptions);
    const { searchTerm, minPrice, maxPrice, ...filterData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: blogSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key],
                },
            })),
        });
    }

    const whereConditions: Prisma.BlogWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.blog.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy:
            paginationOptions.sortBy && paginationOptions.sortOrder
                ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
                : {
                    createdAt: 'desc',
                },
    });

    const total = await prisma.blog.count({
        where: whereConditions,
    });

    const totalPage = Math.ceil(total / limit);

    return {
        meta: {
            total,
            page,
            limit,
            totalPage,
        },
        data: result,
    };
};

const getSingleBlog = async (id: string): Promise<Blog | null> => {
    const isExist = await prisma.blog.findUnique({ where: { id } })
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not Found');
    }
    const result = await prisma.blog.findUnique({
        where: {
            id,
        },
    });
    return result;
};

const updateBlog = async (
    id: string,
    payload: Partial<Blog>
): Promise<Blog> => {
    const isExist = await prisma.blog.findUnique({ where: { id } })
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not Found');
    }
    const result = await prisma.blog.update({
        where: { id },
        data: payload
    });
    return result;
};

const deleteBlog = async (id: string): Promise<Blog> => {
    const isExist = await prisma.blog.findUnique({ where: { id } })
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not Found');
    }
    const result = await prisma.blog.delete({
        where: {
            id,
        },
    });
    return result;
};

export const BlogService = {
    createBlog,
    getAllBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog
}