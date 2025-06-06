import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL, ApiEndpoints } from './constants';
import { BloggersQuery, BloggersResponse, StatusResponse, ToggleSubscriptionQuery } from './types';

export const bloggersApi = createApi({
    reducerPath: 'bloggersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${sessionStorage.getItem('access_token')}`);
        },
    }),
    tagTypes: ['Bloggers'],
    endpoints: (build) => ({
        getBloggers: build.query<StatusResponse | BloggersResponse, BloggersQuery>({
            query: (params) => ({
                url: `${ApiEndpoints.BLOGGERS}`,
                method: 'GET',
                params: params,
            }),
            /* providesTags: (result) => {
                [(result as BloggersResponse).]
            } */
            providesTags: ['Bloggers'],
        }),
        toggleSubscription: build.mutation<StatusResponse, ToggleSubscriptionQuery>({
            query: (body) => ({
                url: `${ApiEndpoints.TOGGLE_SUBSCRIPTION}`,
                method: 'PATCH',
                body: body,
            }),
            invalidatesTags: ['Bloggers'],
        }),
    }),
});

export const { useGetBloggersQuery, useToggleSubscriptionMutation } = bloggersApi;
