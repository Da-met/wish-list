
import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
// import { getWishesByList } from './wishesByListSlice';


import { wishesAdapter } from '../slice/wishesByListSlice';

// export const getWishesByListLoading = (state: StateSchema) => state.wishesByList?.isLoading;
// export const getWishesByListError = (state: StateSchema) => state.wishesByList?.error;


// безопасный селектор
export const getWishesByListState = (state: StateSchema) =>
    state.wishesByList ?? wishesAdapter.getInitialState();

// список подарков
export const getWishesFromList = wishesAdapter.getSelectors(getWishesByListState).selectAll;

// флаг загрузки
export const getWishesByListLoading = (state: StateSchema) =>
    state.wishesByList?.isLoading ?? false;

// ошибка
export const getWishesByListError = (state: StateSchema) =>
    state.wishesByList?.error ?? '';