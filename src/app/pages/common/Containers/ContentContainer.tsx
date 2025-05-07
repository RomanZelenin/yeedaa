import { Box, GridItem, VStack } from '@chakra-ui/react';
import { JSX } from '@emotion/react/jsx-runtime';

import { RecipeCollection } from '~/common/components/RecipeCollection/RecipeCollection';
import { recipesSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

import SectionRelevantKitchen from '../../Home/Sections/SectionRelevantKitchen';
import HeaderContainer from './HeaderContainer';

export default function ContentContainer({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle?: string;
    children: JSX.Element;
}) {
    const recipes = useAppSelector(recipesSelector);
    return (
        <>
            <GridItem
                px={{ md: '30px' }}
                colSpan={{ base: 4, md: 8 }}
                display='block'
                colStart={{ base: 1, md: 2, lg: 3, xl: 3 }}
                colEnd={{ base: 5, md: 12, lg: 12, xl: 11 }}
            >
                <HeaderContainer title={title} subtitle={subtitle} />
            </GridItem>

            <GridItem
                colSpan={{ base: 4, md: 13 }}
                mt={{ base: '16px', lg: '24px' }}
                display='block'
                colStart={1}
                colEnd={{ lg: 13 }}
            >
                {recipes.length === 0 ? (
                    <VStack align='stretch' spacing='32px'>
                        {children}
                    </VStack>
                ) : (
                    <VStack spacing='12px'>
                        <RecipeCollection recipes={recipes} />
                    </VStack>
                )}
                <Box mt={{ base: '32px', lg: '40px' }}>
                    <SectionRelevantKitchen />
                </Box>
            </GridItem>
        </>
    );
}
