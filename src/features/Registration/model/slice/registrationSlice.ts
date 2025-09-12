
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegistrationSchema } from '../types/registrationSchema';
import { registrationProfile } from '../services/registration';
// import { loginByUsername } from '../services/loginByUsername/loginByUsername';


const initialState: RegistrationSchema = {
    isLoading: false,

    username: '',
    img: '',
    birthday: '',
    email: '',
    password: '',
};

export const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setImg: (state, action: PayloadAction<string>) => {
            state.img = action.payload;
        },
        setBirthday: (state, action: PayloadAction<string>) => {
            state.birthday = action.payload;
        },        
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => { 
            state.error = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registrationProfile.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(registrationProfile.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(registrationProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

// Action creators are generated for each case reducer function
export const { actions: registrationActions } = registrationSlice;
export const { reducer: registrationReducer } = registrationSlice;