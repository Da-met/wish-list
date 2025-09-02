import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TOKEN_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: __API__,
        prepareHeaders: (headers) => {
            // ЗАМЕНА ТОКЕНА 
            // const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY) || '';

            const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
            
            if (token) {
                headers.set('Authorization', token);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({}),
});
