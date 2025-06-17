import { Avatar, Button, Center, Image, Spinner, Stack, Text, Tooltip } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { Blogger } from '~/app/pages/Home/Sections/SectionCookingBlogs';
import personCheckIcon from '~/assets/icons/person-check.svg';
import { getJWTPayload } from '~/common/utils/getJWTPayload';
import { useToggleSubscriptionMutation } from '~/query/create-recipe-api';
import { Error, setNotification } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import { BookmarkIcon } from '../Icons/BookmarkIcon';
import { PersonsIcon } from '../Icons/PersonsIcon';
import { SubscribeIcon } from '../Icons/SubscribeIcon';
import { IconWithCounter } from './IconWithCounter';

export const BloggerProfileCard = ({ blogger }: { blogger: Blogger }) => {
    const dispatch = useAppDispatch();
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
        <>
            <Stack
                position='relative'
                data-test-id='blogger-user-info-box'
                direction={{ base: 'column', md: 'row' }}
                gap='24px'
                align='stretch'
                justify={{ md: 'center' }}
            >
                <Avatar
                    alignSelf='center'
                    size={{ base: 'base', md: 'lg', xl: 'xl' }}
                    name={`${blogger?.firstName} ${blogger?.lastName}`}
                    src=''
                    boxSize={{ base: '96px', lg: '128px' }}
                />
                <Stack justify='center' spacing='12px'>
                    <Text
                        data-test-id='blogger-user-info-name'
                        alignSelf={{ base: 'center', md: 'start' }}
                        textStyle={{ base: 'text2xlLh8Bold', lg: 'text5xlLhNoneBold' }}
                    >{`${blogger?.firstName} ${blogger?.lastName}`}</Text>
                    <Text
                        data-test-id='blogger-user-info-login'
                        alignSelf={{ base: 'center', md: 'start' }}
                        textStyle='profileNicknameBlogCard'
                        noOfLines={1}
                    >
                        @{blogger?.login}
                    </Text>
                    <Stack direction='row' alignSelf='stretch' justify='space-between'>
                        {!blogger.isFavorite ? (
                            <Tooltip
                                data-test-id='blog-tooltip'
                                hasArrow
                                label='Нажмите, если хотите подписаться'
                                bgColor='black'
                                borderRadius='6px'
                            >
                                <Button
                                    data-test-id='blog-toggle-subscribe'
                                    onClick={handleOnToggleSubscriprion}
                                    h='24px'
                                    leftIcon={<SubscribeIcon boxSize='12px' />}
                                    variant='solid'
                                    bgColor='black'
                                    color='white'
                                >
                                    <Text textStyle='textXsLh4Semibold'>Подписаться</Text>
                                </Button>
                            </Tooltip>
                        ) : (
                            <Tooltip
                                data-test-id='blog-tooltip'
                                hasArrow
                                label='Нажмите, если хотите отписаться'
                                bgColor='black'
                                borderRadius='6px'
                            >
                                <Button
                                    data-test-id='blog-toggle-unsubscribe'
                                    onClick={handleOnToggleSubscriprion}
                                    h='24px'
                                    borderColor='blackAlpha.600'
                                    leftIcon={
                                        <Image src={personCheckIcon} boxSize={{ xl: '12px' }} />
                                    }
                                    variant='outline'
                                    color='black'
                                >
                                    <Text textStyle='textXsLh4Semibold'>Вы подписаны</Text>
                                </Button>
                            </Tooltip>
                        )}

                        <Stack direction='row' marginLeft='50px'>
                            <IconWithCounter
                                dataTestId='blogger-followers-bookmarks'
                                icon={<BookmarkIcon boxSize='12px' />}
                                count={blogger.bookmarksCount}
                            />
                            <IconWithCounter
                                dataTestId='blogger-followers-count'
                                icon={<PersonsIcon fill='black' boxSize='12px' />}
                                count={blogger.subscribersCount}
                            />
                        </Stack>
                    </Stack>
                </Stack>
                {isLoading && (
                    <Center
                        data-test-id='mobile-loader'
                        position='absolute'
                        width='206px'
                        top='50%'
                        left='50%'
                        transform='translate(-50%, -50%)'
                        boxSize='100px'
                        bgGradient='radial(30% 30% at 50% 50%, rgba(196, 255, 97, 0.7) 0%, rgba(255, 255, 255, 0) 100%) lime.50'
                    >
                        <Spinner size='lg' boxSize='28px' minW={0} />
                    </Center>
                )}
            </Stack>
        </>
    );
};
