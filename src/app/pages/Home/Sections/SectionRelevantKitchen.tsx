import { Box, Divider, GridItem, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';

import {
    VegeterianKitchenCard,
    VegeterianKitchenCompactCard,
} from '~/common/components/Cards/VegeterianKitchenCard';
import { useRandomCategory } from '~/common/hooks/useRandomCategory';
import { useGetRecipeByCategoryQuery } from '~/query/create-api';
import { Error, setNotification, setRelevantLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

export default function SectionRelevantKitchen() {
    const dispatch = useAppDispatch();
    const category = useRandomCategory();
    const subcategoriesIds = useMemo(
        () => category?.subCategories?.map((subcategory) => subcategory._id),
        [category],
    );
    const {
        data: recipes,
        isLoading,
        isSuccess,
        isError,
    } = useGetRecipeByCategoryQuery(
        { id: subcategoriesIds?.[0], limit: 5 },
        { skip: !subcategoriesIds?.[0] },
    );

    useEffect(() => {
        if (isLoading) {
            dispatch(setRelevantLoader(true));
        }
        if (isError) {
            dispatch(setRelevantLoader(false));
            dispatch(
                setNotification({
                    _id: crypto.randomUUID(),
                    title: Error.SERVER,
                    type: 'error',
                    message: 'Попробуйте поискать снова попозже',
                }),
            );
        }
        if (isSuccess) {
            dispatch(setRelevantLoader(false));
        }
    }, [isLoading, isError, isSuccess]);

    if (isLoading || isError) {
        return null;
    }

    if (isSuccess) {
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
}
