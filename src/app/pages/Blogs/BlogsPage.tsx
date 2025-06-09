import { Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import { getJWTPayload } from '~/common/utils/getJWTPayload';
import { useGetBloggersQuery } from '~/query/create-bloggers-api';
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

    const { isSuccess, isLoading, isError, data } = useGetBloggersQuery({
        currentUserId: getJWTPayload().userId,
        limit: limit,
    });

    if (isLoading) {
        dispatch(setAppLoader(true));
        return null;
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
        return null;
    }

    if (isSuccess) {
        const bloggers = data as BloggersResponse;
        const isShowFavoritesBlogs = bloggers.favorites?.length > 0;
        dispatch(setAppLoader(false));
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
                        <OtherBlogs
                            limit={limit}
                            bloggers={bloggers.others}
                            onClick={() => setLimit(limit === 'all' ? maxLimit : 'all')}
                        />
                        <SectionNewRecipes />
                    </Stack>
                </>
            </EmptyConatainer>
        );
    }
};
