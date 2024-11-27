

export interface User {
    id: number;
    username: string;
    // img: string;
    email: string;
}

export interface AuthDataUserSchema {
    message: string;
    token: string;
    user: User;
}

export interface UserSchema {
    authData?: AuthDataUserSchema | undefined;
}