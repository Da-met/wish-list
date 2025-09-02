import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WishFormSchema } from '../types/addWishForm';
import { addWish } from '../services/addWish';


// interface initiaWishForm {
//     name: '';
//     description: '';
//     img: '';
//     url: '';
//     is_reserved: false;
//     user_id: '';
// }

const initialState: WishFormSchema = {
    isLoading: false,
    error: undefined,
    // data: undefined,

    name: '',
    description: '',
    img: '',
    url: '',
    // is_reserved: false,
    list_id: undefined,
    // user_id: number,
};

export const addWishFormSlice = createSlice({
    name: 'addWishForm',
    initialState,
    reducers: {
        setWishName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setWishDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        setWishImg: (state, action: PayloadAction<string>) => {
            state.img = action.payload;
        },
        setWishUrl: (state, action: PayloadAction<string>) => {
            state.url = action.payload;
        },
        setWishListId: (state, action: PayloadAction<number>) => {
            state.list_id = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(addWish.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(addWish.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(addWish.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

// Action creators are generated for each case reducer function
export const { actions: addWishFormActions } = addWishFormSlice;
export const { reducer: addWishFormReducer } = addWishFormSlice;