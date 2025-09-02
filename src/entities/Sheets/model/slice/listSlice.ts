import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { List, ListSchema } from '@/entities/Sheets';
import { fetchLists } from '../services/fetchLists/fetchLists';
import { updateList } from '../services/updeteList/updateList';






const listAdapter = createEntityAdapter<List>({
    selectId: (list) => list.id,
});

export const getLists = listAdapter.getSelectors<StateSchema>(
    (state) => state.lists || listAdapter.getInitialState(),
);



const listSlice = createSlice({
    name: 'listSlice',
    initialState: listAdapter.getInitialState<ListSchema>({
        isLoading: false,
        error: undefined,
        entities: {},
        ids: [],
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLists.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchLists.fulfilled, ( state, action ) => {
                state.isLoading = false;
                listAdapter.setAll(state, action.payload);
            })
            .addCase(fetchLists.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(updateList.fulfilled, (state, action) => {
                const payload = {
                    ...action.payload,
                    wishes: action.payload.wishes ?? [],   
                };
                listAdapter.upsertOne(state, action.payload);
            })

            // .addCase(fetchListById.fulfilled, (state, action) => {
            //     state.entities[action.payload.id] = action.payload;
            //     if (!state.ids.includes(action.payload.id)) {
            //         state.ids.push(action.payload.id);
            //     }
            // });
    },
});

export const {
    reducer: listSliceReducer,
    actions: listSliceActions,
} = listSlice;
