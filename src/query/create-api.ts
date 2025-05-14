import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Recipe } from '~/app/mocks/types/type_defenitions';
import { LoginFormData } from '~/app/pages/Login/LoginForm';

import { ApiEndpoints } from './constants/api';

export type Category = {
    _id: string;
    title: string;
    category: string;
    icon: string;
    description: string;
    subCategories?: Subcategory[];
};

export type Subcategory = {
    _id: string;
    title: string;
    category: string;
    rootCategoryId: string;
};

type RecipeQuery = {
    id: string;
    page: number;
    limit: number;
    allergens: string;
    searchString: string;
    meat: string;
    garnish: string;
    subcategoriesIds: string;
    sortBy: 'createdAt' | 'likes';
    sortOrder: 'asc' | 'desc';
};

export type PartialRecipeQuery = Partial<RecipeQuery>;

type RecipesResponse = {
    data: Recipe[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
};

export type LoginResponse = {
    status: number;
    data: {
        statusCode: number;
        message: string;
        error: string;
    };
};

const IMAGE_BASE_URL = 'https://training-api.clevertec.ru';
export const API_BASE_URL = 'https://marathon-api.clevertec.ru/';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    endpoints: (build) => ({
        getCategories: build.query<Category[], void>({
            query: () => ({
                url: ApiEndpoints.CATEGORY,
                method: 'GET',
            }),
            transformResponse: (response) =>
                (response as Category[]).map((it) => ({
                    ...it,
                    icon: IMAGE_BASE_URL + it.icon,
                })),
        }),
        getCategoriyById: build.query<Category, string | undefined>({
            query: (id) => ({
                url: `${ApiEndpoints.CATEGORY}/${id}`,
                method: 'GET',
            }),
            transformResponse: (response) => ({
                ...(response as Category),
                icon: IMAGE_BASE_URL + (response as Category).icon,
            }),
        }),
        getRecipeByCategory: build.query<RecipesResponse, PartialRecipeQuery>({
            query: (q) => ({
                url: `${ApiEndpoints.RECIPE_BY_CATEGORY}/${q.id}`,
                method: 'GET',
                params: {
                    limit: q.limit,
                    page: q.page,
                    allergens: q.allergens,
                    searchString: q.searchString,
                },
            }),
            transformResponse: (response) => {
                const data = (response as RecipesResponse).data.map((it) => ({
                    ...it,
                    image: IMAGE_BASE_URL + it.image,
                }));
                return { ...(response as RecipesResponse), data: data };
            },
        }),
        getNewestRecipes: build.query<RecipesResponse, PartialRecipeQuery>({
            query: (q) => ({
                url: ApiEndpoints.RECIPE,
                method: 'GET',
                params: {
                    limit: q.limit,
                    sortBy: 'createdAt',
                    sortOrder: 'desc',
                },
            }),
            transformResponse: (response) => {
                if ((response as RecipesResponse).data) {
                    const data = (response as RecipesResponse).data.map((it) => ({
                        ...it,
                        image: IMAGE_BASE_URL + it.image,
                    }));
                    return { ...(response as RecipesResponse), data: data };
                } else {
                    return { data: [response] }; //Для тестирования отдельный случай
                }
            },
        }),
        getJuiciestRecipes: build.query<RecipesResponse, PartialRecipeQuery>({
            query: (q) => ({
                url: ApiEndpoints.RECIPE,
                method: 'GET',
                params: {
                    limit: q.limit,
                    page: q.page,
                    sortBy: 'likes',
                    sortOrder: 'desc',
                },
            }),
            transformResponse: (response) => {
                const data = (response as RecipesResponse).data.map((it) => ({
                    ...it,
                    image: IMAGE_BASE_URL + it.image,
                }));
                return { ...(response as RecipesResponse), data: data };
            },
        }),
        getRecipe: build.query<RecipesResponse, PartialRecipeQuery>({
            query: (q) => ({
                url: ApiEndpoints.RECIPE,
                method: 'GET',
                params: { ...q },
            }),
            transformResponse: (response) => {
                const data = (response as RecipesResponse).data.map((it) => ({
                    ...it,
                    image: IMAGE_BASE_URL + it.image,
                }));
                return { ...(response as RecipesResponse), data: data };
            },
        }),
        getRecipeById: build.query<Recipe, string>({
            query: (id) => ({
                url: `${ApiEndpoints.RECIPE}/${id}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                const data = response as Recipe;
                const steps = data.steps.map((step) => ({
                    ...step,
                    image: IMAGE_BASE_URL + step.image,
                }));
                return { ...data, steps: steps, image: IMAGE_BASE_URL + data.image };
            },
        }),
        login: build.mutation<LoginResponse, LoginFormData>({
            query: (body) => ({
                url: `${ApiEndpoints.LOGIN}`,
                method: 'post',
                body,
            }),
            transformResponse: (response /* , meta */) =>
                //const headers = meta?.response?.headers;
                // const token = headers?.get('Authentication-Access');
                response as LoginResponse,
            transformErrorResponse: (response /* , meta */) => {
                console.log(response);
                return response;
            },
        }),
    }),
});

export const {
    useGetCategoriyByIdQuery,
    useGetCategoriesQuery,
    useGetRecipeQuery,
    useGetRecipeByIdQuery,
    useGetNewestRecipesQuery,
    useGetJuiciestRecipesQuery,
    useGetRecipeByCategoryQuery,
    useLoginMutation,
} = apiSlice;
