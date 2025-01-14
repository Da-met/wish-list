import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { Profile } from '../../../../entities/Profile/model/types/profile';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema } from '../types/editableProfileCardSchema';




const initialState: ProfileSchema = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
        },
        cancelEdit: (state) => {
            state.readonly = true;
            state.form = {
                id: state.data?.id || undefined,
                name: state.data?.name || '',
                img: state.data?.img || null,
            }; // Восстанавливаем изначальные данные в form
        },
        updateProfile: (state, action: PayloadAction<Partial<{ name: string; img: string | null }>>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = {
                    id: state.data?.id || undefined,
                    name: action.payload.name,
                    img: action.payload.img,
                };
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(updateProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(updateProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = {
                    id: state.data?.id || undefined,
                    name: action.payload.name,
                    img: action.payload.img,
                };
                state.readonly = true;
            })
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

// Action creators are generated for each case reducer function
export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;