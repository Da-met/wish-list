import { EntityState } from "@reduxjs/toolkit";
import { Friend } from "./friend";


export interface FriendsPageSchema extends EntityState<Friend>{
    isLoading?: boolean;
    error?: string;
}