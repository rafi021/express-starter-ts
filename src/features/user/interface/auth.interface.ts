export interface IAuthRegister {
    name: string;
    email: string;
    password: string;
    avatar: string;
}

export interface IAuthLogin {
    email: string;
    password: string;
}