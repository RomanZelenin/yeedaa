import {
    Box,
    Button,
    HStack,
    Image,
    SimpleGrid,
    Stack,
    Text,
    useBreakpointValue,
    VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import arrowRightIcon from '~/assets/icons/BsArrowRight.svg';
import { BlogCardWithRecipes } from '~/common/components/Cards/BlogCardWithRecipes';
import { BlogCardWithSubscribe } from '~/common/components/Cards/BlogCardWithSubscribe';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import { getJWTPayload } from '~/common/utils/getJWTPayload';
import { useGetBloggersQuery } from '~/query/create-bloggers-api';
import { BloggersResponse } from '~/query/types';
import { ApplicationRoute } from '~/router';
import { Error, setAppLoader, setNotification } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import { EmptyConatainer } from '../common/Containers/EmptyContainer';
import SectionNewRecipes from '../Home/Sections/SectionNewRecepies';

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
                        {bloggers.favorites?.length > 0 && (
                            <VStack
                                data-test-id='blogs-favorites-box'
                                bgColor='lime.300'
                                borderRadius='16px'
                                p={{ base: '12px', lg: '24px' }}
                                spacing='12px'
                                align='stretch'
                                mx={{ base: '16px', lg: '0px' }}
                            >
                                <HStack>
                                    <Text
                                        alignSelf='start'
                                        textStyle={{
                                            base: 'text2xlLh8Medium',
                                            lg: 'text4xlLh10Normal',
                                        }}
                                        flex={1}
                                    >
                                        {getString('featured-blogs')}
                                    </Text>
                                </HStack>
                                <VStack>
                                    <SimpleGrid
                                        width='100%'
                                        data-test-id='blogs-favorites-grid'
                                        columns={{ base: 1, md: 2 }}
                                        columnGap={{ base: '0px', md: '12px' }}
                                        rowGap='12px'
                                    >
                                        {bloggers.favorites?.map((it, i) => (
                                            <BlogCardWithRecipes key={i} blogger={it} />
                                        ))}
                                    </SimpleGrid>
                                </VStack>
                            </VStack>
                        )}
                        <VStack
                            data-test-id='blogs-others-box'
                            bgColor='blackAlpha.50'
                            borderRadius='16px'
                            p={{ base: '12px', lg: '24px' }}
                            spacing='12px'
                            align='stretch'
                            mx={{ base: '16px', lg: '0px' }}
                        >
                            <Stack>
                                <SimpleGrid
                                    data-test-id='blogs-others-grid'
                                    columns={{ base: 1, md: 2, xl: 3 }}
                                    columnGap={{ base: '0px', md: '12px' }}
                                    rowGap='12px'
                                >
                                    {bloggers.others?.map((it, i) => (
                                        <BlogCardWithSubscribe key={i} blogger={it} />
                                    ))}
                                </SimpleGrid>
                                <Button
                                    data-test-id='blogs-others-button'
                                    alignSelf='center'
                                    onClick={() => setLimit(limit === 'all' ? maxLimit : 'all')}
                                    fontSize='16px'
                                    color='black'
                                    variant='ghost'
                                    px='16px'
                                    mt={{ base: '12px', lg: '24px' }}
                                    leftIcon={
                                        limit === 'all' ? (
                                            <Image
                                                transform='rotate(180deg)'
                                                src={arrowRightIcon}
                                            />
                                        ) : undefined
                                    }
                                    rightIcon={
                                        limit !== 'all' ? <Image src={arrowRightIcon} /> : undefined
                                    }
                                >
                                    {limit === 'all'
                                        ? getString('collapse')
                                        : getString('all-authors')}
                                </Button>
                            </Stack>
                        </VStack>
                        <Box>
                            <SectionNewRecipes />
                        </Box>
                    </Stack>
                </>
            </EmptyConatainer>
        );
    }
};
