

export interface WishForm {
    name?: string;
    description?: string;
    img?: string;
    url?: string;
    is_reserved?: boolean;
    user_id?: number;
}



export interface AddWishFormSchema {
    isLoading: boolean;
    error?: string;
    data?: WishForm;
}