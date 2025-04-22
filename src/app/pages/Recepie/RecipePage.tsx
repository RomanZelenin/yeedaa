import { Box, Flex, GridItem } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router';

import { fetchRecepie } from '~/app/mocks/api';
import { Recipe } from '~/app/mocks/types/type_defenitions';
import { AuthorRecipeCard } from '~/components/Cards/AuthorRecipeCard';
import { RecipeCard } from '~/components/Cards/RecipeCard';
import { Profile } from '~/components/Header/ProfileInfo';

import SectionNewRecipes from '../common/Sections/SectionNewRecepies';
import { CookingSteps } from './CookingSteps';
import { IngredientsList } from './IngredientsList';
import { NutritionFacts } from './NutritionFacts';

const mockAuthor: Profile = {
    firstName: 'Сергей',
    lastName: 'Разумов',
    nickname: 'serge25',
    avatar: '/src/assets/images/kate-avatar.png',
    activity: {
        bookmarks: 1,
        persons: 1,
        likes: 1,
    },
};

export const RecipePage = () => {
    const { id } = useParams();
    const [recepie, setRecepie] = useState<Recipe>();

    fetchRecepie(id!).then((recepie) => {
        setRecepie(recepie);
    });

    return (
        <>
            {recepie ? (
                <GridItem
                    colSpan={{ base: 4, md: 8 }}
                    display='block'
                    colStart={{ base: 1, md: 1 }}
                    colEnd={{ base: 5, md: 13 }}
                >
                    <Flex
                        direction={{ base: 'column' }}
                        px={{ base: '16px', md: '20px', lg: '0px' }}
                        rowGap={{ base: '24px' }}
                    >
                        <RecipeCard recepie={recepie} />
                        <Flex
                            w='100%'
                            px={{ md: '64px' }}
                            direction='column'
                            maxW='768px'
                            alignSelf='center'
                            rowGap={{ base: '24px' }}
                        >
                            <NutritionFacts nutrition={recepie.nutritionValue} />
                            <IngredientsList ingredients={recepie.ingredients} />
                            <CookingSteps steps={recepie.steps} />
                            <AuthorRecipeCard person={mockAuthor} />
                        </Flex>
                    </Flex>
                    <Box mt='24px'>
                        <SectionNewRecipes />
                    </Box>
                </GridItem>
            ) : (
                <></>
            )}
        </>
    );
};
