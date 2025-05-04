import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import blogs from '~/app/mocks/blogs.json';
import randomCategory from '~/app/mocks/random.json';
import recipes from '~/app/mocks/recepies.json';
import { Recipe } from '~/app/mocks/types/type_defenitions';
import { CategoryData } from '~/app/pages/Home/Sections/SectionRelevantKitchen';
import { Profile } from '~/common/components/Header/ProfileInfo';

import { ApplicationState } from './configure-store';

export type AppState = typeof initialState;

export const DEFAULT_ALLERGENS = [
    { title: 'Молочные продукты', selected: false },
    { title: 'Яйцо', selected: false },
    { title: 'Рыба', selected: false },
    { title: 'Моллюски', selected: false },
    { title: 'Орехи', selected: false },
    { title: 'Томат', selected: false },
    { title: 'Цитрусовые', selected: false },
    { title: 'Клубника', selected: false },
    { title: 'Шоколад', selected: false },
];

export const MOCK_RECIPES = recipes;

export const DEFAULT_CATEGORIES = [
    { title: 'salads', selected: false },
    { title: 'snacks', selected: false },
    { title: 'first-dish', selected: false },
    { title: 'vegan', selected: false },
    { title: 'children-dishes', selected: false },
    { title: 'therapeutic-nutrition', selected: false },
    { title: 'national', selected: false },
    { title: 'sauces', selected: false },
    { title: 'drinks', selected: false },
    { title: 'food-preparations', selected: false },
];

export const DEFAULT_AUTHORS = [
    { title: 'Елена Мин', selected: false },
    { title: 'Мирием Чонишвили', selected: false },
    { title: 'Елена Прекрасная', selected: false },
];

export const ERR_RECEPIES_NOT_FOUND = 'recepies not found';

export const DEFAULT_GLOBAL_FILTER: GlobalFilter = {
    categories: [] as string[],
    meat: [] as string[],
    side_dish: [] as string[],
    allergens: [] as string[],
    authors: [] as string[],
};

const initialState = {
    isLoading: false,
    error: '' as string | null,
    query: '' as string,
    recipes: recipes as Recipe[],
    blogs: blogs as { person: Profile; comment: string }[],
    randomCategory: randomCategory as CategoryData[],
    allergens: DEFAULT_ALLERGENS,
    categories: DEFAULT_CATEGORIES,
    breadcrumb: [] as { title: string; path: string }[],
    globalFilter: DEFAULT_GLOBAL_FILTER,
    isFiltered: false,
};
export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppError(state, { payload: error }: PayloadAction<string | null>) {
            state.error = error;
        },
        setAppLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isLoading = isLoading;
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
        setAppCategories(
            state,
            { payload: categories }: PayloadAction<{ title: string; selected: boolean }[]>,
        ) {
            state.categories = categories;
        },
        setAppGlobalFilter(state, { payload: globalFilter }: PayloadAction<GlobalFilter>) {
            state.globalFilter = globalFilter;
        },
        setAppIsFiltered(state, { payload: isFiltered }: PayloadAction<boolean>) {
            state.isFiltered = isFiltered;
            if (!isFiltered) {
                state.globalFilter = DEFAULT_GLOBAL_FILTER;
            }
        },
        setRecepies(state, { payload: recipes }: PayloadAction<Recipe[]>) {
            state.recipes = recipes;
        },
    },
});
export const userLoadingSelector = (state: ApplicationState) => state.app.isLoading;
export const errorSelector = (state: ApplicationState) => state.app.error;

export const {
    setAppError,
    setAppLoader,
    setAppQuery,
    setAppBreadcrumb,
    setAppCategories,
    setAppIsFiltered,
    setAppGlobalFilter,
    setRecepies,
} = appSlice.actions;
export default appSlice.reducer;

export const querySelector = (state: ApplicationState) => state.app.query;
export const recipesSelector = (state: ApplicationState) => state.app.recipes;
export const blogsSelector = (state: ApplicationState) => state.app.blogs;
export const randomCategorySelector = (state: ApplicationState) => state.app.randomCategory[0];
export const allergensSelector = (state: ApplicationState) => state.app.allergens;
export const breadcrumbSelector = (state: ApplicationState) => state.app.breadcrumb;
export const categoriesSelector = (state: ApplicationState) => state.app.categories;
export const globalFilterSelector = (state: ApplicationState) => state.app.globalFilter;
export const isFilteredSelector = (state: ApplicationState) => state.app.isFiltered;

export type GlobalFilter = {
    categories: string[];
    meat: string[];
    side_dish: string[];
    allergens: string[];
    authors: string[];
};
