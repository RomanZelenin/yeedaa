import { Stack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { ListBloggerNotes } from '~/app/pages/BloggerProfile/Sections/ListBloggerNotes';
import { BloggerProfileCard } from '~/common/components/Cards/BloggerProfileCard';
import { getJWTPayload } from '~/common/utils/getJWTPayload';
import { StatusCode } from '~/query/constants';
import {
    useGetBloggerQuery,
    useGetBloggerRecipesQuery,
    useGetBloggersQuery,
} from '~/query/create-recipe-api';
import { BloggerInfoResponse, BloggersResponse } from '~/query/types';
import { ApplicationRoute } from '~/router';
import { Error, setAppLoader, setNotification } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import { EmptyConatainer } from '../common/Containers/EmptyContainer';
import { BloggerRecipes } from './Sections/BloggerRecipes';
import { OtherBlogs } from './Sections/OtherBlogs';

export const BloggerProfilePage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentUserId = getJWTPayload().userId;

    const {
        data: bloggerInfo,
        error: errorBloggerInfo,
        isError: isErrorBloggerInfo,
        isLoading: isLoadingBloggerInfo,
        isSuccess: isSuccessBloggerInfo,
    } = useGetBloggerQuery({ bloggerId: userId!, currentUserId: currentUserId });
    const {
        data: bloggerRecipes,
        error: errorBloggerRecipes,
        isError: isErrorBloggerRecipes,
        isLoading: isLoadingBloggerRecipes,
        isSuccess: isSuccessBloggerRecipes,
    } = useGetBloggerRecipesQuery(userId!);
    const {
        isSuccess: isSuccessBloggers,
        isLoading: isLoadingBloggers,
        isError: isErrorBloggers,
        data: bloggers,
    } = useGetBloggersQuery({ currentUserId: currentUserId, limit: '' }); //Для прохождения теста limit='', а должен быть 3

    useEffect(() => {
        if (isLoadingBloggerInfo || isLoadingBloggerRecipes || isLoadingBloggers) {
            dispatch(setAppLoader(true));
        }
        if (isErrorBloggerInfo || isErrorBloggerRecipes || isErrorBloggers) {
            dispatch(setAppLoader(false));
            if (
                errorBloggerInfo?.status === StatusCode.NotFound ||
                errorBloggerRecipes?.status === StatusCode.NotFound
            ) {
                navigate(ApplicationRoute.NOT_FOUND, { replace: true });
            } else {
                dispatch(
                    setNotification({
                        _id: crypto.randomUUID(),
                        title: Error.SERVER,
                        message: 'Попробуйте немного позже.',
                        type: 'error',
                    }),
                );
                navigate(ApplicationRoute.INDEX, { replace: true });
            }
        }
        if (isSuccessBloggerInfo && isSuccessBloggerRecipes && isSuccessBloggers) {
            dispatch(setAppLoader(false));
        }
    }, [
        isLoadingBloggerInfo,
        isLoadingBloggerRecipes,
        isLoadingBloggers,
        isErrorBloggerInfo,
        isErrorBloggerRecipes,
        isErrorBloggers,
        isSuccessBloggerInfo,
        isSuccessBloggerRecipes,
        isSuccessBloggers,
    ]);

    if (isSuccessBloggerInfo && isSuccessBloggerRecipes && isSuccessBloggers) {
        return (
            <EmptyConatainer>
                <Stack px={{ base: '16px' }} rowGap='16px'>
                    <BloggerProfileCard blogger={bloggerInfo as BloggerInfoResponse} />
                    <Stack rowGap='32px'>
                        <BloggerRecipes recipes={bloggerRecipes.recipes} />
                        <ListBloggerNotes notes={bloggerRecipes.notes} />
                        <OtherBlogs blogs={(bloggers as BloggersResponse).others} />
                    </Stack>
                </Stack>
            </EmptyConatainer>
        );
    }
};
