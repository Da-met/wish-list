

export interface RegistrationSchema {
    username: string;

    img: string | null;
    birthday: string;
    email: string;
    password: string;
    
    isLoading: boolean;
    error?: string;
}