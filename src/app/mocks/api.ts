import blogs from '~/app/mocks/blogs.json';
import juicestRecepies from '~/app/mocks/juicest.json';
import randomCategories from '~/app/mocks/random.json';
import mockRecepies from '~/app/mocks/recepies.json';
import { Profile } from '~/components/Header/ProfileInfo';
import icons from '~/locales/common/icons.json';

import { CategoryData } from '../pages/common/Sections/SectionRandomCategory';
import { Recipe } from './types/type_defenitions';

/* const translations = {
    ru: {
        categories: ruCategoryMappings,
        icons: icons,
    },
};
const language = 'ru'; */

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

export async function fetchRecepie(id: string): Promise<Recipe> {
    return USE_MOCKS
        ? Promise.resolve(mockRecepies.find((recepie) => recepie.id === id)!)
        : fetch('/real-api/recepies').then((res) => res.json());
}

export async function fetchIcon(name: string): Promise<string> {
    return USE_MOCKS
        ? Promise.resolve(icons[name])
        : fetch('/real-api/recepies').then((res) => res.json());
}

export async function fetchJuicestRecepies(): Promise<Record<string, string>[]> {
    return USE_MOCKS
        ? Promise.resolve(juicestRecepies)
        : fetch('/real-api/recepies').then((res) => res.json());
}

export async function fetchBlogs(): Promise<{ person: Profile; comment: string }[]> {
    return USE_MOCKS
        ? Promise.resolve(blogs)
        : fetch('/real-api/recepies').then((res) => res.json());
}

export async function fetchRandomCategory(): Promise<CategoryData> {
    return USE_MOCKS
        ? Promise.resolve(randomCategories[0])
        : fetch('/real-api/recepies').then((res) => res.json());
}
