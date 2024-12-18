import { Wish } from "./wish";

export interface wishDetailsSchema {
    isLoading: boolean;
    error?: string;
    data?: Wish;
}