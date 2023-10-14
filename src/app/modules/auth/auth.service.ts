import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IChangePassword, ILogin, ILoginResponse } from "./auth.interface";
import prisma from "../../../shared/prisma";
import bcrypt from 'bcrypt';
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { JwtPayload, Secret } from "jsonwebtoken";
import { User } from '@prisma/client'

const signup = async (data: User): Promise<User> => {
    const { password, ...others } = data;
    const hashedPassword = await bcrypt.hash(
        password,
        Number(config.bcrypt_salt_rounds)
    );
    const result = await prisma.user.create({
        data: {
            password: hashedPassword,
            ...others,
        },
    });
    return result;
};

const login = async (payload: ILogin): Promise<ILoginResponse> => {
    const { email: userEmail, password } = payload;
    const isUserExist = await prisma.user.findFirst({ where: { email: userEmail } });
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }

    const isPasswordMatch = await bcrypt.compare(password, isUserExist.password);
    if (!isPasswordMatch) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Password is incorrect');
    }

    const { email, role } = isUserExist;

    const accessToken = jwtHelpers.createToken(
        { email, role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    );

    return { accessToken };
};

const changePassword = async (user: JwtPayload | null,
    payload: IChangePassword): Promise<void> => {
    const { oldPassword, newPassword } = payload;

    const isUserExist = await prisma.user.findFirst({ where: { email: user?.email } });
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }
    const isPasswordMatch = await bcrypt.compare(oldPassword, isUserExist.password)
    if (!isPasswordMatch) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
    }

    await prisma.user.update({
        where: {
            id: isUserExist?.id
        },
        data: {
            password: await bcrypt.hash(newPassword, Number(config.bcrypt_salt_rounds))
        }
    })
}

export const AuthService = {
    login,
    signup,
    changePassword
};