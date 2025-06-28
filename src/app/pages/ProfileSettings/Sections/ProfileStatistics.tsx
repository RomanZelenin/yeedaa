import {
    Avatar,
    Box,
    Button,
    Card,
    CardHeader,
    HStack,
    Image,
    SimpleGrid,
    Stack,
    Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import { Recipe } from '~/app/mocks/types/type_defenitions';
import bookmarkIcon from '~/assets/icons/fill-bookmark.svg';
import likeIcon from '~/assets/icons/fill-like.svg';
import personsIcon from '~/assets/icons/persons.svg';
import recommededIcon from '~/assets/icons/recommend.svg';
import recommendRecipeImage from '~/assets/images/recommend-recipe.png';
import { IconWithCounter } from '~/common/components/Cards/IconWithCounter';
import { BookmarkIcon } from '~/common/components/Icons/BookmarkIcon';
import { PersonsIcon } from '~/common/components/Icons/PersonsIcon';
import { RecommendIcon } from '~/common/components/Icons/RecommendIcon';
import { CenteredLoader } from '~/common/components/Loader/CenteredLoader';
import { RecipeCollection } from '~/common/components/RecipeCollection/RecipeCollection';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import { useGetProfileActivity } from '~/common/hooks/useGetProfileActivity';
import { useMapRecipesToCategoryPaths } from '~/common/hooks/useMapRecipesToCategoryPaths';
import { getMapCountToWeek } from '~/common/utils/getMapCountToWeek';
import { useGetAllUsersQuery } from '~/query/create-recipe-api';
import { StatsItem, User, UsersResponse } from '~/query/types';
import { isShowRecommendSelector, MyProfile } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

export const ProfileStatistics = ({ profile }: { profile: MyProfile }) => {
    const { bookmarks, likes, recommendations, subscribers } = useGetProfileActivity(profile);
    const isShowRecommendations = useAppSelector(isShowRecommendSelector);

    return (
        <>
            <Stack>
                <Text textStyle='textLgLh7Bold'>Статистика</Text>
                <Stack rowGap='16px'>
                    <Subscribers idsSubscribers={profile.profileInfo!.subscribers} />
                    <Bookmarks count={bookmarks} stats={profile.statistic?.bookmarks ?? []} />
                    <Likes count={likes} stats={profile.statistic?.likes ?? []} />
                    {isShowRecommendations && (
                        <Recommended
                            recipes={profile.statistic!.recipesWithRecommendations}
                            countRecommended={recommendations}
                            countBookmarks={bookmarks}
                            countSubscribers={subscribers}
                        />
                    )}
                </Stack>
            </Stack>
        </>
    );
};

const Subscribers = ({ idsSubscribers }: { idsSubscribers: string[] }) => {
    const { isError, isLoading, isSuccess, data: allUsers } = useGetAllUsersQuery();
    const [subscribers, setSubscribers] = useState<User[]>([]);
    const countSubscribers = subscribers.length;

    useEffect(() => {
        if (isSuccess) {
            setSubscribers(
                (allUsers as UsersResponse).filter((it) => idsSubscribers.includes(it.id)),
            );
        }
    }, [isError, isLoading, isSuccess, allUsers]);

    return (
        <>
            <HStack>
                <Image src={personsIcon} boxSize='12px' />
                <Text textStyle='textXsLh4Semibold' color='lime.600'>
                    {countSubscribers === 1
                        ? `${countSubscribers} подписчик`
                        : countSubscribers > 1 && countSubscribers < 5
                          ? `${countSubscribers} подписчика`
                          : `${countSubscribers} подписчиков`}
                </Text>
            </HStack>
            <SimpleGrid
                position='relative'
                columns={{ base: 1, md: 2, xl: 3 }}
                rowGap='12px'
                columnGap='12px'
            >
                {subscribers.map((user) => (
                    <>
                        <Card>
                            <CardHeader>
                                <HStack>
                                    <Avatar
                                        src={user.photo}
                                        name={`${user.firstName} ${user.lastName}`}
                                        boxSize='48px'
                                    />
                                    <Stack gap={0}>
                                        <Text textStyle='textLgLh7Medium'>{`${user.firstName} ${user.lastName}`}</Text>
                                        <Text
                                            textStyle='textSmLh5Normal'
                                            color='blackAlpha.700'
                                        >{`@${user.login}`}</Text>
                                    </Stack>
                                </HStack>
                            </CardHeader>
                        </Card>
                    </>
                ))}
                {isLoading && <CenteredLoader />}
            </SimpleGrid>
        </>
    );
};

const Bookmarks = ({ count, stats }: { count: number; stats: StatsItem[] }) => {
    const data = getMapCountToWeek(stats);
    return (
        <>
            <HStack>
                <Image src={bookmarkIcon} boxSize='12px' />
                <Text textStyle='textXsLh4Semibold' color='lime.600'>
                    {count === 1
                        ? `${count} сохранение`
                        : count > 1 && count < 5
                          ? `${count} сохранения`
                          : `${count} сохранений`}
                </Text>
            </HStack>
            <Box overflowX='auto'>
                <LineChart
                    width={1090}
                    height={300}
                    data={data}
                    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                    <Line strokeWidth='2px' type='linear' dataKey='count' stroke='#2DB100' />
                    <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
                    <XAxis dataKey='date' />
                    <YAxis />
                </LineChart>
            </Box>
        </>
    );
};

const Likes = ({ count, stats }: { count: number; stats: StatsItem[] }) => {
    const data = getMapCountToWeek(stats);
    return (
        <>
            <HStack>
                <Image src={likeIcon} boxSize='12px' />
                <Text textStyle='textXsLh4Semibold' color='lime.600'>
                    {count === 1
                        ? `${count} лайк`
                        : count > 1 && count < 5
                          ? `${count} лайка`
                          : `${count} лайков`}
                </Text>
            </HStack>
            <Box overflowX='auto'>
                <AreaChart
                    width={1090}
                    height={300}
                    data={data}
                    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                    <Area
                        type='linear'
                        dataKey='count'
                        strokeWidth='2px'
                        stroke='#8884d8'
                        fill='#8884d8'
                        fillOpacity='8%'
                    />
                    <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
                    <XAxis dataKey='date' />
                    <YAxis />
                </AreaChart>
            </Box>
        </>
    );
};

const Recommended = ({
    countRecommended,
    countBookmarks,
    countSubscribers,
    recipes,
}: {
    recipes: Recipe[];
    countRecommended: number;
    countBookmarks: number;
    countSubscribers: number;
}) => {
    const { getString } = useResource();
    const recipesWithPaths = useMapRecipesToCategoryPaths(recipes);
    return (
        <Box data-test-id='settings-recommendation-info-block'>
            <Stack
                maxW='1090px'
                align='start'
                direction={{ base: 'column', md: 'row' }}
                bgColor='lime.150'
                borderRadius='16px'
                p='16px'
                gap={{ base: '24px', md: '32px' }}
            >
                <Image
                    alignSelf={{ base: 'center' }}
                    bgColor='transparent'
                    src={recommendRecipeImage}
                    boxSize={{ base: '108px', lg: '206px' }}
                />
                <Stack
                    align='start'
                    alignSelf='stretch'
                    spacing={{ base: '24px', xl: '32px' }}
                    maxWidth={{ md: '384px', lg: '462px', xl: '560px' }}
                >
                    <Text textStyle={{ base: 'textXlLh7Semibold', lg: 'text4xlLh10Semibold' }}>
                        Теперь вы можете рекомендовать рецепты других авторов
                    </Text>

                    <Stack direction={{ base: 'column', xl: 'row' }}>
                        <Text textStyle='textMdLh6Medium'>
                            Это можно будет сделать с помощью кнопки
                        </Text>
                        <Button
                            cursor='auto'
                            _hover={{ bgColor: 'black' }}
                            alignSelf='start'
                            h='24px'
                            borderColor='blackAlpha.600'
                            borderRadius='6px'
                            bgColor='black'
                            color='white'
                            leftIcon={<RecommendIcon fill='white' boxSize='12px' />}
                        >
                            <Text textStyle='textXsLh4Semibold'>
                                {getString('recommend-recipe')}
                            </Text>
                        </Button>
                    </Stack>
                </Stack>
                <HStack
                    flex={1}
                    justify='end'
                    position={{ base: 'absolute', md: 'inherit' }}
                    right='16px'
                >
                    <IconWithCounter
                        icon={<BookmarkIcon fill='black' boxSize='12px' />}
                        count={countBookmarks}
                    />
                    <IconWithCounter
                        icon={<PersonsIcon fill='black' boxSize='12px' />}
                        count={countSubscribers}
                    />
                </HStack>
            </Stack>
            <HStack mt='16px' mb='16px'>
                <Image src={recommededIcon} boxSize='12px' />
                <Text textStyle='textXsLh4Semibold' color='lime.600'>
                    {countRecommended === 1
                        ? `${countRecommended} рекомендованный рецепт`
                        : countRecommended > 1 && countRecommended < 5
                          ? `${countRecommended} рекомендованных рецепта`
                          : `${countRecommended} рекомендованных рецептов`}
                </Text>
            </HStack>
            <RecipeCollection recipes={recipesWithPaths} />
        </Box>
    );
};
