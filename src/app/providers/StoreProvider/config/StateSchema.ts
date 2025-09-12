import { AnyAction, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { CombinedState } from 'redux';
import { AxiosInstance } from "axios";
// import { CounterSchema } from "@/entities/Counter";

import { UserSchema } from "@/entities/User";
import { wishDetailsSchema } from "@/entities/Wish";

import { LoginSchema } from "@/features/AuthByUserName";
import { ProfileSchema } from "@/features/editableProfileCard";
import { ScrollSaveSchema } from "@/features/scrollSave";
import { WishPageSchema } from "@/pages/WishesPage/model/types/wishPageSchema";
import { NavigateOptions, To } from "react-router-dom";
import { RegistrationSchema } from "@/features/Registration";
import { FriendsPageSchema } from "@/pages/FriendsPage";
import { ListSchema } from "@/entities/Sheets";
import { addSheetSchema } from "@/features/addList";
import { WishFormSchema } from "@/features/addWishForm";
import { WishesByListSchema } from "@/features/fetchWishesByListId";
import { ReservedWishesSchema } from "@/features/fetchReservedWishes";
import { ListDetailsSchema } from "@/entities/List";



// import { ListDetailsState } from "@/pages/ListDetails/model/slice/listDetailsSlice";





export interface StateSchema {
    // addList: addSheetSchema;
    // counter: CounterSchema;
    user: UserSchema;
    scrollSave: ScrollSaveSchema;

    
    // Асинхронные редюсеры
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    registration?: RegistrationSchema;
    wishDetails?: wishDetailsSchema;
    addWishForm?: WishFormSchema;
    wishesPage?: WishPageSchema;

    addSheet?: addSheetSchema;

    friends?: FriendsPageSchema;
    lists?: ListSchema;
    listDetails?: ListDetailsSchema;

    wishesByList?: WishesByListSchema;
    reservedWishes?: ReservedWishesSchema;
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