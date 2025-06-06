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
import { BlogCardWithRecipes, BlogCardWithSubscribe } from '~/common/components/Cards/BlogCard';
import { getJWTPayload } from '~/common/utils/getJWTPayload';
import { useGetBloggersQuery } from '~/query/create-bloggers-api';
import { BloggersResponse } from '~/query/types';
import { Error, setAppLoader, setNotification } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import { EmptyConatainer } from '../common/Containers/EmptyContainer';
import SectionNewRecipes from '../Home/Sections/SectionNewRecepies';

export const BlogsPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const maxLimit = useBreakpointValue({ base: '8', xl: '9' });
    const [limit, setLimit] = useState(maxLimit);
    useEffect(() => {
        setLimit(maxLimit);
    }, [maxLimit]);

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
        navigate('/', { replace: true });
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
                        Кулинарные блоги
                    </Text>
                    <Stack gap={{ base: '32px', lg: '40px' }}>
                        {bloggers.favorites?.length > 0 && (
                            <VStack
                                data-test-id='blogs-favorites-box'
                                bgColor='lime.300'
                                borderRadius='16px'
                                p='12px'
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
                                        Избранные блоги
                                    </Text>
                                </HStack>
                                <VStack>
                                    <SimpleGrid
                                        data-test-id='blogs-favorites-grid'
                                        columns={{ base: 1, md: 3 }}
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
                            p='12px'
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
                                    onClick={() => {
                                        setLimit(limit === 'all' ? maxLimit : 'all');
                                    }}
                                    fontSize='16px'
                                    color='black'
                                    variant='ghost'
                                    px='16px'
                                    py='8px'
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
                                    {limit === 'all' ? 'Свернуть' : 'Все авторы'}
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
