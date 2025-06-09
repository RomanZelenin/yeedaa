import { CategoryResponse, RecipeDraft, Subcategory } from '~/query/types';

export const getPathToRecipe = ({
    recipe,
    categories,
}: {
    recipe: RecipeDraft;
    categories?: CategoryResponse[];
}) => {
    const subcategory = categories?.find(
        (category) => category._id === recipe.categoriesIds![0],
    ) as unknown as Subcategory;
    const category = categories?.find((category) => category._id === subcategory?.rootCategoryId);
    return `/${category?.category}/${subcategory?.category}/${recipe._id}`;
};
