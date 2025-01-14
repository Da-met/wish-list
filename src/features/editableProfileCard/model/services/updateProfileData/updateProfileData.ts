import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Profile } from "../../../../../entities/Profile/model/types/profile";
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";




export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<string>
    >(
        'profile/updateProfileData',
        async (_, thunkApi) => {
            const { extra, rejectWithValue, getState } = thunkApi;

            const formData = getProfileForm(getState());

            try {
                const response = await extra.api.put<Profile>(`user/auth/${formData?.id}`, formData);

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                console.log(e);
                return rejectWithValue('error');
            }
        },

    );
