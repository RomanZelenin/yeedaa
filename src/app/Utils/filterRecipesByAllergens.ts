import { Recipe } from '../mocks/types/type_defenitions';

export function filterRecipesByAllergens(recipes: Recipe[], allergens: string[]): Recipe[] {
    return recipes.filter(
        (recipe) =>
            !recipe.ingredients.some((ingredient) =>
                allergens.some(
                    (allergen) =>
                        ingredient.title.match(new RegExp(allergen.split(' ')[0], 'ig')) !== null,
                ),
            ),
    );
}
