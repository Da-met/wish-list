import { ReducersMapObject } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { Theme, ThemeProvider } from '@/app/providers/ThemeProvider';

import { wishDetailsReducer } from '@/entities/Wish/model/slice/wishDetailsSlice';
import { loginReducer } from '@/features/AuthByUserName/model/slice/loginSlice';
import { profileReducer } from '@/features/editableProfileCard/model/slice/profileSlice';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { registrationReducer } from '@/features/Registration/model/slice/registrationSlice';


const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    wishDetails: wishDetailsReducer,
    registration: registrationReducer,
}

export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: ReducersList
) => (StoryComponent: Story) => (
    <StoreProvider initialState={state} asyncReducers={{...defaultAsyncReducers, ...asyncReducers}}>
            <StoryComponent />
    </StoreProvider>
);