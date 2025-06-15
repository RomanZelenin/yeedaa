import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Center,
    Flex,
    HStack,
    Image,
    Spinner,
    Stack,
    Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { Blogger } from '~/app/pages/Home/Sections/SectionCookingBlogs';
import personCheckIcon from '~/assets/icons/person-check.svg';
import { getJWTPayload } from '~/common/utils/getJWTPayload';
import { useToggleSubscriptionMutation } from '~/query/create-bloggers-api';
import { ApplicationRoute } from '~/router';
import { Error, setNotification } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import { BookmarkIcon } from '../Icons/BookmarkIcon';
import { PersonsIcon } from '../Icons/PersonsIcon';
import { SubscribeIcon } from '../Icons/SubscribeIcon';
import { IconWithCounter } from './IconWithCounter';

export const BlogCardWithSubscribe = ({ blogger }: { blogger: Blogger }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [
        toggleSubscription,
        {
            isError: isErrorToggleSubscription,
            isLoading: isLoadingToggleSubscription,
            isSuccess: isSuccessToggleSubscription,
            error: errorToggleSubscription,
        },
    ] = useToggleSubscriptionMutation();

    const handleOnToggleSubscriprion = () => {
        toggleSubscription({
            fromUserId: getJWTPayload().userId,
            toUserId: blogger._id,
        });
    };

    useEffect(() => {
        if (isLoadingToggleSubscription) {
            setIsLoading(true);
        }
        if (isSuccessToggleSubscription) {
            setIsLoading(false);
        }
        if (isErrorToggleSubscription) {
            setIsLoading(false);
            dispatch(
                setNotification({
                    _id: crypto.randomUUID(),
                    title: Error.SERVER,
                    message: 'Попробуйте немного позже',
                    type: 'error',
                }),
            );
        }
    }, [
        isErrorToggleSubscription,
        isLoadingToggleSubscription,
        isSuccessToggleSubscription,
        errorToggleSubscription,
    ]);

    return (
        <Card
            as={Link}
            to={`${ApplicationRoute.BLOGS}/${blogger._id}`}
            p='16px'
            rowGap='16px'
            borderRadius='8px'
        >
            <CardHeader p={0}>
                <Flex alignItems='center' columnGap={{ base: '8px', md: '12px' }}>
                    <Avatar
                        size={{ base: 'base', md: 'md' }}
                        name={`${blogger?.firstName} ${blogger?.lastName}`}
                        src=''
                        boxSize={{ base: '32px', lg: '48px' }}
                    />
                    <Box minW={0}>
                        <Text textStyle='profileNameBlogCard' isTruncated textOverflow='ellipsis'>
                            {`${blogger?.firstName} ${blogger?.lastName}`}
                        </Text>
                        <Text textStyle='profileNicknameBlogCard' noOfLines={1}>
                            @{blogger?.login}
                        </Text>
                    </Box>
                </Flex>
            </CardHeader>
            <CardBody p={0} display='flex' flexDirection='column'>
                <Text textStyle='commentBlogCard' noOfLines={3} mb='16px' flex={1}>
                    {blogger.notes.at(0)?.text ?? ''}
                </Text>
                <Stack
                    direction={{ base: 'column-reverse', lg: 'row' }}
                    justify={{ lg: 'space-between' }}
                    alignItems={{ base: 'end', lg: 'start' }}
                >
                    <HStack>
                        {!blogger.isFavorite ? (
                            <Button
                                data-test-id='blog-toggle-subscribe'
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleOnToggleSubscriprion();
                                }}
                                h='24px'
                                leftIcon={<SubscribeIcon boxSize='12px' />}
                                variant='solid'
                                bgColor='black'
                                color='white'
                            >
                                <Text textStyle='textXsLh4Semibold'>Подписаться</Text>
                            </Button>
                        ) : (
                            <Button
                                data-test-id='blog-toggle-unsubscribe'
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleOnToggleSubscriprion();
                                }}
                                h='24px'
                                borderColor='blackAlpha.600'
                                leftIcon={<Image src={personCheckIcon} boxSize={{ xl: '12px' }} />}
                                variant='outline'
                                color='black'
                            >
                                <Text textStyle='textXsLh4Semibold'>Вы подписаны</Text>
                            </Button>
                        )}

                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(`${ApplicationRoute.BLOGS}/${blogger._id}#notes`);
                            }}
                            h='24px'
                            variant='outline'
                            borderColor='lime.600'
                        >
                            <Text textStyle='textXsLh4Semibold' color='lime.600'>
                                Читать
                            </Text>
                        </Button>
                    </HStack>
                    <HStack>
                        <IconWithCounter
                            icon={<BookmarkIcon boxSize='12px' />}
                            count={blogger.bookmarksCount}
                        />
                        <IconWithCounter
                            icon={<PersonsIcon fill='black' boxSize='12px' />}
                            count={blogger.subscribersCount}
                        />
                    </HStack>
                </Stack>
            </CardBody>
            {isLoading && (
                <Center
                    data-test-id='mobile-loader'
                    position='absolute'
                    width='206px'
                    top='50%'
                    left='50%'
                    transform='translate(-50%, -50%)'
                    boxSize='150px'
                    bgGradient='radial(30% 30% at 50% 50%, rgba(196, 255, 97, 0.7) 0%, rgba(255, 255, 255, 0) 100%) lime.50'
                >
                    <Spinner size='lg' boxSize='28px' minW={0} />
                </Center>
            )}
        </Card>
    );
};
