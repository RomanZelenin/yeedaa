import { Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router';

import { RecipeCollection } from '~/components/RecipeCollection/RecipeCollection';
import { AllergySelectorContext } from '~/components/Selector /AllergySelectorWithSwitcher';
import { useRecipeFilter } from '~/hooks/useRecipeFilter';

import ContentContainer from '../common/Containers/ContentContainer';
import { SearchContext } from '../common/Containers/HeaderContainer';
import SectionRandomCategory from '../common/Sections/SectionRandomCategory';

export default function JuiciestPage() {
    /*  const [recipes, setRecepies] = useState<Record<string, string>[]>([]);
 
     useEffect(() => {
         fetchJuicestRecepies().then((recipes) => {
             setRecepies(recipes);
         });
     }, []); */

    const { query, setQuery, allergens, setAllergens, filteredRecipes } = useRecipeFilter();

    return (
        <SearchContext.Provider value={{ query, setQuery }}>
            <AllergySelectorContext.Provider value={{ allergens, setAllergens }}>
                <ContentContainer title='Самое сочное'>
                    <VStack spacing='32px'>
                        <VStack spacing='12px'>
                            <RecipeCollection recipes={filteredRecipes} />
                            <Button
                                display='inline-flex'
                                as={Link}
                                to='/the-juiciest#'
                                bgColor='lime.300'
                                alignSelf='center'
                                fontSize='16px'
                                color='black'
                                variant='ghost'
                                flex={1}
                                px='16px'
                                py='8px'
                            >
                                Загрузить ещё
                            </Button>
                        </VStack>
                        <SectionRandomCategory />
                    </VStack>
                </ContentContainer>
            </AllergySelectorContext.Provider>
        </SearchContext.Provider>
    );
}
