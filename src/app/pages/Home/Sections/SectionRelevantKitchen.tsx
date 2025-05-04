import { Box, Divider, GridItem, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useParams } from 'react-router';

import {
    VegeterianKitchenCard,
    VegeterianKitchenCompactCard,
} from '~/common/components/Cards/VegeterianKitchenCard';
import { getRandomNumber } from '~/common/utils/getRandomNumber';
import {
    useGetCategoriesQuery,
    useGetRecipeByCategoryQuery,
    useGetRecipeQuery,
} from '~/query/create-api';

export default function SectionRelevantKitchen() {
    const { category: categoryId } = useParams();
    const { data: categories } = useGetCategoriesQuery();

    const category = useMemo(() => {
        const mainCategories = categories?.filter((it) => !!it.subCategories);
        const randomIdx = getRandomNumber(1, mainCategories?.length ?? 1) - 1;
        return mainCategories?.at(randomIdx);
    }, [categoryId, categories]);

    const subcategoriesIds = category?.subCategories?.map((subcategory) => subcategory._id);
    //   .join(',');

    /* const { data: recipes } = */ useGetRecipeByCategoryQuery(
        { id: subcategoriesIds?.[0], limit: 5 },
        { skip: !subcategoriesIds?.[0] },
    );
    const { data: recipes } = useGetRecipeQuery(
        { limit: 5, subcategoriesIds: subcategoriesIds?.join(',') },
        { skip: !subcategoriesIds },
    );

    return (
        <Box px={{ base: '16px', lg: '0px' }}>
            <Divider mb={{ base: 0, lg: '24px' }} />
            <SimpleGrid
                columns={{ base: 1, lg: 4 }}
                mb={{ base: '16px', lg: '24px' }}
                rowGap='12px'
            >
                <GridItem colSpan={{ base: 1, xl: 2 }}>
                    <Text
                        fontSize={{ base: '24px', lg: '36px', xl: '48px' }}
                        fontWeight='500'
                        lineHeight={{ base: '32px', lg: '40px', xl: '48px' }}
                    >
                        {category?.title}
                    </Text>
                </GridItem>
                <GridItem colSpan={{ base: 1, lg: 3, xl: 2 }}>
                    <Text
                        fontSize={{ base: '14px', lg: '16px' }}
                        color='rgba(0, 0, 0, 0.64)'
                        lineHeight={{ base: '20px', lg: '24px' }}
                        fontWeight='500'
                    >
                        {category?.description}
                    </Text>
                </GridItem>
            </SimpleGrid>
            <SimpleGrid
                columns={{ base: 1, md: 3, xl: 4 }}
                columnGap={{ base: '12px', lg: '16px', xl: '24px' }}
                rowGap={{ base: '12px', lg: '16px', xl: '24px' }}
            >
                {recipes?.data?.slice(0, 2)?.map((recipe, i) => (
                    <GridItem key={i} colSpan={{ xl: 1 }}>
                        <VegeterianKitchenCard recipe={recipe} />
                    </GridItem>
                ))}

                <GridItem colSpan={{ xl: 2 }} display='flex' flexDirection='column'>
                    <VStack spacing='12px' justify='space-between' align='stretch' flex={1}>
                        {recipes?.data?.slice(2).map((recipe, i) => (
                            <Box key={i}>
                                <VegeterianKitchenCompactCard recipe={recipe} />
                            </Box>
                        ))}
                    </VStack>
                </GridItem>
            </SimpleGrid>
        </Box>
    );
}
