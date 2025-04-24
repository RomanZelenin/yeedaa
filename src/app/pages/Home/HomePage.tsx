import { useContext, useEffect, useState } from 'react';

import { fetchRecepies } from '~/app/mocks/api';
import { filterRecipesByAllergens } from '~/app/Utils/filterRecipesByAllergens';
import { RecipeCollection } from '~/components/RecipeCollection/RecipeCollection';
import { AllergySelectorContext } from '~/components/Selector /AllergySelectorWithSwitcher';

import ContentContainer from '../common/Containers/ContentContainer';
import SectionCookingBlogs from '../common/Sections/SectionCookingBlogs';
import SectionJuiciest from '../common/Sections/SectionJuiciest';
import SectionNewRecipes from '../common/Sections/SectionNewRecepies';
import SectionRandomCategory from '../common/Sections/SectionRandomCategory';

export default function HomePage() {
    const { allergens } = useContext(AllergySelectorContext);
    const [filteredRecepies, setFilteredRecepies] = useState<Record<string, string>[]>([]);

    useEffect(() => {
        fetchRecepies().then((recepies) => {
            const filteredRecepies = filterRecipesByAllergens(recepies, allergens);
            setFilteredRecepies(filteredRecepies);
        });
    }, [allergens]);

    return (
        <ContentContainer title='Приятного аппетита!'>
            <>
                {allergens.length > 0 && filteredRecepies.length > 0 ? (
                    <RecipeCollection recipes={filteredRecepies} />
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
    );
}
