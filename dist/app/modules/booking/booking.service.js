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
exports.BookingService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const booking_constant_1 = require("./booking.constant");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const utils_1 = require("../../../shared/utils");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createBooking = (user, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { packageIds, startDate } = data;
    const { email, role } = user;
    const isUserExist = yield prisma_1.default.user.findFirst({ where: { email } });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (packageIds && packageIds.length > 0) {
        yield (0, utils_1.asyncForEach)(packageIds, (packId) => __awaiter(void 0, void 0, void 0, function* () {
            yield prisma_1.default.booking.create({
                data: {
                    userId: isUserExist.id,
                    startDate: startDate,
                    packageId: packId,
                },
            });
        }));
    }
});
const getAllBooking = (user, filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, role } = user;
    const isUserExist = yield prisma_1.default.user.findFirst({ where: { email } });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: booking_constant_1.bookingSearchableFields.map(field => ({
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
    if (role === 'user') {
        andConditions.push({
            userId: isUserExist.id
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.booking.findMany({
        where: whereConditions,
        skip,
        take: limit,
        include: {
            package: true,
            user: true
        },
        orderBy: paginationOptions.sortBy && paginationOptions.sortOrder
            ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.booking.count({
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
const getSingleBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.booking.findUnique({ where: { id } });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Not Found');
    }
    const result = yield prisma_1.default.booking.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateBooking = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.booking.findUnique({ where: { id } });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Not Found');
    }
    const result = yield prisma_1.default.booking.update({
        where: { id },
        data: payload
    });
    return result;
});
const deleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.booking.findUnique({ where: { id } });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Not Found');
    }
    const result = yield prisma_1.default.booking.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.BookingService = {
    createBooking,
    getAllBooking,
    getSingleBooking,
    updateBooking,
    deleteBooking
};
