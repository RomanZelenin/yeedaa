import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL, ApiEndpoints } from './constants';
import {
    BloggerInfoQuery,
    BloggersQuery,
    BloggersResponse,
    StatusResponse,
    ToggleSubscriptionQuery,
} from './types';

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
        getBlogger: build.query<StatusResponse | BloggerInfoResponse, BloggerInfoQuery>({
            query: (params) => ({
                url: `${ApiEndpoints.BLOGGERS}/${params.bloggerId}`,
                method: 'GET',
                params: {
                    currentUserId: params.currentUserId,
                },
            }),
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

export const { useGetBloggersQuery, useToggleSubscriptionMutation, useGetBloggerQuery } =
    bloggersApi;

export type BloggerInfoResponse = {
    bloggerInfo: {
        _id: string;
        email: string;
        firstName: string;
        lastName: string;
        login: string;
    };
    recipesIds: string[];
    subscribers: string[];
    subscriptions: string[];
    isFavorite: boolean;
    totalBookmarks: number;
    totalSubscribers: number;
};
