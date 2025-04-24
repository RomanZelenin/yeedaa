import { Box, Hide, Show, SimpleGrid, VStack } from '@chakra-ui/react';

import { MostPopularCard, MostPopularCardCompact } from '../Cards/MostPopularCard';

export function RecipeCollection({
    recipes,
}: {
    recipes: {
        avatar?: string;
        recommendation?: string;
        bookmarks?: number;
        likes?: number;
        persons?: number;
        title: string;
        description: string;
        category: string[];
        image: string;
        coverMini: string;
        badgeIcon: string;
    }[];
}) {
    return (
        <>
            <Hide below='lg'>
                <VStack align='stretch'>
                    <SimpleGrid
                        columns={{ base: 1, xl: 2 }}
                        columnGap={{ xl: '24px' }}
                        rowGap={{ lg: '16px', xl: '24px' }}
                    >
                        {recipes.map((it, idx) => (
                            <Box key={idx} data-test-id={`food-card-${idx}`}>
                                <MostPopularCard
                                    avatar={it.avatar}
                                    recommendation={it.recommendation}
                                    bookmarks={it.bookmarks}
                                    likes={it.likes}
                                    persons={it.persons}
                                    title={it.title}
                                    description={it.description}
                                    tags={it.category}
                                    cover={it.image}
                                />
                            </Box>
                        ))}
                    </SimpleGrid>
                </VStack>
            </Hide>
            <Show below='lg'>
                <VStack alignItems='stretch' px='16px'>
                    <SimpleGrid
                        columns={{ base: 1, md: 2 }}
                        columnGap={{ base: '0px', md: '12px' }}
                        rowGap='12px'
                    >
                        {recipes.map((it, idx) => (
                            <Box key={idx} data-test-id={`food-card-${idx}`}>
                                <MostPopularCardCompact
                                    bookmarks={it.bookmarks}
                                    likes={it.likes}
                                    persons={it.persons}
                                    title={it.title}
                                    cover={it.image}
                                    tags={it.category}
                                />
                            </Box>
                        ))}
                    </SimpleGrid>
                </VStack>
            </Show>
        </>
    );
}
