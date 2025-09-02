import { Wish } from "@/entities/Wish";


export interface ListById {
    id: number;
    name: string;
    user_id: number;
    wishes: Wish[];
}