import { VStack } from '@chakra-ui/react';

import { filterSelector } from '~/app/features/filters/filtersSlice';
import { RecipeCollection } from '~/common/components/RecipeCollection/RecipeCollection';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import { querySelector, recipesSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

import ContentContainer from '../common/Containers/ContentContainer';
import SectionCookingBlogs from './Sections/SectionCookingBlogs';
import SectionJuiciest from './Sections/SectionJuiciest';
import SectionNewRecipes from './Sections/SectionNewRecepies';

export default function HomePage() {
    const { getString } = useResource();
    const recipes = useAppSelector(recipesSelector);
    const query = useAppSelector(querySelector);
    const filter = useAppSelector(filterSelector);

    const isFilterAcitve =
        filter.allergens.filter((it) => it.selected).length !== 0 ||
        filter.categories.filter((it) => it.selected).length !== 0 ||
        filter.meat.filter((it) => it.selected).length !== 0 ||
        filter.side.filter((it) => it.selected).length !== 0;

    return (
        <ContentContainer title={getString('bon-appetit')}>
            <>
                {query.length == 0 && !isFilterAcitve ? (
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
