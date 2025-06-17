import {
    Avatar,
    Button,
    Card,
    CardBody,
    Center,
    Flex,
    HStack,
    Image,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import personCheckIcon from '~/assets/icons/person-check.svg';
import subscribeIcon from '~/assets/icons/subscribe.svg';
import { getJWTPayload } from '~/common/utils/getJWTPayload';
import { useToggleSubscriptionMutation } from '~/query/create-recipe-api';
import { UserProfile } from '~/query/types';
import { Error, setNotification } from '~/store/app-slice';

import { PersonsIcon } from '../Icons/PersonsIcon';
import { useResource } from '../ResourceContext/ResourceContext';
import { IconWithCounter } from './IconWithCounter';

export const AuthorRecipeCard = ({
    profile,
    isSubscribe,
}: {
    profile: UserProfile;
    isSubscribe: boolean;
}) => {
    const { getString } = useResource();
    const dispatch = useDispatch();
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
            toUserId: profile._id!,
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
            <Card overflow='clip' flex={1} bgColor='lime.300' borderRadius='8px'>
                <CardBody p={{ base: '8px', md: '24px' }}>
                    <Flex columnGap={{ base: '8px', md: '16px' }} align='center'>
                        <Avatar
                            src='#'
                            name={`${profile?.firstName} ${profile?.lastName}`}
                            boxSize='96px'
                        />
                        <VStack spacing={0} align='start' flex={1}>
                            <Text textStyle='textXsLh4Normal' alignSelf='end'>
                                {getString('author-of-recipe')}
                            </Text>
                            <Text textStyle={{ base: 'textLgLh7Semibold', md: 'text2xlLh8Bold' }}>
                                {profile?.firstName} {profile?.lastName}
                            </Text>
                            <Text textStyle='textSmLh5' color='blackAlpha.700'>
                                @{profile?.login}
                            </Text>
                            <HStack
                                flex={1}
                                width='100%'
                                justify='space-between'
                                mt={{ base: '16px' }}
                            >
                                {!isSubscribe ? (
                                    <Button
                                        onClick={handleOnToggleSubscriprion}
                                        borderRadius='6px'
                                        bgColor='blackAlpha.900'
                                        p='8px'
                                        leftIcon={
                                            <Image src={subscribeIcon} boxSize={{ xl: '16px' }} />
                                        }
                                        h={{ base: '24px', lg: '32px', xl: '48px' }}
                                    >
                                        <Text
                                            color='white'
                                            textStyle={{
                                                base: 'textXsLh4Semibold',
                                                lg: 'textSmLh5Semibold',
                                                xl: 'textLgLh7Semibold',
                                            }}
                                        >
                                            {getString('subscribe')}
                                        </Text>
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleOnToggleSubscriprion}
                                        borderColor='blackAlpha.600'
                                        variant='outline'
                                        borderRadius='6px'
                                        p='8px'
                                        leftIcon={
                                            <Image src={personCheckIcon} boxSize={{ xl: '16px' }} />
                                        }
                                        h={{ base: '24px', lg: '32px', xl: '48px' }}
                                    >
                                        <Text
                                            color='black'
                                            textStyle={{
                                                base: 'textXsLh4Semibold',
                                                lg: 'textSmLh5Semibold',
                                                xl: 'textLgLh7Semibold',
                                            }}
                                        >
                                            Вы подписаны
                                        </Text>
                                    </Button>
                                )}

                                <IconWithCounter
                                    icon={<PersonsIcon fill='black' boxSize='12px' />}
                                    count={profile?.subscribers.length ?? 0}
                                />
                            </HStack>
                        </VStack>
                    </Flex>
                </CardBody>
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
            </Card>
        </>
    );
};
