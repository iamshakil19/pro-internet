import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ILogin, ILoginResponse } from "./auth.interface";
import prisma from "../../../shared/prisma";
import bcrypt from 'bcrypt';
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { User } from '@prisma/client'

const signup = async (data: User): Promise<User> => {
    console.log(data);
    
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
    const { email, password } = payload;
    const isUserExist = await prisma.user.findFirst({ where: { email: email } });
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }

    const isPasswordMatch = await bcrypt.compare(password, isUserExist.password);
    if (!isPasswordMatch) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Password is incorrect');
    }

    const { email: userEmail, role } = isUserExist;

    const accessToken = jwtHelpers.createToken(
        { userEmail, role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    );

    return { accessToken };
};

export const AuthService = {
    login,
    signup
};