import { Recipe } from '../mocks/types/type_defenitions';

export function filterRecipesByTitleOrIngridient(recipes: Recipe[], title: string) {
    const reg = new RegExp(title, 'ig');
    return recipes.filter(
        (recepie) =>
            recepie.title.match(reg) !== null ||
            recepie.ingredients.map((it) => it.title).includes(title.toLocaleLowerCase()),
    );
}
