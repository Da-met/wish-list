import { List } from "@/entities/Sheets";
import { User } from "@/entities/User";
import { Wish } from "@/entities/Wish";

// export interface ProfileFriendsList {
//     id: number;
//     title: string;
//     img: string;
// }


export interface Profile {
    id?: number;
    name?: string;
    img?: string | File | null;
    email?: string;
    password?: string;
    birthday?: string;

    lists?: List[];
    wishes?: Wish[];
    Subscriptions?: User[];
    Subscribers?: User[];
}

// export interface ProfileSchema {
//     data?: Profile;
//     form?: Profile;
//     isLoading: boolean;
//     error?: string;
//     readonly: boolean;
// }