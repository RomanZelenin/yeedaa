export function filterRecipesByTitle(recipes: Recipe[], title: string) {
    const reg = new RegExp(title, 'ig');
    return recipes.filter((recepie) => recepie.title.match(reg) !== null);
}
