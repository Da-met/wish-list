

export interface User {
    id: number;
    name: string;
    img: string;
    email: string;
}

export interface UserSchema {
    authData?: User;
}