import { Recipe } from '~/app/mocks/types/type_defenitions';
import { useGetCategoriesQuery } from '~/query/create-category-api';
import { Subcategory } from '~/query/types';

export function useMapRecipesToCategoryPaths(recipes: Recipe[]) {
    const { data: categories, isSuccess } = useGetCategoriesQuery();

    if (isSuccess) {
        const subcategories = recipes.map(
            (recipe) =>
                categories.find(
                    (category) => category._id === recipe.categoriesIds![0],
                )! as unknown as Subcategory,
        );
        const rootCategories = subcategories.map((subcategory) =>
            categories.find((category) => category._id === subcategory?.rootCategoryId),
        );

        return recipes.map((recipe, i) => ({
            ...recipe,
            path: `/${rootCategories.at(i)?.category}/${subcategories.at(i)?.category}/${recipe._id}`,
        }));
    }

    return recipes;
}
