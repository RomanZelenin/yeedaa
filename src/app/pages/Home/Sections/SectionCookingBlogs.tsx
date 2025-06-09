import { Button, HStack, Image, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router';

import arrowRightIcon from '~/assets/icons/BsArrowRight.svg';
import { BlogCard } from '~/common/components/Cards/BlogCard';
import { getJWTPayload } from '~/common/utils/getJWTPayload';
import { useGetBloggersQuery } from '~/query/create-bloggers-api';
import { BloggersResponse } from '~/query/types';
import { ApplicationRoute } from '~/router';
import { Error, setBloggersLoader, setNotification } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

export type Blogger = {
    _id: string;
    firstName: string;
    lastName: string;
    login: string;
    subscribersCount: number;
    bookmarksCount: number;
    isFavorite: boolean;
    notes: Note[];
    newRecipesCount: number;
};

export type Note = {
    _id: string;
    date: string;
    text: string;
};

export default function SectionCookingBlogs() {
    const dispatch = useAppDispatch();
    const { isSuccess, isLoading, isError, data } = useGetBloggersQuery({
        currentUserId: getJWTPayload().userId,
        limit: '',
    });

    if (isLoading) {
        dispatch(setBloggersLoader(true));
        return null;
    }

    if (isError) {
        dispatch(setBloggersLoader(false));
        dispatch(
            setNotification({
                _id: crypto.randomUUID(),
                title: Error.SERVER,
                message: 'Попробуйте немного позже.',
                type: 'error',
            }),
        );
        return null;
    }

    if (isSuccess) {
        const bloggers = data as BloggersResponse;
        dispatch(setBloggersLoader(false));
        return (
            <VStack
                data-test-id='main-page-blogs-box'
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
                        fontSize={{ base: '24px', lg: '30px', xl: '36px' }}
                        fontWeight='500'
                        lineHeight='32px'
                        flex={1}
                    >
                        Кулинарные блоги
                    </Text>
                    <Button
                        data-test-id='main-page-blogs-button'
                        as={Link}
                        to={ApplicationRoute.BLOGS}
                        display={{ base: 'none', lg: 'inline-flex' }}
                        fontSize='16px'
                        color='black'
                        variant='ghost'
                        px='16px'
                        py='8px'
                        rightIcon={<Image src={arrowRightIcon} />}
                    >
                        Все авторы
                    </Button>
                </HStack>
                <Stack>
                    <SimpleGrid
                        data-test-id='main-page-blogs-grid'
                        columns={{ base: 1, md: 3 }}
                        columnGap={{ base: '0px', md: '12px' }}
                        rowGap='12px'
                    >
                        {bloggers.others?.map((it, i) => <BlogCard key={i} blogger={it} />)}
                    </SimpleGrid>
                    <Button
                        as={Link}
                        to={ApplicationRoute.BLOGS}
                        alignSelf='center'
                        display={{ base: 'inline-flex', lg: 'none' }}
                        fontSize='16px'
                        color='black'
                        variant='ghost'
                        flex={1}
                        px='16px'
                        py='8px'
                        rightIcon={<Image src={arrowRightIcon} boxSize='16px' />}
                    >
                        Все авторы
                    </Button>
                </Stack>
            </VStack>
        );
    }
}
