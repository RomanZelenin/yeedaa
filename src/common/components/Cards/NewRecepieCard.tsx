import {
    Box,
    Card,
    CardBody,
    Flex,
    Hide,
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
import { useGetCategoriesQuery } from '~/query/create-api';

import { ThreeButtons } from './ThreeButtons';

export const NewRecepieCard = ({ recipe }: { recipe: Recipe }) => {
    const subcategoriesIds = recipe.categoriesIds?.map((id) => id);
    const categories = useGetCategoriesQuery().data?.filter((it) =>
        it.subCategories?.some((it) => subcategoriesIds?.includes(it._id)),
    );

    return (
        <Card
            w={{ base: '158px', lg: '279px', xl: '322px' }}
            h={{ base: '224px', lg: '402px', xl: '414px' }}
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
                                <Image src={category.icon} boxSize='16px' alt='' />
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
                            <ThreeButtons
                                bookmarks={recipe.bookmarks}
                                likes={recipe.likes}
                                views={recipe.views}
                            />
                        </Flex>
                    </Hide>
                    <Show above='lg'>
                        <Flex justify='space-between' flex={1} alignItems='end'>
                            {categories?.map((category, i) => (
                                <WrapItem key={i}>
                                    <Tag layerStyle='categoryTag' bgColor=' lime.150'>
                                        <Image src={category.icon} boxSize='16px' alt='' />
                                        <TagLabel textStyle='textSmLh5'>{category.title}</TagLabel>
                                    </Tag>
                                </WrapItem>
                            ))}
                            <ThreeButtons
                                bookmarks={recipe.bookmarks}
                                likes={recipe.likes}
                                views={recipe.views}
                            />
                        </Flex>
                    </Show>
                </VStack>
            </CardBody>
        </Card>
    );
};
