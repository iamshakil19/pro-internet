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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const signup = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = data, others = __rest(data, ["password"]);
    const hashedPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield prisma_1.default.user.create({
        data: Object.assign({ password: hashedPassword }, others),
    });
    return result;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: userEmail, password } = payload;
    const isUserExist = yield prisma_1.default.user.findFirst({ where: { email: userEmail } });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(password, isUserExist.password);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Password is incorrect');
    }
    const { email, role } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ email, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return { accessToken };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    const isUserExist = yield prisma_1.default.user.findFirst({ where: { email: user === null || user === void 0 ? void 0 : user.email } });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(oldPassword, isUserExist.password);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Old password is incorrect');
    }
    yield prisma_1.default.user.update({
        where: {
            id: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.id
        },
        data: {
            password: yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bcrypt_salt_rounds))
        }
    });
});
const getMe = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findFirst({ where: { email: user === null || user === void 0 ? void 0 : user.email } });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    return isUserExist;
});
const updateProfile = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findFirst({ where: { id } });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const result = yield prisma_1.default.user.update({
        where: { id },
        data
    });
    return result;
});
exports.AuthService = {
    login,
    signup,
    changePassword,
    getMe,
    updateProfile
};
