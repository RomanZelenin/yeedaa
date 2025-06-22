import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Recipe } from '~/app/mocks/types/type_defenitions';
import { Note } from '~/app/pages/Home/Sections/SectionCookingBlogs';
import { ChangeProfilePasswordFormData } from '~/app/pages/ProfileSettings/Modal/ChangeProfilePasswordModal';
import { ProfileNameFormData } from '~/app/pages/ProfileSettings/Sections/HeaderProfileSettings';

import { API_BASE_URL, ApiEndpoints, IMAGE_BASE_URL } from './constants';
import {
    ActivityStats,
    BloggerInfoQuery,
    BloggerInfoResponse,
    BloggerRecipesResponse,
    BloggersQuery,
    BloggersResponse,
    BookmarkResponse,
    LoadPhotoResponse,
    PartialRecipeQuery,
    RecipeDraft,
    RecipesResponse,
    StatusResponse,
    ToggleSubscriptionQuery,
    UserProfile,
    UsersResponse,
} from './types';

export const recipeApi = createApi({
    reducerPath: 'recipeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${sessionStorage.getItem('access_token')}`);
        },
    }),
    tagTypes: ['Bloggers', 'Recipe', 'Note'],
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
            invalidatesTags: ['Bloggers'],
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
            invalidatesTags: ['Recipe', 'Bloggers'],
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
            transformResponse: (response) => {
                const bloggers = response as BloggersResponse;
                return {
                    favorites: bloggers.favorites?.map((it) => ({
                        ...it,
                        photoLink: IMAGE_BASE_URL + it.photoLink,
                    })),
                    others: bloggers.others?.map((it) => ({
                        ...it,
                        photoLink: IMAGE_BASE_URL + it.photoLink,
                    })),
                };
            },
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
            transformResponse: (response) => {
                const blogger = response as BloggerInfoResponse;
                if (blogger.bloggerInfo?.photoLink) {
                    return {
                        ...blogger,
                        bloggerInfo: {
                            ...blogger.bloggerInfo,
                            photoLink: IMAGE_BASE_URL + blogger.bloggerInfo.photoLink,
                        },
                    };
                }
                return blogger;
            },
            providesTags: ['Bloggers'],
        }),
        getBloggerRecipes: build.query<BloggerRecipesResponse, string>({
            query: (id) => ({
                url: `${ApiEndpoints.BLOGGER_RECIPES}/${id}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                const data = response as BloggerRecipesResponse;
                const recipes =
                    data.recipes?.map((recipe) => ({
                        ...recipe,
                        image: IMAGE_BASE_URL + recipe.image,
                    })) ?? [];

                const myBookmarks =
                    data.myBookmarks?.map((recipe) => {
                        const image = URL.parse(recipe.image)?.pathname;
                        return {
                            ...recipe,
                            image:
                                image === undefined ? IMAGE_BASE_URL + recipe.image : recipe.image, //Дополнительная проверка т.к иногда приходит полный путь вместе с host
                        };
                    }) ?? [];
                return { ...data, recipes: recipes, myBookmarks: myBookmarks };
            },
            providesTags: ['Bloggers', 'Note'],
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
            transformResponse: (response) => {
                const profile = response as UserProfile;
                return {
                    ...profile,
                    photoLink: IMAGE_BASE_URL + profile.photoLink,
                    drafts: profile.drafts.map((it) => ({ ...it, path: `/edit-draft/${it._id}` })),
                };
            },
            providesTags: ['Bloggers'],
        }),

        updateProfileName: build.mutation<StatusResponse, ProfileNameFormData>({
            query: (body) => ({
                url: `${ApiEndpoints.UPDATE_PROFILE_NAME}`,
                method: 'PATCH',
                body: body,
            }),
            invalidatesTags: ['Bloggers', 'Recipe'],
        }),

        updateProfilePassword: build.mutation<StatusResponse, ChangeProfilePasswordFormData>({
            query: (body) => ({
                url: `${ApiEndpoints.UPDATE_PROFILE_PASSWORD}`,
                method: 'PATCH',
                body: { password: body.password, newPassword: body.newPassword },
            }),
            invalidatesTags: ['Bloggers', 'Recipe'],
        }),

        getMyStatistic: build.query<StatusResponse | ActivityStats, void>({
            query: () => ({
                url: ApiEndpoints.MY_STATISTIC,
                method: 'GET',
            }),
            transformResponse: (response) => {
                const stats = response as ActivityStats;
                return {
                    ...stats,
                    recipesWithRecommendations:
                        stats.recipesWithRecommendations?.map((it) => ({
                            ...it,
                            image: IMAGE_BASE_URL + it.image,
                        })) ?? [],
                };
            },
            providesTags: ['Bloggers'],
        }),

        createNote: build.mutation<StatusResponse | Note, string>({
            query: (text) => ({
                url: `${ApiEndpoints.NOTE}`,
                method: 'POST',
                body: { text },
            }),
            transformResponse: (response) => {
                const note = response as Note;
                new Date(note.date);
                return { ...note, date: new Date().toUTCString() };
            },
            invalidatesTags: ['Note'],
        }),

        deleteNote: build.mutation<StatusResponse | Note, string>({
            query: (id) => ({
                url: `${ApiEndpoints.NOTE}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Note'],
        }),

        getAllUsers: build.query<StatusResponse | UsersResponse, void>({
            query: () => ({
                url: ApiEndpoints.ALL_USERS,
                method: 'GET',
            }),
            transformResponse: (response) => {
                const profiles = response as UsersResponse;
                return profiles.map((it) => ({
                    ...it,
                    photo: IMAGE_BASE_URL + it.photo,
                })) as UsersResponse;
            },
            /*  providesTags: ['Bloggers'], */
        }),

        loadPhoto: build.mutation<StatusResponse | LoadPhotoResponse, FormData>({
            query: (data) => ({
                url: `${ApiEndpoints.UPLOAD_PHOTO}`,
                method: 'post',
                body: data,
            }),

            invalidatesTags: ['Bloggers'],
        }),

        deleteProfile: build.mutation<StatusResponse | LoadPhotoResponse, void>({
            query: () => ({
                url: `${ApiEndpoints.PROFILE}`,
                method: 'delete',
            }),
            invalidatesTags: ['Bloggers', 'Note', 'Recipe'],
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
    useLazyGetRecipeByIdQuery,
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
    useCreateNoteMutation,
    useDeleteNoteMutation,
    useUpdateProfileNameMutation,
    useUpdateProfilePasswordMutation,
    useGetAllUsersQuery,
    useLoadPhotoMutation,
    useDeleteProfileMutation,
} = recipeApi;
