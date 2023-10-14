export interface ILogin {
    email: string;
    password: string;
}

export interface ILoginResponse {
    accessToken: string;
}

export interface IChangePassword {
    oldPassword: string;
    newPassword: string;
}