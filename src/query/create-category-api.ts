import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL, ApiEndpoints, IMAGE_BASE_URL } from './constants';
import { CategoryResponse } from './types';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${sessionStorage.getItem('access_token')}`);
        },
    }),
    endpoints: (build) => ({
        getCategories: build.query<CategoryResponse[], void>({
            query: () => ({
                url: ApiEndpoints.CATEGORY,
                method: 'GET',
            }),
            transformResponse: (response) =>
                (response as CategoryResponse[]).map((it) => ({
                    ...it,
                    icon: IMAGE_BASE_URL + it.icon,
                })),
        }),
        getCategoriyById: build.query<CategoryResponse, string | undefined>({
            query: (id) => ({
                url: `${ApiEndpoints.CATEGORY}/${id}`,
                method: 'GET',
            }),
            transformResponse: (response) => ({
                ...(response as CategoryResponse),
                icon: IMAGE_BASE_URL + (response as CategoryResponse).icon,
            }),
        }),
    }),
});

export const { useGetCategoriesQuery, useGetCategoriyByIdQuery } = categoryApi;
