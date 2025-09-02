

export interface wishUser {
    img: string,
    name: string,
}

export interface Wish {
    id: number;
    name: string;
    description: string;
    img: string;
    url: string;

    // is_reserved: boolean;
    reservation: {
        id: number,
        user_id: number,
    };
    isReserved: boolean,

    user_id: number;
    list_id: number;
    list?: {
        id: number;
        name: string;
    };
    createdAt: string;
    user: wishUser;

    completed?: boolean;
}