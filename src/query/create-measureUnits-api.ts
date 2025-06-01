import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL, ApiEndpoints } from './constants';
import { MeasureUnitsResponse } from './types';

export const measureUnitsApi = createApi({
    reducerPath: 'measureUnitsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${sessionStorage.getItem('access_token')}`);
        },
    }),
    endpoints: (build) => ({
        getMeasureUnits: build.query<MeasureUnitsResponse, void>({
            query: () => ({
                url: ApiEndpoints.MEASURE_UNITS,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetMeasureUnitsQuery } = measureUnitsApi;
