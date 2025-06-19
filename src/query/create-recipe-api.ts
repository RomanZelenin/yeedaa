import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Recipe } from '~/app/mocks/types/type_defenitions';

import { API_BASE_URL, ApiEndpoints, IMAGE_BASE_URL } from './constants';
import {
    ActivityStats,
    BloggerInfoQuery,
    BloggerInfoResponse,
    BloggerRecipesResponse,
    BloggersQuery,
    BloggersResponse,
    BookmarkResponse,
    PartialRecipeQuery,
    RecipeDraft,
    RecipesResponse,
    StatusResponse,
    ToggleSubscriptionQuery,
    UserProfile,
} from './types';

export const recipeApi = createApi({
    reducerPath: 'recipeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${sessionStorage.getItem('access_token')}`);
        },
    }),
    tagTypes: ['Bloggers', 'Recipe'],
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
            /* providesTags: (result, _error, _arg) => {
                return result ? result.data.map(it => ({ type: 'Recipe', id: it._id })) : []
            }, */
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
            providesTags: (result, _error, _arg) =>
                result ? result.data.map((it) => ({ type: 'Recipe', id: it._id })) : [],
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
            providesTags: (result, _error, _arg) =>
                result ? result.data.map((it) => ({ type: 'Recipe', id: it._id })) : [],
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
                const steps = data.steps.map((step) => {
                    if (step.image === null) {
                        return step;
                    } else {
                        return {
                            ...step,
                            image: IMAGE_BASE_URL + step.image,
                        };
                    }
                });
                return { ...data, steps: steps, image: IMAGE_BASE_URL + data.image };
            },
            providesTags: (result, _error, _arg) =>
                result ? [{ type: 'Recipe', id: result._id }] : [],
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
            invalidatesTags: (result, _error, data) =>
                result ? [{ type: 'Recipe', id: data.id }] : [],
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
            invalidatesTags: (result, _error, id) =>
                result ? [{ type: 'Recipe', id: id }, { type: 'Bloggers' }] : [],
        }),
        bookmarkRecipe: build.mutation<BookmarkResponse, string>({
            query: (id) => ({
                url: `${ApiEndpoints.RECIPE}/${id}/bookmark`,
                method: 'post',
            }),
            transformErrorResponse: (response) => {
                console.log(response);
                return response;
            },
            invalidatesTags: (result, _error, id, _meta) =>
                result ? [{ type: 'Recipe', id: id }, { type: 'Bloggers' }] : [],
        }),
        recommendRecipe: build.mutation<BookmarkResponse | undefined, string>({
            query: (id) => ({
                url: `${ApiEndpoints.RECOMMEND}/${id}`,
                method: 'post',
            }),
            transformErrorResponse: (response) => {
                console.log(response);
                return response;
            },
            invalidatesTags: (_result, error, id, _meta) =>
                !error ? [{ type: 'Recipe', id: id }, { type: 'Bloggers' }] : [],
        }),

        getBloggers: build.query<StatusResponse | BloggersResponse, BloggersQuery>({
            query: (params) => ({
                url: `${ApiEndpoints.BLOGGERS}`,
                method: 'GET',
                params: params,
            }),
            providesTags: ['Bloggers'],
        }),
        getBlogger: build.query<StatusResponse | BloggerInfoResponse, BloggerInfoQuery>({
            query: (params) => ({
                url: `${ApiEndpoints.BLOGGERS}/${params.bloggerId}`,
                method: 'GET',
                params: {
                    currentUserId: params.currentUserId,
                },
            }),
            providesTags: ['Bloggers'],
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
            providesTags: (result, _error, _arg) =>
                result ? result.recipes.map((it) => ({ type: 'Recipe', id: it._id })) : [],
        }),
        toggleSubscription: build.mutation<StatusResponse, ToggleSubscriptionQuery>({
            query: (body) => ({
                url: `${ApiEndpoints.TOGGLE_SUBSCRIPTION}`,
                method: 'PATCH',
                body: body,
            }),
            invalidatesTags: ['Bloggers', 'Recipe'],
        }),

        getMyProfile: build.query<StatusResponse | UserProfile, void>({
            query: () => ({
                url: ApiEndpoints.MY_PROFILE,
                method: 'GET',
            }),
            providesTags: ['Bloggers'],
        }),

        getMyStatistic: build.query<StatusResponse | ActivityStats, void>({
            query: () => ({
                url: ApiEndpoints.MY_STATISTIC,
                method: 'GET',
            }),
            providesTags: ['Bloggers'],
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
    useLazyGetRecipeQuery,
    useGetJuiciestRecipesQuery,
    useGetNewestRecipesQuery,
    useGetRecipeByCategoryQuery,
    useGetBloggersQuery,
    useToggleSubscriptionMutation,
    useGetBloggerQuery,
    useGetBloggerRecipesQuery,
    useGetMyProfileQuery,
    useGetMyStatisticQuery,
    useRecommendRecipeMutation,
} = recipeApi;
