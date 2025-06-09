import { Button, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { Recipe } from '~/app/mocks/types/type_defenitions';
import { RecipeCollection } from '~/common/components/RecipeCollection/RecipeCollection';
import { useResource } from '~/common/components/ResourceContext/ResourceContext';
import { getPathToRecipe } from '~/common/utils/getPathToRecipe';
import { useGetCategoriesQuery } from '~/query/create-category-api';

export const BloggerRecipes = ({ recipes }: { recipes: Recipe[] }) => {
    const { getString } = useResource();
    const [isClickedLoadMore, setIsClickedLoadMore] = useState(false);
    const { data: categories, isSuccess, isLoading, isError } = useGetCategoriesQuery();

    if (isLoading || isError) {
        return null;
    }
    if (isSuccess) {
        const pathsToRecipies = recipes.map((recipe) => getPathToRecipe({ recipe, categories }));
        const listDisplayedRecipes = !isClickedLoadMore
            ? recipes!.slice(0, 8).map((recipe, i) => ({
                  ...recipe,
                  path: pathsToRecipies[i],
              }))
            : recipes!.map((recipe, i) => ({
                  ...recipe,
                  path: pathsToRecipies[i],
              }));
        const isShowMore = recipes.length > 8 && !isClickedLoadMore;

        return (
            <VStack spacing='12px'>
                <RecipeCollection dataTestId='recipe-card-list' recipes={listDisplayedRecipes} />
                {isShowMore && (
                    <Button
                        data-test-id='load-more-button'
                        textAlign='center'
                        display='inline-flex'
                        onClick={() => setIsClickedLoadMore(!isClickedLoadMore)}
                        bgColor='lime.300'
                        alignSelf='center'
                        fontSize='16px'
                        color='black'
                        variant='ghost'
                        flex={1}
                        px='16px'
                        py='8px'
                    >
                        {getString('load-more')}
                    </Button>
                )}
            </VStack>
        );
    }
};
