import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import blogs from '~/app/mocks/blogs.json';
import { Recipe } from '~/app/mocks/types/type_defenitions';
import { Profile } from '~/common/components/Header/ProfileInfo';

import { ApplicationState } from './configure-store';

export type AppState = typeof initialState;

export const ERR_RECEPIES_NOT_FOUND = 'recepies not found';
export const ERR_NONE = 'none';
export const ERR_SERVER = 'server error';
export const ERR_DEFAULT = null;

export const enum Error {
    NONE,
    RECEPIES_NOT_FOUND,
    SERVER,
}

export type ResponseError = {
    value: Error;
    message?: string;
};

const initialState = {
    isLoading: false,
    isNewestRecipesLoading: false,
    isJuiciestRecipesLoading: false,
    isRelevantLoading: false,
    error: { value: Error.NONE } as ResponseError,
    query: '' as string,
    recipes: [] as Recipe[],
    blogs: blogs as { person: Profile; comment: string }[],
    breadcrumb: [] as { title: string; path: string }[],
    isSearch: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppError(state, { payload: error }: PayloadAction<ResponseError>) {
            state.error = error;
        },
        setAppLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isLoading = isLoading;
        },
        setNewestRecipesLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isNewestRecipesLoading = isLoading;
        },
        setJuiciestRecipesLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isJuiciestRecipesLoading = isLoading;
        },
        setRelevantLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isRelevantLoading = isLoading;
        },
        setAppQuery(state, { payload: query }: PayloadAction<string>) {
            state.query = query;
        },
        setAppBreadcrumb(
            state,
            { payload: breadcrumb }: PayloadAction<{ title: string; path: string }[]>,
        ) {
            state.breadcrumb = breadcrumb;
        },
        setRecepies(state, { payload: recipes }: PayloadAction<Recipe[] | undefined>) {
            state.recipes = recipes ?? [];
        },
        setIsSearch(state, { payload: isSearch }: PayloadAction<boolean>) {
            state.isSearch = isSearch;
        },
    },
});

export const loadingSelector = (state: ApplicationState) =>
    state.app.isNewestRecipesLoading ||
    state.app.isJuiciestRecipesLoading ||
    state.app.isRelevantLoading;

export const errorSelector = (state: ApplicationState) => state.app.error;
export const querySelector = (state: ApplicationState) => state.app.query;
export const recipesSelector = (state: ApplicationState) => state.app.recipes;
export const blogsSelector = (state: ApplicationState) => state.app.blogs;
export const breadcrumbSelector = (state: ApplicationState) => state.app.breadcrumb;
export const isSearchSelector = (state: ApplicationState) => state.app.isSearch;

export const {
    setAppError,
    setAppLoader,
    setAppQuery,
    setAppBreadcrumb,
    setRecepies,
    setNewestRecipesLoader,
    setJuiciestRecipesLoader,
    setRelevantLoader,
    setIsSearch,
} = appSlice.actions;
export default appSlice.reducer;
