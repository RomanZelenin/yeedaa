import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { AuthorRecipeCard } from '~/common/components/Cards/AuthorRecipeCard';
import { RecipeCard } from '~/common/components/Cards/RecipeCard';
import { Profile } from '~/common/components/Header/ProfileInfo';
import { getJWTPayload } from '~/common/utils/getJWTPayload';
import { BloggerInfoResponse, useGetBloggerQuery } from '~/query/create-bloggers-api';
import { useGetRecipeByIdQuery } from '~/query/create-recipe-api';
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
    const {
        data: recipe,
        isSuccess: isSuccessGetRecipe,
        isLoading: isLoadingRecipe,
        isError: isErrorGetRecipe,
    } = useGetRecipeByIdQuery(id!, { skip: !id });

    const [authorId, setAuthorId] = useState<string>();
    const currentUserId = getJWTPayload().userId;
    const {
        data: bloggerInfo,
        isError: isErrorBloggerInfo,
        isLoading: isLoadingBloggerInfo,
        isSuccess: isSuccessBloggerInfo,
    } = useGetBloggerQuery(
        { bloggerId: authorId!, currentUserId: currentUserId },
        { skip: !authorId },
    );

    useEffect(() => {
        if (isSuccessGetRecipe) {
            setAuthorId(recipe.authorId);
        }
    }, [isSuccessGetRecipe, recipe, id, bloggerInfo]);

    if (isLoadingRecipe || isLoadingBloggerInfo) {
        dispatch(setAppLoader(true));
        return null;
    }

    if (isErrorGetRecipe || isErrorBloggerInfo) {
        dispatch(setAppLoader(false));
        return null;
    }

    if (isSuccessGetRecipe && isSuccessBloggerInfo) {
        dispatch(setAppLoader(false));
        const response = bloggerInfo as BloggerInfoResponse;
        const profile: Profile = {
            _id: response.bloggerInfo._id,
            isFavorite: response.isFavorite,
            firstName: response.bloggerInfo.firstName,
            lastName: response.bloggerInfo.lastName,
            nickname: response.bloggerInfo.login,
            activity: {
                bookmarks: 1,
                persons: response.totalSubscribers,
                likes: 1,
            },
        };
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
                                portions={recipe.portions}
                            />
                            <CookingSteps steps={recipe.steps} />
                            <AuthorRecipeCard person={profile} />
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
