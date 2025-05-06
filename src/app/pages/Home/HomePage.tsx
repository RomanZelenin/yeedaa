import { VStack } from '@chakra-ui/react';

import { RecipeCollection } from '~/common/components/RecipeCollection/RecipeCollection';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import { recipesSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

import ContentContainer from '../common/Containers/ContentContainer';
import SectionCookingBlogs from './Sections/SectionCookingBlogs';
import SectionJuiciest from './Sections/SectionJuiciest';
import SectionNewRecipes from './Sections/SectionNewRecepies';

export default function HomePage() {
    const { getString } = useResource();
    const recipes = useAppSelector(recipesSelector);

    return (
        <ContentContainer title={getString('bon-appetit')}>
            <>
                {recipes.length === 0 ? (
                    <>
                        <SectionNewRecipes />
                        <SectionJuiciest />
                        <SectionCookingBlogs />
                    </>
                ) : (
                    <VStack spacing='12px'>
                        <RecipeCollection recipes={recipes} />
                    </VStack>
                )}
            </>
        </ContentContainer>
    );
}
