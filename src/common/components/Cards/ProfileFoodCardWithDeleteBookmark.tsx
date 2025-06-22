import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Highlight,
    HStack,
    Image,
    Stack,
    Tag,
    TagLabel,
    Text,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { useEffect } from 'react';

import { Recipe } from '~/app/mocks/types/type_defenitions';
import deleteBookmarkIcon from '~/assets/icons/delete-from-bookmark.svg';
import { useGetFilteredCategoriesBySubcatigoriesId } from '~/common/hooks/useGetFilteredCategoriesBySubcatigoriesId';
import { useGetRecommendingUser } from '~/common/hooks/useGetRecommendingUser';
import { StatusCode } from '~/query/constants';
import { useBookmarkRecipeMutation } from '~/query/create-recipe-api';
import { StatusResponse } from '~/query/types';
import { Error, querySelector, setNotification } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

import { Fallback } from '../Fallback/Fallback';
import { BookmarkIcon } from '../Icons/BookmarkIcon';
import { LikeIcon } from '../Icons/LikeIcon';
import { CenteredLoader } from '../Loader/CenteredLoader';
import { useResource } from '../ResourceContext/ResourceContext';
import { IconWithCounter } from './IconWithCounter';

export const ProfileFoodCardWithDeleteBookmark = ({
    id,
    recipe,
    onSuccessDeleteBookmark,
}: {
    id?: string;
    recipe: Recipe;
    onSuccessDeleteBookmark: () => void;
}) => {
    const { getString } = useResource();
    const query = useAppSelector(querySelector);
    const { categories } = useGetFilteredCategoriesBySubcatigoriesId(recipe.categoriesIds);
    const recommendingUser = useGetRecommendingUser(recipe);
    const dispatch = useAppDispatch();
    const [bookmarkRecipe, { isError, isLoading, isSuccess, error }] = useBookmarkRecipeMutation();

    const handleOnBookmarkRecipe = () => {
        bookmarkRecipe(recipe._id);
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

    useEffect(() => {
        if (isSuccess) {
            onSuccessDeleteBookmark();
        }
        if (isError) {
            handleOnActionRecipeError(error as StatusResponse);
        }
    }, [isError, error, isSuccess]);

    return (
        <>
            <Card
                key={id}
                data-test-id={`food-card-${id}`}
                direction='row'
                overflow='clip'
                minH='244px'
            >
                <Image
                    objectFit='cover'
                    src={recipe.image}
                    w='346px'
                    fallback={<Fallback width='346px' height='100%' />}
                />
                {recommendingUser && (
                    <>
                        <Tag
                            py='4px'
                            px='8px'
                            pos='absolute'
                            layerStyle='categoryTag'
                            bgColor='lime.150'
                            bottom='20px'
                            left='24px'
                        >
                            <Avatar src={recommendingUser.photo} boxSize='16px' />
                            <TagLabel textStyle='textSmLh5'>
                                {recommendingUser.firstName} {recommendingUser.lastName}{' '}
                                {getString('recommends').toLocaleLowerCase()}
                            </TagLabel>
                        </Tag>
                    </>
                )}

                <Stack spacing='4px' px='4px' flex={1}>
                    <CardHeader>
                        <HStack spacing='50px' justify='space-between' alignItems='start'>
                            <Wrap>
                                {categories?.map((category, i) => (
                                    <WrapItem key={i}>
                                        <Tag layerStyle='categoryTag' bgColor=' lime.50'>
                                            <Image src={category.icon} boxSize='16px' alt='' />
                                            <TagLabel textStyle='textSmLh5'>
                                                {category.title}
                                            </TagLabel>
                                        </Tag>
                                    </WrapItem>
                                ))}
                            </Wrap>
                            <HStack spacing='0px'>
                                <IconWithCounter
                                    icon={<BookmarkIcon boxSize='12px' />}
                                    count={recipe.bookmarks}
                                />
                                <IconWithCounter
                                    icon={<LikeIcon boxSize='12px' />}
                                    count={recipe.likes}
                                />
                            </HStack>
                        </HStack>
                    </CardHeader>
                    <CardBody py={0}>
                        <Text textStyle='textXlLh7Medium' mb='8px' noOfLines={1}>
                            <Highlight query={query ?? ''} styles={{ color: 'lime.600' }}>
                                {recipe.title}
                            </Highlight>
                        </Text>
                        <Text textStyle='textSmLh5Normal' noOfLines={3}>
                            {recipe.description}
                        </Text>
                    </CardBody>
                    <CardFooter flex={1} justifyContent='right' alignItems='end' columnGap='8px'>
                        <Button
                            onClick={handleOnBookmarkRecipe}
                            variant='outline'
                            px='12px'
                            py='6px'
                            textStyle='textSmLh5Semibold'
                            leftIcon={<Image src={deleteBookmarkIcon} />}
                            h='32px'
                            borderRadius='6px'
                            borderColor='blackAlpha.600'
                            borderWidth='1px'
                        >
                            {getString('remove-from-saved')}
                        </Button>
                    </CardFooter>
                </Stack>
                {isLoading && <CenteredLoader />}
            </Card>
        </>
    );
};

export const ProfileFoodCardCompactWithDeleteBookmark = ({
    id,
    recipe,
}: {
    id?: string;
    recipe: Recipe;
}) => {
    const { getString } = useResource();
    const query = useAppSelector(querySelector);
    const { categories } = useGetFilteredCategoriesBySubcatigoriesId(recipe.categoriesIds);

    const dispatch = useAppDispatch();
    const [bookmarkRecipe, { isError, isLoading, isSuccess, error }] = useBookmarkRecipeMutation();

    const handleOnBookmarkRecipe = () => {
        bookmarkRecipe(recipe._id);
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

    useEffect(() => {
        if (isError) {
            handleOnActionRecipeError(error as StatusResponse);
        }
    }, [isError, isLoading, isSuccess, error]);

    return (
        <>
            <Card
                key={id}
                data-test-id={`food-card-${id}`}
                direction='row'
                overflow='clip'
                minH='128px'
            >
                <Image
                    src={recipe.image}
                    w='158px'
                    fallback={<Fallback width='158px' height='100%' />}
                />
                <Wrap pos='absolute' top='6px' left='6px' alignItems='center' maxW='158px'>
                    {categories?.map((category, i) => (
                        <WrapItem key={i}>
                            <Tag layerStyle='categoryTag' bgColor=' lime.50'>
                                <Image src={category.icon} boxSize='16px' alt='' />
                                <TagLabel textStyle='textSmLh5'>{category.title}</TagLabel>
                            </Tag>
                        </WrapItem>
                    ))}
                </Wrap>

                <Stack spacing={0} flex={1} px='8px' pt='8px' pb='4px'>
                    <CardHeader p={0}>
                        <HStack spacing='0px'>
                            <IconWithCounter
                                icon={<BookmarkIcon boxSize='12px' />}
                                count={recipe.bookmarks}
                            />
                            <IconWithCounter
                                icon={<LikeIcon boxSize='12px' />}
                                count={recipe.likes}
                            />
                        </HStack>
                    </CardHeader>
                    <CardBody p={0}>
                        <Text textStyle='textMdLh6Medium' noOfLines={2}>
                            <Highlight query={query ?? ''} styles={{ color: 'lime.600' }}>
                                {recipe.title ?? ''}
                            </Highlight>
                        </Text>
                    </CardBody>
                    <CardFooter p={0} justifyContent='right' columnGap='12px' alignItems='center'>
                        <Button
                            data-test-id={`card-link-${id}`}
                            onClick={handleOnBookmarkRecipe}
                            fontSize='12px'
                            lineHeight='16px'
                            alignItems='center'
                            px='8px'
                            fontWeight={600}
                            h='1.5rem'
                            borderRadius='6px'
                            borderColor='blackAlpha.600'
                            borderWidth='1px'
                            variant='outline'
                        >
                            {getString('remove-from-saved')}
                        </Button>
                    </CardFooter>
                </Stack>
                {isLoading && <CenteredLoader />}
            </Card>
        </>
    );
};
