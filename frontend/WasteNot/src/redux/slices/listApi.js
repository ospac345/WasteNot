import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const baseUrl = 'http://localhost:3001';

export const listApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl }),

    endpoints: builder => ({
        getList: builder.query({
            query: () => {
                return {
                    url: 'api',
                    headers: {},
                };
            },
        }),
    }),
});

export const {
    useGetListQuery,

} = listApi;