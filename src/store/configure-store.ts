import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { filtersSlice } from '~/app/features/filters/filtersSlice';
import { authApi } from '~/query/create-auth-api';
import { categoryApi } from '~/query/create-category-api';
import { fileApi } from '~/query/create-file-api';
import { measureUnitsApi } from '~/query/create-measureUnits-api';
import { recipeApi } from '~/query/create-recipe-api';

import appReducer, { appSlice } from './app-slice';
const isProduction = false;
const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [authApi.reducerPath]: authApi.reducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [fileApi.reducerPath]: fileApi.reducer,
    [measureUnitsApi.reducerPath]: measureUnitsApi.reducer,
    [filtersSlice.name]: filtersSlice.reducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(recipeApi.middleware)
            .concat(categoryApi.middleware)
            .concat(fileApi.middleware)
            .concat(measureUnitsApi.middleware),
    devTools: !isProduction,
});
