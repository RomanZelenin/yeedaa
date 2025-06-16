import { Box, Divider, GridItem, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';

import {
    VegeterianKitchenCard,
    VegeterianKitchenCompactCard,
} from '~/common/components/Cards/VegeterianKitchenCard';
import { useGetRandomCategory } from '~/common/hooks/useGetRandomCategory';
import { useGetRecipeByCategoryQuery } from '~/query/create-recipe-api';
import { Error, setNotification, setRelevantLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

export default function SectionRelevantKitchen() {
    const dispatch = useAppDispatch();
    const {
        randomCategory,
        isError: isErrorRandomCategory,
        isLoading: isLoadingRandomCategory,
        isSuccess: isSuccessRandomCategory,
    } = useGetRandomCategory();
    const {
        data: recipesFromRandomCategory,
        isLoading: isLoadingRecipesFromRandomCategory,
        isSuccess: isSuccessRecipesFromRandomCategory,
        isError: isErrorRecipesFromRandomCategory,
    } = useGetRecipeByCategoryQuery(
        { id: randomCategory?.subCategories?.map((subcategory) => subcategory._id)[0], limit: 5 },
        { skip: !isSuccessRandomCategory },
    );

    useEffect(() => {
        if (isLoadingRecipesFromRandomCategory || isLoadingRandomCategory) {
            dispatch(setRelevantLoader(true));
        }
        if (isErrorRecipesFromRandomCategory || isErrorRandomCategory) {
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
        if (isSuccessRecipesFromRandomCategory && isSuccessRandomCategory) {
            dispatch(setRelevantLoader(false));
        }
    }, [
        isLoadingRecipesFromRandomCategory,
        isErrorRecipesFromRandomCategory,
        isSuccessRecipesFromRandomCategory,
        isLoadingRandomCategory,
        isErrorRandomCategory,
        isSuccessRandomCategory,
    ]);

    if (
        isLoadingRecipesFromRandomCategory ||
        isLoadingRandomCategory ||
        isErrorRecipesFromRandomCategory ||
        isErrorRandomCategory
    ) {
        return null;
    }

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
                        {randomCategory?.title}
                    </Text>
                </GridItem>
                <GridItem colSpan={{ base: 1, lg: 3, xl: 2 }}>
                    <Text
                        fontSize={{ base: '14px', lg: '16px' }}
                        color='rgba(0, 0, 0, 0.64)'
                        lineHeight={{ base: '20px', lg: '24px' }}
                        fontWeight='500'
                    >
                        {randomCategory?.description}
                    </Text>
                </GridItem>
            </SimpleGrid>
            <SimpleGrid
                columns={{ base: 1, md: 3, xl: 4 }}
                columnGap={{ base: '12px', lg: '16px', xl: '24px' }}
                rowGap={{ base: '12px', lg: '16px', xl: '24px' }}
            >
                {recipesFromRandomCategory?.data?.slice(0, 2)?.map((recipe, i) => (
                    <GridItem key={i} colSpan={{ xl: 1 }}>
                        <VegeterianKitchenCard recipe={recipe} />
                    </GridItem>
                ))}

                <GridItem colSpan={{ xl: 2 }} display='flex' flexDirection='column'>
                    <VStack spacing='12px' justify='space-between' align='stretch' flex={1}>
                        {recipesFromRandomCategory?.data?.slice(2).map((recipe, i) => (
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
