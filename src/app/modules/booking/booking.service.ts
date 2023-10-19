import { JwtPayload } from "jsonwebtoken";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { bookingSearchableFields } from "./booking.constant";
import { Booking, Prisma } from "@prisma/client";
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


const getAllBooking = async (user: any, filters: any, paginationOptions: any) => {
    const { email, role } = user

    const isUserExist = await prisma.user.findFirst({ where: { email } });
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }

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

    if (role === 'user') {
        andConditions.push({
            userId: isUserExist.id
        })
    }

    const whereConditions: Prisma.BookingWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.booking.findMany({
        where: whereConditions,
        skip,
        take: limit,
        include: {
            package: true,
            user: true
        },
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

const getSingleBooking = async (id: string): Promise<Booking | null> => {
    const isExist = await prisma.booking.findUnique({ where: { id } })
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not Found');
    }
    const result = await prisma.booking.findUnique({
        where: {
            id,
        },
    });
    return result;
};

const updateBooking = async (
    id: string,
    payload: Partial<Booking>
): Promise<Booking> => {
    const isExist = await prisma.booking.findUnique({ where: { id } })
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not Found');
    }
    const result = await prisma.booking.update({
        where: { id },
        data: payload
    });
    return result;
};

const deleteBooking = async (id: string): Promise<Booking> => {
    const isExist = await prisma.booking.findUnique({ where: { id } })
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not Found');
    }
    const result = await prisma.booking.delete({
        where: {
            id,
        },
    });
    return result;
};

export const BookingService = {
    createBooking,
    getAllBooking,
    getSingleBooking,
    updateBooking,
    deleteBooking
};