

export interface WishFormSchema {
    name?: string;
    description?: string;
    img?: string;
    url?: string;
    is_reserved?: boolean;
    user_id?: number;
    list_id?: number;

    error?: string;
    isLoading?: boolean,
}



// export interface AddWishFormSchema {
//     isLoading: boolean;
//     error?: string;
//     data?: WishFormSchema;
// }