import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { getWishDetailsData } from 'entities/Wish/model/selectors/wishDetails';


export const getCanEditArticle = createSelector(
    getWishDetailsData,
    getUserAuthData,
    (wish, user) => {
        if (!wish || !user) {
            return false;
        }

        return wish.user_id === user.id;
    },
);
