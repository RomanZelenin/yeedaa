import { VStack } from '@chakra-ui/react';

import { RecipeCollection } from '~/common/components/RecipeCollection/RecipeCollection';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import { filterRecipesByAllergens } from '~/common/utils/filterRecipesByAllergens';
import { filterRecipesByTitleOrIngridient } from '~/common/utils/filterRecipesByTitle';
import { allergensSelector, querySelector, recipesSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

import ContentContainer from '../common/Containers/ContentContainer';
import SectionCookingBlogs from './Sections/SectionCookingBlogs';
import SectionJuiciest from './Sections/SectionJuiciest';
import SectionNewRecipes from './Sections/SectionNewRecepies';

export default function HomePage() {
    const { getString } = useResource();
    let recipes = useAppSelector(recipesSelector);

    const query = useAppSelector(querySelector);
    const allergens = useAppSelector(allergensSelector).filter((item) => item.selected === true);
    if (query.length > 0) {
        recipes = filterRecipesByTitleOrIngridient(recipes, query);
    }
    if (allergens.length > 0) {
        recipes = filterRecipesByAllergens(
            recipes,
            allergens.map((it) => it.title),
        );
    }
    return (
        <ContentContainer title={getString('bon-appetit')}>
            <>
                {query.length == 0 && allergens.length == 0 ? (
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
