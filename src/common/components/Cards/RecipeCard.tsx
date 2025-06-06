import {
    Button,
    Flex,
    HStack,
    IconButton,
    Image,
    Stack,
    Tag,
    TagLabel,
    Text,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router';

import { Recipe } from '~/app/mocks/types/type_defenitions';
import alarmIcon from '~/assets/icons/alarm.svg';
import bookmarkIcon from '~/assets/icons/bookmark.svg';
import likeIcon from '~/assets/icons/like.svg';
import { useGetFilteredCategoriesBySubcatigoriesId } from '~/common/hooks/useGetFilteredCategoriesBySubcatigoriesId';
import { getJWTPayload } from '~/common/utils/getJWTPayload';
import { StatusCode } from '~/query/constants';
import {
    useBookmarkRecipeMutation,
    useDeleteRecipeMutation,
    useLikeRecipeMutation,
} from '~/query/create-recipe-api';
import { StatusResponse } from '~/query/types';
import { ApplicationRoute } from '~/router';
import { Error, setAppLoader, setNotification } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import { Fallback } from '../Fallback/Fallback';
import { BasketIcon } from '../Icons/BasketIcon';
import { BookmarkIcon } from '../Icons/BookmarkIcon';
import { LikeIcon } from '../Icons/LikeIcon';
import { PersonsIcon } from '../Icons/PersonsIcon';
import { WriteLineIcon } from '../Icons/WriteLineIcon';
import { useResource } from '../ResourceContext/ResourceContext';
import { IconWithCounter } from './IconWithCounter';

export const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
    const { getString } = useResource();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { categories } = useGetFilteredCategoriesBySubcatigoriesId(recipe.categoriesIds);
    const isRecipeOwner = getJWTPayload().userId === recipe.authorId;
    const [deleteRecipe] = useDeleteRecipeMutation();
    const [likeRecipe] = useLikeRecipeMutation();
    const [bookmarkRecipe] = useBookmarkRecipeMutation();

    const handleOnDeleteRecipeError = (response?: StatusResponse) => {
        switch (response?.status) {
            case StatusCode.InternalServerError:
                dispatch(
                    setNotification({
                        _id: crypto.randomUUID(),
                        title: Error.SERVER,
                        message: 'Не удалось удалить рецепт',
                        type: 'error',
                    }),
                );
                break;
            default:
                dispatch(
                    setNotification({
                        _id: crypto.randomUUID(),
                        title: response?.data.error ?? '',
                        message: response?.data.message,
                        type: 'error',
                    }),
                );
        }
    };
    const handleOnDeleteRecipe = async () => {
        try {
            dispatch(setAppLoader(true));
            await deleteRecipe(recipe._id).unwrap();
            dispatch(
                setNotification({
                    _id: crypto.randomUUID(),
                    title: 'Рецепт успешно удален',
                    type: 'success',
                }),
            );
            navigate(ApplicationRoute.INDEX, { replace: true });
        } catch (e) {
            handleOnDeleteRecipeError(e as StatusResponse);
        } finally {
            dispatch(setAppLoader(false));
        }
    };

    const handleOnActionRecipeError = (response?: StatusResponse) => {
        switch (response?.status) {
            case StatusCode.InternalServerError:
                dispatch(
                    setNotification({
                        _id: crypto.randomUUID(),
                        title: Error.SERVER,
                        message: 'Попробуйте немного позже',
                        type: 'error',
                    }),
                );
                break;
            default:
                dispatch(
                    setNotification({
                        _id: crypto.randomUUID(),
                        title: response?.data.error ?? '',
                        message: response?.data.message,
                        type: 'error',
                    }),
                );
        }
    };

    const handleOnLikeRecipe = async () => {
        try {
            await likeRecipe(recipe._id).unwrap();
        } catch (e) {
            handleOnActionRecipeError(e as StatusResponse);
        }
    };

    const handleOnBookmarkRecipe = async () => {
        try {
            await bookmarkRecipe(recipe._id).unwrap();
        } catch (e) {
            handleOnActionRecipeError(e as StatusResponse);
        }
    };

    return (
        <>
            <Flex
                direction={{ base: 'column', md: 'row' }}
                alignItems={{ md: 'start' }}
                rowGap={{ base: '16px' }}
                columnGap={{ md: '16px' }}
            >
                <Image
                    objectFit='cover'
                    src={recipe.image}
                    borderRadius='8px'
                    w={{ base: '328px', md: '232px', lg: '353px', xl: '553px' }}
                    h={{ base: '224px', lg: '410px', xl: '410px' }}
                    fallback={
                        <Fallback
                            width='100%'
                            height={{ base: '224px', lg: '410px', xl: '410px' }}
                        />
                    }
                />
                <VStack w='100%' alignSelf={{ md: 'stretch' }}>
                    <HStack w='100%' justify='space-between' align='start'>
                        <Wrap flex={1}>
                            {categories?.map((category) => (
                                <WrapItem>
                                    <Tag layerStyle='categoryTag'>
                                        <Image
                                            src={category.icon}
                                            boxSize='16px'
                                            alignSelf='center'
                                            alt={category.title}
                                        />
                                        <TagLabel textStyle='textSmLh5'>{category.title}</TagLabel>
                                    </Tag>
                                </WrapItem>
                            ))}
                        </Wrap>
                        <HStack spacing='8px'>
                            <IconWithCounter
                                icon={<BookmarkIcon boxSize='12px' />}
                                count={recipe.bookmarks}
                            />
                            <IconWithCounter
                                icon={<LikeIcon boxSize='12px' />}
                                count={recipe.likes}
                            />
                            <IconWithCounter
                                icon={<PersonsIcon fill='black' boxSize='12px' />}
                                count={recipe.views}
                            />
                        </HStack>
                    </HStack>
                    <Stack alignSelf='start' width='100%'>
                        <Text
                            maxW='437px'
                            textStyle={{ base: 'text2xlLh8Bold', lg: 'text5xlLhNoneBold' }}
                            noOfLines={{ base: 2, md: 1, lg: 2 }}
                            mt={{ base: '16px' }}
                        >
                            {recipe.title}
                        </Text>
                        <Text
                            maxW='510px'
                            textStyle={{ base: 'textSmLh5Normal' }}
                            mt={{ base: '16px', lg: '24px' }}
                            noOfLines={{ base: 3, md: 2, lg: 3 }}
                        >
                            {recipe.description}
                        </Text>
                    </Stack>
                    <Wrap mt={{ base: '24px', md: 'auto' }} width='100%' justify='space-between'>
                        <WrapItem>
                            <Tag layerStyle='timerTag' alignSelf={{ base: 'start', lg: 'end' }}>
                                <Image src={alarmIcon} boxSize='16px' alignSelf='center' />
                                <TagLabel textStyle='textSmLh5'>
                                    {recipe.time} {getString('min').toLocaleLowerCase()}
                                </TagLabel>
                            </Tag>
                        </WrapItem>
                        <WrapItem>
                            <HStack spacing={{ base: '12px' }} justify={{ md: 'end' }}>
                                {isRecipeOwner ? (
                                    <>
                                        <IconButton
                                            data-test-id='recipe-delete-button'
                                            onClick={handleOnDeleteRecipe}
                                            minW={0}
                                            boxSize='32px'
                                            borderRadius='100%'
                                            backgroundColor='transparent'
                                            aria-label='remove'
                                            icon={<BasketIcon fill='black' />}
                                        />
                                        <Button
                                            onClick={() => {
                                                navigate(`/edit-recipe${location.pathname}`, {
                                                    replace: true,
                                                    state: recipe,
                                                });
                                            }}
                                            variant='outline'
                                            borderColor='blackAlpha.600'
                                            leftIcon={<WriteLineIcon />}
                                        >
                                            <Text
                                                textStyle={{
                                                    base: 'textXsLh4Semibold',
                                                    lg: 'textSmLh5Semibold',
                                                    xl: 'textLgLh7Semibold',
                                                }}
                                            >
                                                Редактировать рецепт
                                            </Text>
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            onClick={handleOnLikeRecipe}
                                            borderRadius='6px'
                                            variant='outline'
                                            px='12px'
                                            py='6px'
                                            leftIcon={
                                                <Image
                                                    src={likeIcon}
                                                    boxSize={{ xl: '16px' }}
                                                    alt='like'
                                                />
                                            }
                                            h={{ base: '24px', lg: '32px', xl: '48px' }}
                                        >
                                            <Text
                                                textStyle={{
                                                    base: 'textXsLh4Semibold',
                                                    lg: 'textSmLh5Semibold',
                                                    xl: 'textLgLh7Semibold',
                                                }}
                                            >
                                                {getString('rate-recipe')}
                                            </Text>
                                        </Button>
                                        <Button
                                            onClick={handleOnBookmarkRecipe}
                                            borderRadius='6px'
                                            bgColor='lime.400'
                                            variant='outline'
                                            px='12px'
                                            py='6px'
                                            leftIcon={
                                                <Image
                                                    src={bookmarkIcon}
                                                    boxSize={{ xl: '16px' }}
                                                    alt='bookmark'
                                                />
                                            }
                                            h={{ base: '24px', lg: '32px', xl: '48px' }}
                                        >
                                            <Text
                                                textStyle={{
                                                    base: 'textXsLh4Semibold',
                                                    lg: 'textSmLh5Semibold',
                                                    xl: 'textLgLh7Semibold',
                                                }}
                                            >
                                                {getString('save-to-bookmarks')}
                                            </Text>
                                        </Button>
                                    </>
                                )}
                            </HStack>
                        </WrapItem>
                    </Wrap>
                </VStack>
            </Flex>
        </>
    );
};
