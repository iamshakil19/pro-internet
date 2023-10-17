import { Feedback, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { feedbackSearchableFields } from "./feedback.constant";


const createFeedback = async (user: any, payload: any): Promise<Feedback> => {
    const { email, role } = user;
    const { desc } = payload

    const isUserExist = await prisma.user.findFirst({ where: { email } });
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }

    const result = await prisma.feedback.create({ data: { userId: isUserExist.id, desc }, include: { user: true }, })
    return result;
};

const getAllFeedback = async (filters: any, paginationOptions: any) => {
    const { limit, page, skip } =
        paginationHelpers.calculatePagination(paginationOptions);
    const { searchTerm, minPrice, maxPrice, ...filterData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: feedbackSearchableFields.map(field => ({
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

    const whereConditions: Prisma.FeedbackWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.feedback.findMany({
        where: whereConditions,
        include: { user: true },
        
        skip,
        take: limit,
        orderBy:
            paginationOptions.sortBy && paginationOptions.sortOrder
                ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
                : {
                    createdAt: 'desc',
                },
    });

    const total = await prisma.feedback.count({
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


export const FeedbackService = {
    createFeedback,
    getAllFeedback
}