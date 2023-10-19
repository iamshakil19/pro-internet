import { JwtPayload } from "jsonwebtoken";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { bookingSearchableFields } from "./booking.constant";
import { Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { asyncForEach } from "../../../shared/utils";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const createBooking = async (user: any, data: any): Promise<any> => {
    const { packageIds, startDate } = data;
    const { email, role } = user;

    const isUserExist = await prisma.user.findFirst({ where: { email } });
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }

    if (packageIds && packageIds.length > 0) {
        await asyncForEach(
            packageIds,
            async (packId: any) => {
                await prisma.booking.create({
                    data: {
                        userId: isUserExist.id,
                        startDate: startDate,
                        packageId: packId,
                    },
                });
            }
        );
    }

    
}


const getAllBooking = async (user: JwtPayload, filters: any, paginationOptions: any) => {
    const { email, role } = user
    const { limit, page, skip } =
        paginationHelpers.calculatePagination(paginationOptions);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: bookingSearchableFields.map(field => ({
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

    const whereConditions: Prisma.BookingWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.booking.findMany({
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

    const total = await prisma.booking.count({
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

export const BookingService = {
    createBooking,
    getAllBooking,
};