import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Recipe } from '~/app/mocks/types/type_defenitions';

import { API_BASE_URL, ApiEndpoints, IMAGE_BASE_URL } from './constants';
import {
    BloggerRecipesResponse,
    PartialRecipeQuery,
    RecipeDraft,
    RecipesResponse,
    StatusResponse,
} from './types';

export const recipeApi = createApi({
    reducerPath: 'recipeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${sessionStorage.getItem('access_token')}`);
        },
    }),
    tagTypes: ['Recipe'],
    endpoints: (build) => ({
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
            providesTags: ['Recipe'],
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
            providesTags: ['Recipe'],
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
            providesTags: ['Recipe'],
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
            providesTags: ['Recipe'],
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
            providesTags: ['Recipe'],
        }),
        getBloggerRecipes: build.query<BloggerRecipesResponse, string>({
            query: (id) => ({
                url: `${ApiEndpoints.BLOGGER_RECIPES}/${id}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                const data = response as BloggerRecipesResponse;
                const recipes = data.recipes.map((recipe) => ({
                    ...recipe,
                    image: IMAGE_BASE_URL + recipe.image,
                }));
                return { ...data, recipes: recipes };
            },
            providesTags: ['Recipe'],
        }),
        createRecipeDraft: build.mutation<StatusResponse, RecipeDraft>({
            query: (body) => ({
                url: `${ApiEndpoints.RECIPE_DRAFT}`,
                method: 'post',
                body,
            }),
            transformErrorResponse: (response) => {
                console.log(response);
                return response;
            },
        }),
        createRecipe: build.mutation<RecipeDraft, RecipeDraft>({
            query: (body) => ({
                url: `${ApiEndpoints.RECIPE}`,
                method: 'post',
                body,
            }),
            transformErrorResponse: (response) => {
                console.log(response);
                return response;
            },
            invalidatesTags: ['Recipe'],
        }),
        deleteRecipe: build.mutation<StatusResponse, string>({
            query: (id) => ({
                url: `${ApiEndpoints.RECIPE}/${id}`,
                method: 'delete',
            }),
            transformErrorResponse: (response) => {
                console.log(response);
                return response;
            },
            invalidatesTags: ['Recipe'],
        }),
        editRecipe: build.mutation<RecipeDraft, { id: string; body: RecipeDraft }>({
            query: (data) => ({
                url: `${ApiEndpoints.RECIPE}/${data.id}`,
                method: 'PATCH',
                body: data.body,
            }),
            transformErrorResponse: (response) => {
                console.log(response);
                return response;
            },
            invalidatesTags: ['Recipe'],
        }),
        likeRecipe: build.mutation<StatusResponse, string>({
            query: (id) => ({
                url: `${ApiEndpoints.RECIPE}/${id}/like`,
                method: 'post',
            }),
            transformErrorResponse: (response) => {
                console.log(response);
                return response;
            },
            invalidatesTags: ['Recipe'],
        }),
        bookmarkRecipe: build.mutation<StatusResponse, string>({
            query: (id) => ({
                url: `${ApiEndpoints.RECIPE}/${id}/bookmark`,
                method: 'post',
            }),
            transformErrorResponse: (response) => {
                console.log(response);
                return response;
            },
            invalidatesTags: ['Recipe'],
        }),
    }),
});

export const {
    useCreateRecipeDraftMutation,
    useCreateRecipeMutation,
    useEditRecipeMutation,
    useDeleteRecipeMutation,
    useLikeRecipeMutation,
    useBookmarkRecipeMutation,
    useGetRecipeByIdQuery,
    useGetRecipeQuery,
    useGetJuiciestRecipesQuery,
    useGetNewestRecipesQuery,
    useGetRecipeByCategoryQuery,
    useGetBloggerRecipesQuery,
} = recipeApi;
