import { RecipeCollection } from '~/components/RecipeCollection/RecipeCollection';
import { AllergySelectorContext } from '~/components/Selector /AllergySelectorWithSwitcher';
import { useRecipeFilter } from '~/hooks/useRecipeFilter';

import ContentContainer from '../common/Containers/ContentContainer';
import { SearchContext } from '../common/Containers/HeaderContainer';
import SectionCookingBlogs from '../common/Sections/SectionCookingBlogs';
import SectionJuiciest from '../common/Sections/SectionJuiciest';
import SectionNewRecipes from '../common/Sections/SectionNewRecepies';
import SectionRandomCategory from '../common/Sections/SectionRandomCategory';

export default function HomePage() {
    const { query, setQuery, allergens, setAllergens, filteredRecipes } = useRecipeFilter();

    return (
        <SearchContext.Provider value={{ query, setQuery }}>
            <AllergySelectorContext.Provider value={{ allergens, setAllergens }}>
                <ContentContainer title='Приятного аппетита!'>
                    <>
                        {allergens.length > 0 || query.length > 0 ? (
                            <RecipeCollection recipes={filteredRecipes} />
                        ) : (
                            <>
                                <SectionNewRecipes />
                                <SectionJuiciest />
                                <SectionCookingBlogs />
                                <SectionRandomCategory />
                            </>
                        )}
                    </>
                </ContentContainer>
            </AllergySelectorContext.Provider>
        </SearchContext.Provider>
    );
}
