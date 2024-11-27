
export interface Profile {
    name: string;
    img: string;
    email: string;
    password: string;
}

export interface ProfileSchema {
    data?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
}