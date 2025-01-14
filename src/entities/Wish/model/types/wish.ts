
// export enum WishesSortField {
//     TITLE = 'title',
//     CREATED = 'createdAt',
// }

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
    is_reserved: boolean;
    user_id: number;
    createdAt: string;
    user: wishUser;
}