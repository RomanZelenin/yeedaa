import { Recipe } from '../mocks/types/type_defenitions';

export function filterRecipesByAllergens(recipes: Recipe[], allergens: string[]): Recipe[] {
    const normalizedAllergens = allergens.map(
        (allergen) => allergen.charAt(0).toUpperCase() + allergen.slice(1).toLowerCase(),
    );

    return recipes.filter((recipe) => {
        const normalizedIngredients = recipe.ingredients.map(
            (ingredient) =>
                ingredient.title.charAt(0).toUpperCase() + ingredient.title.slice(1).toLowerCase(),
        );

        return !normalizedIngredients.some((ingredient) =>
            normalizedAllergens.includes(ingredient),
        );
    });
}
