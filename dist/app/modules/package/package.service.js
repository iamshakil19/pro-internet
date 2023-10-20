"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const package_constant_1 = require("./package.constant");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createPackage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.package.create({ data });
    return result;
});
const getAllPackage = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const { searchTerm, minPrice, maxPrice } = filters, filterData = __rest(filters, ["searchTerm", "minPrice", "maxPrice"]);
    console.log(filters);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: package_constant_1.packageSearchableFields.map(field => ({
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
                    equals: filterData[key],
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
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    console.log(whereConditions);
    const result = yield prisma_1.default.package.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: paginationOptions.sortBy && paginationOptions.sortOrder
            ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.package.count({
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
});
const getSinglePackage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.package.findUnique({ where: { id } });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Not Found');
    }
    const result = yield prisma_1.default.package.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updatePackage = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.package.findUnique({ where: { id } });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Not Found');
    }
    const result = yield prisma_1.default.package.update({
        where: { id },
        data: payload
    });
    return result;
});
const deletePackage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.package.findUnique({ where: { id } });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Not Found');
    }
    const result = yield prisma_1.default.package.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.PackageService = {
    createPackage,
    getAllPackage,
    getSinglePackage,
    updatePackage,
    deletePackage
};
