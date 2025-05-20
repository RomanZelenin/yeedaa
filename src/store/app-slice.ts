import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import blogs from '~/app/mocks/blogs.json';
import { Recipe } from '~/app/mocks/types/type_defenitions';
import { Profile } from '~/common/components/Header/ProfileInfo';

import { ApplicationState } from './configure-store';

export type AppState = typeof initialState;

export const enum Error {
    NONE = 'none',
    RECEPIES_NOT_FOUND = 'Рецепты не найдены',
    SERVER = 'Ошибка сервера',
    INCORRECT_LOGIN_OR_PASSWORD = 'Неверный логин или пароль',
    EMAIL_NOT_VERIFED = 'E-mail не верифицирован',
    EMAIL_ALREADY_EXISTS = 'Пользователь с таким email уже существует.',
    INVALID_CODE = 'Неверный код',
}

export type ResponseError = {
    value: string;
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
        setRecepies(state, { payload: recipes }: PayloadAction<Recipe[] | undefined>) {
            state.recipes = recipes ?? [];
        },
        setIsSearch(state, { payload: isSearch }: PayloadAction<boolean>) {
            state.isSearch = isSearch;
        },
    },
});

export const loadingSelector = (state: ApplicationState) => state.app.isLoading;

export const errorSelector = (state: ApplicationState) => state.app.error;
export const querySelector = (state: ApplicationState) => state.app.query;
export const recipesSelector = (state: ApplicationState) => state.app.recipes;
export const blogsSelector = (state: ApplicationState) => state.app.blogs;
export const isSearchSelector = (state: ApplicationState) => state.app.isSearch;

export const newestRecipesLoading = (state: ApplicationState) => state.app.isNewestRecipesLoading;
export const juiciestRecipesLoading = (state: ApplicationState) => state.app.isNewestRecipesLoading;
export const relevantLoading = (state: ApplicationState) => state.app.isRelevantLoading;

export const {
    setAppError,
    setAppLoader,
    setAppQuery,
    setRecepies,
    setNewestRecipesLoader,
    setJuiciestRecipesLoader,
    setRelevantLoader,
    setIsSearch,
} = appSlice.actions;
export default appSlice.reducer;
