import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    HStack,
    Image,
    Spacer,
    Tag,
    TagLabel,
    Text,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { Link } from 'react-router';

import { Recipe } from '~/app/mocks/types/type_defenitions';
import bookmarkIcon from '~/assets/icons/bookmark.svg';
import likeIcon from '~/assets/icons/like.svg';
import personsIcon from '~/assets/icons/persons.svg';
import { useGetFilteredCategoriesBySubcatigoriesId } from '~/common/hooks/useGetFilteredCategoriesBySubcatigoriesId';
import { useMapRecipesToCategoryPaths } from '~/common/hooks/useMapRecipesToCategoryPaths';
import { useGetCategoriesQuery } from '~/query/create-category-api';

import { useResource } from '../ResourceContext/ResourceContext';

export const VegeterianKitchenCard = ({ recipe }: { recipe: Recipe }) => {
    const counters = useMemo(
        () =>
            [
                { type: 'bookmarks', count: recipe.bookmarks, icon: bookmarkIcon },
                { type: 'likes', count: recipe.likes, icon: likeIcon },
                { type: 'persons', count: recipe.views, icon: personsIcon },
            ].filter((item) => typeof item.count === 'number') as {
                type: string;
                count: number;
                icon: string;
            }[],
        [recipe],
    );
    const { categories } = useGetFilteredCategoriesBySubcatigoriesId(recipe.categoriesIds);
    const recipeWithPath = useMapRecipesToCategoryPaths([recipe])[0];

    return (
        <Card
            as={Link}
            to={recipeWithPath.path}
            p='12px'
            borderRadius='8px'
            border='1px solid rgba(0, 0, 0, 0.08)'
            h='100%'
        >
            <CardHeader p={0} mb='8px'>
                <Text isTruncated textOverflow='ellipsis' fontSize='16px' fontWeight={500}>
                    {recipe.title}
                </Text>
            </CardHeader>
            <CardBody p={0} mb='24px'>
                <Text noOfLines={3} fontSize='14px' lineHeight='20px'>
                    {recipe.description}
                </Text>
            </CardBody>
            <CardFooter p={0} alignItems='end'>
                <Wrap alignItems='center' maxW='158px'>
                    {categories?.map((category, i) => (
                        <WrapItem key={i}>
                            <Tag layerStyle='categoryTag' bgColor=' lime.50'>
                                <Image src={category.icon} boxSize='16px' alt='' />
                                <TagLabel textStyle='textSmLh5'>{category.title}</TagLabel>
                            </Tag>
                        </WrapItem>
                    ))}
                </Wrap>
                <Spacer />
                {counters.length > 0 && (
                    <HStack p={0}>
                        {counters.map(({ type, count, icon }) => (
                            <MenuItemButton key={type} src={icon} count={count} />
                        ))}
                    </HStack>
                )}
            </CardFooter>
        </Card>
    );
};

export const VegeterianKitchenCompactCard = ({ recipe }: { recipe: Recipe }) => {
    const { getString } = useResource();

    const subcategoriesIds = recipe.categoriesIds?.map((id) => id);
    const icon = useGetCategoriesQuery().data?.filter((it) =>
        it.subCategories?.some((it) => subcategoriesIds?.includes(it._id)),
    )[0].icon;
    const recipeWithPath = useMapRecipesToCategoryPaths([recipe])[0];

    return (
        <Card>
            <CardBody px='12px' py='10px'>
                <HStack justify='space-between' alignItems='center'>
                    <Image src={icon} boxSize='24px' alt='#' />
                    <Text
                        fontSize={{ base: '16px', xl: '20px' }}
                        fontWeight={500}
                        isTruncated
                        textOverflow='ellipsis'
                        flex={1}
                    >
                        {recipeWithPath.title}
                    </Text>
                    <Button
                        as={Link}
                        to={`${recipeWithPath.path}`}
                        minWidth='60px'
                        variant='outline'
                        color='lime.600'
                        borderColor='lime.600'
                        fontWeight={600}
                        borderRadius='6px'
                        h='32px'
                        fontSize={{ base: '12px', xl: '14px' }}
                        p='8px'
                    >
                        {getString('cooking')}
                    </Button>
                </HStack>
            </CardBody>
        </Card>
    );
};

const MenuItemButton = ({ src, count }: { src: string; count: number }) => (
    <Flex alignItems='center' columnGap={{ base: '6px', lg: '8px' }}>
        <Image src={src} boxSize={{ base: '12px', lg: '12px' }} />
        <Box
            as='span'
            fontSize={{ base: '12px', lg: '16px' }}
            lineHeight={{ base: '16px', lg: '24px' }}
            fontWeight='600'
            color='lime.600'
        >
            {count}
        </Box>
    </Flex>
);
