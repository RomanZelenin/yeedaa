import { Hide, Show, SimpleGrid, VStack } from '@chakra-ui/react';

import { Recipe } from '~/app/mocks/types/type_defenitions';

import { FoodCard, FoodCardCompact } from '../Cards/FoodCard';

export function RecipeCollection({
    recipes,
    dataTestId,
}: {
    recipes?: Recipe[];
    dataTestId?: string;
}) {
    return (
        <>
            <Show above='lg'>
                <VStack align='stretch'>
                    <SimpleGrid
                        data-test-id={dataTestId}
                        columns={{ base: 1, xl: 2 }}
                        columnGap={{ xl: '24px' }}
                        rowGap={{ lg: '16px', xl: '24px' }}
                    >
                        {recipes?.map((recipe, i) => (
                            <FoodCard key={recipe._id} id={`${i}`} recipe={recipe} />
                        ))}
                    </SimpleGrid>
                </VStack>
            </Show>
            <Hide above='lg'>
                <VStack alignItems='stretch'>
                    <SimpleGrid
                        data-test-id={dataTestId}
                        columns={{ base: 1, md: 2 }}
                        columnGap={{ base: '0px', md: '12px' }}
                        rowGap='12px'
                    >
                        {recipes?.map((recipe, i) => (
                            <FoodCardCompact key={recipe._id} id={`${i}`} recipe={recipe} />
                        ))}
                    </SimpleGrid>
                </VStack>
            </Hide>
        </>
    );
}
