import { Box, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import { getJWTPayload } from '~/common/utils/getJWTPayload';
import { useGetBloggersQuery } from '~/query/create-recipe-api';
import { BloggersResponse } from '~/query/types';
import { ApplicationRoute } from '~/router';
import { Error, setAppLoader, setNotification } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import { EmptyConatainer } from '../common/Containers/EmptyContainer';
import SectionNewRecipes from '../Home/Sections/SectionNewRecepies';
import { FavoritesBlogs } from './Sections/FavoritesBlogs';
import { OtherBlogs } from './Sections/OtherBlogs';

export const BlogsPage = () => {
    const { getString } = useResource();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const maxLimit = useBreakpointValue({ base: '8', xl: '9' });
    const [limit, setLimit] = useState(maxLimit);
    useEffect(() => setLimit(maxLimit), [maxLimit]);

    const { isSuccess, isLoading, isError, data, isFetching } = useGetBloggersQuery({
        currentUserId: getJWTPayload().userId,
        limit: limit,
    });

    useEffect(() => {
        if (isLoading) {
            dispatch(setAppLoader(true));
        }
        if (isError) {
            dispatch(setAppLoader(false));
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
        if (isSuccess) {
            dispatch(setAppLoader(false));
        }
    }, [isLoading, isError, isSuccess]);

    /* if (isLoading) {
        return null;
    } */

    if (isError) {
        return null;
    }

    if (isSuccess) {
        const bloggers = data as BloggersResponse;
        const isShowFavoritesBlogs = bloggers.favorites?.length > 0;
        return (
            <EmptyConatainer>
                <>
                    <Text
                        textAlign='center'
                        textStyle={{ base: 'text2xlLh8Bold', lg: 'text5xlLhNoneBold' }}
                        mb='24px'
                    >
                        {getString('culinary-blogs')}
                    </Text>
                    <Stack gap={{ base: '32px', lg: '40px' }}>
                        {isShowFavoritesBlogs && <FavoritesBlogs bloggers={bloggers.favorites} />}
                        <Box filter={isFetching ? 'blur(2px)' : 'none'}>
                            <OtherBlogs
                                limit={limit}
                                bloggers={bloggers.others}
                                onClick={() => setLimit(limit === 'all' ? maxLimit : 'all')}
                            />
                        </Box>
                        <SectionNewRecipes />
                    </Stack>
                </>
            </EmptyConatainer>
        );
    }
};
