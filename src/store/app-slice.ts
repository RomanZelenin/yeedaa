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

export const NONE_ERROR_RESPONSE: ResponseError = { value: Error.NONE, message: '' };

export type ResponseError = {
    value: string;
    message?: string;
};

export type Notification = {
    _id: string;
    type: 'error' | 'success';
    title: string;
    message?: string;
};

const initialState = {
    isLoading: false,
    isNewestRecipesLoading: false,
    isJuiciestRecipesLoading: false,
    isRelevantLoading: false,
    isBloggersLoading: false,
    error: NONE_ERROR_RESPONSE,
    query: '' as string,
    recipes: [] as Recipe[],
    blogs: blogs as { person: Profile; comment: string }[],
    breadcrumb: [] as { title: string; path: string }[],
    isSearch: false,
    notification: null as Notification | null,
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
        setBloggersLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isBloggersLoading = isLoading;
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
        setNotification(state, { payload: notification }: PayloadAction<Notification>) {
            state.notification = notification;
        },
        removeNotification(state) {
            state.notification = null;
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
export const bloggersLoading = (state: ApplicationState) => state.app.isBloggersLoading;

export const notificationSelector = (state: ApplicationState) => state.app.notification;

export const {
    setAppError,
    setAppLoader,
    setAppQuery,
    setRecepies,
    setNewestRecipesLoader,
    setJuiciestRecipesLoader,
    setRelevantLoader,
    setBloggersLoader,
    setIsSearch,
    setNotification,
    removeNotification,
} = appSlice.actions;
export default appSlice.reducer;
