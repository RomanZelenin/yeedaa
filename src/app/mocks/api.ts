import mockRecepies from '~/app/mocks/recepies.json';

import { Recipe } from './types/type_defenitions';

const recepies = mockRecepies.map((recepie) => ({
    ...recepie,
    //category: recepie.category.map((category) => translations[language].categories[category]),
}));

const USE_MOCKS = import.meta.env.DEV;

export async function fetchRecepies(): Promise<Recipe[]> {
    return USE_MOCKS
        ? Promise.resolve(recepies)
        : fetch('/real-api/recepies').then((res) => res.json());
}
