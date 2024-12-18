

export interface User {
    id?: number;
    name?: string;
    // img: string;
    email?: string;
}

// export interface AuthDataUserSchema {
//     message: string;
//     token: string;
//     user: User;
// }

export interface UserSchema {
    authData?: User;
    _inited: boolean;
}