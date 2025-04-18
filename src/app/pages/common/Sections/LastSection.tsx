import { Box, Divider, GridItem, SimpleGrid, Text, VStack } from '@chakra-ui/react';

import {
    VegeterianKitchenCard,
    VegeterianKitchenCompactCard,
} from '~/components/Cards/VegeterianKitchenCard';

export default function LastSection({
    title,
    description,
    cards,
    compactCards,
}: {
    title: string;
    description: string;
    cards: {
        subcategory: string;
        badgeIcon: string;
        title: string;
        description: string;
        bookmarks?: number;
        likes?: number;
        persons?: number;
    }[];
    compactCards: { icon: string; title: string }[];
}) {
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
                        {title}
                    </Text>
                </GridItem>
                <GridItem colSpan={{ base: 1, lg: 3, xl: 2 }}>
                    <Text
                        fontSize={{ base: '14px', lg: '16px' }}
                        color='rgba(0, 0, 0, 0.64)'
                        lineHeight={{ base: '20px', lg: '24px' }}
                        fontWeight='500'
                    >
                        {description}
                    </Text>
                </GridItem>
            </SimpleGrid>
            <SimpleGrid
                columns={{ base: 1, md: 3, xl: 4 }}
                columnGap={{ base: '12px', lg: '16px', xl: '24px' }}
                rowGap={{ base: '12px', lg: '16px', xl: '24px' }}
            >
                {cards.map((it) => (
                    <GridItem colSpan={{ xl: 1 }}>
                        <VegeterianKitchenCard
                            badgeText={it.subcategory}
                            badgeIcon={it.badgeIcon}
                            title={it.title}
                            description={it.description}
                            likesCount={it.likes}
                            bookmarksCount={it.bookmarks}
                            personsCount={it.persons}
                        />
                    </GridItem>
                ))}

                <GridItem colSpan={{ xl: 2 }}>
                    <VStack spacing='12px' align='stretch'>
                        {compactCards.map((it, idx) => (
                            <Box key={idx}>
                                <VegeterianKitchenCompactCard icon={it.icon} title={it.title} />
                            </Box>
                        ))}
                    </VStack>
                </GridItem>
            </SimpleGrid>
        </Box>
    );
}
