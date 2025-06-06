import {
    Box,
    Card,
    CardBody,
    Flex,
    Hide,
    HStack,
    Image,
    Show,
    Tag,
    TagLabel,
    Text,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';

import { Recipe } from '~/app/mocks/types/type_defenitions';
import { useGetFilteredCategoriesBySubcatigoriesId } from '~/common/hooks/useGetFilteredCategoriesBySubcatigoriesId';

import { Fallback } from '../Fallback/Fallback';
import { BookmarkIcon } from '../Icons/BookmarkIcon';
import { LikeIcon } from '../Icons/LikeIcon';
import { PersonsIcon } from '../Icons/PersonsIcon';
import { IconWithCounter } from './IconWithCounter';

export const NewRecepieCard = ({ recipe }: { recipe: Recipe }) => {
    const { categories } = useGetFilteredCategoriesBySubcatigoriesId(recipe.categoriesIds);
    return (
        <Card
            w={{ base: '158px', lg: '279px', xl: '322px' }}
            h={{ base: '224px', lg: '438px' }}
            border='1px solid rgba(0, 0, 0, 0.08);'
            borderRadius='8px'
            overflow='clip'
            boxShadow='none'
        >
            <CardBody p={0} display='flex' flexDir='column' justifyContent='stretch'>
                <Image
                    src={recipe.image}
                    objectFit='cover'
                    w={{ base: '158px', lg: '277px', xl: '322px' }}
                    h={{ base: '128px', lg: '230px' }}
                    alt={recipe.title}
                    fallback={<Fallback width='100%' height={{ base: '128px', lg: '230px' }} />}
                />
                <Wrap
                    display={{ base: 'inline-flex', lg: 'none' }}
                    pos='absolute'
                    top='6px'
                    left='6px'
                    right='6px'
                >
                    {categories?.map((category, i) => (
                        <WrapItem key={i}>
                            <Tag layerStyle='categoryTag' bgColor=' lime.150'>
                                <Image src={category.icon} boxSize='16px' alt='icon' />
                                <TagLabel textStyle='textSmLh5'>{category.title}</TagLabel>
                            </Tag>
                        </WrapItem>
                    ))}
                </Wrap>
                <VStack
                    mx={{ base: '8px', lg: '12px', xl: '24px' }}
                    my={{ base: '8px', lg: '12px', xl: '16px' }}
                    spacing='8px'
                    align='stretch'
                    flex={1}
                >
                    <Text
                        textStyle={{
                            base: 'textMdLh6Medium',
                            lg: 'textLgLh7Medium',
                            xl: 'textXlLh7Medium',
                        }}
                        noOfLines={{ base: 2, lg: 1 }}
                    >
                        {recipe.title}
                    </Text>

                    <Box display={{ base: 'none', lg: 'inline-block' }} mb='16px'>
                        <Text textStyle={{ base: 'textSmLh5' }} noOfLines={3}>
                            {recipe.description}
                        </Text>
                    </Box>
                    <Hide above='lg'>
                        <Flex flex={1} alignItems='end'>
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
                        </Flex>
                    </Hide>
                    <Show above='lg'>
                        <Flex justify='space-between' flex={1} alignItems='end'>
                            <Wrap>
                                {categories?.map((category, i) => (
                                    <WrapItem key={i}>
                                        <Tag layerStyle='categoryTag' bgColor=' lime.150'>
                                            <Image src={category.icon} boxSize='16px' alt='icon' />
                                            <TagLabel textStyle='textSmLh5'>
                                                {category.title}
                                            </TagLabel>
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
                        </Flex>
                    </Show>
                </VStack>
            </CardBody>
        </Card>
    );
};
