import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrollSaveSchema } from '../types/ScrollSaveSchema';

const initialState: ScrollSaveSchema = {
    scroll: {},
};

export const ScrollSaveSlice = createSlice({
    name: 'ScrollSave',
    initialState,
    reducers: {
        setScrollPosition: (state, { payload }: PayloadAction<{ path: string; position: number }>) => {
            state.scroll[payload.path] = payload.position;
        },
    },
});

// Action creators are generated for each case reducer function
export const { actions: ScrollSaveActions } = ScrollSaveSlice;
export const { reducer: ScrollSaveReducer } = ScrollSaveSlice;