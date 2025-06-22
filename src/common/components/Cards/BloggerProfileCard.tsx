import { Avatar, Button, Image, Stack, Text, Tooltip } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import personCheckIcon from '~/assets/icons/person-check.svg';
import { getJWTPayload } from '~/common/utils/getJWTPayload';
import { useToggleSubscriptionMutation } from '~/query/create-recipe-api';
import { BloggerInfoResponse } from '~/query/types';
import { Error, setNotification } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import { BookmarkIcon } from '../Icons/BookmarkIcon';
import { PersonsIcon } from '../Icons/PersonsIcon';
import { SubscribeIcon } from '../Icons/SubscribeIcon';
import { CenteredLoader } from '../Loader/CenteredLoader';
import { IconWithCounter } from './IconWithCounter';

export const BloggerProfileCard = ({ blogger }: { blogger: BloggerInfoResponse }) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(blogger.isFavorite);
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
            toUserId: blogger.bloggerInfo._id,
        });
    };

    useEffect(() => {
        if (isLoadingToggleSubscription) {
            setIsLoading(true);
        }
        if (isSuccessToggleSubscription) {
            setIsLoading(false);
            setIsFavorite(!isFavorite);
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
                    name={`${blogger?.bloggerInfo.firstName} ${blogger?.bloggerInfo.lastName}`}
                    src={blogger.bloggerInfo.photoLink}
                    boxSize={{ base: '96px', lg: '128px' }}
                />
                <Stack justify='center' spacing='12px'>
                    <Text
                        data-test-id='blogger-user-info-name'
                        alignSelf={{ base: 'center', md: 'start' }}
                        textStyle={{ base: 'text2xlLh8Bold', lg: 'text5xlLhNoneBold' }}
                    >{`${blogger?.bloggerInfo.firstName} ${blogger?.bloggerInfo.lastName}`}</Text>
                    <Text
                        data-test-id='blogger-user-info-login'
                        alignSelf={{ base: 'center', md: 'start' }}
                        textStyle='profileNicknameBlogCard'
                        noOfLines={1}
                    >
                        @{blogger?.bloggerInfo.login}
                    </Text>
                    <Stack direction='row' alignSelf='stretch' justify='space-between'>
                        <Tooltip
                            data-test-id='blog-tooltip'
                            hasArrow
                            label={
                                !isFavorite
                                    ? 'Нажмите, если хотите подписаться'
                                    : 'Нажмите, если хотите отписаться'
                            }
                            bgColor='black'
                            borderRadius='6px'
                        >
                            <Button
                                data-test-id={
                                    !isFavorite
                                        ? 'blog-toggle-subscribe'
                                        : 'blog-toggle-unsubscribe'
                                }
                                onClick={handleOnToggleSubscriprion}
                                h='24px'
                                leftIcon={
                                    !isFavorite ? (
                                        <SubscribeIcon boxSize='12px' />
                                    ) : (
                                        <Image src={personCheckIcon} boxSize={{ xl: '12px' }} />
                                    )
                                }
                                variant={!isFavorite ? 'solid' : 'outline'}
                                bgColor={!isFavorite ? 'black' : 'white'}
                                color={!isFavorite ? 'white' : 'black'}
                                borderColor='blackAlpha.600'
                            >
                                <Text textStyle='textXsLh4Semibold'>
                                    {!isFavorite ? 'Подписаться' : 'Вы подписаны'}
                                </Text>
                            </Button>
                        </Tooltip>
                        <Stack direction='row' marginLeft='50px'>
                            <IconWithCounter
                                dataTestId='blogger-followers-bookmarks'
                                icon={<BookmarkIcon boxSize='12px' />}
                                count={blogger.totalBookmarks}
                            />
                            <IconWithCounter
                                dataTestId='blogger-followers-count'
                                icon={<PersonsIcon fill='black' boxSize='12px' />}
                                count={blogger.totalSubscribers}
                            />
                        </Stack>
                    </Stack>
                </Stack>
                {isLoading && <CenteredLoader />}
            </Stack>
        </>
    );
};
