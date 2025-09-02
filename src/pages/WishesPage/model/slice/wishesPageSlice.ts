import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Wish } from '@/entities/Wish';
import { WishPageSchema } from '../types/wishPageSchema';
import { fetchWishesList } from '../services/fetchWishesList/fetchWishesList';
import { WishesSortField } from '@/entities/Wish/index';
import { ScopeFilter, SortOrder, StatusFilter } from '@/shared/types';



const wishAdapter = createEntityAdapter<Wish>({
    selectId: (wish) => wish.id,
});

export const getWishes = wishAdapter.getSelectors<StateSchema>(
    (state) => state.wishesPage || wishAdapter.getInitialState(),
);



const wishesPageSlice = createSlice({
    name: 'wishesPageSlice',
    initialState: wishAdapter.getInitialState<WishPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        page: 1,
        hasMore: true,

        _inited: false,
        limit: 6,
        sort: WishesSortField.CREATED,
        search: '',
        order: 'asc',

        scope: 'all',
        status: 'active',
    }),
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },

        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<WishesSortField>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        // НОВОЕ:
        setScope: (state, action: PayloadAction<ScopeFilter>) => {
            state.scope = action.payload;
        },
        setStatus: (state, action: PayloadAction<StatusFilter>) => {
            state.status = action.payload;
        },

        initState: (state) => {
            state.limit = 6;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishesList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
                if (action.meta.arg.replace) {
                    wishAdapter.removeAll(state);
                }
            })
            .addCase(fetchWishesList.fulfilled, ( state, action ) => {
                state.isLoading = false;
                state.hasMore = action.payload.length >= state.limit;

                if (action.meta.arg.replace) {
                    wishAdapter.setAll(state, action.payload);
                } else {
                    wishAdapter.addMany(state, action.payload);
                }
            
            })
            .addCase(fetchWishesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: wishesPageReducer,
    actions: wishesPageActions,
} = wishesPageSlice;
