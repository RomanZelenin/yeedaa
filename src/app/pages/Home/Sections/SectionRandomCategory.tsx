import { Box, Divider, GridItem, SimpleGrid, Text, VStack } from '@chakra-ui/react';

import {
    VegeterianKitchenCard,
    VegeterianKitchenCompactCard,
} from '~/common/components/Cards/VegeterianKitchenCard';
import { randomCategorySelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

export default function SectionRandomCategory() {
    const randomCategory = useAppSelector(randomCategorySelector);
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
                        {randomCategory.title}
                    </Text>
                </GridItem>
                <GridItem colSpan={{ base: 1, lg: 3, xl: 2 }}>
                    <Text
                        fontSize={{ base: '14px', lg: '16px' }}
                        color='rgba(0, 0, 0, 0.64)'
                        lineHeight={{ base: '20px', lg: '24px' }}
                        fontWeight='500'
                    >
                        {randomCategory.description}
                    </Text>
                </GridItem>
            </SimpleGrid>
            <SimpleGrid
                columns={{ base: 1, md: 3, xl: 4 }}
                columnGap={{ base: '12px', lg: '16px', xl: '24px' }}
                rowGap={{ base: '12px', lg: '16px', xl: '24px' }}
            >
                {randomCategory?.base.map((it, i) => (
                    <GridItem key={i} colSpan={{ xl: 1 }}>
                        <VegeterianKitchenCard
                            badgeText={it.subcategory}
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
                        {randomCategory?.compact.map((it, i) => (
                            <Box key={i}>
                                <VegeterianKitchenCompactCard icon={it.icon} title={it.title} />
                            </Box>
                        ))}
                    </VStack>
                </GridItem>
            </SimpleGrid>
        </Box>
    );
}

type Dish = {
    title: string;
    description: string;
    subcategory: string;
    badgeIcon: string;
    likes?: number;
    bookmarks?: number;
    persons?: number;
};

type CompactItem = {
    icon: string;
    title: string;
};

export type CategoryData = {
    title: string;
    description: string;
    base: Dish[];
    compact: CompactItem[];
};
