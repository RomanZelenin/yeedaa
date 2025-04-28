import { VStack } from '@chakra-ui/react';

import { filterRecipesByAllergens } from '~/app/Utils/filterRecipesByAllergens';
import { filterRecipesByTitleOrIngridient } from '~/app/Utils/filterRecipesByTitle';
import { RecipeCollection } from '~/components/RecipeCollection/RecipeCollection';
import { useResource } from '~/components/ResourceContext/ResourceContext';
import { allergensSelector, querySelector, recipesSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

import ContentContainer from '../common/Containers/ContentContainer';

export default function JuiciestPage() {
    const { getString } = useResource();

    let recipes = [...useAppSelector(recipesSelector)].sort((a, b) => b.likes - a.likes);

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
        <ContentContainer title={getString('juiciest')}>
            <VStack spacing='32px'>
                <VStack spacing='12px'>
                    <RecipeCollection recipes={recipes} />
                </VStack>
            </VStack>
        </ContentContainer>
    );
}
