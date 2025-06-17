import { Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { AuthorRecipeCard } from '~/common/components/Cards/AuthorRecipeCard';
import { RecipeCard } from '~/common/components/Cards/RecipeCard';
import { getJWTPayload } from '~/common/utils/getJWTPayload';
import { useGetBloggerQuery, useGetRecipeByIdQuery } from '~/query/create-recipe-api';
import { BloggerInfoResponse } from '~/query/types';
import { ApplicationRoute } from '~/router';
import { setAppLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import { EmptyConatainer } from '../common/Containers/EmptyContainer';
import SectionNewRecipes from '../Home/Sections/SectionNewRecepies';
import { CookingSteps } from './CookingSteps';
import { IngredientsList } from './IngredientsList';
import { NutritionFacts } from './NutritionFacts';

export const RecipePage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        data: recipe,
        isSuccess: isSuccessGetRecipe,
        isLoading: isLoadingRecipe,
        isError: isErrorGetRecipe,
    } = useGetRecipeByIdQuery(id!, { skip: !id });

    const {
        data: dataBlogger,
        isError: isErrorBloggerInfo,
        isLoading: isLoadingBloggerInfo,
        isSuccess: isSuccessBloggerInfo,
    } = useGetBloggerQuery(
        { bloggerId: recipe?.authorId ?? '', currentUserId: getJWTPayload().userId },
        { skip: !recipe?.authorId },
    );

    useEffect(() => {
        if (isLoadingRecipe || isLoadingBloggerInfo) {
            dispatch(setAppLoader(true));
        }
        if (isErrorGetRecipe || isErrorBloggerInfo) {
            dispatch(setAppLoader(false));
        }
        if (isSuccessGetRecipe && isSuccessBloggerInfo) {
            dispatch(setAppLoader(false));
        }
    }, [
        isLoadingRecipe,
        isLoadingBloggerInfo,
        isErrorGetRecipe,
        isErrorBloggerInfo,
        isSuccessGetRecipe,
        isSuccessBloggerInfo,
    ]);

    if (isLoadingRecipe || isLoadingBloggerInfo) {
        return null;
    }

    if (isErrorGetRecipe || isErrorBloggerInfo) {
        navigate(ApplicationRoute.INDEX);
        return null;
    }

    if (isSuccessGetRecipe && isSuccessBloggerInfo) {
        const response = dataBlogger as BloggerInfoResponse;
        return (
            <EmptyConatainer>
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
                                portions={recipe.portions ?? 0}
                            />
                            <CookingSteps steps={recipe.steps} />
                            <AuthorRecipeCard
                                profile={response.bloggerInfo}
                                isSubscribe={response.isFavorite}
                            />
                        </Flex>
                    </Flex>
                    <Box mt='24px'>
                        <SectionNewRecipes />
                    </Box>
                </>
            </EmptyConatainer>
        );
    }
};
