import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL, ApiEndpoints, IMAGE_BASE_URL } from './constants';
import { FileUploadResponse } from './types';

export const fileApi = createApi({
    reducerPath: 'fileApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${sessionStorage.getItem('access_token')}`);
        },
    }),
    endpoints: (build) => ({
        fileUpload: build.mutation<FileUploadResponse, FormData>({
            query: (body) => ({
                url: `${ApiEndpoints.FILE_UPLOAD}`,
                method: 'post',
                body,
            }),
            transformResponse: (response) => ({
                ...(response as FileUploadResponse),
                url: `${IMAGE_BASE_URL}${(response as FileUploadResponse).url}`,
            }),
            transformErrorResponse: (response) => {
                console.log(response);
                return response;
            },
        }),
    }),
});

export const { useFileUploadMutation } = fileApi;
