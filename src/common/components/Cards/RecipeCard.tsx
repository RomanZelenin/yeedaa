import {
    Button,
    Flex,
    HStack,
    Image,
    Stack,
    Tag,
    TagLabel,
    Text,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';

import { Recipe } from '~/app/mocks/types/type_defenitions';
import alarmIcon from '~/assets/icons/alarm.svg';
import bookmarkIcon from '~/assets/icons/bookmark.svg';
import likeIcon from '~/assets/icons/like.svg';
import { useGetCategoriesQuery } from '~/query/create-api';

import { useResource } from '../ResourceContext/ResourceContext';
import { ThreeButtons } from './ThreeButtons';

export const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
    const { getString } = useResource();

    const allCategories = useGetCategoriesQuery().data;
    const categories = allCategories?.filter((it) =>
        it.subCategories?.some((it) => recipe.categoriesIds?.includes(it._id)),
    );

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
                    alt={recipe.title}
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
                        <ThreeButtons
                            bookmarks={recipe.bookmarks}
                            likes={recipe.likes}
                            views={recipe.views}
                        />
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
                                <Button
                                    borderRadius='6px'
                                    variant='outline'
                                    px='12px'
                                    py='6px'
                                    leftIcon={
                                        <Image src={likeIcon} boxSize={{ xl: '16px' }} alt='like' />
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
                            </HStack>
                        </WrapItem>
                    </Wrap>
                </VStack>
            </Flex>
        </>
    );
};
