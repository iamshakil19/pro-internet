import { Prisma, User } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { userSearchableFields } from "./user.constant";
import prisma from "../../../shared/prisma";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const getAllUser = async (filters: any, paginationOptions: any, user: JwtPayload | null) => {
    const { email, role } = user as any
    const { limit, page, skip } =
        paginationHelpers.calculatePagination(paginationOptions);
    const { searchTerm, ...filterData } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: userSearchableFields.map(field => ({
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

    if (role !== 'super_admin') {
        andConditions.push({
            role: 'user'
        })
    }

    const whereConditions: Prisma.UserWhereInput = {
        AND: [
            ...andConditions,
            {
                email: {
                    not: {
                        equals: email,
                    },
                },

            },
        ],
    };

    const result = await prisma.user.findMany({
        where: whereConditions,
        skip,
        take: limit,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            phone: true,
            image: true,
            access: true,
            createdAt: true
        },
        orderBy:
            paginationOptions.sortBy && paginationOptions.sortOrder
                ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
                : {
                    createdAt: 'desc',
                },
    });

    const total = await prisma.user.count({
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

const deleteUser = async (id: string): Promise<User> => {
    const isExist = await prisma.user.findUnique({ where: { id } })
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not Found');
    }
    const result = await prisma.user.delete({
        where: {
            id,
        },
    });
    return result;
};


export const UserService = {
    getAllUser,
    deleteUser
}