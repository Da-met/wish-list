
export interface Profile {
    name?: string;
    img?: string | File | null;
    email?: string;
    password?: string;
}

export interface ProfileSchema {
    data?: Profile;
    form?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
}