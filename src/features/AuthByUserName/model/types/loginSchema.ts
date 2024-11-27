

export interface LoginSchema {
    username: string;
    // img: string;
    email: string;
    password: string;
    
    isLoading: boolean;
    error?: string | unknown;
}