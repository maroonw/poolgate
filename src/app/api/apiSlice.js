import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }), //need to change to deploy
    tagTypes: ['Pool', 'User'], //used for cashed data
    endpoints: (builder) => ({
        getPool: builder.query({
            query: (id) => `pool/${id}`,
            providesTags: ['Pool'],
        }),
        getUser: builder.query({
            query: (id) => `user/${id}`,
            providesTags: ['User'],
        }),
    }),
});