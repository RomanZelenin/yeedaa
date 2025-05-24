import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { AuthorRecipeCard } from '~/common/components/Cards/AuthorRecipeCard';
import { RecipeCard } from '~/common/components/Cards/RecipeCard';
import { Profile } from '~/common/components/Header/ProfileInfo';
import { useGetRecipeByIdQuery } from '~/query/create-api';
import { setAppLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import { EmptyPage } from '../common/Containers/EmptyPage';
import SectionNewRecipes from '../Home/Sections/SectionNewRecepies';
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
    const dispatch = useAppDispatch();
    const {
        data: recipe,
        isSuccess,
        isLoading,
        isError,
    } = useGetRecipeByIdQuery(id!, { skip: !id });

    if (isLoading) {
        dispatch(setAppLoader(true));
        return null;
    }

    if (isError) {
        dispatch(setAppLoader(false));
        return null;
    }

    if (isSuccess) {
        dispatch(setAppLoader(false));
        return (
            <EmptyPage>
                <>
                    <Flex
                        direction={{ base: 'column' }}
                        px={{ base: '16px', md: '20px', lg: '0px' }}
                        rowGap={{ base: '24px' }}
                    >
                        <RecipeCard recipe={recipe} />
                        <Flex
                            w='100%'
                            px={{ md: '64px' }}
                            direction='column'
                            maxW='768px'
                            alignSelf='center'
                            rowGap={{ base: '24px' }}
                        >
                            <NutritionFacts nutrition={recipe.nutritionValue} />
                            <IngredientsList
                                ingredients={recipe.ingredients}
                                portions={recipe.portions}
                            />
                            <CookingSteps steps={recipe.steps} />
                            <AuthorRecipeCard person={mockAuthor} />
                        </Flex>
                    </Flex>
                    <Box mt='24px'>
                        <SectionNewRecipes />
                    </Box>
                </>
            </EmptyPage>
        );
    }
};
