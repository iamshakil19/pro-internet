import { Prisma, Rating } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { paginationHelpers } from "../../../helpers/paginationHelper";


const createRating = async (user: any, data: Rating): Promise<Rating> => {
    const isUserExist = await prisma.user.findFirst({ where: { email: user.email } });
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }
    const finalData = { ...data, userId: isUserExist.id }
    const result = await prisma.rating.create({ data: finalData })
    return result;
};

const getAllRating = async (filters: any, paginationOptions: any) => {

    const { filterData } = filters;
    
    const andConditions = [];

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key],
                },
            })),
        });
    }

    const whereConditions: Prisma.RatingWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.rating.findMany({
        where: whereConditions,
        orderBy:
            paginationOptions.sortBy && paginationOptions.sortOrder
                ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
                : {
                    createdAt: 'desc',
                },
    });

    return {
        data: result,
    };
};

export const RatingService = {
    createRating,
    getAllRating
}