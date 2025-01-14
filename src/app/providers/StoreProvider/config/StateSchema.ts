import { AnyAction, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { CombinedState } from 'redux';
import { AxiosInstance } from "axios";
import { CounterSchema } from "entities/Counter";

import { UserSchema } from "entities/User";
import { wishDetailsSchema } from "entities/Wish";
import { AddWishFormSchema } from "features/addWishForm";
import { LoginSchema } from "features/AuthByUserName";
import { ProfileSchema } from "features/editableProfileCard";
import { ScrollSaveSchema } from "features/scrollSave";
import { WishPageSchema } from "pages/WishesPage/model/types/wishPageSchema";
import { NavigateOptions, To } from "react-router-dom";


export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    scrollSave: ScrollSaveSchema;

    // Асинхронные редюсеры
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    wishDetails?: wishDetailsSchema;
    addWishForm?: AddWishFormSchema;
    wishesPage?: WishPageSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>


export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    // true - редъюсер вмонтирован, false - не вмонтирован
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}


export interface ThunkExtraArg {
    api: AxiosInstance;
    // navigate?: (to: To, options?: NavigateOptions) => void;
}


export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}