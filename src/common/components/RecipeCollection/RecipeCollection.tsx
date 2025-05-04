import { Hide, Show, SimpleGrid, VStack } from '@chakra-ui/react';

import { Recipe } from '~/app/mocks/types/type_defenitions';

import { FoodCard, FoodCardCompact } from '../Cards/FoodCard';

export function RecipeCollection({ recipes }: { recipes?: Recipe[] }) {
    return (
        <>
            <Hide key={1} below='lg'>
                <VStack align='stretch'>
                    <SimpleGrid
                        columns={{ base: 1, xl: 2 }}
                        columnGap={{ xl: '24px' }}
                        rowGap={{ lg: '16px', xl: '24px' }}
                    >
                        {recipes?.map((recipe, i) => (
                            <FoodCard key={i} id={`${i}`} recipe={recipe} />
                        ))}
                    </SimpleGrid>
                </VStack>
            </Hide>
            <Show key={2} below='lg'>
                <VStack alignItems='stretch' px='16px'>
                    <SimpleGrid
                        columns={{ base: 1, md: 2 }}
                        columnGap={{ base: '0px', md: '12px' }}
                        rowGap='12px'
                    >
                        {recipes?.map((recipe, i) => (
                            <FoodCardCompact key={i} id={`${i}`} recipe={recipe} />
                        ))}
                    </SimpleGrid>
                </VStack>
            </Show>
        </>
    );
}
