import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Profile } from "../../types/profile";
import { getProfileForm } from "entities/Profile";



export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<string>
    >(
        'profile/updateProfileData',
        async (_, thunkApi) => {
            const { extra, rejectWithValue, getState } = thunkApi;

            const formData = getProfileForm(getState());

            console.log(formData)
            try {
                const response = await extra.api.put<Profile>(`user/auth/1`, formData);
                return response.data;

                
            } catch (e) {
                console.log(e);
                return rejectWithValue('error');
            }
        },

    );
