import { Wish } from "@/entities/Wish";


export interface List {
    id: number;
    name: string;
    // + другие поля, которые есть в API

    user_id: number;
    // wishes: Wish[];
    wishes: ListWishes[];
}

export interface ListDetailsSchema {
    isLoading: boolean;
    error?: string;
    data?: List;
}

// export interface List {
//     id: number;
//     name: string;
//     user_id: number;
//     wishes: ListWishes[];
// }



export interface ListWishes {
    id: number;
    name: string;
    img: string;   
}