import { CombinedState, configureStore, getDefaultMiddleware, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { StateSchema, ThunkExtraArg } from "./StateSchema";
// import { counterReducer } from "@/entities/Counter";
import { userReducer } from "@/entities/User";
import { createReducerManager } from "./ReducerManager";
import { useDispatch } from "react-redux";
import { $api } from "@/shared/api/api";
import { NavigateOptions, To } from "react-router-dom";
import { ScrollSaveReducer } from "@/features/scrollSave";
import { registrationReducer } from "@/features/Registration";
import { friendsPageReducer } from "@/pages/FriendsPage/model/slice/friendsPageSlice";
import { FriendsPageSchema } from "@/pages/FriendsPage";
import { listSliceReducer } from "@/entities/Sheets/model/slice/listSlice";
import { ListSchema } from "@/entities/Sheets";
import { listDetailsReducer } from "@/entities/List";



export function createReduxStore(
    initialState?: StateSchema, 
    asyncReducers?: ReducersMapObject<StateSchema>,
    // navigate?: (to: To, options?: NavigateOptions) => void,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        // counter: counterReducer,
        user: userReducer,
        scrollSave: ScrollSaveReducer,
        friends: friendsPageReducer as Reducer<FriendsPageSchema | undefined>,
        lists: listSliceReducer as Reducer<ListSchema | undefined>,
        // listDetails: listDetailsReducer,
    }

    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        api: $api,
        // navigate,
    }

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            }
        })
    })

    // @ts-ignore
    store.reducerManager = reducerManager

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']


