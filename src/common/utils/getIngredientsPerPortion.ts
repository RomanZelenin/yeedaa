import { Ingredient } from '~/app/mocks/types/type_defenitions';

export function getIngredientsPerPortion(ingredients: Ingredient[], portions: number) {
    return ingredients.map((ingridient) => ({
        ...ingridient,
        count: isNaN(parseFloat(ingridient.count))
            ? ingridient.count
            : (parseFloat(ingridient.count) / portions).toString(),
    })) as Ingredient[];
}
