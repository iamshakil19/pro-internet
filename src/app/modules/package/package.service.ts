import { Package, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { packageSearchableFields } from "./package.constant";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const createPackage = async (data: Package): Promise<Package> => {
  const result = await prisma.package.create({ data })
  return result;
};

const getAllPackage = async (filters: any, paginationOptions: any) => {
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { search, minPrice, maxPrice, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: packageSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (minPrice) {
    andConditions.push({
      price: {
        gte: parseInt(minPrice),
      },
    });
  }
  if (maxPrice) {
    andConditions.push({
      price: {
        lte: parseInt(maxPrice),
      },
    });
  }

  const whereConditions: Prisma.PackageWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.package.findMany({
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

  const total = await prisma.package.count({
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

const getSinglePackage = async (id: string): Promise<Package | null> => {
  const isExist = await prisma.package.findUnique({ where: { id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not Found');
  }
  const result = await prisma.package.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updatePackage = async (
  id: string,
  payload: Partial<Package>
): Promise<Package> => {
  const isExist = await prisma.package.findUnique({ where: { id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not Found');
  }
  const result = await prisma.package.update({
    where: { id },
    data: payload
  });
  return result;
};

const deletePackage = async (id: string): Promise<Package> => {
  const isExist = await prisma.package.findUnique({ where: { id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not Found');
  }
  const result = await prisma.package.delete({
    where: {
      id,
    },
  });
  return result;
};

export const PackageService = {
  createPackage,
  getAllPackage,
  getSinglePackage,
  updatePackage,
  deletePackage
};