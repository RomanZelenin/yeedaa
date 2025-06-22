import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Recipe } from '~/app/mocks/types/type_defenitions';
import { ActivityStats, UserProfile } from '~/query/types';

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

export type MyProfile = {
    profileInfo?: UserProfile;
    statistic?: ActivityStats;
};

const initialState = {
    isLoading: false,
    isNewestRecipesLoading: false,
    isJuiciestRecipesLoading: false,
    isRelevantLoading: false,
    isBloggersLoading: false,
    isMyProfileLoading: false,
    error: NONE_ERROR_RESPONSE,
    query: '' as string,
    recipes: [] as Recipe[],
    breadcrumb: [] as { title: string; path: string }[],
    isSearch: false,
    notification: null as Notification | null,
    myProfile: {} as MyProfile,
    isShowRecommend: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
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
        setMyProfileLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isMyProfileLoading = isLoading;
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

        setMyProfile(state, { payload: myProfile }: PayloadAction<MyProfile>) {
            state.myProfile = myProfile;
        },
    },
});

export const loadingSelector = (state: ApplicationState) => state.app.isLoading;

export const querySelector = (state: ApplicationState) => state.app.query;
export const recipesSelector = (state: ApplicationState) => state.app.recipes;
export const isSearchSelector = (state: ApplicationState) => state.app.isSearch;

export const newestRecipesLoading = (state: ApplicationState) => state.app.isNewestRecipesLoading;
export const juiciestRecipesLoading = (state: ApplicationState) => state.app.isNewestRecipesLoading;
export const relevantLoading = (state: ApplicationState) => state.app.isRelevantLoading;
export const bloggersLoading = (state: ApplicationState) => state.app.isBloggersLoading;
export const myProfileLoading = (state: ApplicationState) => state.app.isMyProfileLoading;

export const notificationSelector = (state: ApplicationState) => state.app.notification;

export const myProfile = (state: ApplicationState) => state.app.myProfile;
export const isShowRecommendSelector = (state: ApplicationState) =>
    (state.app.myProfile.profileInfo?.subscribers.length ?? 0) > 100 &&
    (state.app.myProfile.statistic?.bookmarks
        .map((it) => it.count)
        .reduce((prev, curr) => curr + prev, 0) ?? 0) > 200;

export const {
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
    setMyProfile,
    setMyProfileLoader,
} = appSlice.actions;
export default appSlice.reducer;
